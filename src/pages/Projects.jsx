import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import VideoModal from "../components/VideoModal";
import ProjectCard from "../components/ProjectCard";

const Projects = () => {
  const { sampleProjects } = useAppContext();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Use requestAnimationFrame and a small timeout to ensure DOM is fully rendered
    requestAnimationFrame(() => {
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }, 0);
    });
  }, []);

  return (
    <div className="container-custom py-6 sm:py-8 md:py-10">
      <header className="mb-6 sm:mb-8 md:mb-10">
        <h1 className="gradient-text mb-2 sm:mb-3 pb-2 text-3xl sm:text-4xl md:text-5xl">
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
