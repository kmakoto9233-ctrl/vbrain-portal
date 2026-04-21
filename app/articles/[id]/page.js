import { getArticleById } from "@/lib/data-fetcher";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ArticlePage({ params }) {
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) {
    notFound();
  }

  return (
    <main className="container-premium" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
      <nav className="glass" style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100, padding: '1rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" className="text-gradient heading-premium" style={{ fontWeight: 800, fontSize: '1.2rem', textDecoration: 'none' }}>V-BRAIN</Link>
        <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600 }}>&larr; BACK TO FEED</Link>
      </nav>

      <article style={{ maxWidth: '800px', margin: '0 auto' }}>
        <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '2px', display: 'block', marginBottom: '1rem' }}>
          {article.category || "GENERAL ANALYSIS"}
        </span>
        <h1 className="heading-premium" style={{ fontSize: '2.5rem', marginBottom: '2rem', lineHeight: 1.2 }}>{article.title}</h1>
        
        <div style={{ display: 'flex', gap: '2rem', color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: '3rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem' }}>
          <span>DATE: {article.date}</span>
          <span>PRIORITY: {article.priority || "NORMAL"}</span>
        </div>

        <div className="glass" style={{ padding: '2.5rem', borderRadius: '20px', fontSize: '1.1rem', lineHeight: 2, whiteSpace: 'pre-wrap' }}>
          {article.content}
        </div>

        {article.priority === 'high' && (
          <div style={{ marginTop: '4rem', padding: '3rem', background: 'linear-gradient(135deg, rgba(0,242,255,0.1), rgba(255,0,229,0.1))', borderRadius: '20px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
            <h3 className="heading-premium" style={{ marginBottom: '1rem' }}>関連アイテムをチェック</h3>
            <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>この話題に関連する最新ギアやチケット情報を確認しましょう。</p>
            <button style={{ background: 'var(--primary)', color: 'black', fontWeight: 800, border: 'none', padding: '1rem 3rem', borderRadius: '50px', cursor: 'pointer' }}>
              公式サイトで詳細を見る
            </button>
          </div>
        )}
      </article>

      <footer style={{ marginTop: '8rem', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
        <p>&copy; 2026 V-BRAIN | Premium Streamer Intelligence</p>
      </footer>
    </main>
  );
}
