import { useState, useMemo } from 'react';
import useHead from '../hooks/useHead';

const DATABASES = [
  { key: 'postgresql', label: 'PostgreSQL', icon: '🐘' },
  { key: 'mysql', label: 'MySQL', icon: '🐬' },
  { key: 'bigquery', label: 'BigQuery', icon: '📊' },
  { key: 'snowflake', label: 'Snowflake', icon: '❄️' },
  { key: 'clickhouse', label: 'ClickHouse', icon: '⚡' },
  { key: 'duckdb', label: 'DuckDB', icon: '🦆' },
  { key: 'redshift', label: 'Redshift', icon: '🔴' },
  { key: 'databricks', label: 'Databricks', icon: '🧱' },
  { key: 'mssql', label: 'SQL Server', icon: '🟦' },
  { key: 'oracle', label: 'Oracle', icon: '🔶' },
  { key: 'trino', label: 'Trino', icon: '🔺' },
  { key: 'athena', label: 'Athena', icon: '🏛️' },
  { key: 'spark', label: 'Apache Spark', icon: '✨' },
];

const RESOURCES = {
  postgresql: {
    sections: [
      {
        heading: 'Dedicated PostgreSQL Claude Skills',
        items: [
          { num: 1, title: 'timescale/pg-aiguide', url: 'https://github.com/timescale/pg-aiguide', desc: 'The standout dedicated Postgres skill. An MCP server and Claude Code plugin with semantic search across the official PostgreSQL manual, AI-optimised "skills" covering curated Postgres best practices, and extension ecosystem docs including TimescaleDB.', install: 'claude plugin marketplace add timescale/pg-aiguide' },
          { num: 2, title: 'supabase/agent-skills', url: 'https://github.com/supabase/agent-skills', desc: 'Agent skills to help developers using AI agents with Supabase, including a postgres-best-practices skill covering Postgres performance optimisation guidelines across 8 categories, prioritised by impact.', install: '/plugin install postgres-best-practices@supabase-agent-skills' },
          { num: 3, title: 'SpillwaveSolutions/mastering-postgresql-agent-skill', url: 'https://github.com/SpillwaveSolutions/mastering-postgresql-agent-skill', desc: 'A deep PostgreSQL skill covering full-text search (tsvector, tsquery, BM25 via pg_search), vector similarity (pgvector with HNSW/IVFFlat), JSONB and array indexing, and production cloud deployment. Includes reference guides, utility scripts, and Docker Compose templates.' },
          { num: 4, title: 'sanjay3290/postgres', url: 'https://github.com/ComposioHQ/awesome-claude-skills', desc: 'Executes safe read-only SQL queries against PostgreSQL databases with multi-connection support and defense-in-depth security.', via: 'awesome-claude-skills' },
          { num: 5, title: 'everything-claude-code — postgres-patterns', url: 'https://github.com/affaan-m/everything-claude-code/blob/main/docs/ja-JP/skills/postgres-patterns/SKILL.md', desc: 'PostgreSQL database patterns for query optimisation, schema design, indexing, and security, based on Supabase best practices. Covers composite indexes, covering indexes, partial indexes, and UPSERT patterns.' },
        ],
      },
      {
        heading: 'Curated Skill Directories (containing Postgres skills)',
        items: [
          { num: 6, title: 'VoltAgent/awesome-agent-skills', url: 'https://github.com/VoltAgent/awesome-agent-skills', desc: '500+ agent skills from official dev teams and the community, including sanjay3290/postgres for safe read-only SQL queries and supabase/postgres-best-practices for PostgreSQL best practices.' },
          { num: 7, title: 'ComposioHQ/awesome-claude-skills', url: 'https://github.com/ComposioHQ/awesome-claude-skills', desc: 'A curated list including the postgres skill for safe read-only SQL queries with multi-connection support, alongside 100+ other skills across data, engineering, and automation.' },
          { num: 8, title: 'travisvn/awesome-claude-skills', url: 'https://github.com/travisvn/awesome-claude-skills', desc: 'A well-maintained curated list with good coverage of database skills, MCP integration patterns, and guidance on combining skills with external data tools.' },
        ],
      },
      {
        heading: 'Reference & Learning',
        items: [
          { num: 9, title: 'Anthropic Official Skills Repo — anthropics/skills', url: 'https://github.com/anthropics/skills', desc: 'The canonical reference. Contains Anthropic\'s pre-built skills, a template for creating your own, and the source-available document creation skills (docx, pdf, pptx, xlsx) as real-world examples of production-grade skill architecture.' },
          { num: 10, title: 'Claude Agent Skills: A First Principles Deep Dive', url: 'https://leehanchung.github.io/blogs/2025/10/26/claude-skills-deep-dive/', desc: 'The best technical explainer on how skills actually work. Covers the two-message pattern, progressive disclosure design, frontmatter structure, and how SKILL.md injects context — essential reading before writing your own Postgres skill from scratch.', author: 'Lee Hanchung' },
        ],
      },
    ],
    note: 'The most directly useful for Legible\'s NL-to-SQL use case are #1 (timescale/pg-aiguide) and #3 (mastering-postgresql) — both cover the kind of schema-aware query generation and indexing patterns that Legible relies on under the hood.',
  },
  mysql: {
    sections: [
      {
        heading: 'Dedicated MySQL Claude Skills',
        items: [
          { num: 1, title: 'planetscale/database-skills — mysql', url: 'https://github.com/planetscale/database-skills/tree/main/skills/mysql', desc: 'The standout official MySQL skill. From the PlanetScale team, covering MySQL/InnoDB schema design, indexing, query tuning, transactions, and operations. Use when creating or modifying MySQL tables, diagnose slow or locking behaviour, planning migrations, or troubleshooting replication and connection issues.', install: 'npx skills add https://github.com/planetscale/database-skills --skill mysql' },
          { num: 2, title: 'agentskills.so — MySQL skill card', url: 'https://agentskills.so/skills/planetscale-database-skills-mysql', desc: 'The cleanest standalone reference for the PlanetScale MySQL skill. Covers workload and constraint analysis, InnoDB-specific guidance (narrow monotonic PKs over UUIDs, EXPLAIN with FORMAT=TREE or JSON), and production-safe rollout steps with rollback verification.' },
          { num: 3, title: 'database-skills.preview.planetscale.com', url: 'https://database-skills.preview.planetscale.com/', desc: 'PlanetScale\'s dedicated skills microsite. Houses SKILL.md files and reference docs for MySQL, Postgres, Vitess, and Neki in a clean structure — each skill has its own SKILL.md and references/ folder. Compatible with Claude Code, Cursor, Codex, AMP, OpenCode, and Antigravity.' },
          { num: 4, title: 'lobehub.com — MySQL skill', url: 'https://lobehub.com/skills/planetscale-database-skills-mysql', desc: 'A marketplace mirror of the MySQL skill with a handy quick-reference card. Covers partitioning strategy for large tables (>50M rows), EXPLAIN red flags, cursor pagination over OFFSET, and transaction isolation levels — READ COMMITTED for high contention, retry logic for deadlock error 1213.' },
          { num: 5, title: 'planetscale/database-skills — vitess', url: 'https://agentskills.so/skills/planetscale-database-skills-vitess', desc: 'The Vitess companion skill, directly relevant for MySQL at scale. Covers Vitess\'s MySQL-compatible layer: VSchema, sharding, cross-shard join limitations, and what MySQL syntax Vitess does and doesn\'t support (stored procedures and LOCK TABLES not supported through VTGate; CTEs and window functions work fine).' },
          { num: 6, title: 'BehiSecc/awesome-claude-skills — mysql', url: 'https://github.com/BehiSecc/awesome-claude-skills', desc: 'Community list that includes a dedicated MySQL skill. Lists a mysql skill for safe read-only SQL queries against MySQL databases, alongside its PostgreSQL counterpart — useful as a lightweight, security-conscious query skill without the full PlanetScale schema guidance.' },
        ],
      },
      {
        heading: 'Multi-Database Skills with Strong MySQL Coverage',
        items: [
          { num: 7, title: 'claudeskills.club — database-design', url: 'https://claudeskills.club/skills/database-design-by-skillcreatorai', desc: 'A 327-star skill covering schema design, query optimisation, and migration patterns for PostgreSQL, MySQL, and NoSQL. Includes B-tree, GIN, and composite index guidance, EXPLAIN ANALYZE analysis, and zero-downtime migration templates.' },
          { num: 8, title: 'rohitg00/awesome-claude-code-toolkit — database-admin', url: 'https://github.com/rohitg00/awesome-claude-code-toolkit/blob/main/agents/infrastructure/database-admin.md', desc: 'A comprehensive database admin agent covering MySQL specifically. Advises InnoDB engine exclusively (MyISAM has no place in modern MySQL), covers buffer pool sizing (70–80% of available RAM), covering indexes, pt-query-digest for slow query log analysis, and GTID-based replication for read replicas.' },
          { num: 9, title: 'skillsdirectory.com — sql-cli', url: 'https://www.skillsdirectory.com/skills/interstellar-code-sql-cli', desc: 'A token-efficient MySQL/PostgreSQL CLI skill using mycli and native CLI tools. Claims 87% token savings over alternatives, with commands for query execution, table listing (with row counts and index sizes), schema description, row counts with WHERE clauses, and CSV export.' },
        ],
      },
      {
        heading: 'Context & Discovery',
        items: [
          { num: 10, title: '10 Must-Have Skills for Claude in 2026', url: 'https://medium.com/@unicodeveloper/10-must-have-skills-for-claude-and-any-coding-agent-in-2026-b5451b013051', desc: 'The best practical guide to the PlanetScale MySQL skill in context. Explains how it teaches agents to design schemas using PlanetScale\'s foreign key and branching conventions, write index-correct queries, and use the pscale CLI for branch-based schema migrations.', author: 'Medium' },
        ],
      },
    ],
    note: 'The clear leader for MySQL is PlanetScale\'s official skill (#1–3) — it\'s well-maintained, officially published, and covers the exact schema-aware, index-conscious query generation that Legible depends on under the hood. The database-design skill (#7) is the best option if you want a single skill that covers MySQL, Postgres, and NoSQL together.',
  },
};

