import fs from 'fs';
import path from 'path';

// プロジェクト内のデータディレクトリ
const ARTICLES_PATH = path.join(process.cwd(), "data/articles");

export async function getAllArticles() {
  if (!fs.existsSync(ARTICLES_PATH)) {
    return [];
  }

  const files = fs.readdirSync(ARTICLES_PATH);
  const articles = files
    .filter(file => file.endsWith('.json'))
    .map(file => {
      const filePath = path.join(ARTICLES_PATH, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    });

  return articles.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getArticleById(id) {
  const filePath = path.join(ARTICLES_PATH, `${id}.json`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}
