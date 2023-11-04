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
                    Tavant Technologies{" "}
                  </span>
                  <div className="qualification__calender">
                    <i className="uil uil-calendar-alt"></i> 2021 Dec -2023 Oct
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
                  <h3 className="qualification__title">Software Engineer</h3>
                  <span className="qualification__subtitle">
                    {" "}
                    Capital Numbers{" "}
                  </span>
                  <div className="qualification__calender">
                    <i className="uil uil-calendar-alt"></i> 2021 Mar -2021 Dec
                  </div>
                </div>
              </div>

              <div className="qualification__data">
                <div>
                  <h3 className="qualification__title">React Engineer</h3>
                  <span className="qualification__subtitle">
                    {" "}
                    Vibrant Info{" "}
                  </span>
                  <div className="qualification__calender">
                    <i className="uil uil-calendar-alt"></i> 2020 March -2021
                    March
                  </div>
                </div>
                <div>
                  <span className="qualification__rounder"></span>
                  <span className="qualification__line"></span>
                </div>
              </div>

              {/* <div className="qualification__data">
                <div></div>
                <div>
                  <span className="qualification__rounder"></span>
                </div>
                <div>
                  <h3 className="qualification__title">UI/UX Engineer</h3>
                  <span className="qualification__subtitle"> Rakuten </span>
                  <div className="qualification__calender">
                    <i className="uil uil-calendar-alt"></i> 2020-2023
                  </div>
                </div>
              </div> */}
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
                  <h3 className="qualification__title">Diploma</h3>
                  <span className="qualification__subtitle">
                    BITS, Sambalpur, ODISHA
                  </span>
                  <div className="qualification__calender">
                    <i className="uil uil-calendar-alt"></i> 2011-2014
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
                  <h3 className="qualification__title">B.Tech</h3>
                  <span className="qualification__subtitle">
                    {" "}
                    P.K.A.C.E, Bargarh, ODISHA{" "}
                  </span>
                  <div className="qualification__calender">
                    <i className="uil uil-calendar-alt"></i> 2014-2017
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
