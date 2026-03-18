const DEFAULT_DBS = ['PostgreSQL', 'MySQL', 'ClickHouse', 'Oracle'];

export default function Logos({ cms }) {
  const databases = cms ?? DEFAULT_DBS;

  return (
    <div id="logos">
      <span className="logos-label">Connects to</span>
      {databases.map((db) => {
        const name = typeof db === 'string' ? db : db.name;
        return <span className="db-chip" key={name}>{name}</span>;
      })}
      <span className="db-chip">+ many more...</span>
    </div>
  );
}
