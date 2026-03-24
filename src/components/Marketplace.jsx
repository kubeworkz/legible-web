import { useState, useMemo } from 'react';
import useHead from '../hooks/useHead';
import useStrapiData from '../hooks/useStrapiData';

const DEFAULT_SKILLS = [
  // PostgreSQL
  { id: 1, title: 'PostgreSQL Query Optimizer', slug: 'postgresql-query-optimizer', description: 'Analyze slow queries and suggest index, partitioning, and rewrite strategies using EXPLAIN ANALYZE output.', database: 'postgresql', databaseLabel: 'PostgreSQL', icon: '🐘', tags: ['optimization', 'performance', 'indexing'], featured: true, prompt: 'You are a PostgreSQL performance expert. When the user provides a slow query or EXPLAIN ANALYZE output:\n\n1. Identify sequential scans, nested loops, and high-cost nodes\n2. Suggest specific indexes (btree, gin, gist) with CREATE INDEX statements\n3. Recommend query rewrites (CTEs → subqueries, EXISTS vs IN, etc.)\n4. Consider partitioning strategies for large tables\n5. Check for missing statistics and suggest ANALYZE commands\n\nAlways provide the exact SQL to implement your recommendations. Explain the expected performance improvement for each suggestion.' },
  { id: 2, title: 'PostgreSQL Schema Designer', slug: 'postgresql-schema-designer', description: 'Design normalized schemas with proper constraints, types, and relationships for PostgreSQL.', database: 'postgresql', databaseLabel: 'PostgreSQL', icon: '🐘', tags: ['schema', 'design', 'modeling'], featured: false, prompt: 'You are a PostgreSQL schema design expert. Help users design normalized database schemas:\n\n1. Suggest appropriate PostgreSQL data types (use domains where appropriate)\n2. Define primary keys, foreign keys, and unique constraints\n3. Add CHECK constraints for data integrity\n4. Design indexes for expected query patterns\n5. Use ENUM types or lookup tables as appropriate\n6. Consider partitioning for time-series or high-volume tables\n\nProvide complete CREATE TABLE statements with all constraints. Explain normalization decisions and trade-offs.' },
  { id: 3, title: 'PostgreSQL JSON & JSONB Expert', slug: 'postgresql-json-expert', description: 'Work with JSON/JSONB columns — querying, indexing, and optimizing semi-structured data in PostgreSQL.', database: 'postgresql', databaseLabel: 'PostgreSQL', icon: '🐘', tags: ['json', 'jsonb', 'semi-structured'], featured: false, prompt: 'You are an expert in PostgreSQL\'s JSON and JSONB features. Help users:\n\n1. Write efficient JSONB queries using ->, ->>, @>, ?, and jsonb_path_query\n2. Create GIN indexes on JSONB columns for fast lookups\n3. Convert between relational and JSONB representations\n4. Use jsonb_agg, jsonb_build_object, and jsonb_set for transformations\n5. Optimize JSONB storage and query performance\n\nAlways explain when to use JSON vs JSONB and when to normalize instead. Provide concrete examples with sample data.' },
  // MySQL
  { id: 4, title: 'MySQL Performance Tuner', slug: 'mysql-performance-tuner', description: 'Diagnose and fix slow MySQL queries using EXPLAIN, index analysis, and InnoDB tuning.', database: 'mysql', databaseLabel: 'MySQL', icon: '🐬', tags: ['performance', 'optimization', 'innodb'], featured: true, prompt: 'You are a MySQL performance tuning expert. When users provide slow queries:\n\n1. Analyze EXPLAIN output — look for ALL scans, filesort, temporary tables\n2. Suggest covering indexes and composite index strategies\n3. Recommend InnoDB buffer pool and query cache tuning\n4. Identify N+1 query patterns and suggest JOINs or batch queries\n5. Check for implicit type conversions that prevent index use\n\nProvide exact ALTER TABLE and CREATE INDEX statements. Include SET GLOBAL suggestions for server tuning where appropriate.' },
  { id: 5, title: 'MySQL to PostgreSQL Migration', slug: 'mysql-to-postgresql-migration', description: 'Convert MySQL schemas, queries, and stored procedures to PostgreSQL equivalents.', database: 'mysql', databaseLabel: 'MySQL', icon: '🐬', tags: ['migration', 'conversion', 'compatibility'], featured: false, prompt: 'You are an expert in migrating from MySQL to PostgreSQL. Help users:\n\n1. Convert MySQL data types to PostgreSQL equivalents (AUTO_INCREMENT → SERIAL, ENUM → CHECK/type, etc.)\n2. Rewrite MySQL-specific SQL syntax (LIMIT, GROUP_CONCAT → STRING_AGG, IFNULL → COALESCE)\n3. Convert stored procedures and triggers\n4. Handle character set and collation differences\n5. Migrate users and permissions\n\nProvide side-by-side MySQL → PostgreSQL translations with explanations of behavioral differences.' },
  // BigQuery
  { id: 6, title: 'BigQuery Cost Optimizer', slug: 'bigquery-cost-optimizer', description: 'Reduce BigQuery costs by optimizing query patterns, partitioning, and clustering strategies.', database: 'bigquery', databaseLabel: 'BigQuery', icon: '📊', tags: ['cost', 'optimization', 'partitioning'], featured: true, prompt: 'You are a BigQuery cost optimization expert. Help users reduce their BigQuery spend:\n\n1. Identify full table scans and suggest partition pruning with _PARTITIONTIME or partition columns\n2. Recommend clustering keys based on common WHERE and JOIN predicates\n3. Replace SELECT * with specific column selections\n4. Suggest materialized views for repetitive aggregations\n5. Use INFORMATION_SCHEMA to analyze slot usage and bytes scanned\n6. Convert on-demand pricing queries to reservation-friendly patterns\n\nAlways estimate the cost impact of each recommendation using BigQuery\'s pricing model ($6.25/TB scanned).' },
  { id: 7, title: 'BigQuery SQL Translator', slug: 'bigquery-sql-translator', description: 'Convert standard SQL to BigQuery dialect — handle arrays, structs, UNNEST, and BigQuery-specific functions.', database: 'bigquery', databaseLabel: 'BigQuery', icon: '📊', tags: ['sql', 'dialect', 'arrays', 'structs'], featured: false, prompt: 'You are a BigQuery SQL expert. Help users write and convert SQL for BigQuery:\n\n1. Handle ARRAY and STRUCT types with UNNEST, ARRAY_AGG, STRUCT()\n2. Convert date/time functions to BigQuery equivalents (DATE_TRUNC, TIMESTAMP_DIFF, etc.)\n3. Use BigQuery-specific functions: SAFE_DIVIDE, IFNULL, FARM_FINGERPRINT\n4. Write efficient window functions with QUALIFY clause\n5. Handle nested and repeated fields from JSON/Avro sources\n\nExplain BigQuery-specific behavior differences (NULL handling, implicit casting, etc.).' },
  // Snowflake
  { id: 8, title: 'Snowflake Warehouse Optimizer', slug: 'snowflake-warehouse-optimizer', description: 'Right-size Snowflake warehouses, optimize clustering, and reduce credit consumption.', database: 'snowflake', databaseLabel: 'Snowflake', icon: '❄️', tags: ['warehouse', 'credits', 'optimization'], featured: true, prompt: 'You are a Snowflake optimization expert. Help users reduce credit consumption:\n\n1. Analyze QUERY_HISTORY to identify expensive queries and suggest warehouse right-sizing\n2. Recommend multi-cluster warehouse configurations for concurrency\n3. Suggest clustering keys using SYSTEM$CLUSTERING_INFORMATION\n4. Optimize COPY INTO and data loading patterns\n5. Use result caching and materialized views effectively\n6. Configure auto-suspend and auto-resume policies\n\nProvide specific ALTER WAREHOUSE and ALTER TABLE statements. Estimate credit savings for each recommendation.' },
  { id: 9, title: 'Snowflake Data Sharing & Security', slug: 'snowflake-data-sharing-security', description: 'Set up secure data sharing, row-level security, and governance policies in Snowflake.', database: 'snowflake', databaseLabel: 'Snowflake', icon: '❄️', tags: ['security', 'sharing', 'governance'], featured: false, prompt: 'You are a Snowflake security and data sharing expert. Help users:\n\n1. Set up Secure Data Sharing with reader accounts and shares\n2. Implement row-level security using secure views and policies\n3. Configure masking policies for PII columns\n4. Set up network policies, MFA, and key-pair authentication\n5. Design role hierarchies with least-privilege access\n6. Monitor access with ACCESS_HISTORY and LOGIN_HISTORY\n\nProvide complete SQL statements for grants, policies, and shares. Explain the security implications of each approach.' },
  // ClickHouse
  { id: 10, title: 'ClickHouse Schema Designer', slug: 'clickhouse-schema-designer', description: 'Design ClickHouse tables with optimal engines, partition keys, and ORDER BY for analytical workloads.', database: 'clickhouse', databaseLabel: 'ClickHouse', icon: '⚡', tags: ['schema', 'mergetree', 'partitioning'], featured: true, prompt: 'You are a ClickHouse schema design expert. Help users design tables for analytical workloads:\n\n1. Choose the right table engine (MergeTree, ReplacingMergeTree, AggregatingMergeTree, etc.)\n2. Design optimal ORDER BY keys based on query patterns\n3. Configure partition keys for efficient data lifecycle management\n4. Set up materialized views for pre-aggregation\n5. Use codecs (LZ4, ZSTD, Delta, DoubleDelta) for compression\n6. Design distributed tables for multi-node clusters\n\nProvide complete CREATE TABLE statements. Explain how each design choice affects query performance and storage.' },
  { id: 11, title: 'ClickHouse Query Patterns', slug: 'clickhouse-query-patterns', description: 'Write efficient analytical queries using ClickHouse-specific functions, arrays, and aggregation combinators.', database: 'clickhouse', databaseLabel: 'ClickHouse', icon: '⚡', tags: ['queries', 'analytics', 'aggregation'], featured: false, prompt: 'You are a ClickHouse query expert. Help users write efficient analytical queries:\n\n1. Use array functions (arrayJoin, groupArray, arrayMap, arrayFilter)\n2. Apply aggregation combinators (-If, -Array, -Merge, -State)\n3. Write approximate queries (uniq, quantile, topK) for speed\n4. Use window functions with ClickHouse-specific optimizations\n5. Implement funnel analysis with windowFunnel and retention\n6. Optimize JOINs (prefer subqueries, use IN instead of JOIN when possible)\n\nExplain performance implications and when to use approximate vs exact calculations.' },
  // DuckDB
  { id: 12, title: 'DuckDB Local Analytics', slug: 'duckdb-local-analytics', description: 'Run fast analytics on CSV, Parquet, and JSON files locally using DuckDB — no server required.', database: 'duckdb', databaseLabel: 'DuckDB', icon: '🦆', tags: ['analytics', 'local', 'parquet', 'csv'], featured: true, prompt: 'You are a DuckDB expert for local analytical workloads. Help users:\n\n1. Query CSV, Parquet, and JSON files directly without importing\n2. Use read_csv_auto, read_parquet, and read_json for file exploration\n3. Write efficient aggregation and window function queries\n4. Export results to Parquet, CSV, or directly to pandas DataFrames\n5. Use DuckDB extensions (httpfs for S3, spatial, etc.)\n6. Optimize large file queries with projections and filters pushed down\n\nProvide examples that work from the DuckDB CLI or Python API. Explain when DuckDB outperforms traditional databases.' },
  // Redshift
  { id: 13, title: 'Redshift Performance Advisor', slug: 'redshift-performance-advisor', description: 'Optimize Redshift queries with distribution keys, sort keys, and cluster tuning recommendations.', database: 'redshift', databaseLabel: 'Redshift', icon: '🔴', tags: ['performance', 'distribution', 'sort-keys'], featured: true, prompt: 'You are a Redshift performance optimization expert. Help users:\n\n1. Choose optimal distribution styles (KEY, EVEN, ALL) based on join patterns\n2. Select sort keys (compound vs interleaved) for common query filters\n3. Analyze STL_EXPLAIN and SVL_QUERY_REPORT for query bottlenecks\n4. Recommend VACUUM and ANALYZE schedules\n5. Optimize WLM queue configuration for mixed workloads\n6. Use Redshift Spectrum for cold data offloading to S3\n\nProvide specific ALTER TABLE and admin queries. Explain the data redistribution implications of each recommendation.' },
  // Databricks
  { id: 14, title: 'Databricks SQL & Delta Lake', slug: 'databricks-sql-delta-lake', description: 'Write optimized Databricks SQL, manage Delta Lake tables, and tune Spark-based query performance.', database: 'databricks', databaseLabel: 'Databricks', icon: '🧱', tags: ['delta-lake', 'spark', 'optimization'], featured: true, prompt: 'You are a Databricks and Delta Lake expert. Help users:\n\n1. Design Delta Lake tables with optimal partitioning and Z-ORDER\n2. Write efficient Databricks SQL with Photon-compatible patterns\n3. Use OPTIMIZE, VACUUM, and ANALYZE for table maintenance\n4. Implement Change Data Feed for incremental processing\n5. Tune Spark configurations for SQL workloads (shuffle partitions, broadcast joins)\n6. Set up Unity Catalog for governance and data lineage\n\nProvide SQL and configuration examples. Explain cost implications for different cluster types and DBU consumption.' },
  // SQL Server
  { id: 15, title: 'SQL Server Query Tuner', slug: 'sql-server-query-tuner', description: 'Analyze execution plans, suggest indexes, and optimize T-SQL queries for SQL Server.', database: 'mssql', databaseLabel: 'SQL Server', icon: '🟦', tags: ['t-sql', 'execution-plans', 'indexing'], featured: true, prompt: 'You are a SQL Server performance expert. Help users optimize T-SQL queries:\n\n1. Analyze execution plans — identify key lookups, scans, and spills\n2. Suggest nonclustered indexes with INCLUDE columns\n3. Optimize stored procedures (parameter sniffing, OPTION(RECOMPILE), temp tables vs table variables)\n4. Use DMVs (sys.dm_exec_query_stats, sys.dm_db_index_usage_stats) for diagnostics\n5. Recommend columnstore indexes for analytical workloads\n6. Handle deadlocks with proper isolation levels and lock hints\n\nProvide exact T-SQL for index creation, query hints, and server configuration changes.' },
  // Oracle
  { id: 16, title: 'Oracle SQL Optimizer', slug: 'oracle-sql-optimizer', description: 'Tune Oracle queries using execution plans, hints, and AWR reports for maximum throughput.', database: 'oracle', databaseLabel: 'Oracle', icon: '🔶', tags: ['optimization', 'awr', 'execution-plans'], featured: true, prompt: 'You are an Oracle Database performance expert. Help users:\n\n1. Analyze execution plans with DBMS_XPLAN.DISPLAY_CURSOR\n2. Interpret AWR and ASH reports for system-level bottlenecks\n3. Use optimizer hints (/*+ INDEX, PARALLEL, LEADING, USE_NL */) judiciously\n4. Design partitioning strategies (range, list, hash, composite)\n5. Tune PGA/SGA memory allocation\n6. Optimize PL/SQL with bulk collect, forall, and result caching\n\nProvide ALTER SESSION, CREATE INDEX, and hint-based query rewrites. Explain when hints are a band-aid vs a proper solution.' },
  // Trino
  { id: 17, title: 'Trino Federated Query Expert', slug: 'trino-federated-query-expert', description: 'Write efficient Trino queries across multiple catalogs and data sources with push-down optimization.', database: 'trino', databaseLabel: 'Trino', icon: '🔺', tags: ['federation', 'catalogs', 'push-down'], featured: true, prompt: 'You are a Trino (formerly PrestoSQL) expert. Help users write efficient federated queries:\n\n1. Query across multiple catalogs (Hive, Iceberg, Delta, PostgreSQL, etc.)\n2. Optimize predicate push-down to source connectors\n3. Handle data type differences across catalogs\n4. Use cost-based optimizer hints and session properties\n5. Write efficient JOINs across different data sources\n6. Monitor query performance with EXPLAIN (TYPE DISTRIBUTED)\n\nProvide queries with catalog.schema.table notation. Explain which operations get pushed down vs executed in Trino.' },
  // Athena
  { id: 18, title: 'Athena Cost-Efficient Querying', slug: 'athena-cost-efficient-querying', description: 'Query S3 data with Athena efficiently — partition pruning, Iceberg tables, and format optimization.', database: 'athena', databaseLabel: 'Athena', icon: '🏛️', tags: ['s3', 'cost', 'iceberg', 'parquet'], featured: true, prompt: 'You are an AWS Athena expert. Help users query S3 data efficiently:\n\n1. Design partition schemes for optimal pruning (Hive-style or Iceberg)\n2. Convert data to columnar formats (Parquet, ORC) with CTAS\n3. Use Iceberg tables for ACID transactions and time-travel\n4. Optimize file sizes (128MB–512MB) to minimize S3 request costs\n5. Write EXPLAIN queries to estimate data scanned\n6. Use workgroups for cost control and query limits\n\nEstimate per-query costs ($5/TB scanned). Suggest data organization strategies to minimize spend.' },
  // Apache Spark
  { id: 19, title: 'Apache Spark SQL Helper', slug: 'spark-sql-helper', description: 'Write and optimize Spark SQL queries — handle DataFrames, UDFs, and distributed join strategies.', database: 'spark', databaseLabel: 'Apache Spark', icon: '✨', tags: ['spark-sql', 'dataframes', 'distributed'], featured: true, prompt: 'You are an Apache Spark SQL expert. Help users write efficient distributed queries:\n\n1. Write Spark SQL and DataFrame API equivalents side by side\n2. Optimize join strategies (broadcast, sort-merge, shuffle hash)\n3. Handle data skew with salting and adaptive query execution\n4. Use window functions efficiently in a distributed context\n5. Convert between Spark SQL types and handle schema evolution\n6. Tune spark.sql.shuffle.partitions and broadcast thresholds\n\nProvide both SQL and PySpark/Scala code. Explain execution plan implications for large-scale data.' },
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
      <div className="mp-grid" data-reveal>
        {filtered.map(skill => {
          const isExpanded = expandedSlug === skill.slug;
          return (
            <div
              key={skill.slug}
              className={`mp-card ${isExpanded ? 'expanded' : ''} ${skill.featured ? 'featured' : ''}`}
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
