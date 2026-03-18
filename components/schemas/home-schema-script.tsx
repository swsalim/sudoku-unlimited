import { getHomeSchema } from '@/lib/schema/home-schema';

export function HomeSchemaScript() {
  const schema = getHomeSchema();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
