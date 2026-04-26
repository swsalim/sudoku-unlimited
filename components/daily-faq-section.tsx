const faqs = [
  {
    q: 'What is the daily Sudoku challenge?',
    a: "It's one puzzle per calendar day, the same for every player. The difficulty rotates on a fixed schedule from the date—there's no randomness, so you always know you're playing the official grid.",
  },
  {
    q: 'What time does the daily reset?',
    a: "We use a single global calendar day in UTC, matching the YYYY-MM-DD you see in the game header. If you're far from UTC, the date may look like the previous or next day compared to your local evening.",
  },
  {
    q: 'Is the daily the same on mobile and desktop?',
    a: 'Yes. The puzzle is generated from the date, so you can start on your phone and continue on a desktop with the same layout.',
  },
] as const;

export function DailyFaqSection() {
  return (
    <section
      className="prose mt-8 max-w-none bg-green-50/50 dark:prose-invert dark:bg-green-900/50"
      aria-labelledby="daily-faq-heading">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h2 id="daily-faq-heading" className="font-heading text-2xl font-bold dark:text-stone-50">
          Daily challenge FAQ
        </h2>
        <dl className="mt-6 space-y-6">
          {faqs.map(({ q, a }) => (
            <div key={q}>
              <dt className="font-semibold text-stone-900 dark:text-stone-50">{q}</dt>
              <dd className="mt-2 text-stone-600 dark:text-stone-400">{a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
