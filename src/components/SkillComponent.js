import React from "react";

const SkillComponent = () => {
  return (
    <section className="skills section" id="skills">
      <h2 className="section__title">Skills</h2>
      <span className="section__subtitle">My tech stack</span>
      <div className="skills__container container grid">
        <div className="skills__container-box">
          <img
            className="skills__container-img"
            src="/assets/img/skills/angular.svg"
            alt="angular"
          />
          <div className="skills__container-name">Angular</div>
        </div>

        <div className="skills__container-box">
          <img
            className="skills__container-img"
            src="/assets/img/skills/react.svg"
            alt="react"
          />
          <div className="skills__container-name">React</div>
        </div>

        <div className="skills__container-box">
          <img
            className="skills__container-img"
            src="/assets/img/skills/vue.svg"
            alt="vue"
          />
          <div className="skills__container-name">Vue</div>
        </div>

        <div className="skills__container-box">
          <img
            className="skills__container-img"
            src="/assets/img/skills/typescript.svg"
            alt="typescript"
          />
          <div className="skills__container-name">TypeScript</div>
        </div>

        <div className="skills__container-box">
          <img
            className="skills__container-img"
            src="/assets/img/skills/javascript.svg"
            alt="javascript"
          />
          <div className="skills__container-name">JavaScript</div>
        </div>

        <div className="skills__container-box">
          <img
            className="skills__container-img"
            src="/assets/img/skills/html.svg"
            alt="html"
          />
          <div className="skills__container-name">HTML</div>
        </div>

        <div className="skills__container-box">
          <img
            className="skills__container-img"
            src="/assets/img/skills/css.svg"
            alt="css"
          />
          <div className="skills__container-name">CSS</div>
        </div>

        <div className="skills__container-box">
          <img
            className="skills__container-img"
            src="/assets/img/skills/sass.svg"
            alt="sass"
          />
          <div className="skills__container-name">SASS</div>
        </div>

        <div className="skills__container-box">
          <img
            className="skills__container-img"
            src="/assets/img/skills/firebase.svg"
            alt="firebase"
          />
          <div className="skills__container-name">Firebase</div>
        </div>
      </div>
    </section>
  );
};

export default SkillComponent;
