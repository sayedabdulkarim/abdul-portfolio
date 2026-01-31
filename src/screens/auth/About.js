import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "./About.scss";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-header">
          <h1 className="about-title">
            {t("about.greeting")} <span className="wave">👋</span>, {t("about.name")}
          </h1>
        </div>

        <div className="about-intro">
          <p>
            👨‍💻 {t("about.intro1")}
          </p>
          <p>
            {t("about.intro2")} 🤔.
          </p>
          <p>
            <Trans i18nKey="about.intro3" components={{ strong: <strong /> }} /> 🧠🤖🚀
          </p>
        </div>

        <div className="about-details">
          <p>🌱 {t("about.learning")} <strong>{t("about.learningSkills")}</strong></p>
          <p>📫 {t("about.reachMe")} <strong>sakarim9124@gmail.com</strong></p>
          <p>🎯 {t("about.funFact")}</p>
        </div>

        <div className="about-connect">
          <h3>{t("about.connectWithMe")}</h3>
          <div className="connect-links">
            <a href="mailto:sakarim9124@gmail.com" className="connect-link" title="Email">
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
            <a href="https://www.linkedin.com/in/sayed4747" target="_blank" rel="noreferrer" className="connect-link" title="LinkedIn">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="https://github.com/sayedabdulkarim" target="_blank" rel="noreferrer" className="connect-link" title="GitHub">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
