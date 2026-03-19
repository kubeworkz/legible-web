#!/usr/bin/env node
// One-time script to seed the "semantic layer" blog post into Strapi's SQLite DB
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const Database = require('/home/ubuntu/legible-cms/node_modules/better-sqlite3');
import crypto from 'crypto';

const DB_PATH = '/home/ubuntu/legible-cms/.tmp/data.db';
const db = new Database(DB_PATH);

const docId = crypto.randomBytes(12).toString('hex').slice(0, 24);
const now = Date.now();
const slug = 'the-advantages-of-a-semantic-layer-between-your-database-and-end-users';
const title = 'The Advantages of a Semantic Layer Between Your Database and End Users';
const excerpt = 'A semantic layer translates raw database schemas into business-friendly concepts — bridging the gap between complex data models and the people who need answers. Here\'s why every modern data stack should have one.';
const author = 'Legible Team';

const content = JSON.stringify([
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Most databases weren\'t designed to be user-friendly. Tables have cryptic names, joins are complex, and a single misplaced filter can return wildly incorrect results. For decades, the solution has been the same: hire analysts, build dashboards, or train end users on SQL. None of these scale.' }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'A ', bold: false },
      { type: 'text', text: 'semantic layer', bold: true },
      { type: 'text', text: ' changes the equation. It sits between your raw database and the people (or tools) querying it, translating business language into accurate, optimized queries. Think of it as a universal translator for your data.' }
    ]
  },
  {
    type: 'heading',
    level: 2,
    children: [{ type: 'text', text: 'What Is a Semantic Layer?' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'A semantic layer is an abstraction that maps raw database schemas — tables, columns, joins, and aggregations — to business concepts that humans understand. Instead of asking for ' },
      { type: 'text', text: 'SELECT SUM(oi.qty * oi.unit_price) FROM order_items oi JOIN orders o ON ...', code: true },
      { type: 'text', text: ', a user simply asks for "total revenue." The semantic layer knows how to translate that intent into the correct SQL for your specific database.' }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'This isn\'t a new idea — tools like Looker\'s LookML and dbt\'s metrics layer have been moving in this direction for years. But with the rise of LLM-powered data tools, the semantic layer has become the critical piece that determines whether AI-generated queries are trustworthy or dangerous.' }
    ]
  },
  {
    type: 'heading',
    level: 2,
    children: [{ type: 'text', text: '1. Accuracy Without SQL Expertise' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'The biggest advantage of a semantic layer is that it decouples query correctness from user expertise. When a product manager asks "what was our churn rate last quarter?", the semantic layer already encodes:' }
    ]
  },
  {
    type: 'list',
    format: 'unordered',
    children: [
      { type: 'list-item', children: [{ type: 'text', text: 'Which tables define "churn"' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'How "last quarter" maps to date filters' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Which joins are required and in what order' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'What aggregation logic to apply' }] }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Without a semantic layer, every query is a fresh interpretation — and every interpretation is a fresh opportunity for error. With one, the definition of "churn" is written once, validated by your data team, and reused everywhere.' }
    ]
  },
  {
    type: 'heading',
    level: 2,
    children: [{ type: 'text', text: '2. Consistent Definitions Across the Organization' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Ask five people at a company what "active user" means and you\'ll get five different answers. Revenue, retention, engagement — these terms are surprisingly ambiguous when they reach the database level.' }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'A semantic layer creates a single source of truth for business metrics. When "monthly recurring revenue" is defined once in the semantic layer, every dashboard, every report, and every ad-hoc query uses the same calculation. No more conflicting numbers in board meetings.' }
    ]
  },
  {
    type: 'heading',
    level: 2,
    children: [{ type: 'text', text: '3. Security and Access Control at the Concept Level' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Traditional database permissions operate at the table or column level. But business access control is conceptual: "Marketing can see campaign performance but not individual salary data." A semantic layer lets you define permissions in business terms and enforce them consistently, regardless of which underlying tables are involved.' }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'This is especially important when LLMs are generating queries. Without a semantic layer enforcing boundaries, a cleverly worded prompt could trick an AI into accessing data it shouldn\'t. The semantic layer acts as a guardrail — the LLM can only query through the concepts it\'s been given access to.' }
    ]
  },
  {
    type: 'heading',
    level: 2,
    children: [{ type: 'text', text: '4. Database Agnosticism' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'One of the most practical benefits: the semantic layer abstracts away database-specific syntax. Whether you\'re querying PostgreSQL, BigQuery, Snowflake, or MySQL, the user experience is identical. The layer handles dialect translation, optimization hints, and connection specifics behind the scenes.' }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'This means you can migrate databases, add new data sources, or split your data warehouse — all without retraining your users or rewriting their saved queries.' }
    ]
  },
  {
    type: 'heading',
    level: 2,
    children: [{ type: 'text', text: '5. The Foundation for Trustworthy AI-Powered Data Access' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'This is where the semantic layer becomes truly critical. LLMs like GPT-4 are remarkably good at generating SQL from natural language — but they hallucinate. They guess at table names, invent join conditions, and confidently return wrong answers.' }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'A semantic layer constrains the LLM\'s output. Instead of generating arbitrary SQL against your raw schema, the AI queries through defined business concepts. The semantic layer validates that the generated query is structurally correct, uses approved metrics, and respects access controls — all before it touches your database.' }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'This is exactly the approach Legible takes. Our platform combines a semantic layer with LLM-powered natural language querying, ensuring that every answer is not just fast — it\'s ', bold: false },
      { type: 'text', text: 'verifiably correct', bold: true },
      { type: 'text', text: '.' }
    ]
  },
  {
    type: 'heading',
    level: 2,
    children: [{ type: 'text', text: '6. Reduced Load on Data Engineering Teams' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Without a semantic layer, data engineers become human translators. Every ad-hoc request from sales, marketing, or leadership lands in their queue. They context-switch between writing queries, validating results, and explaining caveats.' }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'A well-implemented semantic layer makes most of these requests self-service. Business users query in their own language, get accurate results, and the data team focuses on what actually matters: modeling, pipeline reliability, and infrastructure.' }
    ]
  },
  {
    type: 'heading',
    level: 2,
    children: [{ type: 'text', text: 'The Bottom Line' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'A semantic layer isn\'t just a nice-to-have abstraction — it\'s the missing piece that makes data truly accessible. It ensures accuracy, enforces consistency, protects sensitive data, and unlocks the full potential of AI-powered querying.' }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'As organizations connect more data sources and adopt LLM-powered tools, the question isn\'t whether you need a semantic layer. It\'s how quickly you can implement one before the gap between your data and your team\'s ability to use it becomes a competitive liability.' }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Legible was built with this principle at its core. Plain language in, verified answers out — with a semantic layer ensuring every query is accurate, auditable, and secure. ', bold: false },
      { type: 'link', url: 'https://github.com/kubeworkz/legible', children: [{ type: 'text', text: 'Try it free today' }] },
      { type: 'text', text: '.' }
    ]
  }
]);

