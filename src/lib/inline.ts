export type InlineSegment =
  | { type: 'text'; text: string }
  | { type: 'link'; label: string; href: string };

export const INLINE_LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

export function parseInline(source: string): InlineSegment[] {
  const segments: InlineSegment[] = [];
  let cursor = 0;
  for (const match of Array.from(source.matchAll(INLINE_LINK))) {
    const start = match.index ?? 0;
    if (start > cursor) segments.push({ type: 'text', text: source.slice(cursor, start) });
    segments.push({ type: 'link', label: match[1], href: match[2] });
    cursor = start + match[0].length;
  }
  if (cursor < source.length) segments.push({ type: 'text', text: source.slice(cursor) });
  return segments;
}
