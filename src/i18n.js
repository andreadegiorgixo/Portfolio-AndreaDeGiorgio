export const translations = {
  it: {
    nav: {
      about: "Chi sono",
      skills: "Competenze",
      experience: "Percorso",
      projects: "Progetti",
      contact: "Contatti",
      cta: "Contattami",
      openMenu: "Apri menu",
      closeMenu: "Chiudi menu",
    },
    hero: {
      location: "Taranto & Bari, Puglia, Italia",
      greeting: "Ciao, sono",
      description:
        "Junior PMO e Software Engineer in EY: dal project management allo sviluppo software. Lavoro con Java, Spring Boot, Oracle e Docker, unendo visione di progetto e competenze tecniche.",
      contact: "Contattami",
      cv: "Scarica CV",
      workspace: "my workspace ✨",
      scrollDown: "Scorri verso il basso",
    },
    about: {
      eyebrow: "Chi sono",
      title: "Ciao, sono Andrea.",
      role: "PMO & Junior Software Engineer",
      stack: "Java | Spring Boot | Oracle | Docker",
      introEnd: ", con competenze in",
      afterStack: ". Dal project management allo sviluppo software.",
      paragraph:
        "Ho iniziato come tecnico IT e oggi unisco due prospettive: la gestione dei progetti e la comprensione tecnica di come il software viene realizzato. Sapere come si costruisce un'applicazione mi aiuta a stimare meglio, a individuare prima criticità e ritardi e a parlare in modo efficace sia con i team tecnici sia con il management.",
      badge: "PMO & Junior Software Engineer",
      facts: [
        { label: "Ruolo", value: "PMO & Software Engineer" },
        { label: "Sede", value: "Taranto & Bari" },
        { label: "Lingue", value: "Italiano & Inglese" },
        { label: "Status", value: "Aperto a opportunità" },
      ],
    },
    skills: {
      eyebrow: "Skills",
      title: "Cosa so fare",
      stackCaption: "Tech stack & strumenti",
      levels: ["Avanzato", "Intermedio", "Avanzato", "Base"],
    },
    experience: {
      eyebrow: "Percorso",
      title: "Esperienza e formazione",
      workCaption: "Experience",
      workTitle: "Dove ho lavorato",
      eduCaption: "Education",
      eduTitle: "Cosa ho studiato",
      work: [
        {
          period: "Nov 2026 — Presente",
          role: "Junior Project Management Office @ EY",
          place: "Bari, Puglia, Italia",
          bullets: [
            "Attualmente in fase di onboarding sul progetto: presa in carico del contesto, degli obiettivi, delle milestone e dei processi di governance in uso.",
            "Supporto alla stima di tempi ed effort delle attività progettuali, in affiancamento al Project Manager.",
            "Monitoraggio dell'avanzamento rispetto al piano e individuazione tempestiva di ritardi, scostamenti e criticità.",
            "Aggiornamento periodico dello stato dei progetti e tracciamento di rischi e issue aperte.",
            "Preparazione di presentazioni e report di sintesi per manager e stakeholder.",
            "Tool — Excel: costruzione e manutenzione di piani di avanzamento, tracker e report di stato.",
          ],
        },
        {
          period: "Nov 2024 — Nov 2026",
          role: "Gestione Ticket & Client Support @ EY",
          place: "Bari, Puglia, Italia",
          bullets: [
            "Analisi e troubleshooting su database Oracle: scrittura di query SQL per filtrare i dati e individuare la causa delle anomalie segnalate sul software interno del cliente.",
            "Gestione di circa 230 ticket al giorno su Salesforce per due enti della Pubblica Amministrazione centrale, nel rispetto degli SLA previsti.",
            "Prioritizzazione dei ticket in un contesto ad alto volume, distinguendo richieste normative e richieste tecniche.",
            "Collaborazione quotidiana con il team di supporto per lo smaltimento coordinato delle richieste.",
          ],
        },
      ],
      education: [
        {
          period: "Apr 2024 — Lug 2024",
          role: "Generation Italy",
          place: "Sviluppatore Java Junior",
          desc: "Programma intensivo di formazione full stack: sviluppo front-end con HTML5, CSS3 e JavaScript (ES6+), programmazione orientata agli oggetti, sviluppo back-end con Java e principi della metodologia Agile.",
        },
        {
          period: "Set 2017 — Giu 2021",
          role: 'I.I.S.S. "A. Righi", Taranto',
          place: "Diploma Istituto Tecnico e Professionale",
          desc: "Indirizzo in programmazione, networking e sistemi informativi: basi di programmazione (C, C++), database relazionali (MySQL), reti e telecomunicazioni, architettura dei computer, sistemi operativi e sicurezza informatica.",
        },
      ],
      testimonials: {
        caption: "Testimonianze",
        title: "Cosa dicono di me",
        items: [
          {
            name: "Francesco De Giorgio",
            quote:
              "È stato davvero un piacere lavorare con Andrea: professionale, attento ai dettagli e sempre disponibile. Sono certo che resteremo in contatto anche per le prossime occasioni.",
          },
          {
            name: "Gabriele Schina",
            quote:
              "Lavorare con Andrea è stata un'esperienza molto positiva, serio, preciso e affidabile in ogni fase. Sicuramente resteremo in contatto.",
          },
          {
            name: "Marco Pisani",
            quote:
              "È stato un piacere collaborare con Andrea: competente, puntuale e sempre pronto ad ascoltare le esigenze. Non vedo l'ora di restare in contatto per nuove occasioni di collaborazione.",
          },
          {
            name: "Salvatore Labriola",
            quote:
              "Andrea mi ha creato un bel sito web per il mio salone di parrucchieri: mi è stato davvero tanto utile per farmi conoscere e vendermi nel mondo online. Consigliatissimo!",
          },
        ],
      },
    },
    projects: {
      eyebrow: "Projects",
      title: "Alcuni lavori realizzati",
      description:
        "Dalle applicazioni full stack ai siti web per attività locali: progetti realizzati con attenzione a struttura, interfaccia e cura dei dettagli.",
      visit: "Visita il progetto",
      visitGithub: "Vedi su GitHub",
      items: [
        {
          name: "Candidate",
          desc: "Web app personale per seguire la ricerca di lavoro e capire ogni giorno cosa fare. Ogni candidatura è un viaggio lungo una linea di sei fermate, dall'attesa all'assunzione, con colloqui, aziende, offerte, CV e grafici sull'andamento. Backend Spring Boot con autenticazione JWT, PostgreSQL in Docker con schema Flyway e test con Testcontainers; frontend Angular 22.",
        },
        {
          name: "ProPass",
          desc: "Password manager full stack con Spring Boot, Oracle in Docker e Angular. Registrazione e login con Argon2, sessione con protezione CSRF e vault personale con ricerca. Progetto didattico: prossimo passo, cifratura zero-knowledge lato client.",
        },
        {
          name: "Ristorandoti",
          desc: "Social network verticale che connette professionisti e aziende della ristorazione: profili, pagine aziendali, feed, offerte di lavoro, recensioni e follow. Spring Security con OAuth2 e RBAC, Oracle con Flyway, Redis, WebSocket, Testcontainers e frontend Angular.",
        },
        {
          name: "BLS | Barber Labriola Salvatore",
          desc: "Sito per un salone storico di Taranto, attivo dal 1960: galleria lavori, recensioni, orari e listino prezzi, con contatti a un tap di distanza. Design responsive pensato prima di tutto per il mobile.",
        },
        {
          name: "ITES Srl",
          desc: "Sito aziendale per ITES, realtà di Taranto nei servizi IT ed elettrici: narrazione aziendale con timeline interattiva, brochure scaricabile e collegamenti diretti a contatti, PEC e social.",
        },
        {
          name: "Tabaccheria Lama",
          desc: "Una landing page più diretta e orientata all'immagine, costruita per valorizzare il brand con una presenza online elegante, contemporanea e pensata prima di tutto per il mobile.",
        },
      ],
    },
    contact: {
      badge: "Parliamone",
      title: "Restiamo in contatto",
      description:
        "Se vuoi scrivermi per collaborazioni, progetti o semplicemente per fare networking, qui trovi i miei principali riferimenti.",
      form: {
        name: "Nome",
        namePlaceholder: "Il tuo nome",
        email: "Email",
        emailPlaceholder: "La tua email",
        message: "Messaggio",
        messagePlaceholder: "Scrivi qui il tuo messaggio...",
        send: "Invia messaggio",
        sending: "Invio in corso...",
        success: "Messaggio inviato! Ti risponderò al più presto.",
        error: "Invio non riuscito. Riprova più tardi o scrivimi direttamente via email.",
        privacyLabel: "Ho letto e accetto la",
        privacyLinkText: "Privacy Policy",
        privacyRequiredError: "Devi accettare la Privacy Policy per inviare il messaggio.",
      },
    },
    privacy: {
      badge: "Documento legale",
      title: "Privacy Policy",
      backHome: "Torna alla home",
      intro:
        "Questa pagina descrive le modalità di trattamento dei dati personali degli utenti che compilano il form di contatto presente su questo sito, in conformità al Regolamento UE 2016/679 (GDPR).",
      sections: [
        {
          heading: "Titolare del trattamento",
          body: "Il Titolare del trattamento dei dati è Andrea De Giorgio, contattabile all'indirizzo email degiorgio.andrea2003@gmail.com.",
        },
        {
          heading: "Dati raccolti",
          body: "Attraverso il form di contatto vengono raccolti esclusivamente i dati forniti volontariamente dall'utente: nome, indirizzo email e contenuto del messaggio.",
        },
        {
          heading: "Finalità del trattamento",
          body: "I dati raccolti sono utilizzati unicamente per rispondere alle richieste di contatto inviate tramite il form del sito e per eventuali comunicazioni relative a collaborazioni o progetti richiesti dall'utente.",
        },
        {
          heading: "Base giuridica",
          body: "Il trattamento è basato sul consenso esplicito dell'utente, espresso tramite la spunta dell'apposita casella prima dell'invio del messaggio (art. 6.1.a GDPR).",
        },
        {
          heading: "Modalità e conservazione dei dati",
          body: "I dati vengono trasmessi via email e conservati esclusivamente per il tempo necessario a evadere la richiesta, salvo diversi obblighi di legge.",
        },
        {
          heading: "Comunicazione e diffusione",
          body: "I dati raccolti non vengono comunicati a terzi né diffusi, salvo obblighi previsti dalla legge.",
        },
        {
          heading: "Diritti dell'interessato",
          body: "In qualsiasi momento è possibile esercitare i diritti di accesso, rettifica, cancellazione, limitazione, opposizione e portabilità dei propri dati, previsti dagli articoli 15-22 del GDPR, scrivendo all'indirizzo email indicato sopra. È inoltre possibile proporre reclamo al Garante per la protezione dei dati personali.",
        },
      ],
    },
    footer: (year) => `© ${year} Andrea De Giorgio. All rights reserved.`,
    theme: { light: "Chiaro", dark: "Scuro", system: "Sistema", label: "Tema" },
  },

  en: {
    nav: {
      about: "About",
      skills: "Skills",
      experience: "Journey",
      projects: "Projects",
      contact: "Contact",
      cta: "Get in touch",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      location: "Taranto & Bari, Puglia, Italy",
      greeting: "Hi, I'm",
      description:
        "Junior PMO and Software Engineer at EY: from project management to software development. I work with Java, Spring Boot, Oracle and Docker, combining a project-level view with technical skills.",
      contact: "Get in touch",
      cv: "Download CV",
      workspace: "my workspace ✨",
      scrollDown: "Scroll down",
    },
    about: {
      eyebrow: "About",
      title: "Hi, I'm Andrea.",
      role: "PMO & Junior Software Engineer",
      stack: "Java | Spring Boot | Oracle | Docker",
      introEnd: ", skilled in",
      afterStack: ". From project management to software development.",
      paragraph:
        "I started as an IT technician and today I combine two perspectives: managing projects and understanding, technically, how software is built. Knowing how an application is made helps me estimate better, spot issues and delays earlier, and talk effectively with both technical teams and management.",
      badge: "PMO & Junior Software Engineer",
      facts: [
        { label: "Role", value: "PMO & Software Engineer" },
        { label: "Based in", value: "Taranto & Bari" },
        { label: "Languages", value: "Italian & English" },
        { label: "Status", value: "Open to opportunities" },
      ],
    },
    skills: {
      eyebrow: "Skills",
      title: "What I can do",
      stackCaption: "Tech stack & tools",
      levels: ["Advanced", "Intermediate", "Advanced", "Basic"],
    },
    experience: {
      eyebrow: "Journey",
      title: "Experience & education",
      workCaption: "Experience",
      workTitle: "Where I've worked",
      eduCaption: "Education",
      eduTitle: "What I've studied",
      work: [
        {
          period: "Nov 2026 — Present",
          role: "Junior Project Management Office @ EY",
          place: "Bari, Puglia, Italy",
          bullets: [
            "Currently onboarding on the project: getting up to speed on the context, objectives, milestones and the governance processes in place.",
            "Support in estimating the time and effort of project activities, working alongside the Project Manager.",
            "Monitoring progress against the plan and promptly spotting delays, deviations and critical issues.",
            "Periodic updates on project status and tracking of risks and open issues.",
            "Preparation of presentations and summary reports for managers and stakeholders.",
            "Tool — Excel: building and maintaining progress plans, trackers and status reports.",
          ],
        },
        {
          period: "Nov 2024 — Nov 2026",
          role: "Ticket Management & Client Support @ EY",
          place: "Bari, Puglia, Italy",
          bullets: [
            "Analysis and troubleshooting on Oracle databases: writing SQL queries to filter data and identify the root cause of issues reported on the client's internal software.",
            "Handling around 230 tickets per day on Salesforce for two central Public Administration bodies, in compliance with the agreed SLAs.",
            "Ticket prioritization in a high-volume context, distinguishing between regulatory and technical requests.",
            "Daily collaboration with the support team to clear requests in a coordinated way.",
          ],
        },
      ],
      education: [
        {
          period: "Apr 2024 — Jul 2024",
          role: "Generation Italy",
          place: "Junior Java Developer",
          desc: "Intensive full stack training program: front-end development with HTML5, CSS3 and JavaScript (ES6+), object-oriented programming, back-end development with Java, and Agile methodology principles.",
        },
        {
          period: "Sep 2017 — Jun 2021",
          role: 'I.I.S.S. "A. Righi", Taranto',
          place: "Technical & Vocational High School Diploma",
          desc: "Focus on programming, networking and information systems: programming fundamentals (C, C++), relational databases (MySQL), networks and telecommunications, computer architecture, operating systems and cybersecurity.",
        },
      ],
      testimonials: {
        caption: "Testimonials",
        title: "What people say about me",
        items: [
          {
            name: "Francesco De Giorgio",
            quote:
              "It was truly a pleasure working with Andrea: professional, detail-oriented and always available. I'm sure we'll stay in touch for future opportunities too.",
          },
          {
            name: "Gabriele Schina",
            quote:
              "Working with Andrea was a very positive experience, reliable, precise and dependable at every stage. We'll definitely stay in touch.",
          },
          {
            name: "Marco Pisani",
            quote:
              "It was a pleasure collaborating with Andrea: competent, punctual and always ready to listen to the needs at hand. Looking forward to staying in touch for future collaborations.",
          },
          {
            name: "Salvatore Labriola",
            quote:
              "Andrea built me a beautiful website for my barber shop: it was extremely helpful in getting my business known and selling it to the online world. Highly recommended!",
          },
        ],
      },
    },
    projects: {
      eyebrow: "Projects",
      title: "Some work I've built",
      description:
        "From full stack applications to websites for local businesses: projects built with care for structure, interface and attention to detail.",
      visit: "Visit project",
      visitGithub: "View on GitHub",
      items: [
        {
          name: "Candidate",
          desc: "A personal web app to track your job search and know what to do each day. Every application is a journey along a six-stop line, from waiting to hiring, with interviews, companies, offers, CVs and progress charts. Spring Boot backend with JWT authentication, PostgreSQL in Docker with a Flyway schema and Testcontainers tests; Angular 22 frontend.",
        },
        {
          name: "ProPass",
          desc: "Full stack password manager built with Spring Boot, Oracle in Docker and Angular. Sign-up and login with Argon2, CSRF-protected sessions and a personal searchable vault. Educational project: next step, client-side zero-knowledge encryption.",
        },
        {
          name: "Ristorandoti",
          desc: "A vertical social network connecting restaurant professionals and businesses: profiles, company pages, feed, job offers, reviews and follows. Spring Security with OAuth2 and RBAC, Oracle with Flyway, Redis, WebSocket, Testcontainers and an Angular frontend.",
        },
        {
          name: "BLS | Barber Labriola Salvatore",
          desc: "A website for a historic Taranto barber shop, open since 1960: work gallery, reviews, opening hours and price list, with contacts one tap away. Responsive design built mobile-first.",
        },
        {
          name: "ITES Srl",
          desc: "Corporate website for ITES, a Taranto company in IT and electrical services: company story with an interactive timeline, downloadable brochure and direct links to contacts, certified email and social media.",
        },
        {
          name: "Tabaccheria Lama",
          desc: "A more direct, image-driven landing page, built to showcase the brand with an elegant, contemporary online presence designed mobile-first.",
        },
      ],
    },
    contact: {
      badge: "Let's talk",
      title: "Let's stay in touch",
      description:
        "If you'd like to reach out for collaborations, projects, or simply to network, here are my main contact channels.",
      form: {
        name: "Name",
        namePlaceholder: "Your name",
        email: "Email",
        emailPlaceholder: "Your email",
        message: "Message",
        messagePlaceholder: "Write your message here...",
        send: "Send message",
        sending: "Sending...",
        success: "Message sent! I'll get back to you soon.",
        error: "Failed to send. Please try again later or email me directly.",
        privacyLabel: "I have read and accept the",
        privacyLinkText: "Privacy Policy",
        privacyRequiredError: "You must accept the Privacy Policy before sending the message.",
      },
    },
    privacy: {
      badge: "Legal document",
      title: "Privacy Policy",
      backHome: "Back to home",
      intro:
        "This page describes how the personal data of users who fill in the contact form on this site is processed, in accordance with EU Regulation 2016/679 (GDPR).",
      sections: [
        {
          heading: "Data controller",
          body: "The data controller is Andrea De Giorgio, reachable at degiorgio.andrea2003@gmail.com.",
        },
        {
          heading: "Data collected",
          body: "The contact form only collects data voluntarily provided by the user: name, email address and message content.",
        },
        {
          heading: "Purpose of processing",
          body: "The data collected is used solely to reply to contact requests submitted through the site's form and for any communication related to collaborations or projects requested by the user.",
        },
        {
          heading: "Legal basis",
          body: "Processing is based on the explicit consent of the user, expressed by checking the dedicated box before sending the message (Art. 6.1.a GDPR).",
        },
        {
          heading: "Handling and retention",
          body: "Data is transmitted via email and retained only for the time necessary to handle the request, unless otherwise required by law.",
        },
        {
          heading: "Disclosure",
          body: "The data collected is not shared with third parties or disclosed, except where required by law.",
        },
        {
          heading: "Data subject rights",
          body: "You may exercise your rights of access, rectification, erasure, restriction, objection and data portability at any time, as provided by Articles 15-22 of the GDPR, by writing to the email address above. You may also lodge a complaint with the competent data protection authority.",
        },
      ],
    },
    footer: (year) => `© ${year} Andrea De Giorgio. All rights reserved.`,
    theme: { light: "Light", dark: "Dark", system: "System", label: "Theme" },
  },
};
