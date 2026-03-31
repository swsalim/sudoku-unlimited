import { cn } from '@/lib/utils';

export default function SudokuGameSkeleton() {
  return (
    <>
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        <div className="rounded-2xl bg-white/90 p-5 shadow-[0_8px_40px_rgba(0,0,0,0.08)] sm:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-stone-200/60 pb-4">
            <div className="flex gap-2">
              <div className="h-8 w-32 animate-pulse rounded-xl bg-stone-200"></div>
              <div className="h-8 w-20 animate-pulse rounded-lg bg-stone-200"></div>
            </div>
            <div className="flex gap-2">
              <div className="h-6 w-12 animate-pulse rounded bg-stone-200"></div>
              <div className="h-8 w-8 animate-pulse rounded bg-stone-200"></div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-center sm:gap-8">
            <div className="grid w-fit max-w-full grid-cols-9 overflow-hidden rounded-xl border-2 border-stone-200 bg-stone-50/80 shadow-inner">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((row, rowIndex) =>
                [1, 2, 3, 4, 5, 6, 7, 8, 9].map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={cn(
                      'relative flex size-7 animate-pulse items-center justify-center border border-stone-300 bg-stone-200/60 sm:size-9 md:size-11 lg:size-14',
                      colIndex % 3 === 2 && colIndex !== 8 && 'border-r-2 border-r-stone-300',
                      rowIndex % 3 === 2 && rowIndex !== 8 && 'border-b-2 border-b-stone-300',
                    )}
                  />
                )),
              )}
            </div>

            <div className="flex flex-grow flex-col gap-4">
              <div className="flex gap-2">
                <div className="h-10 w-full animate-pulse rounded-md bg-stone-200 sm:h-14"></div>
                <div className="h-10 w-full animate-pulse rounded-md bg-stone-200 sm:h-14"></div>
                <div className="h-10 w-full animate-pulse rounded-md bg-stone-200 sm:h-14"></div>
                <div className="h-10 w-full animate-pulse rounded-md bg-stone-200 sm:h-14"></div>
              </div>

              <div className="flex flex-row flex-wrap gap-1 sm:grid sm:grid-cols-3 sm:gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <div
                    key={num}
                    className="h-9 w-9 animate-pulse rounded-md bg-stone-200 sm:h-16 sm:w-full"
                  />
                ))}
              </div>

              <div className="h-10 w-full animate-pulse rounded-lg bg-emerald-500/20 sm:h-12"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
