import { motion } from "framer-motion";

export interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live?: string;
  category: "Systems" | "Web & Apps" | "Tools" | "Experiments";
  featured?: boolean;
}

interface Props extends Project {
  index: number;
}

export default function ProjectCard({ title, description, tech, github, live, category, featured, index }: Props) {
  return (
    <motion.article className={`project-card ${featured ? "project-card-featured" : ""}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
      <div className="project-card-top">
        <span className="project-category">{category}</span>
        <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="tech-list">{tech.map((item) => <span key={item}>{item}</span>)}</div>
      <div className="project-links">
        <a href={github} target="_blank" rel="noreferrer">Source <span>↗</span></a>
        {live && <a className="live-link" href={live} target="_blank" rel="noreferrer">Live demo <span>↗</span></a>}
      </div>
    </motion.article>
  );
}
