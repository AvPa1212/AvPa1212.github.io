import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section>
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          background: "linear-gradient(90deg, var(--accent), var(--accent2))",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Avi Panchasara
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        style={{
          fontSize: "1.3rem",
          color: "var(--muted)",
          maxWidth: 650,
          marginTop: "1.5rem",
        }}
      >
        Electrical Engineering student building simulation engines,
        performant systems, and full-stack applications.
      </motion.p>
    </section>
  );
}