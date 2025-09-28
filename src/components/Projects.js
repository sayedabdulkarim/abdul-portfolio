import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Projects.scss';

const Projects = () => {
  const projects = [
    {
      id: 1,
      name: 'Food Delivery App',
      description: 'Full-stack food delivery platform with client portal, admin dashboard, and server API',
      status: 'completed',
      features: [
        {
          title: 'Client Portal',
          description: 'Built with React, Redux Toolkit, TypeScript, SCSS, Font Face Observer for async font loading and Google Maps. Secured with JWT and CSRF tokens.',
          url: '#'
        },
        {
          title: 'Admin Portal',
          description: 'Order and data management using the same client tech stack.',
          url: '#'
        },
        {
          title: 'Server API',
          description: 'Node.js, Express, MongoDB, Firebase (OTP, CSRF), JWT, Prompt Engineering, LLM, Sentiment Analysis.'
        }
      ],
      technologies: ['React', 'Redux Toolkit', 'TypeScript', 'SCSS', 'Node.js', 'Express', 'MongoDB', 'Firebase', 'JWT', 'Google Maps', 'LLM', 'Sentiment Analysis'],
      image: 'https://via.placeholder.com/400x250'
    },
    {
      id: 2,
      name: 'Synth AI - No-Code Application Generator',
      description: 'AI-powered platform for generating applications without writing code',
      status: 'completed',
      features: [
        {
          title: 'Client-Side',
          description: 'Built with React, TypeScript, Emotion (CSS-in-JS), Material-UI, monaco-editor and Socket.io-client for real-time terminal communication, with persistent API key management and WebSocket connection handling.',
          url: '#'
        },
        {
          title: 'Backend',
          description: 'Developed with Node.js, Express, and file-based storage; implemented AI-powered code generation using Anthropic & MCP (Model Context Protocol), real-time terminal emulation with node-pty, project lifecycle management, and dynamic proxy routing for live previews.'
        }
      ],
      technologies: ['React', 'TypeScript', 'Emotion', 'Material-UI', 'Monaco Editor', 'Socket.io', 'WebSocket', 'Node.js', 'Express', 'Anthropic AI', 'MCP', 'node-pty'],
      image: 'https://via.placeholder.com/400x250'
    },
    {
      id: 3,
      name: 'Kanbanix',
      description: 'Advanced Kanban board application with AI-powered features and real-time collaboration',
      status: 'upcoming',
      features: [
        {
          title: 'Frontend',
          description: 'Built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Zustand for state management. Features drag-and-drop functionality with @dnd-kit.'
        },
        {
          title: 'Backend & AI',
          description: 'Powered by Prisma ORM, NextAuth for authentication, Socket.io for real-time updates, and Anthropic SDK with Model Context Protocol for AI features.'
        },
        {
          title: 'Developer Tools',
          description: 'Integrated with GitHub API (Octokit) for version control features and workspace management capabilities.'
        }
      ],
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Prisma', 'NextAuth', 'Socket.io', 'Zustand', '@dnd-kit', 'Anthropic SDK', 'MCP', 'Octokit'],
      image: 'https://via.placeholder.com/400x250'
    }
  ];

  return (
    <div className="projects">
      <div className="container">
        <div className="slider-wrapper">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            className="projects-slider"
          >
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              <div className="project-card">
                {project.status === 'upcoming' && (
                  <span className="status-badge upcoming">Upcoming</span>
                )}
                
                <div className="project-content">
                  <h3 className="project-title">{project.name}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-features">
                    {project.features.map((feature, index) => (
                      <div key={index} className="feature">
                        <h4 className="feature-title">{feature.title}</h4>
                        <p className="feature-description">{feature.description}</p>
                        {feature.url && (
                          <a href={feature.url} target="_blank" rel="noopener noreferrer" className="feature-link">
                            View <span>→</span>
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="project-technologies">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  
                  <div className="project-actions">
                    <button className="btn-primary">View Details</button>
                    {project.status !== 'upcoming' && (
                      <button className="btn-secondary">Live Demo</button>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Projects;