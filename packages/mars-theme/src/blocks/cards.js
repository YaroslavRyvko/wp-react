import React, { useEffect, useRef } from "react";
import { css } from "frontity";
import Link from "@frontity/components/link"

const CardsBlock = ({ fields }) => {
  const controllerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ScrollMagic = require("scrollmagic");
      const { TweenMax, TimelineMax, Linear } = require("gsap");
      const { ScrollMagicPluginGsap } = require("scrollmagic-plugin-gsap");
      
      ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

      controllerRef.current = new ScrollMagic.Controller();

      const mediaMobile = window.innerWidth < 768;
      const cards = document.querySelectorAll(".cards");

      cards.forEach((el) => {
        const timeline = new TimelineMax();
        const cardItems = el.querySelectorAll(".cards__item");

        cardItems.forEach((item, index) => {
          timeline.fromTo(item, 1, { y: 0 }, {
            y: "-50%",
            ease: Linear.easeNone
          });
        });

        new ScrollMagic.Scene({
          triggerElement: el,
          duration: mediaMobile ? 100 : 200,
          triggerHook: 0.5,
        })
          .setTween(timeline)
          .addTo(controllerRef.current);
      });
    }

    return () => {
      if (controllerRef.current) {
        controllerRef.current.destroy(true);
        controllerRef.current = null;
      }
    };
  }, []);

  return (
    <section className="cards" css={styles}>
      <div className="site-container">
        <div className="cards__wrapper">
          {fields.title && (
            <h2 className="cards__title title-2">{fields.title}</h2>
          )}

          {fields.cta && (
            <Link link={fields.cta.url} className="cards__cta black-cta-l">
              {fields.cta.title}
            </Link>
          )}

          <div className="cards__list">
            {fields.cards.map((item, index) => (
              <div key={index} className={`cards__item cards__item-${index}`}>
                {item.icon && (
                  <div className="cards__item-image">
                    <img
                      src={item.icon.url}
                      alt={item.icon.alt || "Card icon"}
                    />
                  </div>
                )}
                {item.text && (
                  <h3 className="cards__item-text title-3">{item.text}</h3>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardsBlock;

const styles = css`
  padding: 16rem 0 10rem;
  background-color: var(--color-gray2);

  @media screen and (max-width: 1025px) {
    padding: 10rem 0 0;
  }

  .cards {
    &__wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__title {
      max-width: 90rem;
      margin: 0 auto 4rem;
      text-align: center;

      @media screen and (max-height: 800px) {
        margin: 0 auto 2rem;
        font-size: 3.5rem;
      }
    }

    &__cta {
      margin-bottom: 8.8rem;

      @media screen and (max-height: 800px) {
        margin-bottom: 5rem;
      }
    }

    &__list {
      width: 100%;
      position: relative;
    }

    &__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      max-width: 88rem;
      margin: 0 auto;
      padding: 4.8rem 2rem;
      border-radius: 2.4rem;
      background-color: var(--color-sky-blue);

      &-0 {
        background-color: var(--color-sky-blue4);
        scale: 0.7;
        position: relative;
        top: -1rem;
      }

      &-1 {
        background-color: var(--color-sky-blue3);
        top: 2rem;
        scale: 0.8;
      }

      &-2 {
        background-color: var(--color-sky-blue2);
        top: 5rem;
        scale: 0.9;
      }

      &-3 {
        background-color: var(--color-sky-blue);
        top: 8rem;
        scale: 1;
      }

      @media screen and (max-width: 1025px) {
        padding: 6rem 4rem;
        border-radius: 1rem;
      }

      @media screen and (max-width: 768px) {
        padding: 3.2rem 4rem;
      }

      &:not(:first-child) {
        position: absolute;
        left: 0;
        right: 0;
      }

      &-image {
        width: 14rem;
        height: 14rem;
        margin-bottom: 4rem;

        @media screen and (max-height: 800px) {
          width: 6.4rem;
          height: 6.4rem;
          margin-bottom: 1.6rem;
        }

        @media screen and (max-width: 1025px) {
          width: 6.4rem;
          height: 6.4rem;
          margin-bottom: 1.6rem;
        }

        img,
        svg {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      &-text {
        text-align: center;

        @media screen and (max-height: 800px) {
          font-size: 2rem;
        }
      }
    }
  }

`;
