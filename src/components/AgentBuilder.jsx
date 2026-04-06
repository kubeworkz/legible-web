export default function AgentBuilder() {
  return (
    <section id="agent-builder">
      <div className="ab-inner">
        <div className="ab-content" data-reveal>
          <span className="ab-badge">NEW FEATURE</span>
          <h2 className="section-title">
            Build custom AI agents.<br />Deploy in a secure sandbox.
          </h2>
          <p className="ab-desc">
            Agent Builder lets you create versioned, deployable AI agents powered by your semantic layer — each running inside a kernel-isolated sandbox. Define behavior with a system prompt, choose your model, publish immutable versions, and expose agents via REST API. All from the CLI or the web UI.
          </p>
          <div className="ab-highlights">
            <div className="ab-highlight" data-reveal>
              <span className="ab-highlight-icon">🔒</span>
              <div>
                <h4>Sandboxed Execution</h4>
                <p>Every agent session runs in an isolated Openshell microVM. No shared kernel, no lateral movement, no persistent state between sessions.</p>
              </div>
            </div>
            <div className="ab-highlight" data-reveal>
              <span className="ab-highlight-icon">🔄</span>
              <div>
                <h4>Versioned &amp; Immutable</h4>
                <p>Publish immutable snapshots of your agent config. Roll back instantly. Track every change with version history and notes.</p>
              </div>
            </div>
            <div className="ab-highlight" data-reveal>
              <span className="ab-highlight-icon">⚡</span>
              <div>
                <h4>Deploy as API</h4>
                <p>One command to expose any agent as a REST endpoint. Create sessions, send messages, and integrate agents into your existing workflows.</p>
              </div>
            </div>
            <div className="ab-highlight" data-reveal>
              <span className="ab-highlight-icon">💬</span>
              <div>
                <h4>Interactive Chat</h4>
                <p>Test agents directly from the CLI with a built-in REPL. See tool calls, reasoning steps, and final answers in real time.</p>
              </div>
            </div>
          </div>
          <div className="ab-actions" data-reveal>
            <a className="ab-cta" href="https://docs.legiblequery.ai/agents/agent-builder" target="_blank" rel="noopener noreferrer">
              Read the docs →
            </a>
            <a className="ab-cta-outline" href="https://legible.legiblequery.ai">
              Try Agent Builder →
            </a>
          </div>
        </div>
        <div className="ab-terminal" data-reveal>
          <div className="ab-terminal-bar">
            <span className="ab-terminal-dot" style={{ background: '#ff5f57' }}></span>
            <span className="ab-terminal-dot" style={{ background: '#febc2e' }}></span>
            <span className="ab-terminal-dot" style={{ background: '#28c840' }}></span>
            <span className="ab-terminal-title">legible agent-builder</span>
          </div>
          <div className="ab-terminal-body">
            <code>
              <span className="ab-prompt">$</span> legible ab create \{'\n'}
              {'  '}--name <span className="ab-str">"Revenue Analyst"</span> \{'\n'}
              {'  '}--model <span className="ab-val">gpt-4o</span> \{'\n'}
              {'  '}--system-prompt <span className="ab-str">"You are a revenue analyst."</span> \{'\n'}
              {'  '}--temperature <span className="ab-val">0.3</span>{'\n'}
              {'\n'}
              <span className="ab-ok">✓</span> Agent created <span className="ab-dim">(id: 5, status: draft)</span>{'\n'}
              {'\n'}
              <span className="ab-prompt">$</span> legible ab publish <span className="ab-val">5</span> --note <span className="ab-str">"Initial version"</span>{'\n'}
              <span className="ab-ok">✓</span> Published v1{'\n'}
              {'\n'}
              <span className="ab-prompt">$</span> legible ab deploy <span className="ab-val">5</span>{'\n'}
              <span className="ab-ok">✓</span> Deployed — API live at <span className="ab-dim">/api/v1/agents/5/sessions</span>{'\n'}
              {'\n'}
              <span className="ab-prompt">$</span> legible ab chat <span className="ab-val">5</span>{'\n'}
              <span className="ab-dim">╭────────────────────────────────────────╮</span>{'\n'}
              <span className="ab-dim">│ Chat with "Revenue Analyst" (v1)     │</span>{'\n'}
              <span className="ab-dim">╰────────────────────────────────────────╯</span>{'\n'}
              <span className="ab-you">you&gt;</span> What was total revenue last quarter?{'\n'}
              {'  '}<span className="ab-dim">⚙ Tool: run_sql</span>{'\n'}
              <span className="ab-agent">agent&gt;</span> Last quarter's total revenue was <span className="ab-val">$2,450,000</span>.
            </code>
          </div>
        </div>
      </div>
    </section>
  );
}
