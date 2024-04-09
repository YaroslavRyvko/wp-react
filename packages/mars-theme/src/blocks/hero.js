import { css } from "frontity";
import Link from "@frontity/components/link";

const HeroBlock = ({ fields }) => {
  return (
    <>
      {fields && (
        <section className="hero" css={styles}>
          <div className="site-container">
            <div className="hero__wrapper">
              {fields.title && <h1 className="hero__title">{fields.title}</h1>}

              {fields.subtitle && (
                <p className="hero__subtitle text-l">{fields.subtitle}</p>
              )}

              {fields.cta && (
                <Link link={fields.cta.url} className="black-cta-l hero__cta">
                  {fields.cta.title}
                </Link>
              )}

              <div className="hero__list">
                {fields.items &&
                  fields.items.map((item, index) => (
                    <div className="hero__item" key={index}>
                      {item.title && (
                        <p className="hero__item-title ">{item.title}</p>
                      )}

                      {item.text && (
                        <p className="hero__item-text text-xxs">{item.text}</p>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {fields.images &&
            fields.images.map((image, key) => (
              <div className={`hero__image-${key}`} key={key}>
                <img src={image.image.url} alt={image.image.alt} />
              </div>
            ))}
        </section>
      )}
    </>
  );
};

export default HeroBlock;

const styles = css`
  position: relative;
  padding: 12rem 0;
  overflow: hidden;

  @media screen and (max-width: 1025px) {
    padding: 12rem 0 6.4rem;
  }

  &:after {
    content: "";
    width: 12rem;
    height: 12.6rem;
    position: absolute;
    left: 14rem;
    top: 28rem;
    background-color: var(--color-sky-blue);
    border-radius: 1.8rem;

    @media screen and (max-width: 1200px) {
      left: 9rem;
    }

    @media screen and (max-width: 1025px) {
      display: none;
    }
  }

  &:before {
    content: "";
    width: 4rem;
    height: 4rem;
    position: absolute;
    right: 17rem;
    bottom: 42rem;
    background-color: var(--color-black);
    border-radius: 0.8rem;

    @media screen and (max-width: 1025px) {
      display: none;
    }
  }

  .hero {
    &__image-0,
    &__image-1,
    &__image-2,
    &__image-3 {
      border-radius: 2.4rem;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__image-0 {
      position: absolute;
      width: 10rem;
      height: 21.8rem;
      left: -1rem;
      top: 6rem;

      @media screen and (max-width: 1300px) {
        left: -3.5rem;
      }

      @media screen and (max-width: 1025px) {
        top: 15rem;
      }

      @media screen and (max-width: 768px) {
        top: 22rem;
        width: 7rem;
        height: 15rem;
      }

      @media screen and (max-width: 768px) {
        top: 24rem;
        width: 7rem;
        height: 15rem;
      }

      @media screen and (max-width: 480px) {
        display: none;
      }
    }

    &__image-1 {
      position: absolute;
      width: 21.5rem;
      height: 22.3rem;
      right: 5rem;
      top: 16rem;

      @media screen and (max-width: 1300px) {
        right: -2.5rem;
      }

      @media screen and (max-width: 1025px) {
        top: 0;
        width: 10rem;
        height: 10rem;
        border-radius: 8px;
      }

      @media screen and (max-width: 768px) {
        width: 7rem;
        height: 7rem;
      }
    }

    &__image-2 {
      position: absolute;
      left: -1rem;
      width: 18rem;
      height: 21.8rem;
      bottom: 18rem;

      @media screen and (max-width: 1300px) {
        left: -6rem;
      }

      @media screen and (max-width: 1025px) {
        top: 0;
        left: -1rem;
        width: 10rem;
        height: 10rem;
        border-radius: 8px;
      }

      @media screen and (max-width: 768px) {
        width: 7rem;
        height: 7rem;
      }
    }

    &__image-3 {
      position: absolute;
      right: -2rem;
      width: 16rem;
      height: 20rem;
      bottom: 19rem;

      @media screen and (max-width: 1300px) {
        right: -4.5rem;
      }

      @media screen and (max-width: 1025px) {
        width: 14rem;
        height: 16rem;
        bottom: 23rem;
      }

      @media screen and (max-width: 768px) {
        display: none;
      }
    }

    &__wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__title {
      max-width: 67rem;
      margin: 0 auto 2.4rem;
      font-family: "HelveticaNow", sans-serif;
      font-size: 8rem;
      font-weight: 700;
      line-height: 1.05;
      text-align: center;
      color: var(--color-black);

      @media screen and (max-width: 1025px) {
        font-size: 4rem;
        margin: 0 auto 1.6rem;
      }
    }

    &__subtitle {
      max-width: 63rem;
      margin: 0 auto 4rem;
      text-align: center;
    }

    &__cta {
      margin-bottom: 12rem;

      @media screen and (max-width: 1025px) {
        margin-bottom: 6.4rem;
      }
    }

    &__list {
      display: flex;
      flex-wrap: wrap;
      max-width: 78.6rem;
      width: 100%;
      padding: 5rem 2rem;
      background-color: var(--color-gray2);
      border-radius: 2.4rem;

      @media screen and (max-width: 1025px) {
        padding: 3rem 0;
        gap: 5rem 0;
      }
    }

    &__item {
      width: 33.3%;
      padding: 0 2.4rem;
      border-right: 1px solid var(--color-gray-light);

      @media screen and (max-width: 768px) {
        width: 50%;

        &:last-child {
          width: 100%;
        }

        &:nth-child(2) {
          border-right: none;
        }
      }

      &:last-child {
        border-right: none;
      }

      &-title {
        margin-bottom: 1.2rem;
        font-family: "HelveticaNow", sans-serif;
        font-size: 4rem;
        font-weight: 700;
        color: var(--color-blue);
        text-align: center;

        @media screen and (max-width: 1025px) {
          font-size: 2.8rem;
          margin-bottom: 1rem;
        }
      }

      &-text {
        text-align: center;
        color: var(--color-dark-gray);

        @media screen and (max-width: 1025px) {
          max-width: 20rem;
          margin: 0 auto;
          font-size: 1.2rem;
        }
      }
    }
  }
`;
