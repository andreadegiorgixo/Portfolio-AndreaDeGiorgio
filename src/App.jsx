import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import AmbientBackground from "./components/AmbientBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Footer from "./components/Footer";

function useHashRoute() {
  const [route, setRoute] = useState(() => window.location.hash.replace(/^#/, ""));

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash.replace(/^#/, ""));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return route;
}

function App() {
  const route = useHashRoute();
  const isPrivacyPage = route === "privacy";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isPrivacyPage]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative font-body">
        <AmbientBackground />
        <Navbar />
        <main>
          {isPrivacyPage ? (
            <PrivacyPolicy />
          ) : (
            <>
              <Hero />
              <About />
              <Skills />
              <Experience />
              <Projects />
              <Contact />
            </>
          )}
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;
