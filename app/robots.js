export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: "https://vbrain-portal.vercel.app/sitemap.xml",
  };
}
