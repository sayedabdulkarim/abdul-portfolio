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
            pauseOnMouseEnter: true,
          }}
          className="mySwiper portfolio__container"
          style={
            {
              // height: "310px",
            }
          }
        >
          <div class="portfolio__container container swiper-container">
            <div class="swiper-wrapper">
              <SwiperSlide
                // data-hash="slide1"
                className="portfolio__content grid"
              >
                <img
                  src="https://res.cloudinary.com/cnq-first/image/upload/v1699790372/image_9_dz40k0.png"
                  alt=""
                  className="Snapshot_Spectacle__img"
                />
                <div className="portfolio__data">
                  <h3 className="portfolio__title">Snapshot Spectacle</h3>
                  <p className="portfolio__description">
                    A cutting-edge Real-time media interaction project that
                    harnesses the power of JavaScript and IndexedDB
                  </p>
                  <a
                    href="https://sayedabdulkarim.github.io/webam_core/"
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
                  src="https://res.cloudinary.com/cnq-first/image/upload/v1700314453/image_7_ommvng.png"
                  alt=""
                  className="portfolio__img"
                />
                <div className="portfolio__data">
                  <h3 className="portfolio__title">Sheets Wizardry</h3>
                  <p className="portfolio__description">
                    {/* Chat app created using react, firebase and chat-engine. */}
                    An Google Sheets showcasing advanced data manipulation and
                    visualization techniques.Features include complex formulas,
                    custom scripts for enhanced functionality, and dynamic data
                    visualization.
                  </p>
                  <a
                    href="https://sayedabdulkarim.github.io/g_sheet_core/"
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
                  src="https://res.cloudinary.com/cnq-first/image/upload/v1703608496/image_22_zgalcb.png"
                  alt=""
                  className="portfolio__img"
                />
                <div className="portfolio__data">
                  <h3 className="portfolio__title">Foodie's Delight</h3>
                  <p className="portfolio__description">
                    A user-centric food delivery application, offering an
                    interactive menu, and seamless checkout experience.
                  </p>
                  <a
                    href="https://food-delivery-ab.vercel.app/"
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
                  src="https://res.cloudinary.com/cnq-first/image/upload/v1703608496/image_23_dqwjmz.png"
                  alt=""
                  className="portfolio__img"
                />
                <div className="portfolio__data">
                  <h3 className="portfolio__title">Delish Dashboard</h3>
                  <p className="portfolio__description">
                    An intuitive admin panel for managing the Foodie's Delight
                    delivery service. Features include order oversight, and menu
                    customization. Developed using React and Node.js for
                    efficient backend integration.
                  </p>

                  <a
                    href="https://food-delivery-admin-one.vercel.app"
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
