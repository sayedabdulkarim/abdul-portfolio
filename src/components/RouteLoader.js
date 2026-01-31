import React, { useState, useEffect } from "react";
import "./RouteLoader.scss";

const RouteLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress smoothly
    const timer1 = setTimeout(() => setProgress(30), 100);
    const timer2 = setTimeout(() => setProgress(50), 300);
    const timer3 = setTimeout(() => setProgress(70), 600);
    const timer4 = setTimeout(() => setProgress(85), 1000);

    // Keep animating slowly if still loading
    const slowProgress = setInterval(() => {
      setProgress((prev) => (prev < 95 ? prev + 1 : prev));
    }, 500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearInterval(slowProgress);
    };
  }, []);

  return (
    <div className="route-loader">
      <div
        className="route-loader__bar"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default RouteLoader;
