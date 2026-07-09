// Prefix a root-relative path with the site `base` so assets and internal
// links work when served from a GitHub Pages project subpath.
const base = import.meta.env.BASE_URL;

export function withBase(path: string): string {
  return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}
