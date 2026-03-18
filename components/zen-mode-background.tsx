'use client';

interface ZenModeBackgroundProps {
  isZenMode: boolean;
}

export function ZenModeBackground({ isZenMode }: ZenModeBackgroundProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      {/* Normal mode: subtle warm geometric wavy pattern */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
        style={{
          opacity: isZenMode ? 0 : 1,
          backgroundImage: `
            radial-gradient(circle at 0 0, rgba(120, 113, 108, 0.08) 0, transparent 55%),
            radial-gradient(circle at 100% 0, rgba(87, 83, 78, 0.09) 0, transparent 60%),
            radial-gradient(circle at 0 100%, rgba(68, 64, 60, 0.08) 0, transparent 55%),
            radial-gradient(circle at 100% 100%, rgba(41, 37, 36, 0.1) 0, transparent 60%),
            repeating-linear-gradient(
              -45deg,
              rgba(68, 64, 60, 0.05) 0px,
              rgba(68, 64, 60, 0.05) 2px,
              transparent 2px,
              transparent 7px
            ),
            repeating-linear-gradient(
              45deg,
              rgba(87, 83, 78, 0.04) 0px,
              rgba(87, 83, 78, 0.04) 3px,
              transparent 3px,
              transparent 11px
            )
          `,
          backgroundSize: '160px 160px, 220px 220px, 200px 200px, 260px 260px, 32px 32px, 44px 44px',
          backgroundPosition: '0 0, 100% 0, 0 100%, 100% 100%, 0 0, 0 0',
          minHeight: '100dvh',
        }}
      />
      {/* Zen mode: soft emerald geometric wavy pattern */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
        style={{
          opacity: isZenMode ? 1 : 0,
          backgroundImage: `
            radial-gradient(circle at 0 0, rgba(52, 211, 153, 0.14) 0, transparent 55%),
            radial-gradient(circle at 100% 0, rgba(16, 185, 129, 0.11) 0, transparent 60%),
            radial-gradient(circle at 0 100%, rgba(45, 212, 191, 0.12) 0, transparent 55%),
            radial-gradient(circle at 100% 100%, rgba(5, 150, 105, 0.16) 0, transparent 60%),
            repeating-linear-gradient(
              -45deg,
              rgba(16, 185, 129, 0.07) 0px,
              rgba(16, 185, 129, 0.07) 2px,
              transparent 2px,
              transparent 7px
            ),
            repeating-linear-gradient(
              45deg,
              rgba(45, 212, 191, 0.06) 0px,
              rgba(45, 212, 191, 0.06) 3px,
              transparent 3px,
              transparent 11px
            )
          `,
          backgroundSize: '160px 160px, 220px 220px, 200px 200px, 260px 260px, 32px 32px, 44px 44px',
          backgroundPosition: '0 0, 100% 0, 0 100%, 100% 100%, 0 0, 0 0',
          minHeight: '100dvh',
        }}
      />
    </div>
  );
}
