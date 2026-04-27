import { getAllArticles } from "@/lib/data-fetcher";
import ArticleFeed from "@/components/ArticleFeed";

export default async function Home() {
  const articles = await getAllArticles();

  return (
    <main className="container-premium">
      {/* Header / Hero Section */}
      <section style={{ padding: '120px 0 60px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 className="heading-premium text-gradient" style={{ fontSize: '4.5rem', marginBottom: '1.5rem', letterSpacing: '-2px' }}>
          V-BRAIN
        </h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 3rem', lineHeight: 1.6 }}>
          Virtual Sphere Intelligence Portal.<br />
          データと分析で読み解く、バーチャルエンターテインメントの最前線。
        </p>

        <ArticleFeed initialArticles={articles} />
      </section>

      <footer style={{ marginTop: '8rem', paddingBottom: '4rem', textAlign: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '4rem' }}>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>
          &copy; 2026 V-BRAIN | Virtual Sphere Intelligence Portal.<br />
          Data-driven reporting for the next generation.
        </p>
      </footer>
    </main>
  );
}
