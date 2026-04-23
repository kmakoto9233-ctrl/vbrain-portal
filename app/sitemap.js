import { getAllArticles } from "@/lib/data-fetcher";

export default async function sitemap() {
  const baseUrl = "https://vbrain-portal.vercel.app";

  // 全記事を取得
  const articles = await getAllArticles();

  // 記事ページのURLリストを作成
  const articleUrls = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.id}`,
    lastModified: new Date(article.date),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // トップページ
  const routes = [""].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  }));

  return [...routes, ...articleUrls];
}
