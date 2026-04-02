#!/usr/bin/env node
// One-time script to seed the "Blueprints" blog post into Strapi's SQLite DB
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const Database = require('/home/ubuntu/legible-cms/node_modules/better-sqlite3');
import crypto from 'crypto';

const DB_PATH = '/home/ubuntu/legible-cms/.tmp/data.db';
const db = new Database(DB_PATH);

const docId = crypto.randomBytes(12).toString('hex').slice(0, 24);
const now = Date.now();
const slug = 'blueprints-pre-configured-agent-templates-for-production-deployment';
const title = 'Blueprints: Pre-Configured Agent Templates That Bundle Everything into a Single Deployable Spec';
const excerpt = 'Deploying production AI agents requires coordinating sandbox images, inference profiles, network policies, and resource limits. Blueprints collapse that complexity into a single declarative spec that anyone can deploy.';
const author = 'Legible Team';

const content = JSON.stringify([
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Getting an AI agent to work on your laptop is easy. Getting one to run safely, reliably, and repeatably in production is an engineering project. You need a sandbox image with the right dependencies, an inference endpoint with the right model and guardrails, network policies that allow exactly the right connections, and resource limits that prevent runaway costs. Today, most teams wire this together manually — and differently every time.' }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Blueprints change that. A Blueprint is a single declarative specification that bundles a sandbox image, inference profile, network policies, and resource limits into one deployable, versionable, shareable unit. Think of it as a Dockerfile for agent infrastructure — except it covers the entire execution environment, not just the container.' }
    ]
  },
  {
    type: 'heading',
    level: 2,
    children: [{ type: 'text', text: 'The Configuration Problem' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Deploying a production agent today involves configuring at least five independent systems:' }
    ]
  },
  {
    type: 'list',
    format: 'ordered',
    children: [
      { type: 'list-item', children: [{ type: 'text', text: 'Sandbox/container image — Which base image? Which packages? Which system libraries? What file permissions?' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Inference endpoint — Which model? Which version? What temperature? What token limits? Which guardrail configuration?' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Network policies — Which endpoints can the agent reach? Which ports? Which protocols? Is DNS allowed?' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Resource limits — How much CPU? How much memory? How much GPU time? What\'s the maximum session duration?' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Secrets and credentials — Which database connections does the agent need? What API keys? How are they injected?' }] }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Each of these is typically managed by a different tool, a different team, or a different configuration file. The result is configuration sprawl: the actual agent definition is scattered across Dockerfiles, Kubernetes manifests, Terraform configs, environment variables, and documentation that may or may not be current.' }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'When something goes wrong — an agent can\'t reach a database, a model behaves differently, a sandbox runs out of memory — debugging means tracing through multiple configuration layers to find the mismatch. This is slow, error-prone, and doesn\'t scale.' }
    ]
  },
  {
    type: 'heading',
    level: 2,
    children: [{ type: 'text', text: 'What Is a Blueprint?' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'A Blueprint is a declarative YAML specification that defines every aspect of an agent\'s execution environment in a single file. Here\'s the anatomy of a Blueprint:' }
    ]
  },
  {
    type: 'heading',
    level: 3,
    children: [{ type: 'text', text: 'Sandbox Image' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'The sandbox section specifies the base Openshell image, additional packages to install, filesystem mounts, and environment variables. This isn\'t just a container image — it\'s a full microVM specification including kernel version, syscall allowlists, and GPU access scope.' }
    ]
  },
  {
    type: 'heading',
    level: 3,
    children: [{ type: 'text', text: 'Inference Profile' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'The inference section pins the model, version, temperature, max tokens, and NeMo Guardrails configuration. This ensures that the same Blueprint always produces the same agent behavior — no surprises when a model is updated or a guardrail policy changes. You can also specify fallback models and retry policies for production resilience.' }
    ]
  },
  {
    type: 'heading',
    level: 3,
    children: [{ type: 'text', text: 'Network Policies' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'The network section defines a whitelist of allowed connections. Each entry specifies a destination (hostname or IP range), port, and protocol. Everything else is denied by default. This is enforced at the Openshell kernel level — not by iptables rules that the agent could potentially modify, but by the microVM\'s virtual network interface.' }
    ]
  },
  {
    type: 'heading',
    level: 3,
    children: [{ type: 'text', text: 'Resource Limits' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'The resources section caps CPU cores, memory, GPU allocation, session duration, and inference token budget. These are hard limits enforced by the hypervisor — not soft limits that can be exceeded. If an agent hits its token budget, the session terminates cleanly with an audit record. No runaway costs, no infinite loops consuming GPU hours.' }
    ]
  },
  {
    type: 'heading',
    level: 2,
    children: [{ type: 'text', text: 'Blueprint Lifecycle Management' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Blueprints aren\'t just configuration files — they\'re versioned, auditable artifacts with a full lifecycle:' }
    ]
  },
  {
    type: 'list',
    format: 'unordered',
    children: [
      { type: 'list-item', children: [{ type: 'text', text: 'Version control — every Blueprint has a semantic version. Deploying a Blueprint always deploys a specific version. Rollbacks are instantaneous.' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Validation — Blueprints are validated at creation time against the target infrastructure. If a specified model isn\'t available, a network endpoint doesn\'t exist, or a resource limit exceeds cluster capacity, you find out before deployment, not after.' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Diff and audit — every change to a Blueprint is tracked. You can diff any two versions to see exactly what changed, who changed it, and when.' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Promotion — Blueprints can be promoted through environments (dev → staging → production) with approval gates. A Blueprint that hasn\'t been tested in staging cannot be deployed to production.' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Sharing — Blueprints can be published to a team or organization registry. A data team can create a "SQL analyst agent" Blueprint that any department can deploy without understanding the underlying infrastructure.' }] }
    ]
  },
  {
    type: 'heading',
    level: 2,
    children: [{ type: 'text', text: 'How Legible Uses Blueprints' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'At Legible, Blueprints are the primary mechanism for defining and deploying our agent types. We maintain a library of Blueprints for different use cases:' }
    ]
  },
  {
    type: 'list',
    format: 'unordered',
    children: [
      { type: 'list-item', children: [{ type: 'text', text: 'SQL Analyst — read-only database access, NeMo inference with SQL-optimized guardrails, 60-second session timeout, no outbound network access' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Data Pipeline Agent — access to multiple databases, Python post-processing enabled, 5-minute session timeout, restricted outbound to internal data lake endpoints' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Schema Explorer — metadata-only database access (INFORMATION_SCHEMA), no data query permissions, unlimited session duration for interactive exploration' }] }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'When a customer deploys Legible on-premise, they receive our standard Blueprint library and can customise Blueprints or create new ones for their specific data infrastructure. The Blueprint abstraction means our customers\' security teams can review and approve agent configurations as a single artifact — not a scattered collection of configs across multiple systems.' }
    ]
  },
  {
    type: 'heading',
    level: 2,
    children: [{ type: 'text', text: 'Blueprints and NVIDIA NIM' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Blueprints integrate natively with NVIDIA NIM (NVIDIA Inference Microservices). The inference profile in a Blueprint can reference a NIM endpoint directly, inheriting NIM\'s optimized inference performance, model catalog, and enterprise support. For teams already using NIM for model serving, Blueprints add the execution environment layer that NIM doesn\'t cover — sandboxing, network policy, and resource management.' }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'You can explore available NVIDIA Blueprint templates and infrastructure at ', bold: false },
      { type: 'link', url: 'https://build.nvidia.com/blueprints', children: [{ type: 'text', text: 'NVIDIA Build Blueprints' }] },
      { type: 'text', text: '.' }
    ]
  },
  {
    type: 'heading',
    level: 2,
    children: [{ type: 'text', text: 'Why Declarative Agent Configuration Matters' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'The shift from imperative to declarative infrastructure — Dockerfiles, Kubernetes manifests, Terraform configs — transformed how teams manage servers and services. Blueprints bring the same shift to AI agent infrastructure:' }
    ]
  },
  {
    type: 'list',
    format: 'unordered',
    children: [
      { type: 'list-item', children: [{ type: 'text', text: 'Reproducibility — the same Blueprint always produces the same agent environment. No "it works on my machine" for agents.' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Auditability — every agent deployment can be traced back to a specific Blueprint version. Security teams can review agent configurations without reading code.' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Scalability — deploying 100 instances of the same agent is the same as deploying one. The Blueprint defines the spec; the infrastructure handles the scaling.' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Separation of concerns — agent developers define behavior. Platform engineers define Blueprints. Security teams approve Blueprints. Each team owns their domain without blocking the others.' }] }
    ]
  },
  {
    type: 'heading',
    level: 2,
    children: [{ type: 'text', text: 'Getting Started with Blueprints' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Blueprints are available as part of Legible\'s enterprise platform. If you\'re already using Openshell and Nemoclaw, Blueprints are the natural next step — they codify the configurations you\'ve already defined into shareable, versionable, auditable specs.' }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'For new deployments, our team works with your infrastructure and security teams to define an initial Blueprint library tailored to your data sources, compliance requirements, and agent use cases. ' },
      { type: 'link', url: 'mailto:enterprise@legible.io', children: [{ type: 'text', text: 'Contact our team' }] },
      { type: 'text', text: ' to start building your agent Blueprints.' }
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
