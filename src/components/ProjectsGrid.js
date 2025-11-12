import React, { useState } from "react";
import "./ProjectsGrid.scss";
import VideoThumbnail from "./VideoThumbnail";
import VideoModal from "./VideoModal";

const ProjectsGrid = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  const projects = [
    {
      id: 1,
      name: "Food Delivery App - Client Portal",
      icon: "🍕",
      description:
        "Full-stack food delivery client application with real-time order tracking and secure payment processing",
      problem:
        "Traditional food ordering lacks real-time tracking and personalized customer insights",
      solution:
        "Built with React, Redux Toolkit, TypeScript, SCSS, Font Face Observer for async font loading and Google Maps. Secured with JWT and CSRF tokens",
      technologies: [
        "React",
        "Redux Toolkit",
        "TypeScript",
        "SCSS",
        "Font Face Observer",
        "Google Maps API",
        "JWT",
        "CSRF",
      ],
      status: "completed",
      githubUrl:
        "https://github.com/sayedabdulkarim/enhanced_swiggy_with_LLM/tree/master",
      liveUrl: "https://feedo-app.vercel.app/",
      stars: 45,
      downloads: "2k+",
    },
    {
      id: 2,
      name: "Food Delivery App - Admin Portal",
      icon: "📊",
      description:
        "Comprehensive admin dashboard for order and data management with analytics",
      problem:
        "Restaurant owners need efficient tools to manage orders, track performance, and analyze customer data",
      solution:
        "Order and data management system using the same client tech stack with enhanced features for business analytics and operations management",
      technologies: [
        "React",
        "Redux Toolkit",
        "TypeScript",
        "SCSS",
        "Chart.js",
        "JWT",
        "CSRF",
        "Firebase",
        "MongoDB",
      ],
      status: "completed",
      githubUrl:
        "https://github.com/sayedabdulkarim/enhanced_swiggy_with_LLM/tree/master",
      liveUrl: "https://feedo-admin.vercel.app/",
      stars: 35,
      downloads: "1.5k+",
    },
    {
      id: 3,
      name: "Origami VSCode Extension",
      icon: "🎨",
      description:
        "Smart code folding extension for VSCode with session memory and file-type detection",
      problem:
        "Developers struggle with navigating and organizing large codebases efficiently",
      solution:
        "Created a smart code folding extension that remembers fold states per file, provides keyboard shortcuts, status bar integration, and context menu options for improved code navigation",
      technologies: [
        "TypeScript",
        "VSCode Extension API",
        "VSCode Commands API",
        "VSCode StatusBar API",
        "VSCode Configuration API",
      ],
      status: "completed",
      githubUrl: "https://github.com/sayedabdulkarim/origami-extension",
      liveUrl:
        "https://marketplace.visualstudio.com/items?itemName=sayedabdulkarim.origami-vscode",
      stars: 89,
      downloads: "3k+",
    },
    {
      id: 4,
      name: "Synth AI",
      icon: "🤖",
      description:
        "AI-powered no-code application generator using Anthropic Claude and MCP for intelligent code generation",
      problem:
        "Building applications requires extensive coding knowledge and time investment",
      solution:
        "Developed an AI platform that generates complete applications through natural language prompts. Features real-time terminal emulation, live preview, and persistent project management",
      technologies: [
        "React",
        "@anthropic-ai/sdk",
        "@modelcontextprotocol/sdk",
        "node-pty",
        "xterm.js",
        "Socket.io",
        "@codesandbox/sandpack-react",
        "@monaco-editor/react",
        "Express.js",
      ],
      status: "completed",
      githubUrl: "https://github.com/sayedabdulkarim/no_code_01",
      liveUrl: "https://nocode01-production-f989.up.railway.app/",
      stars: 132,
      downloads: "5k+",
      videos: [
        {
          name: "code generation, preview, editor, live edit",
          url: "https://pub-9f02256669ee4e9f9c3480046925bb40.r2.dev/code_creation.mov",
          image: "default",
        },
        {
          name: "work on multi project simultaneously",
          url: "https://pub-9f02256669ee4e9f9c3480046925bb40.r2.dev/work_on_multi_project_simultaneously.mov",
          image: "default",
        },
      ],
    },
    {
      id: 5,
      name: "QuickTick VSCode Extension",
      icon: "✅",
      description:
        "Project-specific todo management extension for VS Code with persistent storage",
      problem:
        "Developers need an integrated, project-specific way to manage tasks without leaving their coding environment",
      solution:
        "Built a VS Code extension with project-specific todo lists, persistent storage across restarts, visual progress tracking, smart filters (All/Active/Completed), inline editing, and always-visible status bar integration",
      technologies: [
        "TypeScript",
        "VSCode Extension API",
        "WebView API",
        "VSCode Commands API",
        "VSCode StatusBar API",
        "HTML/CSS",
        "JavaScript",
      ],
      status: "completed",
      githubUrl: "https://github.com/sayedabdulkarim/QuickTick",
      liveUrl:
        "https://marketplace.visualstudio.com/items?itemName=sayedabdulkarim.quicktick",
      stars: 24,
      downloads: "500+",
    },
    {
      id: 6,
      name: "Kanbanix",
      icon: "📋",
      description:
        "Next-gen Kanban board with AI-powered task management and real-time collaboration features",
      problem:
        "Project management tools lack intelligent task prioritization and seamless collaboration",
      solution:
        "Building an advanced Kanban system with AI-driven task suggestions, automatic priority assignment, and real-time multi-user collaboration with GitHub integration",
      technologies: [
        "Next.js",
        "Socket.io",
        "@anthropic-ai/sdk",
        "@modelcontextprotocol/sdk",
        "Prisma ORM",
        "MCP",
        "SQLite",
        "Octokit",
      ],
      status: "upcoming",
      githubUrl: "#",
      stars: 0,
      downloads: "Coming Soon",
      videos: [
        {
          name: "new project code generation",
          url: "https://pub-9f02256669ee4e9f9c3480046925bb40.r2.dev/merged.mp4",
          image: "default",
        },
        {
          name: "existing project code generation",
          url: "https://pub-9f02256669ee4e9f9c3480046925bb40.r2.dev/existing_project_code_generation.mov",
          image: "default",
        },
        {
          name: "code commit & pr raise",
          url: "https://pub-9f02256669ee4e9f9c3480046925bb40.r2.dev/code_commit_pr_raise.mov",
          image: "default",
        },
      ],
    },
  ];

  const getStatusBadge = (status) => {
    const badges = {
      completed: { text: "Live", class: "live" },
      upcoming: { text: "In Development", class: "upcoming" },
      concept: { text: "Concept", class: "concept" },
    };
    return badges[status] || badges.concept;
  };

  return (
    <div className="projects-grid">
      <div className="container">
        <div className="projects-header">
          <h2 className="projects-title">Featured Projects</h2>
          <p className="projects-subtitle">
            Building solutions that solve real-world problems
          </p>
        </div>

        <div className="projects-list">
          {projects.map((project) => {
            const statusBadge = getStatusBadge(project.status);
            return (
              <div key={project.id} className="project-card-grid">
                <div className="project-header">
                  <div className="project-icon">{project.icon}</div>
                  <div className="project-info">
                    <div className="project-title-row">
                      <h3 className="project-name">{project.name}</h3>
                      <span className={`status-badge ${statusBadge.class}`}>
                        {statusBadge.text}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="project-problem">
                  <strong>Problem:</strong> {project.problem}
                </div>

                <div className="project-description">{project.solution}</div>

                <div className="project-tech-stack">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>

                {project.videos && project.videos.length > 0 && (
                  <div className="project-videos">
                    <span className="demo-label">DEMO :</span>
                    <div className="video-thumbnails-container">
                      {project.videos.map((video, index) => (
                        <VideoThumbnail
                          key={index}
                          video={video}
                          onClick={() => handleVideoClick(video)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="project-actions">
                  {project.status !== "upcoming" ? (
                    <>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-action"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                        >
                          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                        </svg>
                        GitHub
                      </a>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-action primary"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                        >
                          <path d="M4.715 6.542L3.343 7.914a3 3 0 104.243 4.243l1.828-1.829A3 3 0 008.586 5.5L8 6.086a1.001 1.001 0 00-.154.199 2 2 0 01.861 3.337L6.88 11.45a2 2 0 11-2.83-2.83l.793-.792a4.018 4.018 0 01-.128-1.287z" />
                          <path d="M6.586 4.672A3 3 0 007.414 9.5l.775-.776a2 2 0 01-.896-3.346L9.12 3.55a2 2 0 112.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 10-4.243-4.243L6.586 4.672z" />
                        </svg>
                        Live Demo
                      </a>
                    </>
                  ) : (
                    <button className="btn-action" disabled>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z" />
                        <path d="M2.5 1A1.5 1.5 0 001 2.5v11A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-11A1.5 1.5 0 0013.5 1h-11zm1 1.5v11a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5h11a.5.5 0 01.5.5v11a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5z" />
                      </svg>
                      Coming Soon
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <VideoModal
        video={selectedVideo}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ProjectsGrid;
