import React, { useEffect, useState } from "react";
import "./InitialLoader.scss";

const InitialLoader = ({ onLoadingComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after 2.5 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    // Complete loading after fade animation (2.5s + 0.5s fade)
    const completeTimer = setTimeout(() => {
      onLoadingComplete();
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadingComplete]);

  return (
    <div className={`initial-loader ${fadeOut ? "fade-out" : ""}`}>
      <div className="loader-content">
        <img
          src="/assets/icon.gif"
          alt="Loading..."
          className="loader-icon"
        />
      </div>
    </div>
  );
};

export default InitialLoader;
