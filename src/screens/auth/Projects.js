import React from "react";
import { useTranslation, Trans } from "react-i18next";
import "./Projects.scss";

const Projects = () => {
  const { t } = useTranslation();

  const projectsData = {
    "webTools": [
      { name: "DevLens", desc: "Chrome extension for developers to inspect & debug web apps" },
      { name: "JSON Formatter", desc: "Online JSON viewer, formatter and validator tool" },
      { name: "Code Beautifier", desc: "Format and beautify HTML, CSS, JS code online" },
      { name: "Regex Tester", desc: "Test and debug regular expressions with live preview" },
      { name: "Color Palette", desc: "Generate beautiful color palettes for your projects" },
      { name: "Base64 Encoder", desc: "Encode and decode Base64 strings online" },
      { name: "URL Shortener", desc: "Shorten long URLs for easy sharing" },
      { name: "Markdown Preview", desc: "Live preview markdown with syntax highlighting" },
    ],
    "reactComponents": [
      { name: "react-data-table", desc: "A powerful data table component with sorting & filtering" },
      { name: "react-toast-notify", desc: "Beautiful toast notifications for React apps" },
      { name: "react-modal-kit", desc: "Customizable modal dialogs for React" },
      { name: "react-form-builder", desc: "Dynamic form builder with validation" },
      { name: "react-image-crop", desc: "Image cropping component with zoom support" },
      { name: "react-infinite-scroll", desc: "Infinite scrolling component with lazy loading" },
      { name: "react-date-range", desc: "Date range picker with presets" },
      { name: "react-skeleton-loader", desc: "Skeleton loading placeholders for React" },
    ],
    "reactNativeComponents": [
      { name: "rn-bottom-sheet", desc: "Smooth bottom sheet component for React Native" },
      { name: "rn-swipeable-list", desc: "Swipeable list items with actions" },
      { name: "rn-image-picker", desc: "Image picker with camera and gallery support" },
      { name: "rn-push-notification", desc: "Easy push notifications setup for RN" },
    ],
    "nodejsProjects": [
      { name: "express-api-starter", desc: "Express.js boilerplate with authentication" },
      { name: "node-file-upload", desc: "File upload service with S3 integration" },
      { name: "graphql-server", desc: "GraphQL server with Apollo and Prisma" },
      { name: "socket-chat-server", desc: "Real-time chat server using Socket.io" },
      { name: "node-cron-jobs", desc: "Scheduled job runner with monitoring" },
      { name: "rest-api-generator", desc: "Generate REST APIs from database schema" },
    ],
    "jsLibraries": [
      { name: "form-validator.js", desc: "Lightweight form validation library" },
      { name: "storage-helper.js", desc: "LocalStorage/SessionStorage wrapper with encryption" },
      { name: "date-utils.js", desc: "Date manipulation utilities without dependencies" },
      { name: "fetch-wrapper.js", desc: "Fetch API wrapper with retry and timeout" },
      { name: "event-emitter.js", desc: "Simple event emitter for browser and Node" },
      { name: "deep-clone.js", desc: "Deep clone objects and arrays" },
    ],
    "cliTools": [
      { name: "project-scaffolder", desc: "CLI to scaffold new projects with templates" },
      { name: "env-manager", desc: "Manage environment variables across projects" },
      { name: "git-hooks-cli", desc: "Setup git hooks easily via command line" },
      { name: "npm-checker", desc: "Check for outdated npm dependencies" },
    ],
    "fullStackProjects": [
      { name: "E-Commerce Platform", desc: "Complete e-commerce solution with React & Node" },
      { name: "Food Delivery App", desc: "Swiggy/Zomato clone with real-time tracking" },
      { name: "Social Media Dashboard", desc: "Analytics dashboard for social platforms" },
      { name: "Task Management App", desc: "Trello-like project management tool" },
      { name: "Video Streaming App", desc: "Netflix clone with HLS streaming" },
      { name: "Chat Application", desc: "WhatsApp clone with end-to-end encryption" },
    ],
    "aimlProjects": [
      { name: "Chatbot Builder", desc: "Create AI chatbots with custom training data" },
      { name: "Image Classifier", desc: "TensorFlow.js image classification demo" },
      { name: "Sentiment Analyzer", desc: "Analyze text sentiment using NLP" },
      { name: "Voice Assistant", desc: "Voice-controlled assistant using Web Speech API" },
    ],
    "mobileApps": [
      { name: "Expense Tracker", desc: "Track daily expenses with charts and reports" },
      { name: "Fitness App", desc: "Workout tracker with exercise library" },
      { name: "Recipe App", desc: "Discover and save recipes with meal planning" },
      { name: "News Reader", desc: "Personalized news aggregator app" },
    ],
    "browserExtensions": [
      { name: "Tab Manager", desc: "Organize and manage browser tabs efficiently" },
      { name: "Screenshot Tool", desc: "Capture full page screenshots" },
      { name: "Ad Blocker Lite", desc: "Lightweight ad blocking extension" },
      { name: "Password Generator", desc: "Generate secure passwords instantly" },
    ],
  };

  const categoryKeys = [
    "webTools",
    "reactComponents",
    "reactNativeComponents",
    "nodejsProjects",
    "jsLibraries",
    "cliTools",
    "fullStackProjects",
    "aimlProjects",
    "mobileApps",
    "browserExtensions",
  ];

  return (
    <div className="projects-page">
      <div className="projects-container">
        <h1 className="projects-main-title">{t("projects.title")}</h1>
        <p className="projects-subtitle">
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
          <div key={categoryKey} className="projects-section">
            <h2 className="section-title">{t(`projects.categories.${categoryKey}`)}</h2>
            <div className="projects-grid">
              {projectsData[categoryKey].map((project, index) => (
                <a
                  key={index}
                  href="#"
                  className="project-card"
                  onClick={(e) => e.preventDefault()}
                >
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-desc">{project.desc}</p>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
