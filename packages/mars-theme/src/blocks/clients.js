import { css } from "frontity";
import {Fragment} from "react";

const ClientsBlock = ({ fields }) => {
  return (
    <>
      {fields && (
        <section className="clients" css={styles}>
          <div className="site-container">
            <div className="clients__wrapper">
              {fields.title && (
                <h2
                  className="clients__title title-3"
                  dangerouslySetInnerHTML={{ __html: fields.title }}
                ></h2>
              )}

              {fields.logos && (
                <div className="clients__list">
                  {fields.logos.map((logo, index) => (
                    <Fragment key={index}>
                      {(index === 4 || index === 9 || index === 13) && (
                        <div className="break"></div>
                      )}
                      <div className="clients__item">
                        <img src={logo.url} alt={logo.alt} />
                      </div>
                    </Fragment>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ClientsBlock;

const styles = css`
  padding: 10rem 0 16rem;
  background-color: var(--color-gray2);

  @media screen and (max-width: 1025px) {
    padding: 6.4rem 0 12rem;
  }

  .clients {
    &__wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__title {
      margin-bottom: 6.4rem;
      text-align: center;

      @media screen and (max-width: 1025px) {
        margin-bottom: 5.6rem;
        font-size: 4rem;
      }

      strong {
        color: var(--color-blue);
      }
    }

    &__list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 1.7rem 2.8rem;

      .break {
        flex-basis: 100%;
        width: 0;
        height: 0;

        @media screen and (max-width: 1025px) {
          display: none;
        }
      }

      @media screen and (max-width: 768px) {
        gap: 1.2rem 0.8rem;
      }
    }

    &__item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 6.4rem;
      max-width: 18rem;
      border-radius: 8px;
      background-color: #fff;

      @media screen and (max-width: 768px) {
        max-width: 10.6rem;
        height: 3.6rem;
        padding: 1rem;
      }
    }
  }
`;
