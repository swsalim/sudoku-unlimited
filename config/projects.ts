export type Project = {
  url: string;
  name: string;
  description: string;
  target: '_blank' | '_self';
};

export const projects: Project[] = [
  {
    url: 'https://pfpresizer.com/?ref=sudokuunlimited.com',
    name: 'PFP Resizer',
    description:
      'Resize profile pictures for Instagram, Facebook, WhatsApp, and other social platforms.',
    target: '_blank',
  },
  {
    url: 'https://www.randomnumberapp.com/?ref=sudokuunlimited.com',
    name: 'Random Number App',
    description:
      'Generate random integers in any range with unique picks and exclusions—free in your browser.',
    target: '_blank',
  },
  {
    url: 'https://clockbeam.com/?ref=sudokuunlimited.com',
    name: 'Clockbeam',
    description:
      'Free online digital clock with seconds, plus timer, stopwatch, and alarm tools—no signup.',
    target: '_blank',
  },
  {
    url: 'https://pixdazzle.com/?ref=sudokuunlimited.com',
    name: 'PixDazzle',
    description:
      'Apply photo effects and everyday image tools in your browser with a live preview before you download.',
    target: '_blank',
  },
  {
    url: 'https://hiddengems.lol/?ref=sudokuunlimited.com',
    name: 'Hidden Gems',
    description:
      'Discover indie games from early prototypes through launch and follow developer updates in one place.',
    target: '_blank',
  },
  {
    url: 'https://www.mainan.fun/?ref=sudokuunlimited.com',
    name: 'mainan.fun',
    description: 'Curated educational toys that blend learning with play for kids.',
    target: '_blank',
  },
  {
    url: 'https://www.indieworldmap.com/?ref=sudokuunlimited.com',
    name: 'Indie World Map',
    description:
      'Explore indie products being built around the world and add your own project to the map.',
    target: '_blank',
  },
  {
    url: 'https://www.whatismyscreensize.com/?ref=sudokuunlimited.com',
    name: 'What is my screen size?',
    description: 'See your current screen and browser viewport size in pixels.',
    target: '_blank',
  },
];
