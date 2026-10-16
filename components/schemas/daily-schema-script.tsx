import { getDailyPageSchema } from '@/lib/schema/daily-schema';

export function DailySchemaScript() {
  const schema = getDailyPageSchema();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
