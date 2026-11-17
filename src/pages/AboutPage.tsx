import { motion } from "framer-motion";

const interests = ["Computer architecture", "Embedded systems", "Performance", "Developer tools", "Technical UI"];

export default function AboutPage() {
  return (
    <motion.main className="secondary-page" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
      <div className="page-intro">
        <p className="eyebrow">A little context</p>
        <h1>About me<span>.</span></h1>
        <p className="page-lede">I&apos;m Avi, an Electrical Engineering student at Virginia Tech who likes understanding how things work all the way down — then making them useful.</p>
      </div>
      <div className="about-grid">
        <section className="about-panel">
          <p className="eyebrow">What I&apos;m about</p>
          <p>I build at the intersection of software and hardware: simulation engines, data tools, small web products, and experiments that make technical ideas easier to explore.</p>
          <p>My current focus is growing stronger in C++, Java, and TypeScript while learning more about computer architecture, embedded systems, and performance-conscious engineering.</p>
        </section>
        <section className="about-panel">
          <p className="eyebrow">Things I keep returning to</p>
          <div className="interest-list">{interests.map((interest, index) => <motion.div key={interest} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.08 + 0.2 }}><span>{String(index + 1).padStart(2, "0")}</span>{interest}</motion.div>)}</div>
        </section>
      </div>
      <div className="about-quote">“Make it understandable. Make it useful. Then make it fast.”</div>
      <div className="page-actions"><a className="button button-primary" href="#/resume">View redacted resume <span>→</span></a><a className="button button-quiet" href="#work">See selected work ↓</a></div>
    </motion.main>
  );
}
