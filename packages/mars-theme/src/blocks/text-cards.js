import { css } from "frontity";

const TextCardsBlock = ({ fields }) => {
    return (
        <>
          {fields && (
            <section className="text-cards" css={styles}>
              <div className="site-container-small">
                <div className="text-cards__wrapper">
                  {fields.title && (
                    <h2 className="text-cards__title title-2">{fields.title}</h2>
                  )}
      
                  {fields.text && (
                    <div className="text-cards__text text-l">{fields.text}</div>
                  )}
                </div>
              </div>
      
              <div className="site-container">
                {fields.cards && (
                  <div className="text-cards__list">
                    {fields.cards.map((item, index) => (
                      <div className="text-cards__item" key={index}>
                        {item.icon && (
                          <div className="text-cards__item-icon">
                            <img src={item.icon.url} alt={item.icon.alt} />
                          </div>
                        )}
      
                        {item.title && (
                          <h3 className="text-cards__item-title">{item.title}</h3>
                        )}
      
                        {item.text && (
                          <p className="text-cards__item-text text-s">{item.text}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}
        </>
      );
      
};

export default TextCardsBlock;

const styles = css`
  padding: 16rem 0;
  background-color: var(--color-gray2);

  @media screen and (max-width: 1025px) {
    padding: 6.4rem 0;
  }

  .text-cards{
    &__wrapper {
        display: flex;
        flex-wrap: wrap;
        gap: 0 12rem;
    
        @media screen and (max-width: 1025px) {
          gap: 0;
        }
      }
    
      &__title {
        max-width: 36.6rem;
    
        @media screen and (max-width: 1025px) {
          max-width: 100%;
          margin-bottom: 2.4rem;
          font-size: 2.8rem;
        }
      }
    
      &__text {
        max-width: 49rem;
        font-weight: 400;
    
        @media screen and (max-width: 1025px) {
          max-width: 100%;
          font-size: 1.6rem;
        }
    
        p:not(:last-child) {
          margin-bottom: 8rem;
    
          @media screen and (max-width: 1025px) {
            margin-bottom: 5rem;
          }
        }
      }
    
      &__list {
        display: flex;
        flex-flow: row wrap;
        margin-top: 12rem;
        gap: 3rem;
        width: 100%;
    
        @media screen and (max-width: 1025px) {
          margin-top: 6.4rem;
          justify-content: center;
        }
      }
    
      &__item {
        width: calc(33.3% - 2rem);
        padding: 4rem;
        border-radius: 1.6rem;
        background-color: #fff;
    
        @media screen and (max-width: 1025px) {
          width: 100%;
          max-width: 350px;
        }
        
        @media screen and (max-width: 768px) {
          max-width: 100%;
        }
    
        &-icon {
          width: 6.4rem;
          height: 6.4rem;
          margin-bottom: 11.2rem;
    
          @media screen and (max-width: 1025px) {
            width: 5.6rem;
            height: 5.6rem;
            margin-bottom: 9.6rem;
          }
    
          img,
          svg {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
    
        &-title {
          margin-bottom: 1.2rem;
          font-family: "HelveticaNow", sans-serif;
          font-size: 8rem;
          font-weight: 500;
          line-height: 1.1;
    
          @media screen and (max-width: 1025px) {
            margin-bottom: 1rem;
            font-size: 5.6rem;
          }
        }
    
        &-text {
          color: var(--color-dark-gray);
    
          @media screen and (max-width: 1025px) {
            font-size: 1.6rem;
          }
        }
      }
  }
}
`;
