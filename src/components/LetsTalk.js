import React from "react";

const LetsTalk = () => {
  return (
    <section className="project section lets_talk_containier">
      <h4>Let's Talk</h4>
      <p>
        Feel free to reach out if you're looking to hire, just want to connect
        or see if we can build something amazing together.
      </p>
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
              Get In Touch
              <i class="uil uil-message button__icon"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LetsTalk;
