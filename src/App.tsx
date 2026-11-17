import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import AboutPage from "./pages/AboutPage";
import ResumePage from "./pages/ResumePage";

type Route = "home" | "about" | "resume";

function getRoute(): Route {
  const path = window.location.hash.replace(/^#\/?/, "").split("/")[0];
  return path === "about" || path === "resume" ? path : "home";
}

export default function App() {
  const [route, setRoute] = useState<Route>(getRoute);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(getRoute());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className="app-shell">
      <Navbar />
      {route === "home" && (
        <>
          <Hero />
          <Projects />
        </>
      )}
      {route === "about" && <AboutPage />}
      {route === "resume" && <ResumePage />}
      <Footer />
    </div>
  );
}