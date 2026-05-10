import {
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";
import { projectDemos } from "../assets/projectDemos/index.js";
import { projectPosters } from "../assets/projectPosters/index.js";

// react-icons imports
import { FaReact, FaHtml5, FaCss3Alt, FaJava, FaAws, FaDatabase, FaCode, FaSitemap, FaCloud } from "react-icons/fa";
import {
  SiJavascript,
  SiTailwindcss,
  SiSpringboot,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiVercel,
} from "react-icons/si";

// Lucide social icons
import { Github, Linkedin, Instagram } from "lucide-react";

// Substack has no Lucide icon — shared inline SVG
// eslint-disable-next-line react-refresh/only-export-components
export const SubstackIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
  </svg>
);

// X (formerly Twitter) brand icon — Lucide's Twitter still uses the old bird
// eslint-disable-next-line react-refresh/only-export-components
export const XIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Single source of truth for all social links
// eslint-disable-next-line react-refresh/only-export-components
export const socials = [
  { id: "github",    label: "GitHub",      href: "https://github.com/pritiranjan-01",                icon: Github       },
  { id: "linkedin",  label: "LinkedIn",    href: "https://www.linkedin.com/in/pritiranjan-mohanty/", icon: Linkedin     },
  { id: "instagram", label: "Instagram",   href: "https://instagram.com/curious_capturer",           icon: Instagram    },
  { id: "x",         label: "X",           href: "https://twitter.com/CuriousRanjan",                icon: XIcon        },
  { id: "substack",  label: "Substack",    href: "https://substack.com/@pritiranjanmohanty",         icon: SubstackIcon },
];


