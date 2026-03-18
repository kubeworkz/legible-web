export default function Hero({ onCTAClick }) {
  return (
    <section id="hero">
      <div className="hero-left">
        <div className="hero-eyebrow fade-up">
          <span className="hero-eyebrow-dot"></span>
          Generative Business Intelligence
        </div>
        <h1 className="hero-title fade-up">
          Your data.<br />
          <span>Plain language.</span><br />
          Accurate answers.
        </h1>
        <p className="hero-sub fade-up">
          Legible connects to your databases and turns natural language questions into verified SQL — instantly. Built for data teams who can't afford to be wrong.
        </p>
        <div className="hero-actions fade-up">
          <button className="btn-primary" onClick={() => onCTAClick('hero-free')}>
            Start for free
          </button>
          <a href="#how" className="btn-ghost">See how it works</a>
        </div>
        <div className="stats-row fade-up">
          {[
            { num: '4+', label: 'databases supported' },
            { num: '<2s', label: 'avg. query time' },
            { num: '100%', label: 'SQL transparent' },
          ].map(({ num, label }) => (
            <div className="stat" key={label}>
              <div className="stat-num">{num}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-terminal">
          <div className="terminal-bar">
            <div className="t-dot r"></div>
            <div className="t-dot y"></div>
            <div className="t-dot g"></div>
            <span className="terminal-label">legible · production_db</span>
          </div>
          <div className="terminal-body">
            <div className="t-comment">// Ask your database anything in plain English</div>
            <div className="t-question">
              <span className="t-question-icon">?</span>
              <span>Show me monthly revenue by product category for the last 6 months, sorted by growth rate</span>
            </div>
            <div className="t-divider"></div>
            <div className="t-sql">
              <span className="sql-kw">SELECT</span>{'\n'}
              {'  '}<span className="sql-fn">DATE_TRUNC</span>(<span className="sql-str">'month'</span>, o.created_at) <span className="sql-kw">AS</span> month,{'\n'}
              {'  '}p.category,{'\n'}
              {'  '}<span className="sql-fn">SUM</span>(oi.quantity * oi.unit_price) <span className="sql-kw">AS</span> revenue,{'\n'}
              {'  '}<span className="sql-fn">ROUND</span>((<span className="sql-fn">SUM</span>(...) - <span className="sql-fn">LAG</span>(<span className="sql-fn">SUM</span>(...)){'\n'}
              {'    '}<span className="sql-kw">OVER</span> (<span className="sql-kw">PARTITION BY</span> p.category{'\n'}
              {'           '}<span className="sql-kw">ORDER BY</span> month)) / <span className="sql-fn">NULLIF</span>(<span className="sql-fn">LAG</span>(...) <span className="sql-kw">OVER</span> (...), <span className="sql-num">0</span>) * <span className="sql-num">100</span>, <span className="sql-num">2</span>) <span className="sql-kw">AS</span> growth_pct{'\n'}
              <span className="sql-kw">FROM</span> orders o{'\n'}
              <span className="sql-kw">JOIN</span> order_items oi <span className="sql-kw">ON</span> o.id = oi.order_id{'\n'}
              <span className="sql-kw">JOIN</span> products p <span className="sql-kw">ON</span> oi.product_id = p.id{'\n'}
              <span className="sql-kw">WHERE</span> o.created_at &gt;= <span className="sql-fn">NOW</span>() - <span className="sql-kw">INTERVAL</span> <span className="sql-str">'6 months'</span>{'\n'}
              <span className="sql-kw">GROUP BY</span> <span className="sql-num">1</span>, <span className="sql-num">2</span>{'\n'}
              <span className="sql-kw">ORDER BY</span> growth_pct <span className="sql-kw">DESC</span><span className="sql-comment">;</span>
            </div>
            <div className="t-result">
              <div className="t-result-label">↳ Results — 6 rows returned</div>
              <table className="t-result-table">
                <thead>
                  <tr>
                    <th>month</th>
                    <th>category</th>
                    <th>revenue</th>
                    <th>growth</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Mar 2026</td><td>Analytics</td><td>$148,320</td><td style={{ color: '#00D4B8' }}>+34.2%</td></tr>
                  <tr><td>Mar 2026</td><td>Integrations</td><td>$92,140</td><td style={{ color: '#00D4B8' }}>+18.7%</td></tr>
                  <tr><td>Mar 2026</td><td>Enterprise</td><td>$310,500</td><td style={{ color: '#00D4B8' }}>+11.3%</td></tr>
                </tbody>
              </table>
              <div className="badge-verified">Query verified · 0 errors · 1.3s</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
