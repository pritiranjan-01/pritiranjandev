import {
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";
import { projectDemos } from "../assets/projectDemos/index.js";
import { projectPosters } from "../assets/projectPosters/index.js";


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
    skills: ["React", "JavaScript", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    title: "Backend",
    skills: [
      "Java",
      "J2EE",
      "Hibernate",
      "Spring Framework",
      "Spring Boot",
      "REST APIs",
      "Microservices",
    ],
  },
  {
    title: "Databases",
    skills: ["MySQL", "PostgreSQL", "MongoDB"],
  },
  {
    title: "Clouds",
    skills: ["AWS (IAM, EC2, S3, EBS, RDS)", "Render", "Vercel"],
  },
];

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    // Default to light mode
    return false;
  });

  useEffect(() => {
    // Update document class and localStorage when theme changes
    if (isDarkMode) {
      document.body.classList.add("dark");
      document.documentElement.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const value = {
    isDarkMode,
    setIsDarkMode,
    toggleTheme,
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
