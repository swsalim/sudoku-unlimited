import { killerFaqByDifficulty } from '@/lib/schema/killer-schema';

interface KillerFaqSectionProps {
  difficulty: string;
}

export function KillerFaqSection({ difficulty }: KillerFaqSectionProps) {
  const faqs = killerFaqByDifficulty[difficulty] ?? killerFaqByDifficulty.easy;

  if (!faqs?.length) {
    return null;
  }

  return (
    <section
      className="prose mt-8 max-w-none bg-green-50/50 dark:prose-invert dark:bg-green-900/50"
      aria-labelledby="killer-faq-heading">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h2 id="killer-faq-heading" className="font-heading text-2xl font-bold dark:text-stone-50">
          Killer Sudoku FAQ
        </h2>
        <dl className="mt-6 space-y-6">
          {faqs.map(({ question, answer }) => (
            <div key={question}>
              <dt className="font-semibold text-stone-900 dark:text-stone-50">{question}</dt>
              <dd className="mt-2 text-stone-600 dark:text-stone-400">{answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
