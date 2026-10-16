'use client';

import { openAchievementsDialog } from '@/lib/open-achievements';

import { Button } from '@/components/ui/button';

export function OpenAchievementsButton() {
  return (
    <Button
      type="button"
      variant="outline"
      className="mt-5 w-fit border-violet-200 bg-white text-violet-700 hover:bg-violet-50 dark:border-violet-800 dark:bg-stone-900 dark:text-violet-300"
      onClick={openAchievementsDialog}>
      View Achievements →
    </Button>
  );
}
