import { getDailyArchivePageSchema, type DailyArchiveMonthGroup } from '@/lib/schema/daily-archive-schema';

export function DailyArchiveSchemaScript({ monthGroups }: { monthGroups: DailyArchiveMonthGroup[] }) {
  const schema = getDailyArchivePageSchema(monthGroups);
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}