function ResourceCard({ item }) {
  return (
    <div className="sr-card" data-reveal>
      <div className="sr-card-num">{String(item.num).padStart(2, '0')}</div>
      <div className="sr-card-body">
        <h3 className="sr-card-title">
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            {item.title}
          </a>
          {item.via && <span className="sr-card-via">(via {item.via})</span>}
          {item.author && <span className="sr-card-via">— {item.author}</span>}
        </h3>
        <p className="sr-card-desc">{item.desc}</p>
        {item.install && (
          <code className="sr-card-install">{item.install}</code>
        )}
      </div>
    </div>
  );
}

export default function SkillsResources() {
  useHead({
    title: 'Skills Resources — Top 10 for Every Database — Legible',
    description: 'The best Claude skills, MCP servers, and learning resources for PostgreSQL, MySQL, BigQuery, Snowflake, ClickHouse, and every database Legible supports.',
    url: '/skills-resources',
  });

  const [activeDb, setActiveDb] = useState('postgresql');

  const resource = RESOURCES[activeDb];

  const availableDbs = DATABASES.filter(db => RESOURCES[db.key]);
  const comingSoonDbs = DATABASES.filter(db => !RESOURCES[db.key]);

  return (
    <div className="skills-resources">
      <div className="sr-hero" data-reveal>
        <p className="sr-eyebrow">Skills Resources</p>
        <h1 className="sr-title">
          Top 10 <span>Skills Resources</span><br />for every database
        </h1>
        <p className="sr-subtitle">
          Curated links to the best Claude skills, MCP servers, agent directories, and learning resources for each database Legible supports.
        </p>
      </div>

      <div className="sr-filters" data-reveal>
        {availableDbs.map(db => (
          <button
            key={db.key}
            className={`sr-filter-pill ${activeDb === db.key ? 'active' : ''}`}
            onClick={() => setActiveDb(db.key)}
          >
            <span className="sr-pill-icon">{db.icon}</span> {db.label}
          </button>
        ))}
        {comingSoonDbs.map(db => (
          <button
            key={db.key}
            className="sr-filter-pill disabled"
            disabled
            title="Coming soon"
          >
            <span className="sr-pill-icon">{db.icon}</span> {db.label}
          </button>
        ))}
      </div>

      {resource ? (
        <div className="sr-content">
          {resource.sections.map((section, i) => (
            <div key={i} className="sr-section">
              <h2 className="sr-section-heading" data-reveal>{section.heading}</h2>
              <div className="sr-list">
                {section.items.map(item => (
                  <ResourceCard key={item.num} item={item} />
                ))}
              </div>
            </div>
          ))}
          {resource.note && (
            <div className="sr-note" data-reveal>
              <strong>Note:</strong> {resource.note}
            </div>
          )}
        </div>
      ) : (
        <div className="sr-coming-soon" data-reveal>
          <p>Resources for this database are coming soon. Check back shortly!</p>
        </div>
      )}
    </div>
  );
}
