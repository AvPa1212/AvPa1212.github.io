export default function Navbar() {
  return (
    <nav
      style={{
        padding: "1.5rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #222"
      }}
    >
      <div style={{ fontWeight: 700 }}>AVPA</div>
      <div style={{ display: "flex", gap: "2rem", color: "var(--muted)" }}>
        <a href="#projects">Projects</a>
        <a href="https://github.com/AvPa1212" target="_blank">
          GitHub
        </a>
      </div>
    </nav>
  );
}