export default function Navbar() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Avi Panchasara home">
        <span className="brand-mark">AP</span>
        <span>avi<span className="brand-dot">.</span>dev</span>
      </a>
      <nav className="nav-links" aria-label="Primary navigation">
        <a href="#work">Work</a>
        <a href="#/about">About</a>
        <a href="#/resume">Resume</a>
        <a className="nav-github" href="https://github.com/AvPa1212" target="_blank" rel="noreferrer">
          GitHub <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
