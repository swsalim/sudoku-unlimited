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
    <section className="pb-16" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-6xl px-6">
        <h2
          id="faq-heading"
          className="font-heading text-3xl font-black text-stone-900 dark:text-stone-50">
          Frequently Asked Questions
        </h2>
        <dl className="mt-8 grid gap-4 md:grid-cols-2">
          {faqs.map(({ question, answer }) => (
            <div
              key={question}
              className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
              <dt className="font-semibold text-stone-900 dark:text-stone-50">{question}</dt>
              <dd className="mt-2 text-sm text-stone-600 dark:text-stone-400">{answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
