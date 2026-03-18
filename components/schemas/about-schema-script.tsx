import { getAboutSchema } from '@/lib/schema/about-schema';

export function AboutSchemaScript() {
  const schema = getAboutSchema();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
