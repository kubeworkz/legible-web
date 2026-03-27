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
  bigquery: {
    sections: [
      {
        heading: 'Dedicated BigQuery & ETL Skills',
        items: [
          { num: 1, title: 'mozilla/bigquery-etl-skills', url: 'https://github.com/mozilla/bigquery-etl-skills', desc: 'The most directly BigQuery-specific skill in the ecosystem. A comprehensive Claude Code plugin built for Mozilla\'s bigquery-etl repository, providing specialised skills for writing BigQuery SQL queries, generating unit tests, managing metadata and schemas, configuring data quality monitoring, and gathering requirements — plus autonomous agents that coordinate multiple skills to build complete end-to-end BigQuery workflows.' },
          { num: 2, title: 'Anthropic Skill Authoring Docs — BigQuery example', url: 'https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices', desc: 'The official Anthropic best-practices guide uses BigQuery as its primary worked example throughout. Demonstrates how to ask Claude to capture a BigQuery analysis pattern into a SKILL.md, and shows the recommended folder structure for a bigquery-skill with domain-split reference files (finance.md, sales.md, product.md) so Claude loads only the schemas relevant to each query, keeping token usage minimal.' },
          { num: 3, title: 'astronomer/agents', url: 'https://github.com/astronomer/agents', desc: 'Astronomer\'s data engineering plugin with first-class BigQuery support. Includes a BigQuery connection type (type: bigquery) supporting GCP project, credentials path, location, and label configuration, alongside an analyzing-data skill that runs queries against any connected warehouse including BigQuery via a background Jupyter kernel. Works with Claude Code, Cursor, and 25+ other agents.' },
          { num: 4, title: 'AltimateAI/altimate-code', url: 'https://github.com/AltimateAI/altimate-code', desc: 'Open-source agentic data engineering harness with BigQuery as a first-class supported warehouse. Covers BigQuery alongside 9 other warehouses with schema indexing, query execution, and metadata introspection. Includes SQL transpilation between BigQuery, Snowflake, Databricks, Redshift, PostgreSQL, and others, plus a data-viz skill that generates publication-ready visualisations from query results.' },
        ],
      },
      {
        heading: 'dbt Skills (the primary BigQuery query layer)',
        items: [
          { num: 5, title: 'dbt-labs/dbt-agent-skills', url: 'https://github.com/dbt-labs/dbt-agent-skills', desc: 'The official dbt Labs skills repo, and the de facto standard for BigQuery-backed dbt projects. Covers analytics engineering (building and modifying dbt models, writing tests, exploring data sources), semantic layer work with MetricFlow, platform operations, and migration from dbt Core to the Fusion engine. Since most BigQuery data teams run dbt on top of BQ, this is an essential companion skill.' },
          { num: 6, title: 'dbt-labs/dbt-core — Native agent skills discussion #12521', url: 'https://github.com/dbt-labs/dbt-core/discussions/12521', desc: 'The dbt Labs GitHub discussion on standardising agent skills. Contains a worked example of a BigQuery-adjacent list_fqn skill for querying dbt model fully-qualified names, and a detailed community discussion on how SKILL.md files should be structured for dbt projects, including how to compose skills across packages and handle namespace collisions.' },
          { num: 7, title: 'dbt-labs/dbt-agent-skills — evals', url: 'https://github.com/dbt-labs/dbt-agent-skills/tree/main/evals', desc: 'The testing framework for dbt agent skills, useful for validating BigQuery SQL quality. Provides a scenario-based eval harness with NDJSON output, HTML conversation viewers, and skill-set comparison reports — letting you A/B test skill variations and measure whether a BigQuery query skill actually improves output quality before deploying it.' },
          { num: 8, title: 'AltimateAI/data-engineering-skills', url: 'https://github.com/AltimateAI/data-engineering-skills', desc: 'Altimate\'s benchmarked data engineering skill collection. Claims 53% accuracy on ADE-bench (43 real-world dbt tasks) and 84% pass rate on Snowflake query optimisation — the structured approach including query profiling, anti-pattern detection, and semantic preservation validation applies directly to BigQuery SQL generation.' },
        ],
      },
      {
        heading: 'Broader Data Engineering Skills Covering BigQuery',
        items: [
          { num: 9, title: 'alirezarezvani/claude-skills — senior-data-engineer', url: 'https://github.com/alirezarezvani/claude-skills/blob/main/engineering-team/senior-data-engineer/SKILL.md', desc: 'A production-grade data engineering skill with explicit BigQuery support. Covers data pipeline design, ETL/ELT architecture, and decision trees for choosing between streaming (Kafka/Flink) and batch (dbt + warehouse compute including BigQuery) patterns based on data volume and latency requirements.' },
          { num: 10, title: 'treasure-data/td-skills', url: 'https://github.com/treasure-data/td-skills', desc: 'Treasure Data\'s official skill library, relevant for BigQuery-adjacent data warehouse patterns. A comprehensive multi-skill package covering SQL analytics, dbt transformations, real-time pipelines, and data visualisation — the SQL and dbt patterns translate directly to BigQuery workloads even though Treasure Data runs Trino/Hive natively.' },
        ],
      },
    ],
    note: 'The honest takeaway: the BigQuery-specific Claude skills ecosystem is less mature than Postgres or MySQL. Mozilla\'s bigquery-etl-skills (#1) and Anthropic\'s own docs (#2) are the most directly useful right now. For most BigQuery users in practice, dbt-labs/dbt-agent-skills (#5) is the real workhorse — BigQuery is just the warehouse underneath.',
  },
  snowflake: {
    sections: [
      {
        heading: 'Snowflake-Native: Cortex Code & Skills',
        items: [
          { num: 1, title: 'Snowflake Cortex Code — Product Page', url: 'https://www.snowflake.com/en/product/features/cortex-code/', desc: 'The most significant Snowflake-Claude integration in the ecosystem. Cortex Code is Snowflake\'s native AI coding agent, powered by Claude Opus 4.6 and Sonnet 4.5, with built-in support for Agent Skills using the open AGENTS.md framework. Skills can be built, shared, and refined, and existing Claude Code skill workflows can be migrated directly into Cortex Code.' },
          { num: 2, title: 'Snowflake Cortex Code CLI Extensibility Docs', url: 'https://docs.snowflake.com/en/user-guide/cortex-code/extensibility', desc: 'The official reference for writing Snowflake SKILL.md files. Covers the full SKILL.md frontmatter spec for Cortex Code, including how to declare snowflake_sql_execute and snowflake_object_search as allowed tools, how to resolve skill conflicts across local and global scope with /skill sync, and how to reference remote skills from Git repositories.' },
          { num: 3, title: 'tessl.io — snowflake-platform skill', url: 'https://tessl.io/registry/skills/github/jezweb/claude-skills/snowflake-platform', desc: 'A production-ready Snowflake platform skill in the Tessl registry. Covers building on Snowflake\'s AI Data Cloud with the snow CLI, Cortex AI SQL functions (COMPLETE, SUMMARIZE, AI_FILTER), Native Apps, Snowpark, and JWT authentication. Documents 11 common errors including Cortex throttling, account locator confusion, and memory leaks. Includes AI_FILTER optimisation patterns delivering up to 60% token reduction.' },
          { num: 4, title: 'kellykohlleffel/cortex-code-skills', url: 'https://medium.com/@kelly.kohlleffel/one-skill-two-ai-coding-assistants-snowflake-cortex-code-and-claude-code-92e0de8dfed2', desc: 'The best practical write-up on using a single SKILL.md across both Cortex Code and Claude Code simultaneously. Demonstrates a hub-and-spoke SKILL.md structure where a main file handles the shared workflow, with A2A REST specifics and troubleshooting loaded as separate reference files only when needed.', author: 'Medium' },
          { num: 5, title: 'Snowflake-Labs/mcp — Official Snowflake MCP Server', url: 'https://github.com/Snowflake-Labs/mcp', desc: 'Snowflake\'s official MCP server, the recommended companion to any Snowflake skill. Provides Claude Desktop and Claude Code with tooling for Cortex Search, Cortex Analyst, Cortex Agent orchestration, object management, SQL execution with configurable permissions, and Semantic View querying — making it the essential bridge between a Snowflake SKILL.md and live warehouse data.' },
        ],
      },
      {
        heading: 'Cortex Analyst: NL-to-SQL for Snowflake',
        items: [
          { num: 6, title: 'Snowflake Cortex Analyst Documentation', url: 'https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-analyst', desc: 'The canonical reference for Snowflake\'s own NL-to-SQL system — directly relevant to how Legible\'s architecture compares. Cortex Analyst is a fully managed agentic AI system for text-to-SQL using semantic models defined in lightweight YAML files. Supports multi-turn conversations, cross-region inference, and automatic data source selection when querying from multiple sources.' },
          { num: 7, title: 'Cortex Code in Snowsight Documentation', url: 'https://docs.snowflake.com/en/user-guide/cortex-code/cortex-code-snowsight', desc: 'Details on how Cortex Code\'s skill system works in the Snowsight web UI. Covers dbt model authoring, incremental fact model generation, test scaffolding, and documentation generation through Cortex Code skills — plus AGENTS.md support for persistent instructions that apply to every Cortex Code conversation in a workspace.' },
        ],
      },
      {
        heading: 'Data Engineering Skills with Snowflake Support',
        items: [
          { num: 8, title: 'AltimateAI/data-engineering-skills', url: 'https://github.com/AltimateAI/data-engineering-skills', desc: 'The benchmarked data engineering skills collection with dedicated Snowflake skills. Claims an 84% pass rate on Snowflake query optimisation across 62 TPC-H queries on a 1TB dataset, with a 3.6x improvement over baseline (16.8% average query performance improvement vs 4.7%).', install: '/plugin install snowflake-skills@data-engineering-skills' },
          { num: 9, title: 'astronomer/agents', url: 'https://github.com/astronomer/agents', desc: 'Astronomer\'s data engineering plugin, with Snowflake as a fully configured warehouse type. Supports Snowflake connections via private key authentication, warehouse selection, role assignment, and query tagging — with a /data:warehouse-init skill that generates schema metadata for faster queries and an analyzing-data skill for running SQL against any connected Snowflake warehouse.' },
        ],
      },
      {
        heading: 'Knowledge Graph & Advanced Patterns',
        items: [
          { num: 10, title: 'sfc-gh-tjia/knowledge-graph-snowflake', url: 'https://github.com/sfc-gh-tjia/knowledge-graph-snowflake', desc: 'A Snowflake reference implementation showing advanced Cortex Agent orchestration with NL-to-SQL. Routes natural language queries between Cortex Analyst (for direct SQL, 1–3 seconds) and custom NetworkX graph algorithms deployed via Snowpark Container Services (for complex graph traversal, 5–10 seconds), with an agent that automatically selects the optimal tool — demonstrating exactly the kind of schema-aware query routing Legible uses.' },
        ],
      },
    ],
    note: 'The standout story here is that Snowflake has essentially built their own Claude-powered SKILL.md ecosystem inside Cortex Code — making Snowflake the most deeply integrated database platform in the Claude skills world right now. For Legible specifically, links #6 (Cortex Analyst) and #10 (knowledge-graph-snowflake) are worth studying closely, as they represent Snowflake\'s own approach to the exact problem Legible solves.',
  },
  clickhouse: {
    sections: [
      {
        heading: 'The Official ClickHouse Skills — Start Here',
        items: [
          { num: 1, title: 'ClickHouse/agent-skills', url: 'https://github.com/ClickHouse/agent-skills', desc: 'The definitive source, published directly by the ClickHouse team. Provides agent skills for ClickHouse databases covering schema design, query optimisation, and data ingestion patterns. Contains 28 rules across 3 main categories, prioritised by impact, following the open specification at agentskills.io.' },
          { num: 2, title: 'ClickHouse/agent-skills — SKILL.md', url: 'https://github.com/ClickHouse/agent-skills/blob/main/skills/clickhouse-best-practices/SKILL.md', desc: 'The raw SKILL.md file itself, worth reading before installing. Contains 28 rules across 3 categories (schema, query, insert) with a structured review format — for each rule Claude checks compliance and reports violations with current state, required state, and specific fix instructions. Notes why rules take priority: ClickHouse has specific behaviours (columnar storage, sparse indexes, merge tree mechanics) where general database intuition can be misleading.' },
          { num: 3, title: 'ClickHouse/agent-skills — AGENTS.md', url: 'https://github.com/ClickHouse/agent-skills/blob/main/AGENTS.md', desc: 'The full AGENTS.md companion file — the complete compiled guide generated from the individual rule files. Shows the complete repository structure: the clickhouse-best-practices skill directory with its SKILL.md overview, generated AGENTS.md, metadata.json, and individual rule files. Also documents the build tooling — a TypeScript pipeline with a Markdown parser, SQL syntax validator, and internal link checker run in CI.' },
          { num: 4, title: 'ClickHouse/agent-skills — best-practices directory', url: 'https://github.com/ClickHouse/agent-skills/tree/main/skills/clickhouse-best-practices', desc: 'The skill directory itself, useful for browsing the individual rule files. The agent skill providing comprehensive ClickHouse guidance across schema design, query optimisation, and data ingestion — the three areas that matter most for an NL-to-SQL tool like Legible when targeting ClickHouse databases.' },
        ],
      },
      {
        heading: 'Community Skills with ClickHouse Coverage',
        items: [
          { num: 5, title: 'everything-claude-code — clickhouse-io skill', url: 'https://github.com/affaan-m/everything-claude-code/blob/main/skills/clickhouse-io.md', desc: 'A detailed community ClickHouse skill from the Anthropic hackathon winner. Covers ClickHouse\'s columnar OLAP architecture, MergeTree and ReplacingMergeTree table creation with partitioning and ORDER BY patterns, materialized views with sumState/countState aggregation combiners, streaming inserts, and slow query investigation via system.query_log. Includes concrete DDL templates for analytics and time-series tables.' },
          { num: 6, title: 'everything-claude-code — clickhouse-io directory', url: 'https://github.com/affaan-m/everything-claude-code/tree/main/skills/clickhouse-io', desc: 'The full skill directory in the everything-claude-code harness, which pairs the skill with additional scripts and references. Part of a battle-tested Claude Code configuration collection that won the Cerebral Valley x Anthropic hackathon, containing database reviewer agents, language-specific code reviewers, and harness optimisers alongside the ClickHouse skill.' },
        ],
      },
      {
        heading: 'Curated Directories Listing the Official Skill',
        items: [
          { num: 7, title: 'VoltAgent/awesome-agent-skills — ClickHouse entry', url: 'https://github.com/VoltAgent/awesome-agent-skills/blob/main/README.md', desc: 'The most authoritative community curation, which lists ClickHouse/agent-skills as an official vendor skill. Explicitly notes these are skills from actual development teams proven in real-world usage — the curation standard that distinguishes it from bulk-generated skill repositories.' },
        ],
      },
      {
        heading: 'ClickHouse Documentation as Skill Reference Material',
        items: [
          { num: 8, title: 'ClickHouse/clickhouse-docs — query-optimization guide', url: 'https://github.com/ClickHouse/clickhouse-docs/blob/main/docs/guides/best-practices/query-optimization.md', desc: 'The primary ClickHouse documentation on query optimisation — the source material that the official skills are based on. Covers the full query execution lifecycle (parse → optimise → pipeline → parallel read → merge), tools for identifying slow queries from query logs, and the critical advice to disable the filesystem cache during troubleshooting to avoid masking I/O bottlenecks.' },
          { num: 9, title: 'MergeTree engine deep dive — ClickHouse docs', url: 'https://github.com/richardartoul/ClickHouse-1/blob/master/docs/en/operations/table_engines/mergetree.md', desc: 'The canonical deep reference on MergeTree mechanics — essential reading for understanding why the official skill\'s schema rules exist. Details how ClickHouse uses sparse primary indexes, partition pruning, data skipping indexes (bloom filters, ngrambf_v1, tokenbf_v1), and multi-versioning for concurrent access.' },
        ],
      },
      {
        heading: 'Broader Data Engineering Context',
        items: [
          { num: 10, title: 'AltimateAI/altimate-code — ClickHouse support', url: 'https://github.com/AltimateAI/altimate-code', desc: 'The open-source data engineering harness that lists ClickHouse as a first-class supported warehouse alongside Snowflake, BigQuery, Postgres, and others. Covers SQL transpilation between ClickHouse and other major warehouses, schema indexing, query execution, and metadata introspection — relevant when Legible users are migrating queries between ClickHouse and other supported databases.' },
        ],
      },
    ],
    note: 'The story here is unambiguous: ClickHouse/agent-skills (#1–4) is the clear winner, and uniquely the best-engineered official database skill in the ecosystem. The 28 rules are individually versioned in separate files, validated against a SQL syntax checker in CI, and compiled into both a SKILL.md overview and a full AGENTS.md reference — a level of rigour that no other database vendor has matched yet.',
  },
  duckdb: {
    sections: [
      {
        heading: 'The Official DuckDB Skills — the Richest Database Skill Suite in the Ecosystem',
        items: [
          { num: 1, title: 'duckdb/duckdb-skills', url: 'https://github.com/duckdb/duckdb-skills', desc: 'The definitive source, published directly by the DuckDB team. A Claude Code plugin adding six distinct DuckDB-powered skills: attach-db (attach a database file with automatic schema exploration), query (run SQL or natural language against attached databases), read-file (read CSV, JSON, Parquet, Avro, Excel, and spatial files from local or remote storage), duckdb-docs (full-text search over DuckDB documentation), read-memories (search past Claude Code session logs), and install-duckdb (install or update the CLI and extensions). All skills share a single state.sql file so session state persists across skill calls.' },
          { num: 2, title: 'duckdb/duckdb-skills — query skill', url: 'https://github.com/duckdb/duckdb-skills', desc: 'The query skill deserves a specific callout. Accepts raw SQL or natural language questions, uses DuckDB\'s Friendly SQL dialect, automatically picks up session state from attach-db, and supports ad-hoc queries directly against files — e.g. FROM \'exports.csv\' WHERE amount > 100 without any setup step. Offloads large result sets to a temporary DuckDB file for interactive drill-down.' },
          { num: 3, title: 'duckdb/duckdb-skills — read-file skill', url: 'https://github.com/duckdb/duckdb-skills', desc: 'The read-file skill is uniquely powerful for a Legible-style tool. Reads any data file — CSV, JSON, Parquet, Avro, Excel, spatial — locally or from remote storage including S3, GCS, Azure, and HTTPS. Auto-detects format by file extension using a built-in read_any table macro and suggests follow-up queries for further exploration.' },
        ],
      },
      {
        heading: 'Curated Directories — Official DuckDB Skills Listed',
        items: [
          { num: 4, title: 'VoltAgent/awesome-agent-skills — DuckDB entries', url: 'https://github.com/VoltAgent/awesome-agent-skills/blob/main/README.md', desc: 'The most authoritative community curation, listing all six official DuckDB skills individually. Lists duckdb/attach-db, duckdb/query, duckdb/read-file, duckdb/duckdb-docs, duckdb/read-memories, and duckdb/install-duckdb as official vendor skills from the DuckDB team — one of very few databases to have all individual skill variants catalogued separately.' },
        ],
      },
      {
        heading: 'Community DuckDB Skills',
        items: [
          { num: 5, title: 'openclaw/skills — duckdb-cli-ai-skills', url: 'https://github.com/openclaw/skills/blob/main/skills/camelsprout/duckdb-cli-ai-skills/SKILL.md', desc: 'A community CLI-focused DuckDB skill from the OpenClaw skills archive. Covers DuckDB CLI data analysis workflows including reading CSV, Parquet, and JSON files with glob patterns, cross-file joins, filtering and export pipelines, and all CLI dot-commands for schema inspection, output formatting, and session control.' },
          { num: 6, title: 'mz462/run-skill — DuckDB + MotherDuck', url: 'https://github.com/mz462/run-skill', desc: 'A production SKILL.md using DuckDB as a local analytics backend with MotherDuck cloud sync. Demonstrates a real-world pattern of using DuckDB for local data storage and analysis, with MotherDuck integration for multi-device access via Claude Desktop MCP. Covers GPX/FIT file parsing, schema design for time-series workout data, and the DuckDB ↔ MotherDuck migration pattern.' },
        ],
      },
      {
        heading: 'DuckDB Ecosystem — Essential Companion Repos',
        items: [
          { num: 7, title: 'astronomer/agents — DuckDB as SQLAlchemy warehouse', url: 'https://github.com/astronomer/agents', desc: 'Astronomer\'s data engineering plugin supports DuckDB as a first-class warehouse via SQLAlchemy. Configures DuckDB with a type: sqlalchemy connection using a duckdb:///path/to/analytics.duckdb URL — enabling the same analyzing-data skill that works against BigQuery and Snowflake to also work against local DuckDB files, making it ideal for dev and testing workflows.' },
          { num: 8, title: 'duckdb/dbt-duckdb', url: 'https://github.com/duckdb/dbt-duckdb', desc: 'The official dbt adapter for DuckDB. Supports in-memory pipelines (no persistence, ideal for CI testing), file-backed databases, external CSV/JSON/Parquet file querying without loading, S3/GCS/Azure filesystem integrations via fsspec, and an interactive shell that launches the DuckDB UI alongside dbt commands. As of v1.9.3 includes an integrated CLI environment for developing and querying simultaneously.' },
        ],
      },
      {
        heading: 'Reference & Context',
        items: [
          { num: 9, title: 'duckdb/duckdb — main repository', url: 'https://github.com/duckdb/duckdb', desc: 'The canonical reference for DuckDB\'s SQL capabilities that underpin all skills. DuckDB supports a rich SQL dialect including arbitrary nested correlated subqueries, window functions, collations, complex types (arrays, structs, maps), and FROM-first Friendly SQL — the key syntactic differences a NL-to-SQL tool like Legible must understand when generating DuckDB-targeted queries versus standard SQL.' },
          { num: 10, title: 'duckdb/duckdb-sqlite', url: 'https://github.com/duckdb/duckdb-sqlite', desc: 'The DuckDB SQLite extension, relevant for Legible\'s multi-database connector context. Allows DuckDB to directly read and write SQLite databases via ATTACH, enabling cross-database queries, SQLite-to-Parquet export, and Parquet-to-SQLite import with standard SQL — a useful reference for the kind of cross-connector query patterns Legible needs to understand.' },
        ],
      },
    ],
    note: 'DuckDB has the most thoughtfully engineered official skills suite of all databases covered. The six-skill plugin is genuinely production-quality, with shared session state, natural language query support, documentation search, and multi-format file reading all working together as a coherent system. All skills share the same state.sql — a level of cross-skill state management no other database vendor has matched.',
  },
  redshift: {
    sections: [
      {
        heading: 'The Closest Things to a Dedicated Redshift Skill',
        items: [
          { num: 1, title: 'astronomer/agents — Redshift via SQLAlchemy', url: 'https://github.com/astronomer/agents', desc: 'The most direct Redshift integration in the skills ecosystem today. Supports Redshift as a first-class warehouse type using redshift+redshift_connector via SQLAlchemy, with the same analyzing-data and warehouse-init skills that work against BigQuery, Snowflake, PostgreSQL, and DuckDB — no separate skill needed, just a connection string in the config.' },
          { num: 2, title: 'AltimateAI/altimate-code — Redshift support', url: 'https://github.com/AltimateAI/altimate-code', desc: 'The open-source agentic data engineering harness listing Redshift as a first-class target. Covers SQL transpilation between Redshift, BigQuery, Snowflake, Databricks, PostgreSQL, MySQL, SQL Server, and DuckDB — essential when Legible users are working across mixed-warehouse environments. Built-in skills for dbt, medallion patterns, and data visualisation apply directly to Redshift workloads.' },
          { num: 3, title: 'everything-claude-code — database-reviewer agent', url: 'https://github.com/affaan-m/everything-claude-code', desc: 'The everything-claude-code harness includes a database-reviewer agent and skills covering SQL patterns applicable to Redshift. Battle-tested Claude Code configuration that won the Cerebral Valley x Anthropic hackathon, with database reviewer agents designed for production use — the PostgreSQL patterns in the reviewer apply directly to Redshift given its PostgreSQL-compatible wire protocol.' },
        ],
      },
      {
        heading: 'The Right Starting Point for Building a Redshift Skill Yourself',
        items: [
          { num: 4, title: 'Anthropic skill authoring best practices', url: 'https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices', desc: 'Anthropic\'s official guide uses a domain-split reference file structure directly applicable to Redshift. The recommended layout (finance.md, sales.md, product.md reference files loaded on demand) is the correct pattern for a Redshift SKILL.md covering schema design, distribution keys, sort keys, and WLM configuration across different domains.' },
          { num: 5, title: 'supabase/agent-skills — postgres-best-practices', url: 'https://github.com/supabase/agent-skills', desc: 'The best proxy for Redshift given its PostgreSQL heritage. Postgres performance optimisation guidelines across 8 categories prioritised by impact. Since Redshift speaks PostgreSQL\'s wire protocol and shares significant SQL syntax, this skill is the closest available reference for NL-to-SQL generation targeting Redshift.' },
        ],
      },
      {
        heading: 'Essential Redshift Reference Documentation',
        items: [
          { num: 6, title: 'AWS Redshift — Factors affecting query performance', url: 'https://docs.aws.amazon.com/redshift/latest/dg/c-query-performance.html', desc: 'The canonical AWS documentation on Redshift query performance, covering the unique mechanics any Redshift SKILL.md must encode. Covers data distribution across compute nodes, sort key zone map filtering, dataset size effects, and Redshift\'s composition-based code compilation that generates lightweight query-specific code immediately while compiling optimised versions in the background.' },
          { num: 7, title: 'AWS Big Data Blog — Automatic table optimisation', url: 'https://aws.amazon.com/blogs/big-data/automate-your-amazon-redshift-performance-tuning-with-automatic-table-optimization/', desc: 'The authoritative explanation of Redshift\'s ATO feature. Explains how DISTSTYLE (EVEN vs KEY vs ALL), DISTKEY, and SORTKEY work, and how ATO uses AI algorithms to monitor workload observations and implement keys online without interrupting queries — achieving up to 24% performance improvement on a 30TB TPC-H benchmark with no manual tuning.' },
          { num: 8, title: 'AWS Redshift — Bedrock + Claude integration', url: 'https://aws.amazon.com/redshift/features/', desc: 'Directly relevant to Legible\'s positioning. Amazon Redshift integrates with Amazon Bedrock, enabling direct invocation of Anthropic Claude and Amazon Titan foundation models through standard SQL commands for text analysis, translation, and sentiment detection — meaning Redshift customers can already run Claude-powered NL queries natively.' },
          { num: 9, title: 'Optimise Redshift distribution and sort keys', url: 'https://oneuptime.com/blog/post/2026-02-12-optimize-redshift-distribution-and-sort-keys/view', desc: 'The clearest practical reference for key Redshift-specific concepts a SKILL.md would need to encode. Covers choosing DISTKEY to minimise data movement during joins, compound vs interleaved sort keys, zone map filtering, monitoring with svl_query_summary for DS_BCAST and DS_DIST redistribution steps, and the importance of regular VACUUM to maintain sort key effectiveness.', author: 'OneUptime' },
          { num: 10, title: 'dbt-labs/dbt-agent-skills', url: 'https://github.com/dbt-labs/dbt-agent-skills', desc: 'The practical workhorse for most Redshift data teams, since dbt on Redshift is the dominant production pattern. Covers building and modifying dbt models, writing tests, exploring data sources, semantic layer work with MetricFlow, and platform operations — all of which apply directly to dbt-on-Redshift deployments, which represent the majority of enterprise Redshift usage.' },
        ],
      },
    ],
    note: 'Redshift is the only major database in this series without a dedicated official skills repository. This is actually a gap worth noting — if you\'re building NL-to-SQL for Redshift users, there\'s an opportunity to publish the first production-quality Redshift SKILL.md, which would be a genuinely useful community contribution.',
  },
  databricks: {
    sections: [
      {
        heading: 'The Official Databricks Skills Ecosystem — Three Separate Repos',
        items: [
          { num: 1, title: 'databricks/databricks-agent-skills', url: 'https://github.com/databricks/databricks-agent-skills', desc: 'The primary official repo from Databricks Inc. Provides Databricks-specific guidance for Claude Code, Cursor, and other AI coding assistants, with skills installed to ~/.claude/skills/ for Claude Code. Uses a hub-and-spoke subskill pattern — a base skill handles foundational guidance while subskills extend it with specific variations, keeping each context-load focused. All release tags are GPG-signed and changes require code owner approval.' },
          { num: 2, title: 'databricks-solutions/ai-dev-kit', url: 'https://github.com/databricks-solutions/ai-dev-kit', desc: 'The Databricks Field Engineering AI dev toolkit, the most comprehensive of the three official repos. Gives Claude Code, Cursor, Antigravity, and Windsurf the trusted sources needed to build on Databricks, covering Spark Declarative Pipelines (streaming tables, CDC, SCD Type 2, Auto Loader), Databricks Jobs, and AI/BI Dashboards. A one-line install script auto-detects the agent and installs skills to the right location.' },
          { num: 3, title: 'ai-dev-kit — agent-bricks skill', url: 'https://github.com/databricks-solutions/ai-dev-kit/tree/main/databricks-skills/agent-bricks', desc: 'The most Legible-relevant skill in the entire Databricks ecosystem. Covers building conversational AI applications on Databricks using three Agent Brick types: Knowledge Assistants for RAG-based document Q&A, Genie Spaces for natural language to SQL exploration, and Multi-Agent Supervisors for routing queries across multiple specialised agents — exactly the NL-to-SQL architecture Legible is built around.' },
          { num: 4, title: 'hiydavid/databricks-agent-skills', url: 'https://github.com/hiydavid/databricks-agent-skills', desc: 'A community practitioner repo from a Databricks engineer, with a particularly well-designed skill management system. Includes improve-genie-space, multi-agent-architecture, and parse-documents skills with a manage-skills.sh CLI for listing, adding, removing, and checking skill status across projects.' },
        ],
      },
      {
        heading: 'The Best Real-World Databricks + Claude Walkthrough',
        items: [
          { num: 5, title: 'Specializing Claude Code on Databricks', url: 'https://medium.com/@hiydavid/specializing-claude-code-a-quick-guide-to-agent-skills-and-mcp-on-databricks-c0cfdd43637d', desc: 'The most practical end-to-end write-up in the Databricks skills ecosystem. Walks through building a financial analysis helper using Claude Code with Databricks MCP servers — a financial-analysis skill covering profitability, liquidity, leverage, and valuation analysis, plus a data-querying skill that instructs Claude how to use the Databricks Managed MCP server to send LLM-generated SQL to DBSQL.', author: 'Medium' },
        ],
      },
      {
        heading: 'The MCP Companion — Essential for Databricks + Claude SQL',
        items: [
          { num: 6, title: 'RafaelCartenet/mcp-databricks-server', url: 'https://github.com/RafaelCartenet/mcp-databricks-server', desc: 'The most thorough community MCP server for Databricks, designed specifically to enable schema-aware SQL generation. Equips LLM agents with tools to explore Unity Catalog (catalogs, schemas, tables, columns, data types, partitioning), analyse column-level and notebook/job lineage, and execute SQL queries via the Databricks SDK — directly mirroring Legible\'s schema-awareness approach.' },
        ],
      },
      {
        heading: 'dbt on Databricks — The Dominant Production Pattern',
        items: [
          { num: 7, title: 'databricks/dbt-databricks — AGENTS.md', url: 'https://github.com/databricks/dbt-databricks/blob/main/AGENTS.md', desc: 'The official dbt adapter for Databricks ships with its own AGENTS.md, making it one of the few adapters with built-in agent guidance. Documents Unity Catalog support, Delta Lake as the default table format, Python model execution, streaming tables, and the three-level namespace (catalog/schema/relations). Covers macro naming conventions and ANSI mode implications.' },
          { num: 8, title: 'databricks/dbt-databricks', url: 'https://github.com/databricks/dbt-databricks', desc: 'The official dbt adapter repository itself, essential context for understanding Databricks SQL generation. Uses Delta Lake by default with MERGE as the default incremental materialisation strategy, supports the three-level Unity Catalog namespace, and generates SQL automatically accelerated by the Photon vectorised execution engine.' },
        ],
      },
      {
        heading: 'Multi-Agent Architecture Reference',
        items: [
          { num: 9, title: 'ai-dev-kit — supervisor agents reference', url: 'https://github.com/databricks-solutions/ai-dev-kit/blob/main/databricks-skills/databricks-agent-bricks/2-supervisor-agents.md', desc: 'The deep-dive reference for Multi-Agent Supervisors on Databricks, showing how Genie Spaces slot into a broader agent architecture. Covers routing across Genie Spaces (NL-to-SQL), Knowledge Assistants, Model Serving Endpoints, Unity Catalog Functions, and external MCP servers via UC HTTP Connections — showing how Legible\'s NL-to-SQL capability fits as one agent in a larger Databricks Intelligence architecture.' },
        ],
      },
      {
        heading: 'Data Engineering Context',
        items: [
          { num: 10, title: 'alirezarezvani/claude-skills — senior-data-engineer', url: 'https://github.com/alirezarezvani/claude-skills/blob/main/engineering-team/senior-data-engineer/SKILL.md', desc: 'The data engineering skill with explicit Databricks/Spark decision logic. Contains a decision tree that routes to Spark/Databricks specifically when data volume exceeds 1TB daily, making it the most direct expression of when Databricks is the right choice versus dbt on a warehouse.' },
        ],
      },
    ],
    note: 'The story for Databricks is the richest and most strategically interesting. Three separate GitHub organisations are publishing official skills, Databricks has its own native NL-to-SQL product (Genie Spaces), and the Field Engineering team has built a comprehensive AI dev kit. The most directly relevant link is #3 (agent-bricks) — it documents Databricks\' own NL-to-SQL architecture, which is both the competitive context and the integration target for Legible\'s Databricks connector.',
  },
  mssql: {
    sections: [
      {
        heading: 'Microsoft\'s Official Azure Skills Ecosystem — The Closest Thing to SQL Server Skills',
        items: [
          { num: 1, title: 'microsoft/skills', url: 'https://github.com/microsoft/skills', desc: 'Microsoft\'s official SDK skills repo, published directly from the microsoft GitHub org. Contains skills, MCP servers, custom agents, and AGENTS.md for grounding coding agents in Microsoft SDK patterns. Explicitly lists azure-resource-manager-sql-dotnet (14 skills) covering SQL servers, databases, elastic pools, and failover groups — the closest official Microsoft resource to a dedicated SQL Server SKILL.md.' },
          { num: 2, title: 'MicrosoftDocs/Agent-Skills', url: 'https://github.com/MicrosoftDocs/Agent-Skills', desc: 'The companion repo from the MicrosoftDocs org, auto-generated from Microsoft Learn documentation. Contains 193 Azure skills generated by a pipeline that continuously scans Azure product documentation and transforms it into structured SKILL.md files. Covers Azure SQL as part of the broader Azure data services catalog. Works with Claude Code, Gemini CLI, Codex CLI, Antigravity, GitHub Copilot, Cursor, and OpenCode.' },
          { num: 3, title: 'microsoft/azure-skills', url: 'https://github.com/microsoft/azure-skills', desc: 'The official Azure Skills Plugin repo, bundling Azure skills with MCP server configurations. Multi-host support lets you use the same Azure capability across GitHub Copilot in VS Code, Copilot CLI, Claude Code, and other compatible hosts. Automatically synced from the main GitHub Copilot for Azure repository.' },
          { num: 4, title: 'Azure Agent Skills — Microsoft Learn docs', url: 'https://learn.microsoft.com/en-us/training/support/agent-skills', desc: 'The official Microsoft Learn documentation page for the Azure Agent Skills system. Describes 193 skills covering Azure\'s core services with role-based curated bundles (Essentials, Infrastructure, Data Engineering, AI). Uses a two-tier architecture — the SKILL.md acts as a knowledge index while the Learn MCP Server fetches the latest content at query time, keeping skills perpetually current.' },
        ],
      },
      {
        heading: 'The Azure Skills Plugin — Install Guides and Architecture',
        items: [
          { num: 5, title: 'Announcing the Azure Skills Plugin', url: 'https://devblogs.microsoft.com/all-things-azure/announcing-the-azure-skills-plugin/', desc: 'The launch post for Microsoft\'s Azure Skills Plugin, with explicit Claude Code support. Bundles curated Azure skills, the Azure MCP Server, and the Foundry MCP Server in one install. Skills package Azure expertise as reusable workflows, decision trees, and guardrails — not just tool lists but ordered guidance on when to use them.' },
          { num: 6, title: 'Azure Skills Plugin Install Guide', url: 'https://devblogs.microsoft.com/all-things-azure/azure-skills-plugin-lets-get-started/', desc: 'The step-by-step install guide with Claude Code-specific instructions. Install with /plugin marketplace add microsoft/azure-skills then /plugin install azure@azure-skills. Covers the full skill directory listing including azure-kusto, azure-storage, azure-rbac, azure-diagnostics, and microsoft-foundry SKILL.md files.' },
          { num: 7, title: 'Context-Driven Development: Agent Skills for Foundry and Azure', url: 'https://devblogs.microsoft.com/all-things-azure/context-driven-development-agent-skills-for-microsoft-foundry-and-azure/', desc: 'The architectural explainer for how Microsoft\'s skills and MCP layer work together. 126 skills total across five core skills plus 121 language-specific variants (Python, .NET, TypeScript, Java). A GitHub workflow runs daily to sync the latest Foundry documentation updates automatically, making this the most actively maintained Microsoft skills resource.' },
        ],
      },
      {
        heading: 'The Community SQL Server + Claude Perspective',
        items: [
          { num: 8, title: 'Using Claude Code with SQL Server and Azure SQL DB', url: 'https://www.brentozar.com/archive/2026/03/using-claude-code-with-sql-server-and-azure-sql-db/', desc: 'The definitive practitioner perspective, written March 2026 by one of the most respected SQL Server experts in the community. Documents a real SQL Server 2025 development setup and covers the practical workflow of using Claude Code against SQL Server databases. Includes community discussion comparing Claude Code to GitHub Copilot in SSMS.', author: 'Brent Ozar' },
        ],
      },
      {
        heading: 'Multi-Database Skills with SQL Server Coverage',
        items: [
          { num: 9, title: 'VoltAgent/awesome-agent-skills — SQL Server entry', url: 'https://github.com/VoltAgent/awesome-agent-skills', desc: 'The primary community curation that lists Microsoft\'s SQL-specific skill. Lists microsoft/azure-resource-manager-sql-dotnet as an official vendor skill alongside other Microsoft Azure skills — placing SQL Server ARM management within the broader Microsoft official skills catalogue.' },
          { num: 10, title: 'AltimateAI/altimate-code — SQL Server support', url: 'https://github.com/AltimateAI/altimate-code', desc: 'The open-source data engineering harness with SQL Server as a first-class target. Covers SQL transpilation between SQL Server, BigQuery, Snowflake, Databricks, Redshift, PostgreSQL, MySQL, and DuckDB — making it the most practical tool for teams moving T-SQL queries to or from other warehouse dialects.' },
        ],
      },
    ],
    note: 'Microsoft has taken an Azure-wide approach to skills rather than publishing a dedicated T-SQL/SQL Server SKILL.md. The 193-skill Azure suite covers Azure SQL as an ARM resource management topic, but nothing yet addresses T-SQL query optimisation, execution plan analysis, or index tuning — marking one of the two most commercially significant open opportunities in the database skills ecosystem.',
  },
  oracle: {
    sections: [
      {
        heading: 'The Only Dedicated Oracle Skills Repository',
        items: [
          { num: 1, title: 'Soul-Brews-Studio/arra-oracle-skills', url: 'https://github.com/Soul-Brews-Studio/arra-oracle-skills', desc: 'The only purpose-built Oracle agent skills repository found in the entire ecosystem. Installs Oracle skills to Claude Code, OpenCode, Cursor, and 12+ AI coding agents. It is a community project, not an official Oracle Corporation release. Worth watching for updates even if its current depth is limited.' },
        ],
      },
      {
        heading: 'Multi-Database SQL Skills with Explicit Oracle Coverage',
        items: [
          { num: 2, title: 'awesome-claude-code-subagents — sql-pro', url: 'https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/sql-pro.md', desc: 'The most substantive Oracle-aware SQL agent file in the community. Defines a senior SQL developer subagent with mastery across PostgreSQL, MySQL, SQL Server, and Oracle, specialising in complex query design, performance optimisation, and database architecture. Initialises by querying the RDBMS platform, version, data volume, and performance SLAs.' },
          { num: 3, title: 'agentskills.so — sql-pro skill card', url: 'https://agentskills.so/skills/jeffallan-claude-skills-sql-pro', desc: 'A clean marketplace listing for a multi-database SQL skill with Oracle in scope. Covers 10+ years of experience across PostgreSQL, MySQL, SQL Server, and Oracle, specialising in complex query optimisation, advanced SQL patterns (CTEs, window functions, recursive queries), indexing strategies, and performance tuning with sub-100ms query targets.' },
          { num: 4, title: 'QuestForTech-Investments/claude-code-skills — sql-expert', url: 'https://github.com/QuestForTech-Investments/claude-code-skills/tree/main/sql-expert', desc: 'A well-structured multi-database SQL skill with progressive disclosure via reference files. Covers parameterised queries, transaction atomicity, constraint design, and index strategies. Explicitly maps Oracle as best for "enterprise applications, Windows environments" in its database selection guide, with separate reference files for advanced patterns and common pitfalls.' },
          { num: 5, title: '0xfurai/claude-code-subagents — sql-expert', url: 'https://github.com/0xfurai/claude-code-subagents/blob/main/agents/sql-expert.md', desc: 'A production-ready SQL expert subagent from a 100+ subagent collection, with Oracle in scope as a target platform.' },
        ],
      },
      {
        heading: 'The Broader Context: Why Oracle Has No Official Skills Repo',
        items: [
          { num: 6, title: 'AltimateAI/altimate-code — Oracle support', url: 'https://github.com/AltimateAI/altimate-code', desc: 'The most practical tool for Oracle users today, supporting SQL transpilation between Oracle and nine other warehouses. Lists Oracle as a first-class supported warehouse with schema indexing, query execution, and metadata introspection — the most useful cross-dialect tool for Legible\'s Oracle connector specifically.' },
          { num: 7, title: 'astronomer/agents — SQLAlchemy pattern for Oracle', url: 'https://github.com/astronomer/agents', desc: 'The data engineering plugin that uses a SQLAlchemy connection pattern extensible to Oracle via cx_Oracle or oracledb. The analyzing-data and warehouse-init skills are warehouse-agnostic once a SQLAlchemy connection is configured — the same skill that works against Redshift, DuckDB, and PostgreSQL would work against Oracle given the right driver string.' },
          { num: 8, title: 'dbt-labs/dbt-agent-skills', url: 'https://github.com/dbt-labs/dbt-agent-skills', desc: 'The dbt agent skills repo, relevant for teams running dbt-on-Oracle (a supported adapter). Covers analytics engineering, semantic layer, platform operations, and migration workflows — all of which apply to dbt-on-Oracle deployments.' },
        ],
      },
      {
        heading: 'Skill Authoring Resources — For Building the Oracle Skill That Doesn\'t Exist Yet',
        items: [
          { num: 9, title: 'Anthropic skill authoring best practices', url: 'https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices', desc: 'The canonical reference for building a production Oracle SKILL.md from scratch. The domain-split reference file pattern — separate plsql.md, tuning.md, indexes.md, partitioning.md files loaded on demand — is exactly the right architecture for an Oracle skill covering PL/SQL, execution plan analysis, hint syntax, and partition pruning.' },
          { num: 10, title: 'ClickHouse/agent-skills — the model to follow', url: 'https://github.com/ClickHouse/agent-skills', desc: 'The best structural template for building a dedicated Oracle skills repo. The ClickHouse approach — 28 rules across three categories, individual rule files with CI validation, and a compiled AGENTS.md — is the right model for an Oracle skill covering PL/SQL idioms, execution plan interpretation, hint syntax, tablespace management, and SQL dialect differences (ROWNUM vs ROW_NUMBER, CONNECT BY vs recursive CTEs, DECODE vs CASE).' },
        ],
      },
    ],
    note: 'Oracle is the single largest gap across all databases covered. No official skills repo, no community-maintained SKILL.md in any curated directory, and only one small standalone repo. Compared to ClickHouse (28 validated rules, CI pipeline), DuckDB (six-skill official plugin), and Databricks (three separate orgs publishing skills), the Oracle gap is striking — and commercially significant given Oracle\'s dominance in regulated industries.',
  },
  trino: {
    sections: [
      {
        heading: 'The Definitive Trino Skills Source — Treasure Data\'s Official Plugin',
        items: [
          { num: 1, title: 'treasure-data/td-skills', url: 'https://github.com/treasure-data/td-skills', desc: 'The home of the most complete set of Trino SKILL.md files anywhere. Contains five dedicated Trino skills: sql-skills/trino (write and optimise Trino SQL with TD best practices), sql-skills/trino-optimizer (fix slow queries, timeouts, and memory errors), sql-skills/trino-to-hive-migration (convert Trino queries to Hive for large datasets), sql-skills/time-filtering (partition pruning with td_interval() and td_time_range()), and sql-skills/td-mcp (connect Claude Code to Treasure Data via MCP for natural language queries).' },
          { num: 2, title: 'treasure-data/td-skills — CLAUDE.md', url: 'https://github.com/treasure-data/td-skills/blob/main/CLAUDE.md', desc: 'The repo\'s own CLAUDE.md documents the full plugin architecture, making it an excellent structural reference. Shows the exact layout: sql-skills/trino/SKILL.md for Trino query expertise, sql-skills/hive/SKILL.md for Hive, workflow-skills/digdag/SKILL.md for workflows, with a marketplace.json registry defining skill collections. Includes a trigger-test spec — each new skill must add at least one realistic user prompt to tests/trigger-tests.yml.' },
          { num: 3, title: 'jfontestad/ai-td-skills', url: 'https://github.com/jfontestad/ai-td-skills', desc: 'A community fork of the Treasure Data skills, adding a dedicated Trino CLI skill not present in the original. Adds sql-skills/trino-cli — a skill for interactive Trino queries, data exploration, and terminal-based workflows with Treasure Data — alongside the full set of Trino, Hive, trino-optimizer, trino-to-hive-migration, and td-mcp skills.' },
        ],
      },
      {
        heading: 'The Closest Thing to a Generic Trino SKILL.md — dbt + Data Engineering Skills',
        items: [
          { num: 4, title: 'dbt-labs/dbt-agent-skills', url: 'https://github.com/dbt-labs/dbt-agent-skills', desc: 'The primary workhorse for most Trino data teams, since dbt-on-Trino (via dbt-trino adapter) is the dominant production pattern. Covers analytics engineering model building, semantic layer, platform operations, and Fusion engine migration — all directly applicable to dbt-trino deployments.' },
          { num: 5, title: 'astronomer/agents — SQLAlchemy warehouse connection', url: 'https://github.com/astronomer/agents', desc: 'Astronomer\'s data engineering plugin supports any SQLAlchemy-compatible warehouse, which includes Trino via trino-sqlalchemy. The analyzing-data and warehouse-init skills are connection-agnostic, meaning the same skills that work against BigQuery, Snowflake, and Redshift apply to Trino once a type: sqlalchemy connection with a trino:// URL is configured.' },
          { num: 6, title: 'AltimateAI/altimate-code — Trino support', url: 'https://github.com/AltimateAI/altimate-code', desc: 'The open-source data engineering harness with Trino/Databricks support via its SQL transpilation layer. Covers Trino syntax alongside Snowflake, BigQuery, Databricks, Redshift, PostgreSQL, MySQL, SQL Server, and DuckDB — making it the most practical tool for teams migrating queries to or from Trino, particularly from the Presto/Hive lineage.' },
        ],
      },
      {
        heading: 'Trino Reference Documentation — Source Material for Building Skills',
        items: [
          { num: 7, title: 'trinodb/trino — official repository', url: 'https://github.com/trinodb/trino', desc: 'The canonical Trino codebase, and the reference any serious Trino SKILL.md must be grounded in. Trino is a fast distributed SQL query engine for big data analytics. Its connector framework enables federated queries across data sources — exactly the cross-catalog query pattern that makes Trino\'s SQL dialect differ from single-warehouse systems.' },
          { num: 8, title: 'trinodb/trino — New Optimizer wiki', url: 'https://github.com/trinodb/trino/wiki/New-Optimizer', desc: 'The technical reference for Trino\'s cost-based optimizer, which every Trino SQL skill needs to understand. Documents how the planner generates logical queries that are iteratively optimised, how pushdown rules work, and why certain query patterns perform differently in Trino than in traditional OLTP databases.' },
          { num: 9, title: 'varadaio/presto-workload-analyzer', url: 'https://github.com/varadaio/presto-workload-analyzer', desc: 'A workload analysis tool for Trino/Presto that captures exactly the kind of performance data a Trino SKILL.md should reference. Collects QueryInfo JSONs for all queries executed against a Trino/Presto coordinator, generating HTML reports covering peak memory, input data read, and join distribution.' },
        ],
      },
      {
        heading: 'Reference & Context',
        items: [
          { num: 10, title: 'trinodb/trino-the-definitive-guide', url: 'https://github.com/trinodb/trino-the-definitive-guide', desc: 'The O\'Reilly book repository, the deepest publicly available reference on Trino\'s architecture and query patterns. Written by Trino\'s co-creators, it covers installation config, connector framework, and production deployment patterns at companies including Lyft, Pinterest, Wayfair, and Arm Treasure Data — providing the real-world query optimisation context that distinguishes a high-quality Trino skill from a generic SQL skill with Trino syntax.' },
        ],
      },
    ],
    note: 'Across all databases covered, the clearest pattern is that the databases with the richest official skills ecosystems are the ones investing most heavily in developer experience: ClickHouse (28 validated rules, CI pipeline), DuckDB (6-skill official plugin with shared state), Snowflake (native Claude integration in Cortex Code), and Databricks (three publishing orgs). For Trino specifically, Treasure Data\'s five-skill plugin (#1) is the clear starting point.',
  },
  athena: {
    sections: [
      {
        heading: 'No Dedicated Athena Skill Exists — The Best Available Alternatives',
        items: [
          { num: 1, title: 'zxkane/aws-skills', url: 'https://github.com/zxkane/aws-skills', desc: 'The closest thing to an AWS-focused Claude skills collection, covering CDK, serverless, cost operations, and Bedrock AgentCore. Structured as a proper Claude Code plugin with a marketplace.json registry, skills for aws-cdk-development, aws-cost-operations, aws-serverless-eda, and aws-agentic-ai (covering Bedrock AgentCore). Each skill has its own SKILL.md with references/ sub-files loaded on demand. An Athena skill would fit naturally as a new plugin alongside the existing data-focused skills.' },
          { num: 2, title: 'astronomer/agents — SQLAlchemy connection applicable to Athena', url: 'https://github.com/astronomer/agents', desc: 'Astronomer\'s data engineering plugin supports any SQLAlchemy-compatible warehouse, and Athena is accessible via PyAthena with a SQLAlchemy dialect. The analyzing-data and warehouse-init skills are connection-agnostic — the same skills that query Snowflake, BigQuery, and Redshift apply to Athena once configured with an athena+PyAthena:// connection URL, including S3 results bucket, region, and Glue catalog settings.' },
          { num: 3, title: 'AltimateAI/altimate-code — SQL transpilation across warehouses', url: 'https://github.com/AltimateAI/altimate-code', desc: 'The open-source data engineering harness with SQL transpilation relevant for Athena users migrating between engines. Covers SQL transpilation between Redshift, BigQuery, Snowflake, Databricks, PostgreSQL, MySQL, SQL Server, and DuckDB — all engines that Athena users typically query alongside or migrate to, given Athena\'s Presto/Trino SQL dialect heritage.' },
        ],
      },
      {
        heading: 'AWS Official Claude + Athena NL-to-SQL References — The Competitive Landscape',
        items: [
          { num: 4, title: 'aws-samples/natural-language-querying-of-data-in-s3-with-athena-and-generative-ai-text-to-sql', url: 'https://github.com/aws-samples/natural-language-querying-of-data-in-s3-with-athena-and-generative-ai-text-to-sql', desc: 'The most significant link in this entire series for Legible specifically. An official AWS samples repo demonstrating exactly Legible\'s core product: passing a user\'s natural language query along with relevant table context to Claude 3 to generate SQL, then executing it via Amazon Athena. Implements a RAG-based schema context approach and a correction loop — if Athena returns a syntax error, the error message is fed back to Claude to generate a corrected query.' },
          { num: 5, title: 'build-on-aws/bedrock-agent-txt2sql', url: 'https://github.com/build-on-aws/bedrock-agent-txt2sql', desc: 'A full production-grade NL-to-SQL reference architecture using Bedrock agents + Lambda + Athena + Claude. Integrates Amazon Bedrock agents (with Claude 3 Haiku), AWS Lambda, Amazon Athena, and AWS Glue to translate natural language queries into SQL against S3 data. Bedrock acts as the central orchestrator using chain-of-thought to break down complex queries and delegate to Athena via a Lambda action group defined by OpenAPI schemas.' },
          { num: 6, title: 'aws-samples/text-to-sql-for-athena', url: 'https://github.com/aws-samples/text-to-sql-for-athena', desc: 'An official AWS samples text-to-SQL pipeline specifically targeting Athena, with schema via Glue. Merges user query with Glue catalog schema context before sending to Claude v3 on Bedrock, validates generated SQL against Athena, and implements a multi-iteration correction loop where syntax errors are fed back to the LLM. Notes directly that queries can take 1–2 minutes without Athena partitioning, and that this can be optimised.' },
          { num: 7, title: 'aws-solutions-library-samples/guidance-for-retrieving-data-using-natural-language-queries-on-aws', url: 'https://github.com/aws-solutions-library-samples/guidance-for-retrieving-data-using-natural-language-queries-on-aws', desc: 'The official AWS Solutions Library version of the Athena NL-to-SQL guidance. Uses Titan Embeddings for schema RAG and Claude 3 Haiku for SQL generation, with Athena + Glue + Lambda as the execution layer. The Bedrock agent receives user inputs via EC2-hosted UI, uses chain-of-thought to orchestrate tasks, and delegates SQL execution to Lambda via OpenAPI-defined action groups.' },
          { num: 8, title: 'aws-samples/Simplify-natural-language-query-with-Anthropic-Claude-on-Amazon-Bedrock', url: 'https://github.com/aws-samples/Simplify-natural-language-query-with-Anthropic-Claude-on-Amazon-Bedrock', desc: 'The most technically interesting AWS sample, using Claude\'s multimodal capabilities for schema understanding. Feeds entity relationship diagrams (ERDs) directly to Claude as images to improve SQL generation accuracy for Athena — using Claude\'s vision capability to understand table relationships that are hard to encode in text. Produces natural language outputs rather than raw table results, completing the full NL-in/NL-out pipeline.' },
        ],
      },
      {
        heading: 'Companion Infrastructure',
        items: [
          { num: 9, title: 'localstack-samples/sample-athena-glue-s3-data-lake-query', url: 'https://github.com/localstack-samples/sample-athena-glue-s3-data-lake-query', desc: 'A local development and testing environment for Athena pipelines, directly useful for building and validating an Athena SKILL.md. Demonstrates deploying Athena, Glue Data Catalog, and S3 entirely on LocalStack for local testing without AWS costs or complexity. Includes a web-based Athena SQL viewer via LocalStack\'s Resource Browser — making it possible to build and test an Athena SKILL.md workflow without a live AWS account.' },
          { num: 10, title: 'dbt-labs/dbt-agent-skills', url: 'https://github.com/dbt-labs/dbt-agent-skills', desc: 'The workhorse for most Athena data teams running dbt, given that dbt-athena is a widely used adapter. The same analytics engineering, semantic layer, and platform operations skills apply directly to dbt-on-Athena deployments, which represent a large share of production Athena usage in data-mature organisations.' },
        ],
      },
    ],
    note: 'Series conclusion — the complete gap map across all 13 databases: Tier 1 with rich, mature, official skills: ClickHouse, DuckDB, Snowflake, Databricks, PostgreSQL, MySQL. Tier 2 — significant gaps where no dedicated SKILL.md exists: Redshift, SQL Server, Oracle, Trino (except Treasure Data\'s implementation), and Athena. Athena sits at the extreme end: not only is there no SKILL.md, but AWS has published multiple official demos of Claude + Athena NL-to-SQL — meaning Amazon is actively building in this space with its own first-party tooling while leaving the agent skills layer entirely unaddressed.',
  },
  spark: {
    sections: [
      {
        heading: 'The Best Dedicated Spark Coverage in SKILL.md Form',
        items: [
          { num: 1, title: 'dtsong/data-engineering-skills', url: 'https://github.com/dtsong/data-engineering-skills', desc: 'The most purpose-built data engineering skills collection with dedicated PySpark coverage. Includes a python-data-engineering skill (2,700 tokens, 6 reference files) explicitly covering Polars, Pandas, PySpark, dbt Python models, API extraction, and data validation — alongside a data-pipelines skill covering Dagster, Airflow, and Prefect orchestration, and an ai-data-integration skill for MCP servers and NL-to-SQL. Skills auto-activate based on conversation context without manual invocation.' },
          { num: 2, title: 'rohitg00/awesome-claude-code-toolkit — data-engineer agent', url: 'https://github.com/rohitg00/awesome-claude-code-toolkit/blob/main/agents/data-ai/data-engineer.md', desc: 'A comprehensive Spark-focused data engineer agent with production-grade PySpark patterns. Explicitly instructs Claude to use the PySpark DataFrame API rather than RDD operations (optimised by Catalyst and Tungsten), partition data by date or high-cardinality columns with 128MB–256MB target sizes, use broadcast() for small dimension tables in joins, and monitor the Spark UI for skewed partitions, excessive shuffles, and spilling to disk. Includes a working medallion architecture PySpark code example.' },
          { num: 3, title: 'alirezarezvani/claude-skills — senior-data-engineer SKILL.md', url: 'https://github.com/alirezarezvani/claude-skills/blob/main/engineering-team/senior-data-engineer/SKILL.md', desc: 'A 192-skill collection with a dedicated data engineering skill including a Spark decision tree. Covers data pipeline design, ETL/ELT systems, Spark, Airflow, dbt, Kafka, and the modern data stack. Contains an explicit decision framework routing to Spark/Databricks when data volume exceeds 1TB daily and real-time insight is not required — exactly the architectural context a Legible Spark connector skill needs.' },
          { num: 4, title: 'lst97/claude-code-sub-agents — data-engineer subagent', url: 'https://github.com/lst97/claude-code-sub-agents/blob/main/agents/data-ai/data-engineer.md', desc: 'A well-specified Spark data engineer subagent with explicit tool permissions and expertise boundaries. Specialises in Apache Spark, Airflow, and Kafka for scalable data infrastructure, ETL/ELT pipelines, and real-time streaming architectures. For Spark jobs it produces Python or Scala scripts including optimisation techniques for caching, broadcasting, and proper data partitioning, alongside Terraform configuration and cost estimation for cloud deployments.' },
        ],
      },
      {
        heading: 'Databricks — The Richest Platform-Hosted Spark Skills',
        items: [
          { num: 5, title: 'databricks-solutions/ai-dev-kit — Spark Declarative Pipelines skill', url: 'https://github.com/databricks-solutions/ai-dev-kit/tree/main/databricks-skills', desc: 'The most production-ready Spark skill available, covering Spark SQL and PySpark within the Databricks context. The databricks-spark-declarative-pipelines skill covers SDP (formerly Delta Live Tables) in SQL and Python, while databricks-ai-functions covers PySpark patterns for built-in AI functions including ai_classify, ai_extract, ai_summarize, and document processing pipelines. The databricks-python-sdk skill covers Python SDK, Databricks Connect, CLI, and REST API — the primary interface for programmatic Spark access.' },
          { num: 6, title: 'astronomer/agents — Airflow + Spark orchestration', url: 'https://github.com/astronomer/agents', desc: 'Astronomer\'s data engineering plugin is the standard complement to Spark for teams running Spark jobs via Airflow. The Airflow MCP server auto-discovers Spark-based Airflow projects and the analyzing-data skill supports querying data produced by Spark pipelines in any connected warehouse — making it the natural companion tool for teams where Spark generates the data that Legible then queries.' },
        ],
      },
      {
        heading: 'Data Engineering Skills with Substantive Spark Context',
        items: [
          { num: 7, title: 'AltimateAI/data-engineering-skills', url: 'https://github.com/AltimateAI/data-engineering-skills', desc: 'The benchmarked data engineering skills collection that explicitly includes Spark in its coverage. Claims 53% accuracy on ADE-bench across 43 real-world dbt tasks and 84% pass rate on Snowflake TPC-H queries. The senior data engineer skill covers Spark as a primary tool for large-scale batch processing, with the data-viz skill generating publication-ready visualisations from Spark-produced data.' },
          { num: 8, title: 'AltimateAI/altimate-code — Spark/Databricks SQL transpilation', url: 'https://github.com/AltimateAI/altimate-code', desc: 'The open-source data engineering harness with Databricks (Spark SQL) as a supported warehouse for SQL transpilation. Covers SQL transpilation between Databricks (Spark SQL), BigQuery, Snowflake, Redshift, PostgreSQL, MySQL, SQL Server, and DuckDB — making it the most practical tool for teams migrating Spark SQL queries to or from other systems, including automatic column-level lineage extraction through CTEs and joins.' },
        ],
      },
      {
        heading: 'Reference for Building a Standalone Spark SKILL.md',
        items: [
          { num: 9, title: 'ClickHouse/agent-skills — the structural model', url: 'https://github.com/ClickHouse/agent-skills', desc: 'The best structural template for building a dedicated Spark skills repo that currently doesn\'t exist. The ClickHouse approach — 28 rules across three categories with individual rule files, CI SQL validation, and a compiled AGENTS.md — maps directly to what a Spark skill would need: rules for DataFrame vs RDD choice, partition sizing, broadcast thresholds, shuffle minimisation, Catalyst optimiser hints, and Spark SQL dialect differences.' },
          { num: 10, title: 'dbt-labs/dbt-agent-skills', url: 'https://github.com/dbt-labs/dbt-agent-skills', desc: 'The primary companion to Spark for data teams running dbt Python models or dbt-on-Spark deployments. Covers analytics engineering, semantic layer work, platform operations, and migration to the Fusion engine — all directly applicable to teams running dbt alongside Spark in a medallion architecture, which is the dominant production pattern for Spark-based data warehouses.' },
        ],
      },
    ],
    note: 'Apache Spark joins Oracle, Athena, Trino (outside Treasure Data), SQL Server, and Redshift as engines with no official standalone SKILL.md. What distinguishes the Spark gap is that Spark is not a query-first engine — it\'s a computation engine — which means a Spark skill naturally belongs alongside a warehouse or lakehouse skill rather than as a standalone SQL skills repo. The Databricks AI dev kit effectively fills this role for Databricks/Spark users. For Legible specifically, Spark SQL (surfaced via Databricks, Glue, or EMR) is the primary interface worth targeting.',
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
