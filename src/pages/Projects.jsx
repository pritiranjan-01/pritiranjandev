import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import VideoModal from "../components/VideoModal";
import ProjectCard from "../components/ProjectCard";

const Projects = () => {
  const navigate = useNavigate();
  const { sampleProjects } = useAppContext();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }, 0);
    });
  }, []);



  return (
    <div className="container-custom py-6 sm:py-8 md:py-5">
      <header className="relative mb-6 flex items-center justify-center sm:mb-8 md:mb-10 md:justify-start">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="group absolute left-0 flex items-center justify-center rounded-lg bg-light-bgSecondary/50 p-2 text-light-textSecondary transition-all hover:bg-light-bgSecondary hover:text-accent-light dark:bg-dark-bgSecondary/50 dark:text-dark-textSecondary dark:hover:bg-dark-bgSecondary dark:hover:text-accent-dark cursor-pointer md:hidden"
          aria-label="Go back"
        >
          <ArrowLeft className="h-6 w-6 transition-transform group-hover:-translate-x-1" />
        </button>

        <h1 className="gradient-text pb-2 text-3xl font-bold text-center sm:text-4xl md:text-left md:text-5xl">
          Projects
        </h1>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sampleProjects.map((project, index) => (
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
      </section>

      {/* Video Modal Component */}
      <VideoModal
        isOpen={isModalOpen}
        project={selectedProject}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProject(null);
        }}
      />

      <style>{`
        @keyframes projects-fade-in {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Projects;
