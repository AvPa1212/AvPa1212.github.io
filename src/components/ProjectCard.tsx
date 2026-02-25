import { motion } from "framer-motion";

interface Props {
  title: string;
  description: string;
  tech: string[];
  github: string;
}

export default function ProjectCard({
  title,
  description,
  tech,
  github,
}: Props) {
  return (
    <a
      href={github}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 200 }}
        style={{
          background: "var(--card)",
          padding: "2rem",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.05)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(6,182,212,0.15))",
            opacity: 0,
            transition: "0.3s",
            pointerEvents: "none",
          }}
          className="glow pointer-events-none"
        />

        <h3 style={{ fontSize: "1.4rem" }}>{title}</h3>

        <p style={{ color: "var(--muted)", marginTop: "1rem" }}>
          {description}
        </p>

        <div
          style={{
            marginTop: "1.5rem",
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
          }}
        >
          {tech.map((t) => (
            <span
              key={t}
              style={{
                background: "#1f1f2a",
                padding: "0.35rem 0.7rem",
                borderRadius: "8px",
                fontSize: "0.8rem",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <p
          style={{
            marginTop: "1.5rem",
            color: "var(--accent)",
            cursor: "pointer",
          }}
        >
          View Source →
        </p>
      </motion.div>
    </a>
  );
}