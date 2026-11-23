import "server-only";

export function productionOrigin() {
  const domain = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const configured = process.env.SITE_URL?.trim() || (domain ? `https://${domain}` : null);
  if (!configured) return undefined;

  try {
    const url = new URL(configured);
    if (["https:", "http:"].includes(url.protocol) && !url.username && !url.password) return url.origin;
  } catch {
    return undefined;
  }
}
