import { cn } from '@/lib/utils';

export default function SudokuGameSkeleton() {
  return (
    <div>
      <div className="mx-auto max-w-4xl p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-start gap-4">
            <span className="text-sm text-muted-foreground">
              Difficulty:
              <div className="mt-2 flex gap-2">
                <div className="h-9 w-16 animate-pulse rounded bg-gray-200"></div>
                <div className="h-9 w-16 animate-pulse rounded bg-gray-200"></div>
                <div className="h-9 w-16 animate-pulse rounded bg-gray-200"></div>
              </div>
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-5 sm:flex-row sm:gap-8">
          <div className="grid w-fit grid-cols-9 border-4 border-green-900 bg-green-50/50">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((row, rowIndex) =>
              [1, 2, 3, 4, 5, 6, 7, 8, 9].map((cell, colIndex) => {
                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={cn(
                      'relative flex size-10 animate-pulse items-center justify-center border border-green-900/30 bg-gray-200 sm:size-12 md:size-16',
                      colIndex % 3 === 2 && colIndex !== 8 && 'border-r-4 border-r-green-900',
                      rowIndex % 3 === 2 && rowIndex !== 8 && 'border-b-4 border-b-green-900',
                    )}></div>
                );
              }),
            )}
          </div>

          <div className="flex flex-grow flex-col gap-4">
            <div className="flex gap-2">
              <div className="h-14 w-full animate-pulse rounded bg-gray-200"></div>
              <div className="h-14 w-full animate-pulse rounded bg-gray-200"></div>
              <div className="relative h-14 w-full animate-pulse rounded bg-gray-200"></div>
              <div className="h-14 w-full animate-pulse rounded bg-gray-200"></div>
            </div>

            <div className="flex flex-row flex-wrap gap-1 sm:grid sm:grid-cols-3 sm:gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <div
                  key={num}
                  className="h-9 w-9 animate-pulse rounded bg-gray-200 text-xl font-medium sm:h-16 sm:w-full"></div>
              ))}
            </div>

            <div className="w-full animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
