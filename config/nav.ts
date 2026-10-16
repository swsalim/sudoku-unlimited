export type NavLink = {
  href: string;
  label: string;
};

export const primaryNavLinks: NavLink[] = [
  { href: '/daily', label: 'Daily Challenge' },
  { href: '/sudoku-solver', label: 'Sudoku Solver' },
  { href: '/killer-sudoku', label: 'Killer Sudoku' },
  { href: '/printable', label: 'Printable' },
  { href: '/kids-sudoku', label: 'Kids' },
  { href: '/guides', label: 'Guides' },
  { href: '/about', label: 'About' },
];
