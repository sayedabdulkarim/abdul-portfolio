import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons"; // Import phone icon

const LetsTalk = () => {
  return (
    <section className="project section lets_talk_containier">
      <h4>Let's Talk</h4>
      <p>
        Feel free to reach out if you're looking to hire, just want to connect
        or see if we can build something amazing together.
      </p>

      <span class="contact__subtitle">
        <FontAwesomeIcon icon={faPhoneAlt} />
        <strong>+91 8296708008</strong>
      </span>
      {/* <div>
        <div class="contact__information">
          <i class="uil uil-phone contact__icon"></i>

          <div>
            <h3 class="contact__title">Call Me</h3>
            <span class="contact__subtitle">
              <FontAwesomeIcon icon={faPhoneAlt} />
              +91 7838436141
            </span>
          </div>
        </div>
      </div> */}

      <div className="project__bg">
        <div className="project__container container grid">
          <div className="card">
            <p class="card-text">I'm ready to make your project happen.</p>
            <p class="card-text-multicolor">
              {/* Let’s <span>shape</span> the <span>future</span>! */}
              <span>L</span>et’s <span>s</span>hape <span>t</span>he{" "}
              <span>f</span>uture!
            </p>

            <button className="button button--flex mt-2">
              {/* Get In Touch
              <i class="uil uil-message button__icon"></i> */}
              <a
                href="mailto:sakarim9124@gmail.com"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Get In Touch
                <i className="uil uil-message button__icon"></i>
              </a>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LetsTalk;
