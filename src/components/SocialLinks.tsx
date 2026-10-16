import { socialLinks } from '../data/profile';

export default function SocialLinks() {
  return (
    <nav aria-label="Elsewhere" className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm text-neutral-600 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-950 hover:decoration-neutral-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900"
          >
            {link.label}
          </a>
      ))}
    </nav>
  );
}
