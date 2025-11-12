import React, { useState } from "react";
import "./VideoThumbnail.scss";

const VideoThumbnail = ({ video, onClick }) => {
  const [showTitle, setShowTitle] = useState(false);

  return (
    <div
      className="video-thumbnail-wrapper"
      onMouseEnter={() => setShowTitle(true)}
      onMouseLeave={() => setShowTitle(false)}
    >
      <div
        className="video-thumbnail"
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onClick();
          }
        }}
      >
        <div className="thumbnail-background"></div>
        <div className="play-button-overlay">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="10"
              cy="10"
              r="9"
              fill="rgba(102, 126, 234, 0.9)"
              stroke="#fff"
              strokeWidth="1.5"
            />
            <path d="M8 6L14 10L8 14V6Z" fill="#fff" />
          </svg>
        </div>
      </div>
      {showTitle && <div className="thumbnail-title-tooltip">{video.name}</div>}
    </div>
  );
};

export default VideoThumbnail;
