import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <motion.p className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          Electrical engineering · Virginia Tech
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          I build things<br /><span>that make sense.</span>
        </motion.h1>
        <motion.p className="hero-description" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
          I&apos;m Avi — a student developer exploring systems, performance, and useful software through hands-on projects.
        </motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <a className="button button-primary" href="#work">Explore my work <span>↓</span></a>
          <a className="button button-quiet" href="https://github.com/AvPa1212" target="_blank" rel="noreferrer">View GitHub ↗</a>
        </motion.div>
      </div>
      <motion.div className="hero-orbit" aria-hidden="true" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
        <div className="orbit-ring orbit-ring-one" />
        <div className="orbit-ring orbit-ring-two" />
        <div className="orbit-core"><span>AP</span></div>
        <span className="orbit-label label-top">C++</span>
        <span className="orbit-label label-right">TypeScript</span>
        <span className="orbit-label label-bottom">systems</span>
      </motion.div>
    </section>
  );
}
