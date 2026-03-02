import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SocialFeed from "../components/SocialFeed.jsx";
import { assets } from "../assets/asset.js";
import { useAppContext } from "../context/AppContext.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import VideoModal from "../components/VideoModal.jsx";

const Home = () => {
  const navigate = useNavigate();
  const { skillCategories, sampleProjects } = useAppContext();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container-custom py-8 sm:py-10 md:py-12 lg:py-14">
      {/* Hero: name, picture, designation */}
      <section className="mb-12 sm:mb-14 md:mb-16 lg:mb-20 grid gap-6 sm:gap-8 md:grid-cols-[auto,minmax(0,1fr)] md:items-center">
        <div className="mx-auto h-60 w-48 sm:h-72 sm:w-56 md:h-80 md:w-64 rounded-2xl sm:rounded-3xl bg-black shadow-glass-light ring-2 sm:ring-4 ring-white/60 transition-transform duration-300 hover:-translate-y-1 dark:bg-white dark:shadow-glass-dark">
          <img
            src={assets.profile}
            alt="profile"
            className="h-full w-full object-cover rounded-2xl sm:rounded-3xl"
          />
        </div>
        <div className="text-center md:text-left">
          <p className="mb-2 text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-light-textSecondary dark:text-dark-textSecondary">
            Builder • Developer • Learner
          </p>
          <h1 className="gradient-text mb-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Pritiranjan Mohanty
          </h1>
          <p className="text-base sm:text-lg text-light-textSecondary dark:text-dark-textSecondary">
            Java & Spring Boot Developer with a strong QA foundation,
            building scalable backend systems and clean, user-centric
            web applications.
          </p>
        </div>
      </section>

      {/* Profile Summary */}
      <section className="mb-12 sm:mb-14 md:mb-16 lg:mb-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10 lg:gap-16">
          <div className="md:max-w-2xl lg:max-w-3xl">
            <h2 className="mb-3 text-xl sm:text-2xl md:text-3xl">
              About
            </h2>
            <p className="text-sm leading-relaxed text-light-textSecondary dark:text-dark-textSecondary sm:text-base">
              I started my journey in QA, where I developed a strong
              foundation in software quality, automation, and API
              testing. Over time, I transitioned into backend
              development, specializing in Java and Spring Boot to
              build scalable, structured applications. My testing
              background helps me write cleaner, more reliable code
              with performance and maintainability in mind. I enjoy
              designing RESTful APIs, working with databases, and
              building full-stack applications that solve real-world
              problems.
            </p>
          </div>
          <div className="flex flex-row sm:flex-row gap-3 md:flex-col md:min-w-fit">
            <a
              href="mailto:pritiranjan.mohanty2003@gmail.com"
              className="flex-1 sm:flex-none rounded-full bg-accent-light px-6 sm:px-7 py-2.5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-accent-lightHover dark:bg-accent-dark dark:text-black dark:hover:bg-accent-darkHover inline-block text-center"
            >
              Contact
            </a>
            <button
              type="button"
              className="flex-1 sm:flex-none rounded-full border border-light-border px-6 sm:px-7 py-2.5 text-sm font-semibold text-light-textPrimary transition-colors hover:bg-light-bgSecondary dark:border-dark-border dark:text-dark-textPrimary dark:hover:bg-dark-bgSecondary"
            >
              Download CV
            </button>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-12 sm:mb-14 md:mb-16 lg:mb-20">
        <h2 className="mb-5 sm:mb-6 text-xl sm:text-2xl md:text-3xl">
          Skills
        </h2>
        <div className="space-y-4 sm:space-y-5">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6"
            >
              <h3 className="min-w-24 sm:min-w-32 text-sm sm:text-base font-semibold text-light-textPrimary dark:text-dark-textPrimary sm:pt-2">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="cursor-pointer rounded-full bg-black px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white hover:opacity-80 dark:bg-white dark:text-black"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Preview */}
      <section className="mb-12 sm:mb-14 md:mb-16 lg:mb-20">
        <h2 className="mb-5 sm:mb-6 text-xl sm:text-2xl md:text-3xl">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sampleProjects.slice(0, 3).map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              onPlay={(currentProject) => {
                setSelectedProject(currentProject);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>
        <div className="mt-6 flex-left">
          <button
            type="button"
            onClick={() => navigate("/projects")}
            className="w-full sm:w-auto rounded bg-accent-light px-7 py-2.5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-accent-lightHover dark:bg-accent-dark dark:text-black dark:hover:bg-accent-darkHover"
          >
            View all projects
          </button>
        </div>
      </section>

      <VideoModal
        isOpen={isModalOpen}
        project={selectedProject}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProject(null);
        }}
      />

      {/* Education */}
      <section className="mb-12 sm:mb-14 md:mb-16 lg:mb-20">
        <h2 className="mb-5 sm:mb-6 text-xl sm:text-2xl md:text-3xl">
          Education
        </h2>
        <div className="space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 overflow-hidden rounded-full bg-white ring-2 ring-blue-400 dark:bg-black dark:ring-blue-600">
              <img
                src={assets.collegLogo}
                alt="Trident Academy Of Technology"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-semibold">
                Trident Academy Of Technology
              </h3>
              <p className="text-xs sm:text-sm text-light-textSecondary dark:text-dark-textSecondary">
                B.Tech in Computer Science and Information Technology
              </p>
              <div className="mt-1 sm:hidden text-xs text-light-textSecondary dark:text-dark-textSecondary">
                2020 - 2024
              </div>
            </div>
            <div className="hidden sm:block flex-shrink-0 text-sm text-light-textSecondary dark:text-dark-textSecondary">
              2020 - 2024
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 overflow-hidden rounded-full bg-white ring-2 ring-red-400 dark:bg-black dark:ring-red-600">
              <img
                src={assets.collegLogo2}
                alt="Maharishi College Of Natural Law"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-semibold">
                Maharishi College of Natural Law
              </h3>
              <p className="text-xs sm:text-sm text-light-textSecondary dark:text-dark-textSecondary">
                Higher Secondary
              </p>
              <div className="mt-1 sm:hidden text-xs text-light-textSecondary dark:text-dark-textSecondary">
                2019 - 2020
              </div>
            </div>
            <div className="hidden sm:block flex-shrink-0 text-sm text-light-textSecondary dark:text-dark-textSecondary">
              2019 - 2020
            </div>
          </div>
        </div>
      </section>

      {/* Social handles + latest posts */}
      <section>
        <h2 className="mb-5 sm:mb-6 text-xl sm:text-2xl md:text-3xl">
          Social handles
        </h2>
        <SocialFeed />
      </section>
    </div>
  );
};

export default Home;
