import React, { useRef } from "react";
import { X } from "lucide-react";

const VideoModal = ({ isOpen, project, onClose }) => {
  const modalVideoRef = useRef(null);

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

  const handleClose = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
      modalVideoRef.current.currentTime = 0;
    }
    onClose();
  };

  if (!isOpen || !project) return null;

  const mediaType = getMediaType(project.mediaSource);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-3 sm:p-4 md:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-black rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 z-10 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white dark:bg-dark-bgSecondary rounded-full flex items-center justify-center hover:bg-light-bgSecondary transition-colors duration-200 shadow-lg"
          aria-label="Close video"
        >
          <X className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 text-black dark:text-white" />
        </button>

        {/* Media Container */}
        <div className="relative w-full h-full bg-black">
          {mediaType === "video" ? (
            <video
              ref={modalVideoRef}
              className="w-full h-auto max-h-[70vh] sm:max-h-[75vh] md:max-h-[80vh] object-contain"
              controls
              autoPlay
              muted={false}
            >
              <source src={project.mediaSource} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : mediaType === "image" ? (
            <img
              src={project.mediaSource}
              alt={project.title}
              className="w-full h-auto max-h-[70vh] sm:max-h-[75vh] md:max-h-[80vh] object-contain"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
