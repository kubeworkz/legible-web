const DBS = ['PostgreSQL', 'MySQL', 'ClickHouse', 'Oracle', '+ many more...'];

export default function Logos() {
  return (
    <div id="logos">
      <span className="logos-label">Connects to</span>
      {DBS.map((db) => (
        <span className="db-chip" key={db}>{db}</span>
      ))}
    </div>
  );
}
