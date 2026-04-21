import { getAllArticles } from "@/lib/data-fetcher";
import Link from "next/link";

export default async function Home() {
  const articles = await getAllArticles();

  return (
    <main>
      <nav className="glass" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 100, padding: '1rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="text-gradient heading-premium" style={{ fontWeight: 800, fontSize: '1.5rem' }}>V-BRAIN</div>
        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-dim)' }}>
          <span>TRENDS</span>
          <span>DATABASE</span>
          <span>RECAPS</span>
        </div>
      </nav>

      <section style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: '60px' }}>
        <div className="container-premium">
          <h1 className="heading-premium" style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>Virtual Intelligence<br/>Redefined.</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
            AIが配信データをリアルタイム解析。今、V界隈で起きている「すべて」を最速でインテリジェンス化します。
          </p>
          <div className="glass" style={{ maxWidth: '600px', margin: '0 auto', padding: '0.5rem', borderRadius: '50px', display: 'flex' }}>
            <input type="text" placeholder="推しの名前やキーワードを入力..." style={{ background: 'transparent', border: 'none', padding: '1rem 1.5rem', flex: 1, color: 'white', outline: 'none' }} />
            <button style={{ background: 'var(--primary)', color: 'black', fontWeight: 800, border: 'none', padding: '0.8rem 2rem', borderRadius: '50px', cursor: 'pointer' }}>ANALYZE</button>
          </div>
        </div>
      </section>

      <section className="container-premium" style={{ paddingBottom: '10rem' }}>
        <h2 className="heading-premium" style={{ fontSize: '2rem', marginBottom: '3rem', borderLeft: '4px solid var(--primary)', paddingLeft: '1.5rem' }}>Latest Intelligence</h2>
        
        {articles.length === 0 ? (
          <p style={{ color: 'var(--text-dim)', textAlign: 'center' }}>現在、新しいインテリジェンスを生成中です...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {articles.map((article) => (
              <Link key={article.id} href={`/articles/${article.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="glass" style={{ padding: '2rem', borderRadius: '20px', height: '100%', transition: '0.3s', cursor: 'pointer' }}>
                  <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.7rem', letterSpacing: '1px', marginBottom: '1rem' }}>
                    {article.category || "GENERAL"}
                  </div>
                  <h3 className="heading-premium" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{article.title}</h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {article.content ? article.content.substring(0, 100) + "..." : "詳細な分析は記事をご覧ください。"}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                    <span>{article.date}</span>
                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>READ ANALYSIS &rarr;</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
