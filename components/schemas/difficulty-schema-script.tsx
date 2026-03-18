import { getDifficultySchema } from '@/lib/schema/difficulty-schema';

interface DifficultySchemaScriptProps {
  difficulty: string;
}

export function DifficultySchemaScript({ difficulty }: DifficultySchemaScriptProps) {
  const schema = getDifficultySchema(difficulty);

  if (!schema) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
