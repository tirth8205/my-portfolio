interface ArticleLink {
  label: string;
  href: string;
}

interface ArticleLinksProps {
  links: ArticleLink[];
}

export default function ArticleLinks({ links }: ArticleLinksProps) {
  return (
    <nav aria-label="Project links" className="flex flex-wrap gap-x-5 gap-y-2">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="text-sm text-neutral-700 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-950 hover:decoration-neutral-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
