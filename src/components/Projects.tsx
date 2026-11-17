import { useMemo, useState } from "react";
import ProjectCard, { type Project } from "./ProjectCard";
import WiresharkAnalyzer from "./WiresharkAnalyzer";

const projects: Project[] = [
  { title: "PhysEngine", description: "A 2D rigid-body physics engine with impulse-based collision resolution, AABB detection, and a browser demo.", tech: ["C++", "Physics", "WebAssembly"], github: "https://github.com/AvPa1212/PhysEngine", live: "https://phys-todo-list.vercel.app", category: "Systems", featured: true },
  { title: "Live Tech Internships", description: "A freshness-sorted directory of thousands of open technology roles, normalized and updated automatically from public sources.", tech: ["Python", "Automation", "Data"], github: "https://github.com/AvPa1212/live-tech-internships", category: "Tools", featured: true },
  { title: "Kana Dojo", description: "A focused, minimalist platform for learning Japanese kana through quick, repeatable practice.", tech: ["Next.js", "TypeScript", "UI"], github: "https://github.com/AvPa1212/kana-dojo", live: "https://kanadojo.com", category: "Web & Apps" },
  { title: "StrikeSense", description: "A web experience for exploring baseball strike-zone data and turning it into useful visual feedback.", tech: ["Python", "Data", "Web"], github: "https://github.com/AvPa1212/StrikeSense", live: "https://strike-sense-three.vercel.app", category: "Web & Apps" },
  { title: "Circuit Simulator", description: "An online display and playground for circuit simulator code, connecting hardware curiosity with approachable interfaces.", tech: ["HTML", "Circuits", "JavaScript"], github: "https://github.com/AvPa1212/Circuit-Simulator", category: "Experiments" },
  { title: "VibeCalc", description: "A practical calculator app experiment built for quick, friendly interactions on mobile.", tech: ["Dart", "Flutter"], github: "https://github.com/AvPa1212/VibeCalc", category: "Web & Apps" },
  { title: "EnderGames", description: "A teleporting-themed Kit SurvivalGames mode with random maps and classic post-1.8 PvP.", tech: ["Java", "Minecraft", "Game design"], github: "https://github.com/AvPa1212/EnderGames", category: "Experiments" },
  { title: "Pirate Hunt", description: "A game prototype exploring playful multiplayer mechanics and themed interaction.", tech: ["Game dev", "Java"], github: "https://github.com/AvPa1212/Pirate-Hunt", category: "Experiments" },
];

const categories = ["All", "Systems", "Web & Apps", "Tools", "Experiments"] as const;

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");
  const visibleProjects = useMemo(() => projects.filter((project) => {
    const matchesCategory = activeCategory === "All" || project.category === activeCategory;
    const searchText = `${project.title} ${project.description} ${project.tech.join(" ")}`.toLowerCase();
    return matchesCategory && searchText.includes(query.toLowerCase());
  }), [activeCategory, query]);

  return (
    <>
      <section className="work-section" id="work">
        <div className="section-heading">
          <div><p className="eyebrow">Selected work</p><h2>Things I&apos;ve built<span>.</span></h2></div>
          <p className="section-note">A growing collection of technical experiments, practical tools, and systems-focused builds.</p>
        </div>
        <div className="project-toolbar">
          <div className="category-tabs" role="tablist" aria-label="Filter projects">
            {categories.map((category) => <button key={category} className={activeCategory === category ? "active" : ""} onClick={() => setActiveCategory(category)}>{category}</button>)}
          </div>
          <label className="search-box"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects" aria-label="Search projects" /></label>
        </div>
        <div className="project-grid">
          {visibleProjects.map((project, index) => <ProjectCard key={project.title} {...project} index={index} />)}
        </div>
        {visibleProjects.length === 0 && <div className="empty-state">No projects match that search.</div>}
      </section>
      <section className="lab-section" id="lab">
        <div className="section-heading compact"><div><p className="eyebrow">Interactive lab</p><h2>See code in motion<span>.</span></h2></div><p className="section-note">Upload a Wireshark CSV export and inspect its traffic at a glance.</p></div>
        <WiresharkAnalyzer />
      </section>
    </>
  );
}
