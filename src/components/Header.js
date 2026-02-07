import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import { setSelectedTheme, setSelectedLanguage, setLanguageChanging } from "../slices/settings/settingSlice";
import { toggleTheme } from "../utils/settings";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCode, faGlobe, faChevronDown, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { t } = useTranslation();
  const { selectedLanguage } = useSelector((state) => state.settingsReducer);

  const [theme, setTheme] = useState(null);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const handleChange = (value) => {
    setTheme(value);
    toggleTheme(value);
    dispatch(setSelectedTheme(value));
  };

  useEffect(() => {
    setTheme("dark-theme");
    toggleTheme("dark-theme");
    dispatch(setSelectedTheme("dark-theme"));
  }, [dispatch]);

  // Sync Redux state with i18n on mount
  useEffect(() => {
    const savedLang = localStorage.getItem("selectedLanguage") || "en";
    if (savedLang !== selectedLanguage) {
      dispatch(setSelectedLanguage(savedLang));
    }
    if (i18n.language !== savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, [dispatch, selectedLanguage]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".nav__lang-dropdown")) {
        setShowLangDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const navLinks = [
    { path: "/projects", label: t("nav.projects") },
    { path: "/apps", label: t("nav.apps") },
    { path: "/blog", label: t("nav.blog") },
    { path: "/about", label: t("nav.about") },
  ];

  const isActive = (link) => {
    return location.pathname === link.path;
  };

  const languages = [
    { code: "en", displayCode: "EN", label: "English" },
    { code: "ar", displayCode: "AR", label: "Arabic" },
    { code: "kn", displayCode: "KN", label: "Kannada" },
    { code: "hi", displayCode: "HI", label: "Hindi" },
    { code: "fr", displayCode: "FR", label: "French" },
    { code: "es", displayCode: "ES", label: "Spanish" },
    { code: "de", displayCode: "DE", label: "German" },
  ];

  const handleLanguageSelect = (lang) => {
    if (lang.code === selectedLanguage) {
      setShowLangDropdown(false);
      return;
    }

    // Show loading bar
    dispatch(setLanguageChanging(true));
    setShowLangDropdown(false);

    // Change language immediately
    i18n.changeLanguage(lang.code).then(() => {
      // Update Redux state and localStorage
      dispatch(setSelectedLanguage(lang.code));
      localStorage.setItem("selectedLanguage", lang.code);

      // Hide loading bar after a brief moment
      setTimeout(() => {
        dispatch(setLanguageChanging(false));
      }, 500);
    });
  };

  const getCurrentLangDisplay = () => {
    const current = languages.find((l) => l.code === selectedLanguage);
    return current ? current.displayCode : "EN";
  };

  return (
    <header className="header" id="header">
      <nav className="nav">
        <Link to="/" className="nav__logo">
          <div className="logo-container">
            <img src="/assets/icon.gif" alt="Abdul" className="logo-gif" />
          </div>
        </Link>

        <div className="nav__right">
          <ul className="nav__links">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`nav__link ${isActive(link) ? "active" : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav__icons">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=sakarim9124@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="nav__icon-link"
              title="Email"
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
            <a
              href="https://github.com/sayedabdulkarim"
              target="_blank"
              rel="noreferrer"
              className="nav__icon-link"
              title="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a
              href="https://www.linkedin.com/in/sayed4747/"
              target="_blank"
              rel="noreferrer"
              className="nav__icon-link"
              title="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a
              href="https://leetcode.com/u/SayedAbdul/"
              target="_blank"
              rel="noreferrer"
              className="nav__icon-link"
              title="LeetCode"
            >
              <FontAwesomeIcon icon={faCode} />
            </a>
            <div className="nav__lang-dropdown">
              <button
                className="nav__icon-link nav__lang-btn"
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                title="Language"
              >
                <FontAwesomeIcon icon={faGlobe} />
                <span className="lang-code">{getCurrentLangDisplay()}</span>
                <FontAwesomeIcon icon={faChevronDown} className="chevron" />
              </button>
              {showLangDropdown && (
                <ul className="lang-dropdown-menu">
                  {languages.map((lang) => (
                    <li
                      key={lang.code}
                      className={`lang-option ${selectedLanguage === lang.code ? "active" : ""}`}
                      onClick={() => handleLanguageSelect(lang)}
                    >
                      {lang.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              className="nav__icon-link theme-toggle-btn"
              onClick={() => handleChange(theme ? null : "dark-theme")}
              title={theme ? "Light Mode" : "Dark Mode"}
            >
              <FontAwesomeIcon icon={theme ? faSun : faMoon} />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
