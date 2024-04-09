import { css } from "frontity";
import { useRef, useEffect } from "react";

import Swiper, { Navigation } from "swiper";
import ArrowRightIcon from "../images/arrow-right-icon";
import Link from "@frontity/components/link";

const EventsSliderBlock = ({ fields }) => {
  const swiperRef = useRef(null);
  const nextRef = useRef(null);
  const prevRef = useRef(null);

  useEffect(() => {
    if (fields && fields.slides) {
      const swiper = new Swiper(swiperRef.current, {
        modules: [Navigation],
        slidesPerView: "auto",
        spaceBetween: 10,
        allowTouchMove: false,
        speed: 1500,
        navigation: {
          nextEl: nextRef.current,
          prevEl: prevRef.current,
        },
        breakpoints: {
          320: {
            slidesPerView: 1.1,
            spaceBetween: 12,
          },
          991: {
            slidesPerView: "auto",
            spaceBetween: 10,
          },
        },
      });

      return () => {
        if (swiper) swiper.destroy(true, true);
      };
    }
  }, [fields]);

  return (
    <section className="events-slider" css={styles}>
      <div className="site-container">
        <div className="events-slider__wrapper">
          {fields.title && (
            <h2 className="events-slider__title title-2">{fields.title}</h2>
          )}
          {fields.subtitle && (
            <div className="events-slider__subtitle text-l">
              {fields.subtitle}
            </div>
          )}
          {fields.cta && (
            <Link link={fields.cta.url} className="events-slider__cta white-cta">
              {fields.cta.title}
            </Link>
          )}

          {fields.slides && (
            <div className="events-slider__list">
              <div className="swiper" ref={swiperRef}>
                <div className="swiper-wrapper">
                  {fields.slides.map((item, index) => (
                    <div className="swiper-slide" key={index}>
                      <div className="events-slider__slide">
                        {item.image && (
                          <div className="events-slider__slide-image">
                            <img
                              src={item.image.url}
                              alt={item.image.alt || ""}
                            />
                          </div>
                        )}
                        <div className="events-slider__slide-info">
                          {item.date && (
                            <div className="events-slider__slide-date">
                              {item.date}
                            </div>
                          )}
                          {item.title && (
                            <h3 className="events-slider__slide-title title-3">
                              {item.title}
                            </h3>
                          )}
                          {item.text && (
                            <div className="events-slider__slide-text text-m">
                              {item.text}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="events-slider__nav">
                <div className="events-slider__prev" ref={prevRef}>
                  <ArrowRightIcon />
                </div>
                <div className="events-slider__next" ref={nextRef}>
                  <ArrowRightIcon />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventsSliderBlock;

const styles = css`
  padding: 16rem 0;
  overflow: hidden;

  @media screen and (max-width: 1025px) {
    padding: 6.4rem 0;
  }

  .events-slider {
    &__wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__title {
      margin-bottom: 1.6rem;
    }

    &__subtitle {
      max-width: 50rem;
      margin: 0 auto 4rem;
      text-align: center;
      font-weight: 400;
    }

    &__cta {
      margin-bottom: 8.8rem;

      @media screen and (max-width: 1025px) {
        margin-bottom: 6.4rem;
      }
    }

    &__inner {
      width: calc((100vw - 120rem) / 2 + 120rem);

      @media screen and (max-width: 1100px) {
        width: 100vw;
      }
    }

    &__list {
      width: 100%;
      position: relative;
    }

    &__nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: absolute;
      top: 50%;
      width: 100%;
      z-index: 2;
      transform: translateY(-50%);

      @media screen and (min-width: 1400px) {
        width: 107%;
      }

      @media screen and (max-width: 1025px) {
        top: 45%;
      }

      @media screen and (max-width: 991px) {
        top: 42%;
      }
    }

    &__prev,
    &__next {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 5.6rem;
      height: 5.6rem;
      border-radius: 50%;
      background-color: var(--color-blue);
      cursor: pointer;
      transition: background-color 0.3s ease-in-out;

      &:hover {
        background-color: #2151b6;
      }

      &.swiper-button-disabled {
        opacity: 0;
        visibility: hidden;
      }
    }

    &__prev {
      transform: rotate(-180deg);
    }

    &__slide {
      display: flex;
      gap: 3rem;

      @media screen and (max-width: 991px) {
        flex-direction: column;
        gap: 0;
      }

      &-image {
        width: 100%;
        max-width: 57rem;
        height: 57rem;
        border-radius: 2.4rem;
        overflow: hidden;

        @media screen and (max-width: 1200px) {
          max-width: 50rem;
        }

        @media screen and (max-width: 991px) {
          max-width: 100%;
          height: 35rem;
          gap: 0;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      &-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 6.4rem;
        border-radius: 2.4rem;
        background-color: var(--color-gray2);

        @media screen and (max-width: 991px) {
          margin-top: -9rem;
          padding: 3rem 2rem;
        }
      }

      &-date {
        margin-bottom: 4.8rem;
        font-size: 2.4rem;
        color: #7c7c7c;
        text-transform: uppercase;
        font-family: "GeneralSans", sans-serif;
        font-weight: 600;

        @media screen and (max-width: 991px) {
          margin-bottom: 2.4rem;
          font-size: 1.4rem;
        }
      }

      &-title {
        max-width: 60rem;
        margin-bottom: 1.6rem;

        @media screen and (max-width: 1280px) {
          max-width: 40rem;
        }

        @media screen and (max-width: 1100px) {
          max-width: 30rem;
          font-size: 2.4rem;
        }
      }

      &-text {
        max-width: 60rem;
        color: var(--color-dark-gray);

        @media screen and (max-width: 1100px) {
          font-size: 1.6rem;
        }
      }
    }
  }
`;
