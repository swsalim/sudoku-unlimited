import type { PrintablePuzzle } from '@/lib/printable/sheet';

const PAGE_W = 612;
const PAGE_H = 792;

function escapePdfText(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

function text(font: 'F1' | 'F2', size: number, x: number, y: number, value: string): string {
  return `BT /${font} ${size} Tf 1 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)} Tm (${escapePdfText(value)}) Tj ET`;
}

function drawClassicGrid(
  grid: number[][],
  originX: number,
  originY: number,
  cell: number,
): string[] {
  const size = 9;
  const ops: string[] = ['0.6 0.6 0.6 RG', '0.4 w'];

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const x = originX + col * cell;
      const y = originY + (size - 1 - row) * cell;
      ops.push(`${x.toFixed(2)} ${y.toFixed(2)} ${cell.toFixed(2)} ${cell.toFixed(2)} re S`);
      const value = grid[row][col];
      if (value) {
        ops.push(text('F1', 11, x + 6.2, y + 5.4, String(value)));
      }
    }
  }

  ops.push('0 0 0 RG', '1.6 w');
  for (let band = 0; band <= 3; band++) {
    const offset = band * 3 * cell;
    const x = originX + offset;
    const y = originY + offset;
    ops.push(
      `${x.toFixed(2)} ${originY.toFixed(2)} m ${x.toFixed(2)} ${(originY + size * cell).toFixed(2)} l S`,
    );
    ops.push(
      `${originX.toFixed(2)} ${y.toFixed(2)} m ${(originX + size * cell).toFixed(2)} ${y.toFixed(2)} l S`,
    );
  }

  return ops;
}

function puzzlePage(
  title: string,
  subtitle: string,
  puzzles: number[][][],
  labels: string[],
): string {
  const cell = 18;
  const gridSize = cell * 9;
  const left = 42;
  const right = PAGE_W - 42 - gridSize;
  const top = 470;
  const bottom = 118;
  const origins = [
    [left, top],
    [right, top],
    [left, bottom],
    [right, bottom],
  ] as const;

  const ops = [text('F2', 16, 42, 752, title), text('F1', 10, 42, 734, subtitle)];

  puzzles.forEach((grid, index) => {
    const [x, y] = origins[index];
    ops.push(text('F2', 10, x, y + gridSize + 8, labels[index]));
    ops.push(...drawClassicGrid(grid, x, y, cell));
  });

  ops.push(text('F1', 8, 42, 36, 'Sudoku Unlimited · sudokuunlimited.com'));
  return ops.join('\n');
}

function buildPdf(pageStreams: string[]): Uint8Array {
  const objects: { id: number; body: string }[] = [
    { id: 1, body: '<< /Type /Catalog /Pages 2 0 R >>' },
    { id: 3, body: '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>' },
    { id: 4, body: '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>' },
  ];

  const pageIds: number[] = [];
  let nextId = 5;
  for (const stream of pageStreams) {
    const pageId = nextId++;
    const contentId = nextId++;
    pageIds.push(pageId);
    const length = new TextEncoder().encode(stream).length;
    objects.push({
      id: contentId,
      body: `<< /Length ${length} >>\nstream\n${stream}\nendstream`,
    });
    objects.push({
      id: pageId,
      body: `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentId} 0 R >>`,
    });
  }

  objects.push({
    id: 2,
    body: `<< /Type /Pages /Count ${pageIds.length} /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] >>`,
  });

  objects.sort((a, b) => a.id - b.id);

  let pdf = '%PDF-1.4\n';
  const offsets = new Array<number>(objects.length + 1).fill(0);
  for (const object of objects) {
    offsets[object.id] = pdf.length;
    pdf += `${object.id} 0 obj\n${object.body}\nendobj\n`;
  }

  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  for (let id = 1; id <= objects.length; id++) {
    pdf += `${String(offsets[id]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return new TextEncoder().encode(pdf);
}

export function buildPrintablePdf(options: {
  title: string;
  pagePath: string;
  puzzles: PrintablePuzzle[];
}): Uint8Array {
  const labels = options.puzzles.map((_, index) => `Puzzle ${index + 1}`);
  const solutionLabels = options.puzzles.map((_, index) => `Solution ${index + 1}`);
  const subtitle = `${options.pagePath} · digits 1–9 once per row, column, and 3×3 box`;

  return buildPdf([
    puzzlePage(
      options.title,
      subtitle,
      options.puzzles.map((puzzle) => puzzle.givens),
      labels,
    ),
    puzzlePage(
      `${options.title} — solutions`,
      subtitle,
      options.puzzles.map((puzzle) => puzzle.solution),
      solutionLabels,
    ),
  ]);
}

export function downloadPdf(bytes: Uint8Array, filename: string) {
  const copy = new Uint8Array(bytes);
  const blob = new Blob([copy], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
