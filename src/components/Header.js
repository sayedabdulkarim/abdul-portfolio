import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setSelectedTheme } from "../slices/settings/settingSlice";
// import { setSelectedTheme } from "../slices/settings/settingApiSlice";
import { toggleTheme } from "../utils/settings";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";
const Header = () => {
  const dispatch = useDispatch();
  const { selectedTheme } = useSelector((state) => state.settingsReducer);

  //state
  const [theme, setTheme] = useState(null);

  //func
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

  return (
    <>
      <header className="header" id="header">
        <nav className="nav container">
          <Link to="/" className="nav__logo noSelect">
            Sayed Abdul Karim
          </Link>

          {/* <p
            onClick={() =>
              console.log({
                selectedTheme,
                theme,
              })
            }
          >
            selectedTheme
          </p> */}

          <div className="nav__menu" id="nav-menu">
            <ul className="nav__list grid">
              {/* <li className="nav__item">
                <Link to="/" className="nav__link noSelect active-link">
                  <i className="uil uil-estate nav__icon"></i> Home
                </Link>
              </li>

              <li className="nav__item">
                <Link to="/about" className="nav__link noSelect">
                  <i className="uil uil-user nav__icon"></i> About
                </Link>
              </li>

              <li className="nav__item">
                <Link to="/projects" className="nav__link noSelect">
                  <i className="uil uil-file-alt nav__icon"></i> Projects
                </Link>
              </li>

              <li className="nav__item">
                <Link to="/contact" className="nav__link noSelect">
                  <i className="uil uil-message nav__icon"></i> Contact
                </Link>
              </li> */}
            </ul>
            <i className="uil uil-times nav__close noSelect" id="nav-close"></i>
          </div>

          <div className="nav__btns">
            <FontAwesomeIcon
              icon={selectedTheme ? faSun : faMoon}
              onClick={() =>
                !theme ? handleChange("dark-theme") : handleChange(null)
              }
            />
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
