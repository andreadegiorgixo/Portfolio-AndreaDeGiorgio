import { useEffect, useState } from "react";

// Pagine del sito (routing a hash: nessuna configurazione lato server).
//   home        -> Chi sono (hero + chi sono + competenze)   #top, #about, #skills
//   experience  -> Percorso (professionale e formativo)      #experience
//   projects    -> Progetti                                  #projects
//   contact     -> Contatti + form                           #contact
//   privacy     -> Privacy Policy                            #privacy
const PAGE_BY_ROUTE = {
  experience: "experience",
  projects: "projects",
  contact: "contact",
  privacy: "privacy",
};

export function routeToPage(route) {
  return PAGE_BY_ROUTE[route] ?? "home";
}

const readRoute = () => window.location.hash.replace(/^#/, "");

export function useHashRoute() {
  const [route, setRoute] = useState(readRoute);

  useEffect(() => {
    const onHashChange = () => setRoute(readRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return route;
}
