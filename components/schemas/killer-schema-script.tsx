import { getKillerSchema } from '@/lib/schema/killer-schema';

interface KillerSchemaScriptProps {
  difficulty: string;
}

export function KillerSchemaScript({ difficulty }: KillerSchemaScriptProps) {
  const schema = getKillerSchema(difficulty);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
