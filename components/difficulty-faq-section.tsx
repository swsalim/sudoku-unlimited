import { faqByDifficulty } from '@/lib/schema/difficulty-schema';

interface DifficultyFaqSectionProps {
  difficulty: string;
}

export function DifficultyFaqSection({ difficulty }: DifficultyFaqSectionProps) {
  const faqs = faqByDifficulty[difficulty];

  if (!faqs?.length) {
    return null;
  }

  return (
    <section
      className="prose mt-8 max-w-none bg-green-50/50 dark:prose-invert dark:bg-green-900/50"
      aria-labelledby="faq-heading">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h2 id="faq-heading" className="font-heading text-2xl font-bold dark:text-stone-50">
          Frequently Asked Questions
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
