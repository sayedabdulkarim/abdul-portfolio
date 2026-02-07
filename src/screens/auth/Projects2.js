import React, { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import VideoModal from "../../components/VideoModal";
import "./Projects2.scss";

const Projects2 = () => {
  const { t } = useTranslation();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projectsData = {
    "fullStackApps": [
      {
        name: "Food Delivery App - Client Portal",
        desc: "Real-time food ordering with tracking and personalized customer insights",
        github: "https://github.com/sayedabdulkarim/enhanced_swiggy_with_LLM/tree/master",
        live: "https://feedo-app.vercel.app/",
      },
      {
        name: "Food Delivery App - Admin Portal",
        desc: "Order and data management system with business analytics",
        github: "https://github.com/sayedabdulkarim/enhanced_swiggy_with_LLM/tree/master",
        live: "https://feedo-admin.vercel.app/",
      },
    ],
    "vscodeExtensions": [
      {
        name: "QuickTick",
        desc: "Project-specific todo lists with persistent storage and progress tracking",
        github: "https://github.com/sayedabdulkarim/QuickTick",
        live: "https://marketplace.visualstudio.com/items?itemName=sayedabdulkarim.quicktick",
      },
      {
        name: "Origami",
        desc: "Smart code folding extension with keyboard shortcuts and status bar integration",
        github: "https://github.com/sayedabdulkarim/origami-extension",
        live: "https://marketplace.visualstudio.com/items?itemName=sayedabdulkarim.origami-vscode",
      },
    ],
    "browserExtensions": [
      {
        name: "JSON Formatter Pro",
        desc: "Format, validate, diff JSON with tree view, query & 60+ themes",
        github: "https://github.com/sayedabdulkarim/json-formatter-extension",
        live: "https://chromewebstore.google.com/detail/json-formatter-pro/manclbgdpakhaloiichknfhkinnfmmdd",
      },
      {
        name: "StashIt",
        desc: "Vault extension to securely store and manage sensitive data",
        github: "https://github.com/sayedabdulkarim/StashIt",
        live: null,
      },
      {
        name: "Pixel Ruler",
        desc: "Measure any element on a webpage with guides & multiple units",
        github: "https://github.com/sayedabdulkarim/Pixel-Ruler",
        live: "https://chromewebstore.google.com/detail/pixel-ruler/oienlnjfakonfjbnbmigjddhndlngjel",
      },
      {
        name: "CaptureIt",
        desc: "Full page screenshots, video recording & cropping - all in one",
        github: "https://github.com/sayedabdulkarim/CaptureIt",
        live: "https://chromewebstore.google.com/detail/captureit/cikijgjoamjjfjhkjmcbfnokmcbgeapk",
      },
    ],
    "aiProjects": [
      {
        name: "Synth AI",
        desc: "AI platform that generates applications through natural language prompts",
        github: "https://github.com/sayedabdulkarim/no_code_01",
        live: "https://nocode01-production-f989.up.railway.app/",
        videos: [
          { name: "Code generation, preview, editor", url: "https://pub-9f02256669ee4e9f9c3480046925bb40.r2.dev/code_creation.mov" },
          { name: "Multi project simultaneously", url: "https://pub-9f02256669ee4e9f9c3480046925bb40.r2.dev/work_on_multi_project_simultaneously.mov" },
        ],
      },
      {
        name: "Kanbanix",
        desc: "AI-driven Kanban system with task suggestions and GitHub integration",
        github: null,
        live: null,
        videos: [
          { name: "New project code generation", url: "https://pub-9f02256669ee4e9f9c3480046925bb40.r2.dev/merged.mp4" },
          { name: "Existing project code generation", url: "https://pub-9f02256669ee4e9f9c3480046925bb40.r2.dev/existing_project_code_generation.mov" },
          { name: "Code commit & PR raise", url: "https://pub-9f02256669ee4e9f9c3480046925bb40.r2.dev/code_commit_pr_raise.mov" },
        ],
      },
    ],
    "developerTools": [
      {
        name: "DevLens",
        desc: "CLI tool to stream device logs without heavy IDEs like Android Studio or Xcode",
        github: "https://github.com/sayedabdulkarim/devlens",
        live: "https://www.npmjs.com/package/devlens",
        videos: [
          { name: "DevLens Demo", url: "https://pub-9f02256669ee4e9f9c3480046925bb40.r2.dev/devLens.mov" },
        ],
      },
      {
        name: "Job Digger",
        desc: "Job search aggregator to find opportunities across multiple platforms",
        github: "https://github.com/sayedabdulkarim/job-diggerrr",
        live: "https://job-diggerrr-production.up.railway.app/",
      },
      {
        name: "CodeLab",
        desc: "Online code editor like CodeSandbox for quick prototyping",
        github: "https://github.com/sayedabdulkarim/code_Lab",
        live: "https://codelab-production.up.railway.app/",
      },
      {
        name: "CodeLab-JS",
        desc: "Browser-based JavaScript compiler and executor",
        github: "https://github.com/sayedabdulkarim/codelab-js",
        live: "https://sayedabdulkarim.github.io/codelab-js/",
      },
      {
        name: "OnlyDevs",
        desc: "JSONPlaceholder clone - fake REST API for testing and prototyping",
        github: "https://github.com/sayedabdulkarim/OnlyDevs",
        live: "https://onlydevs-production.up.railway.app/",
      },
    ],
    "librariesPackages": [
      {
        name: "zenkit-css",
        desc: "Utility-first CSS framework for rapid UI development",
        github: "https://github.com/sayedabdulkarim/-zenkit-css",
        live: "https://www.npmjs.com/package/zenkit-css",
      },
      {
        name: "ui_zenkit",
        desc: "React component library with reusable UI components",
        github: "https://github.com/sayedabdulkarim/-zenkit-ui",
        live: "https://www.npmjs.com/package/ui_zenkit",
      },
      {
        name: "pluck-dom",
        desc: "Lightweight jQuery plugin for DOM manipulation",
        github: "https://github.com/sayedabdulkarim/pluck",
        live: "https://www.npmjs.com/package/pluck-dom",
      },
    ],
    "webTools": [
      {
        name: "JSON-CSV Pro",
        desc: "Convert data between JSON and CSV formats in both directions, offline",
        github: "https://github.com/sayedabdulkarim/json-csv-pro",
        live: "https://sayedabdulkarim.github.io/json-csv-pro/",
      },
      {
        name: "Base64 Studio",
        desc: "Encode and decode text & images to base64 format in browser",
        github: "https://github.com/sayedabdulkarim/base64Studio",
        live: "https://sayedabdulkarim.github.io/base64Studio/",
      },
      {
        name: "RegexLab",
        desc: "Test and validate regex patterns with live highlighting",
        github: "https://github.com/sayedabdulkarim/regexLab",
        live: "https://sayedabdulkarim.github.io/regexLab/",
      },
      {
        name: "GhostMail",
        desc: "Disposable email service with auto-expiring temporary addresses for privacy",
        github: "https://github.com/sayedabdulkarim/GhostMail",
        live: "https://myghostmail.shop/",
      },
    ],
    "reactComponents": [
      {
        name: "Toastique",
        desc: "Customizable toast notification system for React with multiple styles",
        github: "https://github.com/sayedabdulkarim/toastique",
        live: "https://www.npmjs.com/package/react-toastique",
      },
      {
        name: "React Scroll Infinity",
        desc: "Infinite scroll hook for React with automatic content loading",
        github: "https://github.com/sayedabdulkarim/react-scroll-infinity",
        live: "https://www.npmjs.com/package/react-scroll-infinity",
      },
      {
        name: "Selectra",
        desc: "Searchable multi-select dropdown component with tagging support",
        github: "https://github.com/sayedabdulkarim/Selectra",
        live: "https://www.npmjs.com/package/selectra-react",
      },
    ],
  };

  const categoryKeys = [
    "fullStackApps",
    "vscodeExtensions",
    "browserExtensions",
    "aiProjects",
    "developerTools",
    "librariesPackages",
    "webTools",
    "reactComponents",
  ];

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <div className="projects2-page">
      <div className="projects2-container">
        <h1 className="projects2-main-title">{t("projects.title")}</h1>
        <p className="projects2-subtitle">
          <Trans
            i18nKey="projects.subtitle"
            components={{ highlight: <span className="highlight" /> }}
          />
          <span className="zzz-container">
            <span className="z z1">z</span>
            <span className="z z2">z</span>
            <span className="z z3">z</span>
          </span>.
        </p>

        {categoryKeys.map((categoryKey) => (
          <div key={categoryKey} className="projects2-section">
            <h2 className="section-title">{t(`projects.categories.${categoryKey}`)}</h2>
            <div className="projects2-grid">
              {projectsData[categoryKey].map((project, index) => (
                <div key={index} className="project-card">
                  <div className="card-header">
                    <h3 className="project-name">{project.name}</h3>
                    <div className="card-icons">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="icon-link"
                          title="GitHub"
                        >
                          <FontAwesomeIcon icon={faGithub} />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                          className="icon-link"
                          title="Live Demo"
                        >
                          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="project-desc">{project.desc}</p>

                  {project.videos && (
                    <div className="project-videos">
                      <span className="video-label">{t("projects.demo")}:</span>
                      {project.videos.map((video, i) => (
                        <button
                          key={i}
                          className="video-btn"
                          onClick={() => handleVideoClick(video)}
                          title={video.name}
                        >
                          ▶
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <VideoModal
        video={selectedVideo}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Projects2;
