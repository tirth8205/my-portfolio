import Link from 'next/link';

export type Mode = 'human' | 'machine';

const options: { mode: Mode; label: string; href: string }[] = [
  { mode: 'human', label: 'Human', href: '/' },
  { mode: 'machine', label: 'Machine', href: '/machine' },
];

export default function ModeSwitch({ mode }: { mode: Mode }) {
  const machine = mode === 'machine';

  return (
    <nav
      aria-label="Reading mode"
      className={`fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 gap-0.5 rounded-md border p-0.5 font-mono text-[11px] uppercase tracking-[0.08em] backdrop-blur-md ${
        machine
          ? 'border-[#2c2c29] bg-[#161614]/90 text-[#9a9a92]'
          : 'border-[#2c2c29] bg-[#1c1c1a]/90 text-[#a8a8a0]'
      }`}
    >
      {options.map((option) => {
        const active = option.mode === mode;

        return (
          <Link
            key={option.mode}
            href={option.href}
            aria-current={active ? 'page' : undefined}
            className={`flex items-center gap-2 rounded px-2.5 py-1.5 transition-colors hover:text-[#f4f4ef] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4f4ef] ${
              active ? 'text-[#f4f4ef]' : ''
            }`}
          >
            <span
              aria-hidden="true"
              className={`inline-block size-[6px] rounded-full ${
                active ? 'bg-current' : 'border border-current'
              }`}
            />
            {option.label}
          </Link>
        );
      })}
    </nav>
  );
}
