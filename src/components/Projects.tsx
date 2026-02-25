import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects">
      <h2 style={{ fontSize: "2.5rem", marginBottom: "3rem" }}>
        Projects
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
        }}
      >
        <ProjectCard
          title="C++ Physics Engine"
          description="Rigid body simulation with collision detection and numerical integration."
          tech={["C++", "CMake", "Physics", "Linear Algebra", "Quantum", "Python"]}
          github="https://github.com/AvPa1212/PhysEngine"
        />

        {/* Add more real projects here */}
      </motion.div>
    </section>
  );
}