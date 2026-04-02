#!/usr/bin/env node
// One-time script to seed the "Openshell" blog post into Strapi's SQLite DB
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const Database = require('/home/ubuntu/legible-cms/node_modules/better-sqlite3');
import crypto from 'crypto';

const DB_PATH = '/home/ubuntu/legible-cms/.tmp/data.db';
const db = new Database(DB_PATH);

const docId = crypto.randomBytes(12).toString('hex').slice(0, 24);
const now = Date.now();
const slug = 'openshell-executing-autonomous-ai-agents-in-sandboxed-environments';
const title = 'Openshell: Executing Autonomous AI Agents in Sandboxed Environments with Kernel-Level Isolation';
const excerpt = 'As AI agents gain the ability to execute code, query databases, and interact with live systems, the attack surface grows exponentially. NVIDIA Openshell provides kernel-level sandboxing that lets agents operate autonomously — without compromising your infrastructure.';
const author = 'Legible Team';

const content = JSON.stringify([
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Autonomous AI agents are no longer theoretical. They write code, invoke APIs, query databases, and orchestrate multi-step workflows — all without human intervention. The productivity gains are real. So are the risks.' }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'When an agent has the ability to execute arbitrary code against live infrastructure, a single hallucinated command can drop a table, exfiltrate data, or open a reverse shell. Traditional container isolation wasn\'t designed for this threat model. You need kernel-level sandboxing — and that\'s exactly what NVIDIA Openshell delivers.' }
    ]
  },
  {
    type: 'heading',
    level: 2,
    children: [{ type: 'text', text: 'The Problem: Agents Need Execution, Execution Needs Boundaries' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'The core tension in agentic AI is simple: useful agents need to do things in the real world, but every action is a potential security event. Today\'s agent frameworks — LangChain, CrewAI, AutoGen — focus on orchestration, not isolation. They assume the execution environment is safe. It isn\'t.' }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Running agent-generated code inside a standard Docker container provides process-level isolation, but containers share the host kernel. A privilege escalation exploit, a container escape via a kernel vulnerability, or even a misconfigured mount can give an agent full host access.' }
    ]
  },
  {
    type: 'heading',
    level: 2,
    children: [{ type: 'text', text: 'What Is NVIDIA Openshell?' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Openshell is NVIDIA\'s open-source sandboxed execution environment purpose-built for AI agents. It provides hardware-enforced isolation at the kernel level — not just process namespaces, but actual security boundaries that prevent agent code from reaching the host system, the network, or other workloads.' }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Key architectural properties of Openshell include:' }
    ]
  },
  {
    type: 'list',
    format: 'unordered',
    children: [
      { type: 'list-item', children: [{ type: 'text', text: 'Kernel-level isolation — each agent session runs in its own lightweight VM with a dedicated kernel, not just a namespaced container. There is no shared kernel attack surface between the agent and the host.' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Ephemeral execution environments — sandboxes are created on-demand and destroyed after each task. No persistent state means no persistent compromise.' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Network policy enforcement — agents can be restricted to specific endpoints, ports, and protocols. By default, outbound network access is denied.' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Filesystem scoping — agents see only the files explicitly mounted into their sandbox. No access to host filesystems, secrets, or environment variables.' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'GPU passthrough with boundaries — agents can access NVIDIA GPUs for inference without gaining access to other GPU workloads or the host CUDA runtime.' }] }
    ]
  },
  {
    type: 'heading',
    level: 2,
    children: [{ type: 'text', text: 'Why Containers Alone Aren\'t Enough' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Containers are a deployment primitive, not a security boundary. The Linux kernel maintainers have been explicit about this: containers were designed for resource isolation, not security isolation. Key limitations include:' }
    ]
  },
  {
    type: 'list',
    format: 'unordered',
    children: [
      { type: 'list-item', children: [{ type: 'text', text: 'Shared kernel — every container on a host shares the same kernel. A kernel exploit in one container compromises all containers and the host.' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Syscall surface — containers have access to hundreds of Linux syscalls by default. Even with seccomp profiles, the attack surface is substantial.' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Escape vectors — CVEs for container escapes are disclosed regularly (e.g., CVE-2024-21626 in runc). In an agentic context, an LLM could be manipulated into exploiting these.' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'No GPU isolation — passing a GPU into a container typically gives the container full access to the GPU device, including the ability to read memory from other GPU workloads.' }] }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Openshell addresses each of these by using microVM technology — each sandbox gets its own kernel, its own minimal syscall surface, and its own GPU access scope.' }
    ]
  },
  {
    type: 'heading',
    level: 2,
    children: [{ type: 'text', text: 'How Legible Uses Openshell' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'At Legible, we\'re integrating Openshell as the execution layer for autonomous query agents. When a user asks a complex, multi-step analytical question, our system decomposes it into sub-queries, generates SQL, and may need to execute intermediate transformations — joining results, running aggregations, or post-processing data with Python.' }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Each of those execution steps runs inside an Openshell sandbox:' }
    ]
  },
  {
    type: 'list',
    format: 'unordered',
    children: [
      { type: 'list-item', children: [{ type: 'text', text: 'SQL queries execute against read-only database replicas via network-scoped connections — the agent cannot write, alter, or drop.' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Python post-processing runs in an ephemeral sandbox with only pandas and numpy available — no subprocess, no socket, no os.system.' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Results are extracted through a controlled output channel — the agent cannot smuggle data out through side channels.' }] }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'The result is a system where agents can operate with genuine autonomy — no human-in-the-loop approval for every step — because the blast radius of any individual action is architecturally contained.' }
    ]
  },
  {
    type: 'heading',
    level: 2,
    children: [{ type: 'text', text: 'Threat Model: What Openshell Defends Against' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Openshell\'s isolation model is designed to defend against realistic agentic threats:' }
    ]
  },
  {
    type: 'list',
    format: 'unordered',
    children: [
      { type: 'list-item', children: [{ type: 'text', text: 'Prompt injection leading to code execution — if an attacker injects malicious instructions into a data source that an agent reads, the sandboxed environment limits the damage to the ephemeral sandbox.' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Hallucinated destructive commands — an agent that hallucinates a DROP TABLE or rm -rf command cannot execute it against real infrastructure because the sandbox has no write access.' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Supply chain attacks via agent tooling — malicious packages or tools that an agent is tricked into installing cannot escape the sandbox or persist between sessions.' }] },
      { type: 'list-item', children: [{ type: 'text', text: 'Data exfiltration — even if an agent is compromised, network policies prevent it from making outbound connections to attacker-controlled servers.' }] }
    ]
  },
  {
    type: 'heading',
    level: 2,
    children: [{ type: 'text', text: 'Performance Considerations' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'The natural concern with VM-level isolation is overhead. Openshell uses lightweight microVMs that boot in under 200 milliseconds — comparable to container startup times. Memory overhead per sandbox is approximately 32MB. For Legible\'s workloads, the latency difference between a containerised and an Openshell-sandboxed execution is negligible relative to the LLM inference time that dominates overall response latency.' }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'For GPU-accelerated inference tasks, Openshell\'s vGPU partitioning adds less than 5% overhead compared to bare-metal GPU access. The security benefit far outweighs the marginal performance cost.' }
    ]
  },
  {
    type: 'heading',
    level: 2,
    children: [{ type: 'text', text: 'Getting Started with Openshell' }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'Openshell is open-source and available on NVIDIA\'s GitHub. It supports deployment on any Linux host with KVM support and optionally NVIDIA GPUs. For Legible customers, Openshell integration is available as part of our on-premise deployment — our team handles the configuration and network policy setup as part of the standard onboarding process.' }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'If your team is deploying autonomous agents — for data access, code generation, workflow automation, or any task that touches live infrastructure — sandboxed execution isn\'t optional. It\'s the difference between a productive tool and a liability. Openshell makes it practical.' }
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
