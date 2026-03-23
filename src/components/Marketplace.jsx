import { useState, useMemo } from 'react';
import useHead from '../hooks/useHead';
import useStrapiData from '../hooks/useStrapiData';

const DEFAULT_SKILLS = [
  { id: 1, title: 'PostgreSQL Query Optimizer', slug: 'postgresql-query-optimizer', description: 'Analyze slow queries and suggest index, partitioning, and rewrite strategies using EXPLAIN ANALYZE output.', database: 'postgresql', databaseLabel: 'PostgreSQL', icon: '🐘', tags: ['optimization', 'performance', 'indexing'], featured: true, prompt: 'You are a PostgreSQL performance expert...' },
  { id: 2, title: 'MySQL Performance Tuner', slug: 'mysql-performance-tuner', description: 'Diagnose and fix slow MySQL queries using EXPLAIN, index analysis, and InnoDB tuning.', database: 'mysql', databaseLabel: 'MySQL', icon: '🐬', tags: ['performance', 'optimization', 'innodb'], featured: true, prompt: 'You are a MySQL performance tuning expert...' },
  { id: 3, title: 'BigQuery Cost Optimizer', slug: 'bigquery-cost-optimizer', description: 'Reduce BigQuery costs by optimizing query patterns, partitioning, and clustering strategies.', database: 'bigquery', databaseLabel: 'BigQuery', icon: '📊', tags: ['cost', 'optimization', 'partitioning'], featured: true, prompt: 'You are a BigQuery cost optimization expert...' },
  { id: 4, title: 'Snowflake Warehouse Optimizer', slug: 'snowflake-warehouse-optimizer', description: 'Right-size Snowflake warehouses, optimize clustering, and reduce credit consumption.', database: 'snowflake', databaseLabel: 'Snowflake', icon: '❄️', tags: ['warehouse', 'credits', 'optimization'], featured: true, prompt: 'You are a Snowflake optimization expert...' },
  { id: 5, title: 'ClickHouse Schema Designer', slug: 'clickhouse-schema-designer', description: 'Design ClickHouse tables with optimal engines, partition keys, and ORDER BY for analytical workloads.', database: 'clickhouse', databaseLabel: 'ClickHouse', icon: '⚡', tags: ['schema', 'mergetree', 'partitioning'], featured: true, prompt: 'You are a ClickHouse schema design expert...' },
  { id: 6, title: 'DuckDB Local Analytics', slug: 'duckdb-local-analytics', description: 'Run fast analytics on CSV, Parquet, and JSON files locally using DuckDB — no server required.', database: 'duckdb', databaseLabel: 'DuckDB', icon: '🦆', tags: ['analytics', 'local', 'parquet'], featured: true, prompt: 'You are a DuckDB expert...' },
];

export default function Marketplace() {
  useHead({
    title: 'Claude DB Skills Marketplace — Legible',
    description: 'Browse Claude DB skills for every database Legible connects to. Copy prompts for PostgreSQL, MySQL, BigQuery, Snowflake, ClickHouse, and more.',
  });

  const { data: skills } = useStrapiData('/skills?sort=sortOrder:asc&pagination[pageSize]=100', DEFAULT_SKILLS);

  const [activeDb, setActiveDb] = useState('all');
  const [search, setSearch] = useState('');
  const [expandedSlug, setExpandedSlug] = useState(null);
  const [copied, setCopied] = useState(null);

  // Derive unique databases from skills
  const databases = useMemo(() => {
    const map = new Map();
    (skills || []).forEach(s => {
      if (!map.has(s.database)) {
        map.set(s.database, { key: s.database, label: s.databaseLabel, icon: s.icon });
      }
    });
    return Array.from(map.values());
  }, [skills]);

  // Filter skills
  const filtered = useMemo(() => {
    let list = skills || [];
    if (activeDb !== 'all') {
      list = list.filter(s => s.database === activeDb);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.databaseLabel.toLowerCase().includes(q) ||
        (s.tags || []).some(t => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [skills, activeDb, search]);

  const handleCopy = async (text, slug) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(slug);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(slug);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  return (
    <section className="marketplace">
      {/* Hero */}
      <div className="mp-hero" data-reveal>
        <p className="mp-eyebrow">Claude Skills Marketplace</p>
        <h1 className="mp-title">
          Skills for every <span>database.</span>
        </h1>
        <p className="mp-subtitle">
          Copy-paste Claude prompts tailored to the databases Legible connects to.
          Each skill is a ready-to-use system prompt for query optimization, schema design, migration, and more.
        </p>
      </div>

      {/* Search */}
      <div className="mp-controls" data-reveal>
        <input
          className="mp-search"
          type="text"
          placeholder="Search skills…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Database filters */}
      <div className="mp-filters" data-reveal>
        <button
          className={`mp-filter-pill ${activeDb === 'all' ? 'active' : ''}`}
          onClick={() => setActiveDb('all')}
        >
          All ({(skills || []).length})
        </button>
        {databases.map(db => {
          const count = (skills || []).filter(s => s.database === db.key).length;
          return (
            <button
              key={db.key}
              className={`mp-filter-pill ${activeDb === db.key ? 'active' : ''}`}
              onClick={() => setActiveDb(db.key)}
            >
              {db.icon} {db.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Skills grid */}
      <div className="mp-grid">
        {filtered.map(skill => {
          const isExpanded = expandedSlug === skill.slug;
          return (
            <div
              key={skill.slug}
              className={`mp-card ${isExpanded ? 'expanded' : ''} ${skill.featured ? 'featured' : ''}`}
              data-reveal
            >
              <div className="mp-card-header" onClick={() => setExpandedSlug(isExpanded ? null : skill.slug)}>
                <div className="mp-card-icon">{skill.icon}</div>
                <div className="mp-card-meta">
                  <h3 className="mp-card-title">{skill.title}</h3>
                  <span className="mp-card-db">{skill.databaseLabel}</span>
                </div>
                <span className="mp-card-toggle">{isExpanded ? '−' : '+'}</span>
              </div>

              <p className="mp-card-desc">{skill.description}</p>

              {(skill.tags || []).length > 0 && (
                <div className="mp-card-tags">
                  {skill.tags.map(tag => (
                    <span key={tag} className="mp-tag">{tag}</span>
                  ))}
                </div>
              )}

              {isExpanded && skill.prompt && (
                <div className="mp-card-prompt">
                  <div className="mp-prompt-header">
                    <span className="mp-prompt-label">System Prompt</span>
                    <button
                      className="mp-copy-btn"
                      onClick={e => { e.stopPropagation(); handleCopy(skill.prompt, skill.slug); }}
                    >
                      {copied === skill.slug ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                  <pre className="mp-prompt-text">{skill.prompt}</pre>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="mp-empty" data-reveal>No skills found matching your search.</p>
      )}
    </section>
  );
}
