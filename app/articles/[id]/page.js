import { getArticleById } from "@/lib/data-fetcher";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) {
    return {
      title: "Article Not Found | V-BRAIN",
    };
  }

  return {
    title: `${article.title} | V-BRAIN`,
    description: article.content?.substring(0, 160) || "V-BRAINによる専門的なインテリジェンスレポート。",
    openGraph: {
      title: article.title,
      description: article.content?.substring(0, 160),
      type: "article",
      url: `https://vbrain-portal.vercel.app/articles/${id}`,
    },
  };
}

export default async function ArticlePage({ params }) {
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) {
    notFound();
  }

  const renderBlocks = (blocks) => {
    if (!blocks || !Array.isArray(blocks)) {
      return <div style={{ whiteSpace: 'pre-wrap' }}>{article.content}</div>;
    }

    return blocks.map((block, index) => {
      switch (block.type) {
        case 'paragraph':
          return <p key={index} style={{ marginBottom: '2rem' }}>{block.text}</p>;
        case 'heading':
          return <h2 key={index} style={{ fontFamily: 'Outfit', fontSize: '1.8rem', margin: '4rem 0 1.5rem', color: 'var(--primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>{block.text}</h2>;
        case 'table':
          return (
            <div key={index} style={{ overflowX: 'auto', margin: '3rem 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.02)', borderRadius: '15px' }}>
                <thead>
                  <tr style={{ background: 'rgba(0,242,255,0.1)' }}>
                    {block.headers.map((h, i) => (
                      <th key={i} style={{ padding: '1.2rem', textAlign: 'left', fontSize: '0.8rem', color: 'var(--primary)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      {row.map((cell, j) => (
                        <td key={j} style={{ padding: '1.2rem', color: 'var(--text-main)' }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        case 'list':
          return (
            <ul key={index} style={{ margin: '2rem 0', paddingLeft: '1.5rem', color: 'var(--text-dim)' }}>
              {block.items.map((item, i) => (
                <li key={i} style={{ marginBottom: '0.8rem' }}>{item}</li>
              ))}
            </ul>
          );
        case 'highlight':
          return (
            <div key={index} style={{ background: 'rgba(0, 242, 255, 0.05)', borderLeft: '4px solid var(--primary)', padding: '2rem', borderRadius: '0 15px 15px 0', margin: '3rem 0' }}>
              <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary)' }}>CHECK POINT</strong>
              {block.text}
            </div>
          );
        default:
          return null;
      }
    });
  };

  return (
    <main className="container-premium" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
      <nav className="glass" style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100, padding: '1rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" className="text-gradient heading-premium" style={{ fontWeight: 800, fontSize: '1.2rem', textDecoration: 'none' }}>V-BRAIN</Link>
        <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600 }}>&larr; BACK TO FEED</Link>
      </nav>

      <article style={{ maxWidth: '850px', margin: '0 auto' }}>
        <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '2px', display: 'block', marginBottom: '1rem' }}>
          {article.category || "ANALYSIS REPORT"}
        </span>
        <h1 className="heading-premium" style={{ fontSize: '2.8rem', marginBottom: '2.5rem', lineHeight: 1.2 }}>{article.title}</h1>
        
        <div style={{ display: 'flex', gap: '2rem', color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: '4rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem' }}>
          <span>DATE: {article.date}</span>
          <span>EDITORIAL TEAM</span>
        </div>

        <div style={{ fontSize: '1.1rem', lineHeight: 2 }}>
          {renderBlocks(article.blocks)}
        </div>

        {article.amazon_url && (
          <div style={{ 
            marginTop: '6rem', padding: '3rem', 
            background: 'rgba(255, 153, 0, 0.05)', 
            border: '1px solid rgba(255, 153, 0, 0.3)', 
            borderRadius: '20px', textAlign: 'center' 
          }}>
            <h3 className="heading-premium" style={{ color: '#FF9900', marginBottom: '1rem', fontSize: '1.2rem' }}>
              RECOMMENDED ITEM
            </h3>
            <p style={{ color: 'var(--text-dim)', marginBottom: '2rem', fontSize: '0.9rem' }}>
              この記事に関連する商品は、Amazon.co.jpでご購入いただけます。
            </p>
            <a href={article.amazon_url} target="_blank" rel="noopener noreferrer" style={{ 
              display: 'inline-block', background: '#FF9900', color: 'black', 
              padding: '1.2rem 4rem', borderRadius: '50px', textDecoration: 'none', 
              fontWeight: 800, fontSize: '1.1rem', transition: '0.3s' 
            }}>
              Amazonで価格をチェック
            </a>
          </div>
        )}

        {/* Dynamic Official Link Button */}
        <div className="cta-section" style={{ marginTop: '4rem', padding: '4rem', background: 'linear-gradient(135deg, rgba(0,242,255,0.1), rgba(255,0,229,0.1))', borderRadius: '30px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
          <h3 className="heading-premium" style={{ marginBottom: '1.5rem' }}>公式インフォメーション</h3>
          <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>最新の在庫状況や詳細な仕様は、下記の公式サイトよりご確認いただけます。</p>
          <a href={article.official_url || "https://www.google.com"} target="_blank" rel="noopener noreferrer" style={{ 
            display: 'inline-block', background: 'var(--primary)', color: 'black', 
            padding: '1.2rem 4rem', borderRadius: '50px', textDecoration: 'none', 
            fontWeight: 800, fontSize: '1.1rem', transition: '0.3s' 
          }}>
            公式サイトで詳細を見る
          </a>
        </div>
      </article>

      <footer style={{ marginTop: '8rem', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
        <p>&copy; 2026 V-BRAIN | Virtual Sphere Intelligence</p>
      </footer>
    </main>
  );
}
