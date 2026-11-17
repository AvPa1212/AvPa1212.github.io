export default function Footer() {
  return (
    <footer id="about" className="site-footer">
      <div><p className="eyebrow">Let&apos;s connect</p><h2>Have an interesting problem?</h2></div>
      <a className="footer-link" href="https://github.com/AvPa1212" target="_blank" rel="noreferrer">github.com/AvPa1212 <span>↗</span></a>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Avi Panchasara</span><span>Built with React + TypeScript + Rust/WASM</span><a href="#top">Back to top ↑</a></div>
    </footer>
  );
}
