import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import {
  Pagination,
  Navigation,
  HashNavigation,
  Autoplay,
} from "swiper/modules";

export default function App() {
  return (
    <>
      <section class="portfolio section" id="portfolio">
        <h2 class="section__title">Portfolio</h2>
        <span class="section__subtitle">Most recent work</span>

        <Swiper
          hashNavigation={{
            watchState: false,
          }}
          modules={[Pagination, Navigation, HashNavigation, Autoplay]}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500, // Delay between transitions in ms
            disableOnInteraction: false, // To continue autoplay after user interaction
          }}
          className="mySwiper portfolio__container"
          style={{
            height: "310px",
          }}
        >
          <div class="portfolio__container container swiper-container">
            <div class="swiper-wrapper">
              <SwiperSlide
                // data-hash="slide1"
                className="portfolio__content grid"
              >
                <img
                  src="https://animesh-rawat.web.app/assets/img/portfolio/unichat.PNG"
                  alt=""
                  className="portfolio__img"
                />
                <div className="portfolio__data">
                  <h3 className="portfolio__title">Chat Application</h3>
                  <p className="portfolio__description">
                    Chat app created using react, firebase and chat-engine.
                  </p>
                  <a
                    href="https://github.com/sayedabdulkarim"
                    target="_blank"
                    className="button button--flex button--small portfolio__button"
                    rel="noreferrer"
                  >
                    Demo
                    <i className="uil uil-arrow-right button__icon"></i>
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide
                // data-hash="slide1"
                className="portfolio__content grid"
              >
                <img
                  src="https://animesh-rawat.web.app/assets/img/portfolio/unichat.PNG"
                  alt=""
                  className="portfolio__img"
                />
                <div className="portfolio__data">
                  <h3 className="portfolio__title">Chat Application</h3>
                  <p className="portfolio__description">
                    Chat app created using react, firebase and chat-engine.
                  </p>
                  <a
                    href="https://github.com/sayedabdulkarim"
                    target="_blank"
                    className="button button--flex button--small portfolio__button"
                    rel="noreferrer"
                  >
                    Demo
                    <i className="uil uil-arrow-right button__icon"></i>
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide
                // data-hash="slide1"
                className="portfolio__content grid"
              >
                <img
                  src="https://animesh-rawat.web.app/assets/img/portfolio/unichat.PNG"
                  alt=""
                  className="portfolio__img"
                />
                <div className="portfolio__data">
                  <h3 className="portfolio__title">Chat Application</h3>
                  <p className="portfolio__description">
                    Chat app created using react, firebase and chat-engine.
                  </p>
                  <a
                    href="https://github.com/sayedabdulkarim"
                    target="_blank"
                    className="button button--flex button--small portfolio__button"
                    rel="noreferrer"
                  >
                    Demo
                    <i className="uil uil-arrow-right button__icon"></i>
                  </a>
                </div>
              </SwiperSlide>
            </div>
          </div>
        </Swiper>
      </section>
    </>
  );
}
