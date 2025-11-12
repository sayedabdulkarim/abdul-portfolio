import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import "./VideoModal.scss";

const VideoModal = ({ video, isOpen, onClose }) => {
  const modalRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Click outside to close
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen || !video) return null;

  return (
    <div className="video-modal-overlay" onClick={handleBackdropClick}>
      <div className="video-modal-content" ref={modalRef}>
        <div className="video-modal-header">
          <h3 className="video-modal-title">{video.name}</h3>
          <button
            className="video-modal-close"
            onClick={onClose}
            aria-label="Close video modal"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="video-modal-player">
          <video
            src={video.url}
            controls
            controlsList="nodownload"
            preload="metadata"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
