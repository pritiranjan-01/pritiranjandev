import React from "react";
import { Play, Eye, Github, ExternalLink } from "lucide-react";

const ProjectCard = ({ project, index = 0, onPlay }) => {
  // Helper function to detect media type based on file extension
  const getMediaType = (mediaSource) => {
    if (!mediaSource) return null;

    const videoExtensions = [".mp4", ".webm", ".ogg", ".mov", ".avi"];
    const imageExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".webp",
      ".svg",
    ];

    const extension = mediaSource
      .toLowerCase()
      .slice(mediaSource.lastIndexOf("."));

    if (videoExtensions.some((ext) => extension.includes(ext))) {
      return "video";
    } else if (
      imageExtensions.some((ext) => extension.includes(ext))
    ) {
      return "image";
    }
    return null;
  };

  const mediaType = getMediaType(project.mediaSource);

  return (
    <article
      className="glass flex flex-col overflow-hidden rounded-xl sm:rounded-2xl transition-transform duration-300 hover:-translate-y-1"
      style={{
        animation: `projects-fade-in 0.5s ease-out ${index * 0.06}s both`,
      }}
    >
      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-light-border dark:bg-dark-border group">
        {project.mediaSource && mediaType === "video" ? (
          <>
            <video
              className="h-full w-full object-cover"
              muted
              loop
              poster={project.poster}
              // preload="none"
            >
              <source src={project.mediaSource} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button
              onClick={() => onPlay?.(project)}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 opacity-0 group-hover:opacity-100"
              aria-label="Play video"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-accent-light dark:bg-accent-dark rounded-full flex items-center justify-center transform transition-transform duration-300 hover:scale-110 shadow-lg">
                <Play
                  className="w-6 h-6 sm:w-7 sm:h-7 text-white dark:text-black ml-1"
                  fill="currentColor"
                />
              </div>
            </button>
          </>
        ) : project.mediaSource && mediaType === "image" ? (
          <>
            <img
              src={project.mediaSource}
              alt={project.title}
              className="h-full w-full object-cover"
            />
            <button
              onClick={() => onPlay?.(project)}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 opacity-0 group-hover:opacity-100"
              aria-label="View image"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-accent-light dark:bg-accent-dark rounded-full flex items-center justify-center transform transition-transform duration-300 hover:scale-110 shadow-lg">
                <Eye className="w-6 h-6 sm:w-7 sm:h-7 text-white dark:text-black" />
              </div>
            </button>
          </>
        ) : (
          <div className="h-full w-full" />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 sm:gap-3 p-4 sm:p-5 md:p-6">
        <h2 className="text-base sm:text-lg font-semibold md:text-xl">
          {project.title}
        </h2>
        <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary md:text-justify">
          {project.description}
        </p>
        <p className="mt-auto text-xs sm:text-sm bold font-medium  tracking-[0.08em] text-accent-DEFAULT dark:text-accent-dark">
          {project.stack.join(" • ")}
        </p>
        <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4">
          {project.source && (
            <a
              href={project.source}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 rounded-lg border border-light-border px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-light-textPrimary transition-colors hover:bg-light-bgSecondary dark:border-dark-border dark:text-dark-textPrimary dark:hover:bg-dark-bgSecondary"
            >
              <Github className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
              Source
            </a>
          )}
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 rounded-lg bg-accent-light px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white transition-colors hover:bg-accent-lightHover dark:bg-accent-dark dark:text-black dark:hover:bg-accent-darkHover"
            >
              <ExternalLink className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
              Website
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
