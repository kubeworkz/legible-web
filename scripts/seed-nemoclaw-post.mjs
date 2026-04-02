#!/usr/bin/env node
// One-time script to seed the "Nemoclaw" blog post into Strapi's SQLite DB
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const Database = require('/home/ubuntu/legible-cms/node_modules/better-sqlite3');
import crypto from 'crypto';

const DB_PATH = '/home/ubuntu/legible-cms/.tmp/data.db';
const db = new Database(DB_PATH);

const docId = crypto.randomBytes(12).toString('hex').slice(0, 24);
const now = Date.now();
const slug = 'nemoclaw-run-openclaw-securely-inside-nvidia-openshell';
const title = 'Nemoclaw: Run OpenClaw More Securely Inside NVIDIA Openshell with Managed Inference';
const excerpt = 'OpenClaw is a powerful open-source agent execution framework — but running it in production requires guardrails. Nemoclaw pairs OpenClaw with NVIDIA Openshell and managed NeMo inference to deliver secure, observable, production-grade agent execution.';
const author = 'Legible Team';

const content = JSON.stringify([
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'OpenClaw has quickly become one of the most capable open-source frameworks for building autonomous AI agents. Its flexible tool-use architecture, multi-step planning, and extensible action space make it ideal for complex workflows — from code generation to data pipeline orchestration.' }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'But capability without containment is a liability. Running OpenClaw agents against production systems — databases, APIs, cloud infrastructure — without proper isolation is like giving an intern root access on day one. The intent is good. The risk is not.' }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Nemoclaw solves this by wrapping OpenClaw inside NVIDIA Openshell\'s kernel-level sandbox and connecting it to managed NeMo inference. The result: agents that are just as capable, but architecturally constrained in what they can do, see, and reach.' }
    ]
  },
  {
    type: 'heading',
    level: 2,
    children: [{ type: 'text', text: 'What Is OpenClaw?' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'OpenClaw is an open-source agent framework that provides a structured action space for LLM-driven agents. Unlike simpler agent frameworks that rely on free-form text tool calls, OpenClaw defines a typed action schema — each tool has explicit inputs, outputs, and preconditions. This makes agent behavior more predictable and debuggable.' }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Key capabilities include:' }
    ]
  },
  {
    type: 'list',
    format: 'unordered',
    children: [
      { type: 'list-item', children: [{ type: 'text', text: 'Multi-step planning with backtracking — agents can revise their approach when intermediate steps fail' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Typed tool interfaces — every action has a defined schema, reducing hallucinated tool calls' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Pluggable inference backends — works with any OpenAI-compatible API endpoint' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Composable agents — agents can delegate sub-tasks to other agents, enabling complex hierarchical workflows' }] }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'The challenge is that OpenClaw, like all agent frameworks, trusts its execution environment. It assumes that if a tool is available, it\'s safe to call. In development, that\'s fine. In production, it\'s a security gap.' }
    ]
  },
  {
    type: 'heading',
    level: 2,
    children: [{ type: 'text', text: 'The Security Gap in Agent Frameworks' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Most agent frameworks focus on orchestration — planning, tool selection, memory, and output formatting. Security is treated as an application-level concern: "just don\'t give the agent dangerous tools." But in practice, the boundary between safe and dangerous is blurry:' }
    ]
  },
  {
    type: 'list',
    format: 'unordered',
    children: [
      { type: 'list-item', children: [{ type: 'text', text: 'A database query tool is "safe" until an agent constructs a DELETE statement via SQL injection in its own generated query' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'A file-read tool is "safe" until an agent reads /etc/shadow or a mounted secrets volume' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'An HTTP client tool is "safe" until an agent uses it to exfiltrate data to an external endpoint' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'A code execution tool is "safe" until an agent imports subprocess and spawns a reverse shell' }] }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Application-level guardrails — output filtering, prompt engineering, tool restrictions — are necessary but insufficient. They are bypassable by sufficiently creative prompt injections. What you need is infrastructure-level enforcement: even if the agent tries to do something dangerous, the environment physically prevents it.' }
    ]
  },
  {
    type: 'heading',
    level: 2,
    children: [{ type: 'text', text: 'How Nemoclaw Works' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Nemoclaw is the integration layer that bridges OpenClaw and Openshell. It provides three core capabilities:' }
    ]
  },
  {
    type: 'heading',
    level: 3,
    children: [{ type: 'text', text: '1. Sandboxed Execution via Openshell' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Every OpenClaw agent session runs inside an Openshell microVM. The agent\'s tools — code execution, file access, database connections — all operate within the sandbox. The agent cannot access the host filesystem, the host network, or other agent sessions. If the agent is compromised via prompt injection or tool manipulation, the blast radius is limited to the ephemeral sandbox, which is destroyed when the session ends.' }
    ]
  },
  {
    type: 'heading',
    level: 3,
    children: [{ type: 'text', text: '2. Managed NeMo Inference' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Instead of letting agents call arbitrary inference endpoints, Nemoclaw routes all LLM calls through NVIDIA NeMo\'s managed inference service. This provides:' }
    ]
  },
  {
    type: 'list',
    format: 'unordered',
    children: [
      { type: 'list-item', children: [{ type: 'text', text: 'Guardrailed inference — NeMo Guardrails filters both inputs and outputs, blocking prompt injections, jailbreaks, and harmful content before they reach the model' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Model versioning — agents always use a pinned model version, preventing behavior drift when models are updated' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Token-level auditing — every inference call is logged with full prompt and completion text for forensic analysis' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Rate limiting — per-agent and per-session token budgets prevent runaway inference costs from recursive agent loops' }] }
    ]
  },
  {
    type: 'heading',
    level: 3,
    children: [{ type: 'text', text: '3. Observability and Audit' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Nemoclaw captures a complete execution trace for every agent session: every tool call, every inference request, every sandbox event. These traces are structured and queryable, making it straightforward to answer questions like "what did this agent do?", "why did it make this decision?", and "did it attempt any restricted actions?"' }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'For compliance-sensitive environments, this audit trail is essential. It provides the evidence that autonomous agents operated within policy — not just the assertion.' }
    ]
  },
  {
    type: 'heading',
    level: 2,
    children: [{ type: 'text', text: 'Nemoclaw in Practice: Legible\'s Data Agents' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'At Legible, we use Nemoclaw to power our advanced analytical agents. When a user asks a complex question that requires multiple database queries, data transformation, and result synthesis, our system spins up an OpenClaw agent inside a Nemoclaw-managed sandbox. The agent:' }
    ]
  },
  {
    type: 'list',
    format: 'ordered',
    children: [
      { type: 'list-item', children: [{ type: 'text', text: 'Decomposes the question into sub-queries using NeMo-managed inference' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Executes each SQL sub-query against read-only database connections scoped by Openshell network policies' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Runs post-processing transformations in a sandboxed Python environment with no network access' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Returns the synthesized result through a controlled output channel' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'The sandbox is destroyed — no persistent state, no residual access' }] }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'The entire execution takes seconds. The user gets a comprehensive analytical result. The security team gets a complete audit trail. Nobody had to manually approve each step.' }
    ]
  },
  {
    type: 'heading',
    level: 2,
    children: [{ type: 'text', text: 'When to Use Nemoclaw' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Nemoclaw is designed for teams that need autonomous agent capabilities in environments where security and compliance are non-negotiable:' }
    ]
  },
  {
    type: 'list',
    format: 'unordered',
    children: [
      { type: 'list-item', children: [{ type: 'text', text: 'Production data access — agents querying live databases with real customer data' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Regulated industries — finance, healthcare, government, and legal where audit trails are mandatory' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Multi-tenant platforms — where agent isolation between customers or teams is a hard requirement' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'High-stakes automation — any workflow where an agent error could cause financial loss, data breach, or compliance violation' }] }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'If you\'re running OpenClaw agents (or any autonomous agents) against production infrastructure without kernel-level isolation and managed inference, you\'re accepting risk that doesn\'t need to exist. Nemoclaw eliminates that risk without sacrificing agent capability.' }
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
      { type: 'text', text: 'Nemoclaw is available as part of Legible\'s enterprise deployment. For teams already running Openshell, Nemoclaw adds the OpenClaw integration layer and managed NeMo inference configuration. Our team handles the setup — sandbox image configuration, NeMo endpoint provisioning, network policy definition, and audit pipeline integration.' }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Autonomous agents are inevitable. Insecure agents are not. ' },
      { type: 'link', url: 'mailto:enterprise@legible.io', children: [{ type: 'text', text: 'Talk to our team' }] },
      { type: 'text', text: ' about deploying Nemoclaw in your environment.' }
    ]
  }
]);

// Use existing "Engineering" category or create it
const catDocId = crypto.randomBytes(12).toString('hex').slice(0, 24);
const existingCat = db.prepare("SELECT id, document_id FROM blog_categories WHERE slug='engineering' AND published_at IS NOT NULL").get();

let catPublishedId;
let catDocIdUsed;
if (!existingCat) {
  db.prepare(`INSERT INTO blog_categories (document_id, name, slug, created_at, updated_at, created_by_id, updated_by_id, locale)
    VALUES (?, 'Engineering', 'engineering', ?, ?, 2, 2, '')`)
    .run(catDocId, now, now);

  const catInfo = db.prepare(`INSERT INTO blog_categories (document_id, name, slug, created_at, updated_at, published_at, created_by_id, updated_by_id, locale)
    VALUES (?, 'Engineering', 'engineering', ?, ?, ?, 2, 2, '')`)
    .run(catDocId, now, now, now);
  catPublishedId = catInfo.lastInsertRowid;
  catDocIdUsed = catDocId;
} else {
  catPublishedId = existingCat.id;
  catDocIdUsed = existingCat.document_id;
}

// Insert blog post - draft row
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
