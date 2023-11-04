import React, { useRef } from "react";
import SkillComponent from "../../components/SkillComponent";
import QualificationComponent from "../../components/QualificationComponent";
import PortfolioComponent from "../../components/Portfolio";
import LetsTalk from "../../components/LetsTalk";

const Home = () => {
  //misc
  const endOfPageRef = useRef(null);

  //func
  const scrollToBottom = () => {
    endOfPageRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="main">
      {/* Home banner */}
      <section className="home section" id="home">
        <div className="home__container container grid">
          <div className="home__content grid">
            <div className="home__social">
              <a
                href="https://www.linkedin.com/in/rawatanimesh/"
                target="_blank"
                className="home__social-icon"
                rel="noreferrer"
              >
                <i className="uil uil-linkedin-alt"></i>
              </a>
              <a
                href="https://github.com/rawatanimesh"
                target="_blank"
                className="home__social-icon"
                rel="noreferrer"
              >
                <i className="uil uil-github-alt"></i>
              </a>
              <a
                href="https://t.me/rawatanimesh"
                target="_blank"
                className="home__social-icon"
                rel="noreferrer"
              >
                <i className="uil uil-telegram-alt"></i>
              </a>
            </div>

            <div className="home__img">
              <svg
                className="home__blob"
                viewBox="0 0 200 187"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask id="mask0" mask-type="alpha">
                  <path
                    d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 165.547 
                                130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 129.362C2.45775 
                                97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 -0.149132 97.9666 
                                0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z"
                  />
                </mask>
                <g mask="url(#mask0)">
                  <path
                    d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 
                                165.547 130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 
                                129.362C2.45775 97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 
                                -0.149132 97.9666 0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z"
                  />
                  <image className="home__blob-img" x="-20"></image>
                </g>
              </svg>
            </div>

            <div className="home__data">
              {/* <h1 className="home__title">Hi, I am Animesh</h1> */}
              <h1 className="home__title" style={{ fontSize: "32px" }}>
                Hi👋🏻, I'm{" "}
                <span className="dark:text-[#FAFAFA] text-[#18181B]">
                  Abdul !
                </span>
              </h1>
              <a
                href="https://www.linkedin.com/in/azar-ahemad-54b55a204/"
                className="text-gray-600 dark:text-gray-400 text-xl font-bold"
                style={{ color: "orange" }}
              >
                @Abdul
              </a>
              {/* <h3 className="home__subtitle">Web Developer</h3> */}

              <p className="home__description" style={{ marginTop: "15px" }}>
                I'm a Full-Stack Developer who loves building for the web &
                mobile. I spent most of my time designing for upcoming projects
                and making design resources and tools. Have a good read! 👋🏻
              </p>
              <button
                className="button button--flex"
                onClick={scrollToBottom}
                style={{ border: "none" }}
              >
                Contact Me<i className="uil uil-message button__icon"></i>
              </button>
            </div>
          </div>
          {/* <div className="home__scroll">
            <a href="#skills" className="home__scroll-button button--flex">
              <i className="uil uil-mouse-alt home__scroll-mouse"></i>
              <span className="home__scroll-name">Scroll Down</span>
              <i className="uil uil-arrow-down home__scroll-arrow"></i>
            </a>
          </div> */}
        </div>
      </section>

      {/* Skill */}
      <SkillComponent />

      {/* Qualification */}
      <QualificationComponent />

      {/* Portfolio */}
      <PortfolioComponent />

      {/* Lets Talk */}
      <LetsTalk />

      {/* This is the last element on your page */}
      <div ref={endOfPageRef}></div>
    </main>
  );
};

export default Home;
