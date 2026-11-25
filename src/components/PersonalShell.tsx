import Link from 'next/link';
import LondonClock from './LondonClock';
import Kodama from './Kodama';

export function PersonalHeader() {
  return <header className="personal-page-header"><Link href="/">Tirth Kanani</Link><nav aria-label="Site navigation"><Link href="/#work">Work</Link><Link href="/#writing">Writing</Link><a href="mailto:tirthkanani18@gmail.com">Email</a></nav></header>;
}

export function PersonalFooter() {
  return <footer className="personal-footer"><div className="personal-footer-top"><LondonClock /><span className="personal-rabbit"><Kodama /></span></div><div className="personal-footer-bottom"><span>© 2026 Tirth Kanani</span><Link href="/machine">Plain text</Link></div></footer>;
}