const sampleProjects = [
  {
    title: "Billing System",
    description:
      "A full-stack billing and business management system for small and medium businesses. It manages items, categories, customers, users, orders, and payments in a centralized platform with secure authentication and Razorpay integration for seamless transactions.",
    stack: [
      "React",
      "Bootstrap",
      "Spring Boot",
      "Spring Security",
      "REST APIs",
      "Razor Pay",
    ],
    source: "https://github.com/pritiranjan-01/billing-system.git",
    website: null,
    mediaSource: projectDemos.BS,
    poster: projectPosters.BS,
  },
  {
    title:
      "Global Weather Service – Weather Reporting & Notification System",
    description:
      "An automated weather management platform that handles client onboarding, subscription-based updates, PDF weather report generation, and scheduled email notifications. Designed to demonstrate scalable backend architecture and real-world API integration.",
    stack: [
      "JavaScript",
      "Bootstrap",
      "Spring Boot",
      "Java MailSender",
      "OpenPDF",
    ],
    source:
      "https://github.com/pritiranjan-01/global-weather-service-backend-springboot.git",
    website: "https://globalweatherservice.vercel.app",
    mediaSource: projectDemos.GS,
    poster: projectPosters.GS,
  },
  {
    title: "URL-Shortner",
    description:
      "A web-based URL shortening service built with Spring Boot that transforms long URLs into short, shareable links. Focused on clean UI design, secure redirection, and efficient backend handling.",
    stack: ["HTML", "CSS", "JavaScript", "Thymeleaf", "Spring Boot"],
    source: "https://github.com/pritiranjan-01/URL-shortner.git",
    website: null,
    mediaSource: projectDemos.US,
    poster: projectPosters.US,
  },
  {
    title: "Student Management System",
    description:
      "A Java web application for managing student records and administrative tasks with secure authentication and role-based access control. Built using JSP, Servlets, and Hibernate for structured data handling.",
    stack: ["JSP", "Servlet", "Hibernate"],
    source:
      "https://github.com/pritiranjan-01/Student-Management-Pro-JSP_Servlet_Hibernate",
    website: null,
    mediaSource: projectDemos.SM,
    poster: projectPosters.SMS,
  },
  {
    title: "Bank Management System",
    description:
      "A desktop banking application developed using Java Swing and MySQL. It supports secure account management, transaction processing, and reliable financial data handling through a user-friendly graphical interface.",
    stack: ["Java Swing", "MySQL"],
    source:
      "https://github.com/pritiranjan-01/Bank-Management-System.git",
    website: null,
    mediaSource: projectDemos.MBS,
    poster: projectPosters.BMS,
  },
  {
    title: "Todo Flow",
    description:
      "A lightweight productivity web application that helps users manage and organize daily tasks efficiently. Built with HTML, CSS, and JavaScript, focusing on simplicity and responsive UI design.",
    stack: ["HTML", "CSS", "JavaScript"],
    source: "https://github.com/pritiranjan-01/Todo-Flow.git",
    website: "https://todoflows.netlify.app/",
    mediaSource: projectDemos.TF,
    poster: projectPosters.TF,
  },
  {
    title: "E-Commerce",
    description:
      "A responsive e-commerce web application enabling users to browse products and simulate online purchases. Integrated with Razorpay API for payment processing, showcasing frontend development and payment gateway integration.",
    stack: ["HTML", "CSS", "JavaScript", "Razor Pay API"],
    source: "https://github.com/pritiranjan-01/E-Commerce",
    website: null,
    mediaSource: projectDemos.EC,
    poster: projectPosters.EC,
  },
];

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React",        icon: FaReact       },
      { name: "JavaScript",   icon: SiJavascript  },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "HTML",         icon: FaHtml5       },
      { name: "CSS",          icon: FaCss3Alt     },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Java",             icon: FaJava      },
      { name: "J2EE",             icon: FaJava      },
      { name: "Hibernate",        icon: FaDatabase  },
      { name: "Spring Framework", icon: SiSpringboot },
      { name: "Spring Boot",      icon: SiSpringboot },
      { name: "REST APIs",        icon: FaCode      },
      { name: "Microservices",    icon: FaSitemap   },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MySQL",      icon: SiMysql      },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB",    icon: SiMongodb    },
    ],
  },
  {
    title: "Clouds",
    skills: [
      { name: "AWS (IAM, EC2, S3, EB, RDS)", icon: FaAws    },
      { name: "Render",                       icon: FaCloud  },
      { name: "Vercel",                       icon: SiVercel },
    ],
  },
];

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // theme: 'light' | 'dim' | 'dark'
  // Always boot from the browser/OS preference — ignore any previously saved theme.
  // If the user manually changes the theme during this session, we track that in
  // sessionStorage (which clears when the browser/tab is closed), so the next
  // visit always re-syncs to the system theme automatically.
  const [theme, setTheme] = useState(() => {
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Check if the user already overrode the theme THIS session
    const sessionTheme = sessionStorage.getItem("sessionTheme");
    if (sessionTheme === "dark" || sessionTheme === "dim" || sessionTheme === "light") {
      return sessionTheme;
    }

    // Fresh session → follow the OS
    return systemPrefersDark ? "dim" : "light";
  });

  // Backward-compat: isDarkMode is true for both dim and dark
  const isDarkMode = theme !== "light";

  // Apply theme classes to <html> and <body>
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    body.classList.remove("dark", "dim");
    html.classList.remove("dark", "dim");

    if (theme === "dark") {
      body.classList.add("dark");
      html.classList.add("dark");
    } else if (theme === "dim") {
      // dim also needs the "dark" class so Tailwind's dark: prefix activates
      body.classList.add("dark", "dim");
      html.classList.add("dark", "dim");
    }
  }, [theme]);

  // Live-sync with Chrome/OS colour-scheme changes.
  // - matchMedia "change" fires when Chrome Settings (or OS) theme changes →
  //   ALWAYS apply it and clear any session override, because the user
  //   explicitly changed their browser theme.
  // - visibilitychange fires when the user switches back to this tab →
  //   re-check in case the theme changed while the tab was hidden,
  //   but only if the user hasn't manually overridden it this session.
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applySystemTheme = (prefersDark) => {
      sessionStorage.removeItem("sessionThemeOverride");
      sessionStorage.removeItem("sessionTheme");
      setTheme(prefersDark ? "dim" : "light");
    };

    // Chrome Settings / OS theme changed — always follow it
    const handleSystemThemeChange = (e) => {
      applySystemTheme(e.matches);
    };

    // Tab became visible again — re-check in case we missed a change
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const hasSessionOverride =
          sessionStorage.getItem("sessionThemeOverride") === "true";
        if (!hasSessionOverride) {
          applySystemTheme(mediaQuery.matches);
        }
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Cycles: light → dim → dark → light
  // Stores the choice in sessionStorage so it lasts only until the browser closes.
  const cycleTheme = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dim" : prev === "dim" ? "dark" : "light";
      sessionStorage.setItem("sessionTheme", next);
      sessionStorage.setItem("sessionThemeOverride", "true");
      return next;
    });
  };

  // Keep toggleTheme for any components still importing it
  const toggleTheme = cycleTheme;

  const value = {
    theme,
    setTheme,
    isDarkMode,
    toggleTheme,
    cycleTheme,
    sampleProjects,
    skillCategories,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);
