export default function Footer() {
  return (
    <footer
      style={{
        padding: "3rem 2rem",
        borderTop: "1px solid #222",
        textAlign: "center",
        color: "var(--muted)"
      }}
    >
      © {new Date().getFullYear()} Avi Panchasara
    </footer>
  );
}