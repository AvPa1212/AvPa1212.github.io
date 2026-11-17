import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <Hero />
      <Projects />
      <Footer />
    </div>
  );
}