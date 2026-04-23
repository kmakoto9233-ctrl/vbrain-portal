import fs from 'fs';
import path from 'path';

const ARTICLES_PATH = path.join(process.cwd(), "data/articles");

export async function getAllArticles() {
  if (!fs.existsSync(ARTICLES_PATH)) {
    return [];
  }

  const files = fs.readdirSync(ARTICLES_PATH);
  const articles = files
    .filter(file => file.endsWith('.json'))
    .map(file => {
      try {
        const filePath = path.join(ARTICLES_PATH, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // ファイルの中身が空の場合はスキップ
        if (!content || content.trim() === "") {
          console.warn(`Skipping empty file: ${file}`);
          return null;
        }
        
        return JSON.parse(content);
      } catch (err) {
        console.error(`Error parsing JSON file: ${file}`, err);
        return null;
      }
    })
    .filter(article => article !== null); // 壊れたファイルを排除

  return articles.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getArticleById(id) {
  const filePath = path.join(ARTICLES_PATH, `${id}.json`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error(`Error parsing article ${id}:`, err);
    return null;
  }
}
