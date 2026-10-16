const GITHUB_REPO = 'tirth8205/code-review-graph';

export const FALLBACK_STARS = 32000;

export async function fetchStarCount(): Promise<number | null> {
  try {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`, {
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (!response.ok) return null;

    const data = await response.json();
    return typeof data.stargazers_count === 'number' ? data.stargazers_count : null;
  } catch {
    return null;
  }
}

export function starsProof(stars: number): string {
  return `${stars.toLocaleString('en-GB')} GitHub stars · up to 49× fewer tokens`;
}
