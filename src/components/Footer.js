import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faMedium } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import "./Footer.scss";

const Footer = () => {
  const socialLinks = [
    { icon: faMedium, url: "https://medium.com/@sakarim9124", label: "Medium" },
    { icon: faLinkedin, url: "https://www.linkedin.com/in/sayed4747/", label: "LinkedIn" },
    { icon: faGithub, url: "https://github.com/sayedabdulkarim", label: "GitHub" },
    { icon: faCode, url: "https://leetcode.com/u/SayedAbdul/", label: "LeetCode" },
    { icon: faEnvelope, url: "mailto:sakarim9124@gmail.com", label: "Email" },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          <span className="funky-text">console.log</span>
          <span className="brackets">(</span>
          <span className="string">"Keep Building, Keep Breaking"</span>
          <span className="brackets">)</span>
          <span className="semicolon">;</span>
          <span className="cursor">|</span>
        </p>

        <div className="footer-links">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="footer-link"
              title={link.label}
            >
              <FontAwesomeIcon icon={link.icon} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
