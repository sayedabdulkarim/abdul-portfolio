import React, { useState } from "react";

const QualificationComponent = () => {
  const [isWork, setIsWork] = useState(true);

  const handleIsWork = (val) => {
    setIsWork(val);
  };

  return (
    <section className="qualification section">
      <h2 className="section__title">Qualification</h2>
      <span className="section__subtitle">My personal journey</span>

      <div className="qualification__container container">
        <div className="qualification__tabs">
          <div
            className="qualification__button button--flex qualification__active"
            data-target="#work"
            onClick={() => handleIsWork(true)}
          >
            <i className="uil uil-briefcase-alt qualification__icon"> </i> Work
          </div>

          <div
            className="qualification__button button--flex"
            data-target="#education"
            onClick={() => handleIsWork(false)}
          >
            <i className="uil uil-graduation-cap qualification__icon"> </i>
            Education
          </div>
        </div>

        <div className="qualification__sections">
          {isWork ? (
            <div
              //   className="qualification__content qualification__active"
              className={`qualification__content ${
                isWork ? "qualification__active" : ""
              }`}
              data-content
              id="work"
            >
              <div className="qualification__data">
                <div>
                  <h3 className="qualification__title">Software Engineer</h3>
                  <span className="qualification__subtitle">
                    {" "}
                    Tech Mahindra{" "}
                  </span>
                  <div className="qualification__calender">
                    <i className="uil uil-calendar-alt"></i> 2015-2018
                  </div>
                </div>

                <div>
                  <span className="qualification__rounder"></span>
                  <span className="qualification__line"></span>
                </div>
              </div>

              <div className="qualification__data">
                <div></div>
                <div>
                  <span className="qualification__rounder"></span>
                  <span className="qualification__line"></span>
                </div>
                <div>
                  <h3 className="qualification__title">Frontend Developer</h3>
                  <span className="qualification__subtitle"> Mobikasa </span>
                  <div className="qualification__calender">
                    <i className="uil uil-calendar-alt"></i> 2018-2019
                  </div>
                </div>
              </div>

              <div className="qualification__data">
                <div>
                  <h3 className="qualification__title">Lead Engineer</h3>
                  <span className="qualification__subtitle"> HCL </span>
                  <div className="qualification__calender">
                    <i className="uil uil-calendar-alt"></i> 2019-2020
                  </div>
                </div>
                <div>
                  <span className="qualification__rounder"></span>
                  <span className="qualification__line"></span>
                </div>
              </div>

              <div className="qualification__data">
                <div></div>
                <div>
                  <span className="qualification__rounder"></span>
                  {/* <!-- <span className="qualification__line"></span> --> */}
                </div>
                <div>
                  <h3 className="qualification__title">UI/UX Engineer</h3>
                  <span className="qualification__subtitle"> Rakuten </span>
                  <div className="qualification__calender">
                    <i className="uil uil-calendar-alt"></i> 2020-2023
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              // className="qualification__content"
              className={`qualification__content ${
                !isWork ? "qualification__active" : ""
              }`}
              data-content
              id="education"
            >
              <div className="qualification__data">
                <div>
                  <h3 className="qualification__title">HSC, Science</h3>
                  <span className="qualification__subtitle">
                    St. Mary's Academy
                  </span>
                  <div className="qualification__calender">
                    <i className="uil uil-calendar-alt"></i> 2009-2011
                  </div>
                </div>

                <div>
                  <span className="qualification__rounder"></span>
                  <span className="qualification__line"></span>
                </div>
              </div>

              <div className="qualification__data">
                <div></div>
                <div>
                  <span className="qualification__rounder"></span>
                  {/* <!-- <span className="qualification__line"></span> --> */}
                </div>
                <div>
                  <h3 className="qualification__title">B.Tech, Electronics</h3>
                  <span className="qualification__subtitle">
                    {" "}
                    Sharda University{" "}
                  </span>
                  <div className="qualification__calender">
                    <i className="uil uil-calendar-alt"></i> 2011-2015
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default QualificationComponent;
