import { getDailyMonthPageSchema } from '@/lib/schema/daily-month-schema';

export function DailyMonthSchemaScript({
  year,
  month,
  puzzleDates,
}: {
  year: number;
  month: number;
  puzzleDates: string[];
}) {
  const schema = getDailyMonthPageSchema(year, month, puzzleDates);
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}
