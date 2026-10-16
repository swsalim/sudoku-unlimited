import type { Guide } from '@/lib/guides/types';
import { getGuideArticleSchema, getGuidesIndexSchema } from '@/lib/schema/guide-schema';

type GuideSchemaScriptProps = {
  guide?: Guide;
};

export function GuideSchemaScript({ guide }: GuideSchemaScriptProps) {
  const schema = guide ? getGuideArticleSchema(guide) : getGuidesIndexSchema();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
