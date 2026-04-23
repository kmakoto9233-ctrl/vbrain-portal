"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/articles")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch articles:", err);
        setLoading(false);
      });
  }, []);

  // Filter logic: Tab + Search Query
  const filteredArticles = articles.filter((article) => {
    // Original core categories
    const matchesTab = activeTab === "ALL" || article.category === activeTab;
    
    // Search covers title, category, and content (id)
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.category && article.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (article.id && article.id.toLowerCase().includes(searchQuery.toLowerCase()));
      
    return matchesTab && matchesSearch;
  });

  const tabs = ["ALL", "TREND", "DATABASE", "RECAPS"];

  return (
    <main className="container-premium">
      {/* Header / Hero Section */}
      <section style={{ padding: '120px 0 60px', textAlign: 'center' }}>
        <h1 className="heading-premium text-gradient" style={{ fontSize: '4.5rem', marginBottom: '1.5rem', letterSpacing: '-2px' }}>
          V-BRAIN
        </h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 3rem', lineHeight: 1.6 }}>
          Virtual Sphere Intelligence Portal.<br />
          データと分析で読み解く、バーチャルエンターテインメントの最前線。
        </p>

        {/* Search Bar */}
        <div style={{ maxWidth: '600px', margin: '0 auto 2rem', position: 'relative' }}>
          <input 
            type="text" 
            placeholder="インテリジェンスを検索..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '1.2rem 2rem 1.2rem 3.5rem',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-color)',
              borderRadius: '50px',
              color: 'white',
              fontSize: '1rem',
              fontFamily: 'var(--font-inter)',
              outline: 'none',
              transition: '0.3s',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
          />
          <span style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>
            🔍
          </span>
        </div>

        {/* Original Simple Tabs */}
        <div className="glass" style={{ 
          display: 'inline-flex', 
          justifyContent: 'center', 
          gap: '0.5rem', 
          padding: '0.5rem', 
          borderRadius: '50px', 
          margin: '0 auto 4rem'
        }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '0.8rem 2rem',
                borderRadius: '40px',
                border: 'none',
                background: activeTab === tab ? 'var(--primary)' : 'transparent',
                color: activeTab === tab ? 'black' : 'var(--text-dim)',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: '0.3s',
                letterSpacing: '1px'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* Article Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-dim)' }}>INTELLIGENCE LOADING...</div>
      ) : (
        <div className="grid-premium">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <Link href={`/articles/${article.id}`} key={article.id} className="card-premium" style={{ textDecoration: 'none' }}>
                <span style={{ color: 'var(--primary)', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '2px', marginBottom: '1rem', display: 'block' }}>
                  {article.category || "REPORT"}
                </span>
                <h3 className="heading-premium" style={{ fontSize: '1.4rem', marginBottom: '1rem', lineHeight: 1.3 }}>{article.title}</h3>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {article.blocks?.[0]?.text?.substring(0, 80)}...
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 600 }}>{article.date}</span>
                  <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.8rem' }}>READ FULL →</span>
                </div>
              </Link>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '5rem', color: 'var(--text-dim)' }}>
              一致する記事が見つかりませんでした。
            </div>
          )}
        </div>
      )}

      <footer style={{ marginTop: '8rem', paddingBottom: '4rem', textAlign: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '4rem' }}>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>
          &copy; 2026 V-BRAIN | Virtual Sphere Intelligence Portal.<br />
          Data-driven reporting for the next generation.
        </p>
      </footer>
    </main>
  );
}
