import { homeFaqs } from '@/lib/schema/home-schema';

export function HomeFaqSection() {
  return (
    <section
      className="prose mt-8 max-w-none bg-green-50/50 dark:bg-green-900/50"
      aria-labelledby="home-faq-heading">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h2 id="home-faq-heading" className="font-heading text-2xl font-bold dark:text-stone-50">
          Frequently Asked Questions
        </h2>
        <dl className="mt-6 space-y-6">
          {homeFaqs.map(({ question, answer }) => (
            <div key={question}>
              <dt className="font-semibold text-stone-900 dark:text-stone-50">{question}</dt>
              <dd className="mt-2 text-stone-600 dark:text-stone-300">{answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
