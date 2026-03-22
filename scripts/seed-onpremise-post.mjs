#!/usr/bin/env node
// One-time script to seed the "on-premise" blog post into Strapi's SQLite DB
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const Database = require('/home/ubuntu/legible-cms/node_modules/better-sqlite3');
import crypto from 'crypto';

const DB_PATH = '/home/ubuntu/legible-cms/.tmp/data.db';
const db = new Database(DB_PATH);

const docId = crypto.randomBytes(12).toString('hex').slice(0, 24);
const now = Date.now();
const slug = 'why-on-premise-is-the-future-of-ai-powered-data-access';
const title = 'Why On-Premise Is the Future of AI-Powered Data Access';
const excerpt = 'Cloud-hosted LLMs send your queries, schema, and context to someone else\'s servers. On-premise deployment keeps everything behind your firewall — and it\'s now more affordable than ever.';
const author = 'Legible Team';

const content = JSON.stringify([
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'The rise of AI-powered data tools has created an uncomfortable paradox: the technology that promises to democratise data access often requires you to send your most sensitive information — database schemas, query patterns, and business context — to third-party servers. For many organisations, that\'s a non-starter.' }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Legible\'s on-premise deployment changes the equation. Every component — the web interface, the API server, the LLM runtime, and your databases — runs entirely within your infrastructure. No data leaves your perimeter. Ever.' }
    ]
  },
  {
    type: 'heading',
    level: 2,
    children: [{ type: 'text', text: 'The Security Problem with Cloud NL-to-SQL Tools' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'When you use a cloud-hosted natural language to SQL tool, three categories of sensitive data leave your network:' }
    ]
  },
  {
    type: 'list',
    format: 'unordered',
    children: [
      { type: 'list-item', children: [{ type: 'text', text: 'Query text — the plain-English questions your team asks, which often contain implicit business context, KPI names, and strategic priorities' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Schema metadata — your table names, column definitions, and relationships, which reveal your data architecture and business model' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Query results — the actual data returned, which may include PII, financial figures, or material non-public information' }] }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Even if a vendor promises encryption in transit and limited retention, the fundamental issue remains: your data touched infrastructure you don\'t control. For regulated industries — healthcare, finance, defence, legal — this is often a compliance violation by definition.' }
    ]
  },
  {
    type: 'heading',
    level: 2,
    children: [{ type: 'text', text: 'Zero Data Egress: Not a Feature, a Architecture Decision' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Legible on-premise isn\'t a cloud tool with "private mode" bolted on. The entire architecture is designed for zero egress from the ground up:' }
    ]
  },
  {
    type: 'list',
    format: 'unordered',
    children: [
      { type: 'list-item', children: [{ type: 'text', text: 'The LLM that generates SQL runs inside your network — on your hardware, in your VPC, or in your air-gapped data centre' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'No external API calls are made. No telemetry is sent. No DNS lookups leave your perimeter' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Query text, schema metadata, and results are processed entirely within your infrastructure' }] }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'This means GDPR, HIPAA, SOC 2, ISO 27001, FedRAMP, and ITAR compliance requirements for AI data processing are satisfied by default — not through vendor questionnaires and BAAs, but through architecture.' }
    ]
  },
  {
    type: 'heading',
    level: 2,
    children: [{ type: 'text', text: 'The Cost Equation Has Changed' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Two years ago, running an LLM on-premise was expensive and impractical. That\'s no longer true. Three converging trends have made self-hosted AI genuinely affordable:' }
    ]
  },
  {
    type: 'heading',
    level: 3,
    children: [{ type: 'text', text: 'Open-weight models have closed the quality gap' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Models like Llama 3.1 70B, Mistral Large, and Qwen 2.5 Coder now match GPT-4-class performance on SQL generation tasks. NL-to-SQL is a bounded, well-defined problem — exactly where open-weight models excel. You no longer need a frontier API model to get accurate SQL.' }
    ]
  },
  {
    type: 'heading',
    level: 3,
    children: [{ type: 'text', text: 'Hardware costs have collapsed' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'A single NVIDIA RTX 4090 (approximately $2,000) runs a 13B parameter model comfortably. Cloud GPU spot instances start at $0.20/hour. SQL queries take milliseconds of inference time — your actual compute costs per query are negligible compared to per-query API pricing from cloud vendors.' }
    ]
  },
  {
    type: 'heading',
    level: 3,
    children: [{ type: 'text', text: 'Quantization makes models smaller' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Techniques like GGUF, AWQ, and GPTQ quantization cut VRAM requirements by 50–75% with minimal quality loss. A model that once needed 40GB of VRAM now runs in 8–12GB — standard mid-range GPU memory. This puts production LLM inference within reach of hardware most organisations already own.' }
    ]
  },
  {
    type: 'heading',
    level: 2,
    children: [{ type: 'text', text: 'Production-Ready Deployment Options' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Legible integrates with any OpenAI-compatible inference endpoint, which means it works with every major LLM runtime out of the box:' }
    ]
  },
  {
    type: 'list',
    format: 'unordered',
    children: [
      { type: 'list-item', children: [{ type: 'text', text: 'Ollama — zero-configuration local serving, ideal for evaluation and smaller teams' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'vLLM — production-grade GPU-optimized serving with batching and high throughput' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'AWS Bedrock, Azure AI, GCP Vertex AI — managed private cloud endpoints with VPC isolation and no data egress to model providers' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Air-gapped deployment — delivered as a self-contained Docker image or Kubernetes Helm chart for fully isolated environments' }] }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'If you can run a Docker container, you can run Legible on-premise. The complexity barrier that once made self-hosted AI impractical is gone.' }
    ]
  },
  {
    type: 'heading',
    level: 2,
    children: [{ type: 'text', text: 'Who Needs On-Premise?' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'The short answer: any organisation where sending data to a third-party LLM API is unacceptable. In practice, that includes:' }
    ]
  },
  {
    type: 'list',
    format: 'unordered',
    children: [
      { type: 'list-item', children: [{ type: 'text', text: 'Financial services — banks, asset managers, and trading firms handling PII, transaction data, or material non-public information' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Healthcare — hospitals and pharma companies working with patient records and clinical trial data under HIPAA' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Government and defence — agencies with classified workloads, CUI data, or air-gap requirements' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Legal and professional services — firms handling privileged client data and audit-subject financial records' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Any security-first organisation — if your security team has already banned ChatGPT or Copilot for work use, on-premise AI is the answer, not a workaround' }] }
    ]
  },
  {
    type: 'heading',
    level: 2,
    children: [{ type: 'text', text: 'Cloud vs. On-Premise: The Real Comparison' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'The comparison isn\'t about performance — open models match frontier APIs on SQL tasks. It\'s about control:' }
    ]
  },
  {
    type: 'list',
    format: 'unordered',
    children: [
      { type: 'list-item', children: [{ type: 'text', text: 'With cloud NL-to-SQL tools, your queries always leave your network, prompts are stored by third parties, and your schema is exposed externally' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'With Legible on-premise, none of that happens. LLM inference costs decline over time as hardware improves, rather than being controlled by a vendor\'s pricing decisions' }] }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'There\'s no vendor lock-in, no BAA negotiations with LLM providers, and no risk that a vendor policy change suddenly puts you out of compliance.' }
    ]
  },
  {
    type: 'heading',
    level: 2,
    children: [{ type: 'text', text: 'Getting Started' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Legible on-premise is available today. Our enterprise team works directly with your security, infrastructure, and data teams to design and deploy Legible in your environment — covering architecture review, model selection, Helm charts, SSO integration, and dedicated onboarding.' }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'You can explore the full details of our on-premise architecture, compliance coverage, and deployment options on our ' },
      { type: 'link', url: '/legible-security.html', children: [{ type: 'text', text: 'On-Premise Security page' }] },
      { type: 'text', text: ', or ' },
      { type: 'link', url: '/Legible_OnPremise_Security_Brief.pdf', children: [{ type: 'text', text: 'download the security brief (PDF)' }] },
      { type: 'text', text: '.' }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Your data should stay behind your firewall. Now it can — without compromising on the power of AI-driven data access. ' },
      { type: 'link', url: 'mailto:enterprise@legible.io', children: [{ type: 'text', text: 'Book an architecture call' }] },
      { type: 'text', text: ' to get started.' }
    ]
  }
]);

// Use existing "Engineering" category or create a "Security" one
const catDocId = crypto.randomBytes(12).toString('hex').slice(0, 24);
const existingCat = db.prepare("SELECT id, document_id FROM blog_categories WHERE slug='security' AND published_at IS NOT NULL").get();

let catPublishedId;
let catDocIdUsed;
if (!existingCat) {
  // Draft row
  db.prepare(`INSERT INTO blog_categories (document_id, name, slug, created_at, updated_at, created_by_id, updated_by_id, locale)
    VALUES (?, 'Security', 'security', ?, ?, 2, 2, '')`)
    .run(catDocId, now, now);

  // Published row
  const catInfo = db.prepare(`INSERT INTO blog_categories (document_id, name, slug, created_at, updated_at, published_at, created_by_id, updated_by_id, locale)
    VALUES (?, 'Security', 'security', ?, ?, ?, 2, 2, '')`)
    .run(catDocId, now, now, now);
  catPublishedId = catInfo.lastInsertRowid;
  catDocIdUsed = catDocId;
} else {
  catPublishedId = existingCat.id;
  catDocIdUsed = existingCat.document_id;
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

// Link category
const draftCatId = db.prepare("SELECT id FROM blog_categories WHERE document_id=? AND published_at IS NULL").get(catDocIdUsed)?.id;
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
