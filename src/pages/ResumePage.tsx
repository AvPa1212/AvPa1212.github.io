import { motion } from "framer-motion";

const skills = ["C++", "TypeScript", "Java", "Python", "React", "Next.js", "Rust/WASM", "Git", "Linux"];

export default function ResumePage() {
  return (
    <motion.main className="secondary-page resume-page" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
      <div className="page-intro resume-heading">
        <div><p className="eyebrow">Redacted resume</p><h1>Avi Panchasara<span>.</span></h1><p className="page-lede">Electrical Engineering student · Virginia Tech · Class of 2029</p></div>
        <button className="button button-primary print-button" onClick={() => window.print()}>Print / save PDF <span>↓</span></button>
      </div>
      <div className="privacy-note"><span>●</span> PII removed: no phone, email, street address, or personal identifiers are included.</div>
      <div className="resume-layout">
        <section className="resume-block"><p className="eyebrow">Profile</p><p>Systems-minded student developer interested in computer architecture, embedded systems, and performance optimization. I enjoy turning technical experiments into clear, working software.</p></section>
        <section className="resume-block"><p className="eyebrow">Selected projects</p><div className="resume-item"><h3>PhysEngine</h3><p>2D rigid-body simulation with impulse-based collision resolution and browser delivery.</p><span>C++ · Physics · WebAssembly</span></div><div className="resume-item"><h3>Live Tech Internships</h3><p>Automated, freshness-sorted directory of open technology roles from public sources.</p><span>Python · Automation · Data</span></div><div className="resume-item"><h3>Kana Dojo</h3><p>Minimalist Japanese-learning platform designed for focused, repeatable practice.</p><span>Next.js · TypeScript · UI</span></div></section>
        <section className="resume-block"><p className="eyebrow">Technical skills</p><div className="resume-skills">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></section>
        <section className="resume-block"><p className="eyebrow">Links</p><a className="resume-link" href="https://github.com/AvPa1212" target="_blank" rel="noreferrer">github.com/AvPa1212 ↗</a><a className="resume-link" href="https://avpa1212.github.io">avpa1212.github.io ↗</a></section>
      </div>
      <a className="download-note" href="/avi-panchasara-resume-redacted.txt" download>Download the redacted text version ↧</a>
    </motion.main>
  );
}
