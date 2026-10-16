export type DiagramCandidate = {
  digit: number;
  eliminated: boolean;
};

export type DiagramCell = {
  row: number;
  col: number;
  given?: number;
  candidates: DiagramCandidate[];
  highlight: boolean;
  eliminate: boolean;
};

export type SudokuDiagramModel = {
  caption: string;
  rows: number[];
  cols: number[];
  cells: DiagramCell[];
};

function parseCoordList(value: string): Set<string> {
  const coords = new Set<string>();
  for (const match of value.matchAll(/r(\d+)c(\d+)/gi)) {
    const row = Number(match[1]);
    const col = Number(match[2]);
    if (row < 1 || row > 9 || col < 1 || col > 9) {
      throw new Error(`Diagram coordinate out of range: r${row}c${col}`);
    }
    coords.add(`r${row}c${col}`);
  }
  return coords;
}

function parseCols(value: string): number[] {
  const range = value.match(/^(\d)\s*-\s*(\d)$/);
  if (range) {
    const start = Number(range[1]);
    const end = Number(range[2]);
    if (start < 1 || end > 9 || start > end) {
      throw new Error(`Diagram column range is invalid: ${value}`);
    }
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }

  const cols = value
    .split(/[\s,]+/)
    .filter(Boolean)
    .map((part) => Number(part));
  if (cols.length === 0 || cols.some((col) => !Number.isInteger(col) || col < 1 || col > 9)) {
    throw new Error(`Diagram columns are invalid: ${value}`);
  }
  return cols;
}

function parseCellToken(token: string): Pick<DiagramCell, 'given' | 'candidates' | 'highlight'> {
  let raw = token.trim();
  let highlight = false;
  if (raw.endsWith('*')) {
    highlight = true;
    raw = raw.slice(0, -1);
  }

  if (raw === '.' || raw === '') {
    return { candidates: [], highlight };
  }

  if (raw.startsWith('{') && raw.endsWith('}')) {
    const parts = raw
      .slice(1, -1)
      .split(',')
      .map((part) => part.trim())
      .filter(Boolean);
    const seen = new Set<number>();
    const candidates = parts.map((part) => {
      const eliminated = part.startsWith('~');
      const digit = Number(eliminated ? part.slice(1) : part);
      if (!Number.isInteger(digit) || digit < 1 || digit > 9 || seen.has(digit)) {
        throw new Error(`Diagram candidate is invalid: ${token}`);
      }
      seen.add(digit);
      return { digit, eliminated };
    });
    return { candidates, highlight };
  }

  const given = Number(raw);
  if (!Number.isInteger(given) || given < 1 || given > 9) {
    throw new Error(`Diagram cell is invalid: ${token}`);
  }
  return { given, candidates: [], highlight };
}

export function parseSudokuDiagram(source: string): SudokuDiagramModel {
  let caption = '';
  let cols: number[] | null = null;
  const highlight = new Set<string>();
  const eliminate = new Set<string>();
  const rowTokens = new Map<number, string[]>();

  for (const line of source.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const captionMatch = trimmed.match(/^caption:\s*(.+)$/i);
    if (captionMatch) {
      caption = captionMatch[1].trim();
      continue;
    }

    const colsMatch = trimmed.match(/^cols:\s*(.+)$/i);
    if (colsMatch) {
      cols = parseCols(colsMatch[1].trim());
      continue;
    }

    const highlightMatch = trimmed.match(/^highlight:\s*(.+)$/i);
    if (highlightMatch) {
      for (const coord of parseCoordList(highlightMatch[1])) highlight.add(coord);
      continue;
    }

    const eliminateMatch = trimmed.match(/^eliminate:\s*(.+)$/i);
    if (eliminateMatch) {
      for (const coord of parseCoordList(eliminateMatch[1])) eliminate.add(coord);
      continue;
    }

    const rowMatch = trimmed.match(/^r(\d+)\s*:\s*(.+)$/i);
    if (rowMatch) {
      const row = Number(rowMatch[1]);
      if (row < 1 || row > 9) throw new Error(`Diagram row is invalid: ${trimmed}`);
      rowTokens.set(
        row,
        rowMatch[2].trim().split(/\s+/).filter(Boolean),
      );
      continue;
    }

    throw new Error(`Diagram line is invalid: ${trimmed}`);
  }

  const rows = [...rowTokens.keys()].sort((a, b) => a - b);
  if (!caption) throw new Error('Diagram is missing a caption');
  if (rows.length === 0) throw new Error('Diagram is missing rows');

  const width = Math.max(...rows.map((row) => rowTokens.get(row)?.length ?? 0));
  const resolvedCols = cols ?? Array.from({ length: width }, (_, index) => index + 1);
  if (resolvedCols.length !== width) {
    throw new Error(
      `Diagram has ${width} cells in a row but ${resolvedCols.length} named columns`,
    );
  }

  const cells: DiagramCell[] = [];
  for (const row of rows) {
    const tokens = rowTokens.get(row) ?? [];
    if (tokens.length !== resolvedCols.length) {
      throw new Error(`Row ${row} has ${tokens.length} cells; expected ${resolvedCols.length}`);
    }
    tokens.forEach((token, index) => {
      const col = resolvedCols[index];
      const parsed = parseCellToken(token);
      const key = `r${row}c${col}`;
      cells.push({
        row,
        col,
        given: parsed.given,
        candidates: parsed.candidates,
        highlight: parsed.highlight || highlight.has(key),
        eliminate: eliminate.has(key),
      });
    });
  }

  return { caption, rows, cols: resolvedCols, cells };
}

export function cellLabel(cell: DiagramCell): string {
  const where = `Row ${cell.row}, column ${cell.col}`;
  const marks: string[] = [];
  if (cell.given) {
    marks.push(`digit ${cell.given}`);
  } else if (cell.candidates.length === 0) {
    marks.push('empty');
  } else {
    const active = cell.candidates.filter((candidate) => !candidate.eliminated).map((c) => c.digit);
    const removed = cell.candidates.filter((candidate) => candidate.eliminated).map((c) => c.digit);
    if (active.length > 0) marks.push(`candidates ${active.join(', ')}`);
    if (removed.length > 0) marks.push(`removed candidates ${removed.join(', ')}`);
  }
  if (cell.highlight) marks.push('part of the pattern');
  if (cell.eliminate) marks.push('elimination target');
  return `${where}: ${marks.join('; ')}`;
}
