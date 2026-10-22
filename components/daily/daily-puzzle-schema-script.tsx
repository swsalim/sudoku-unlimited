import { getDailyPuzzlePageSchema } from '@/lib/schema/daily-puzzle-schema';
import type { DailyPuzzleRecord } from '@/lib/daily/types';

export function DailyPuzzleSchemaScript({
  isoDate,
  record,
  includeArchiveBreadcrumb,
}: {
  isoDate: string;
  record: DailyPuzzleRecord;
  includeArchiveBreadcrumb?: boolean;
}) {
  const schema = getDailyPuzzlePageSchema(isoDate, record, { includeArchiveBreadcrumb });
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}
