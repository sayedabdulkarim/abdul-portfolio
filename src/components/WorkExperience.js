import React from "react";
import "./WorkExperience.scss";

const WorkExperience = () => {
  const experiences = [
    {
      id: 1,
      logo: "https://careers.publicissapient.com/content/dam/ps-rebrand/brand/ps-logo-NEW.svg",
      title: "Senior Experience Engineer",
      company: "Publicis Sapient",
      period: "2023 Dec - Present",
      description: [
        "Patient Portal - For Optum patients (HealthCare Partners/AppleCare Medical Group)",
        "Company Timesheet App - Desktop portal to consolidate timesheet submissions across platforms",
      ],
      technologies: [
        "React Native",
        "TypeScript",
        "Firebase",
        "Abyss CSS",
        "Jest",
        "Electron",
        "Node.js",
        "Express",
        "XLSX",
        "PapaParse",
        "CSV-Parser",
        "Nodemailer",
      ],
      projects: [
        {
          name: "Patient Portal Android",
          url: "https://play.google.com/store/apps/details?id=com.optum.mobile.optum&hl=en_IN",
        },
        {
          name: "Patient Portal iOS",
          url: "https://apps.apple.com/us/app/optum/id6504930082",
        },
        { name: "Patient Portal Web", url: "https://patient.optum.com/" },
      ],
    },
    {
      id: 2,
      logo: "https://cdn-iggbnmj.nitrocdn.com/IOuwzrymxSPtcVcIdYOcPVHHtftxrxAA/assets/images/optimized/rev-4ed415b/tavant.com/wp-content/uploads/2025/02/Tavant-Logo-original.png",
      title: "Software Engineer",
      company: "Tavant Technologies",
      period: "2021 Dec - 2023 Oct",
      description: [
        "Scalable Legal - Legal management platform with ReactJS, Redux(toolkit), API integration",
        "winfieldUnited - Agricultural platform with jQuery, JavaScript, Foundation Framework, Bootstrap",
      ],
      technologies: [
        "React",
        "Redux Toolkit",
        "Material UI",
        "Router",
        "TypeScript",
        "Node.js",
        "Express",
        "MongoDB",
        "Firebase",
        "Zendesk",
        "jQuery",
        "Bootstrap",
        "Kentico",
        "GIT",
        "Twilio Chat",
        "Google Map API",
      ],
      projects: [
        { name: "Scalable Legal", url: "http://dev.settlementapp99.com/" },
        {
          name: "winfieldUnited - WUC",
          url: "https://www.winfieldunited.com/",
        },
        {
          name: "winfieldUnited - WUCA",
          url: "https://www.winfieldunited.ca/",
        },
        {
          name: "winfieldUnited - PORTAL",
          url: "http://portaldev.winfieldunited.com/",
        },
        { name: "winfieldUnited - CROPLAN", url: "https://www.croplan.com/" },
        {
          name: "winfieldUnited - TOOLSTAGE",
          url: "https://www.toolsstage.winfieldunited.com/",
        },
      ],
    },
    {
      id: 3,
      logo: "https://www.capitalnumbers.com/images/logo.svg",
      title: "Software Engineer",
      company: "Capital Numbers",
      period: "2021 Mar - 2021 Dec",
      description: [
        "DewSquad (UserEnd) - E-commerce platform with Redux Toolkit, API integration, Unit Testing",
        "DewSquad (Admin) - Admin panel with Material UI, NextJS, Router, Redux(thunk), API integration",
      ],
      technologies: [
        "React",
        "Redux",
        "Redux Toolkit",
        "Redux Thunk",
        "Material UI",
        "NextJS",
        "Router",
        "TypeScript",
        "Node.js",
        "Express",
        "MongoDB",
        "BIT Bucket",
      ],
      projects: [
        { name: "DewSquad UserEnd", url: "https://www.dewchallenge.com/en" },
      ],
    },
    {
      id: 4,
      logo: "https://www.vibrant-info.com/wp-content/themes/vibrant/images/logo.svg",
      title: "React Engineer",
      company: "Vibrant Info",
      period: "2020 March - 2021 March",
      description: [
        "Nodwin Vendor Portal - Vendor management system with ReactSSR, ContextAPI, Redux integration",
        "Alwar Soft - Educational platform with Material UI, ReactJS, Router, Redux(saga) integration",
      ],
      technologies: [
        "React",
        "ReactSSR",
        "Redux",
        "Redux Saga",
        "Material UI",
        "ContextAPI",
        "Bootstrap",
        "Node.js",
        "Express",
        "MongoDB",
        "Firebase",
        "Zendesk",
        "S3 Bucket",
        "Cloudinary",
        "BIT Bucket",
        "TypeScript",
      ],
      projects: [{ name: "Nodwin Vendor Portal", url: "https://www.nodw.in/" }],
    },
  ];

  return (
    <div className="work-experience">
      <div className="container">
        {experiences.map((exp) => (
          <div key={exp.id} className="experience-card">
            <div className="card-header">
              <div className="company-info">
                <img
                  src={exp.logo}
                  alt={exp.company}
                  className={`company-logo ${
                    exp.id === 1 || exp.id === 4 ? "white-bg" : ""
                  }`}
                />
                <div className="company-details">
                  <h3 className="job-title">
                    {exp.title}
                    {exp.id === 1 && <span className="status-dot">•</span>}
                  </h3>
                  <span className="company-name">{exp.company}</span>
                </div>
              </div>
              <span className="period">{exp.period}</span>
            </div>

            <div className="card-body">
              <ul className="description-list">
                {exp.description.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              {exp.projects && exp.projects.length > 0 && (
                <div className="projects">
                  <h4 className="projects-title">Projects:</h4>
                  <div className="projects-list">
                    {exp.projects.map((project, index) => (
                      <a
                        key={index}
                        href={
                          project.url.startsWith("http") ? project.url : "#"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        {project.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="technologies">
                {exp.technologies.map((tech, index) => (
                  <span key={index} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkExperience;