// Create "Data Architecture" category if it doesn't exist
const catDocId = crypto.randomBytes(12).toString('hex').slice(0, 24);
const existingCat = db.prepare("SELECT id FROM blog_categories WHERE slug='data-architecture' AND published_at IS NOT NULL").get();

let catPublishedId;
if (!existingCat) {
  // Draft row
  db.prepare(`INSERT INTO blog_categories (document_id, name, slug, created_at, updated_at, created_by_id, updated_by_id, locale)
    VALUES (?, 'Data Architecture', 'data-architecture', ?, ?, 2, 2, '')`)
    .run(catDocId, now, now);

  // Published row
  const catInfo = db.prepare(`INSERT INTO blog_categories (document_id, name, slug, created_at, updated_at, published_at, created_by_id, updated_by_id, locale)
    VALUES (?, 'Data Architecture', 'data-architecture', ?, ?, ?, 2, 2, '')`)
    .run(catDocId, now, now, now);
  catPublishedId = catInfo.lastInsertRowid;
} else {
  catPublishedId = existingCat.id;
}

// Insert blog post - draft row (no published_at)
db.prepare(`INSERT INTO blog_posts (document_id, title, slug, excerpt, content, author, created_at, updated_at, created_by_id, updated_by_id, locale)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, 2, 2, '')`)
  .run(docId, title, slug, excerpt, content, author, now, now);

const draftId = db.prepare("SELECT id FROM blog_posts WHERE document_id=? AND published_at IS NULL").get(docId).id;

// Published row
const pubResult = db.prepare(`INSERT INTO blog_posts (document_id, title, slug, excerpt, content, author, created_at, updated_at, published_at, created_by_id, updated_by_id, locale)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 2, 2, '')`)
  .run(docId, title, slug, excerpt, content, author, now, now, now);

const pubId = pubResult.lastInsertRowid;

// Link category to both rows
const draftCatId = db.prepare("SELECT id FROM blog_categories WHERE document_id=? AND published_at IS NULL").get(catDocId)?.id;
if (draftCatId) {
  db.prepare("INSERT INTO blog_posts_category_lnk (blog_post_id, blog_category_id, blog_post_ord) VALUES (?, ?, 1.0)")
    .run(draftId, draftCatId);
}
db.prepare("INSERT INTO blog_posts_category_lnk (blog_post_id, blog_category_id, blog_post_ord) VALUES (?, ?, 1.0)")
  .run(pubId, catPublishedId);

console.log(`✅ Blog post created: "${title}"`);
console.log(`   Slug: ${slug}`);
console.log(`   Document ID: ${docId}`);
console.log(`   Published ID: ${pubId}`);
db.close();
