import { useEffect } from "react";
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
import { routeToPage, useHashRoute } from "./routes";

function Page({ page }) {
  switch (page) {
    case "experience":
      return <Experience />;
    case "projects":
      return <Projects />;
    case "contact":
      return <Contact />;
    case "privacy":
      return <PrivacyPolicy />;
    default:
      return (
        <>
          <Hero />
          <About />
          <Skills />
        </>
      );
  }
}

function App() {
  const route = useHashRoute();
  const page = routeToPage(route);

  // Cambio pagina: si riparte dall'alto. Dentro la home (#about, #skills)
  // si scorre invece fino alla sezione richiesta.
  useEffect(() => {
    const target = page === "home" && route ? document.getElementById(route) : null;
    if (target) target.scrollIntoView();
    else window.scrollTo({ top: 0, behavior: "instant" });
  }, [route, page]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative flex min-h-dvh flex-col font-body">
        <AmbientBackground />
        <Navbar page={page} />
        <main className="flex-1">
          <Page page={page} />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;
