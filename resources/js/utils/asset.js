/**
 * Resolves static assets with the Laravel application base URL.
 * Ensures all images, icons, and media load accurately across any deep SPA subroutes.
 */
export function assetUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:') || path.startsWith('blob:')) {
    return path;
  }
  let baseUrl = window.__SOFTTEX_BASE_URL__ || window.__SOF値EX_BASE_URL__ || '';
  if (!baseUrl && typeof window !== 'undefined') {
    const loc = window.location.pathname;
    const match = loc.match(/^(.*\/public)/);
    baseUrl = match ? match[1] : '';
  }
  const cleanBase = baseUrl.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
}
