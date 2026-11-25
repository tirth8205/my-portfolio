import Link from 'next/link';
export type Mode = 'human' | 'machine';
export default function ModeSwitch({ mode }: { mode: Mode }) {
  return <nav aria-label="Reading mode" className={`reading-mode ${mode === 'machine' ? 'reading-mode-dark' : ''}`}><Link href="/" aria-current={mode === 'human' ? 'page' : undefined}>Human-readable</Link><span aria-hidden="true">/</span><Link href="/machine" aria-current={mode === 'machine' ? 'page' : undefined}>Machine-readable</Link></nav>;
}
