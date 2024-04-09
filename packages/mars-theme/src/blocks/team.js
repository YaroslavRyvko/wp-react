import { css } from "frontity";
import Link from "@frontity/components/link";

const TeamBlock = ({ fields }) => {
    return (
        <>
          {fields && (
            <section className="team" css={styles}>
              <div className="site-container">
                <div className="team__wrapper">
                  {fields.title && (
                    <h2 className="team__title title-2">{fields.title}</h2>
                  )}
      
                  {fields.text && (
                    <div className="team__text text-l">{fields.text}</div>
                  )}
      
                  {fields.image_desktop && (
                    <div className="team__image desktop">
                      <img src={fields.image_desktop.url} alt={fields.image_desktop.alt} />
                    </div>
                  )}
      
                  {fields.image_mobile && (
                    <div className="team__image mobile">
                      <img src={fields.image_mobile.url} alt={fields.image_mobile.alt} />
                    </div>
                  )}
      
                  {fields.items && (
                    <div className="team__list">
                      {fields.items.map((item, index) => (
                        <div className="team__item" key={index}>
                          {item.name && (
                            <h3 className="team__item-name">{item.name}</h3>
                          )}
      
                          {item.post && (
                            <p className="team__item-post text-s">{item.post}</p>
                          )}
      
                          {item.link && (
                            <Link link={item.link.url} className="team__item-link">
                              {item.link.title}
                            </Link>
                          )}
                        </div>
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

export default TeamBlock;

const styles = css`
padding: 16rem 0;

  @media screen and (max-width: 1025px) {
    padding: 6.4rem 0;
  }

  .team{
    &__wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    
      &__title {
        margin-bottom: 1.6rem;
      }
    
      &__text {
        max-width: 71rem;
        margin: 0 auto 9.6rem;
        text-align: center;
    
        @media screen and (max-width: 1025px) {
          margin: 0 auto 5.6rem;
        }
      }
    
      &__image {
        &.mobile {
          display: none;
          width: 100%;
          height: 140rem;
          margin-bottom: 8rem;
    
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
    
          @media screen and (max-width: 768px) {
            display: block;
          }
    
          @media screen and (max-width: 350px) {
            height: 115rem;
          }
        }
    
        &.desktop {
          width: 100%;
          height: 81rem;
          margin-bottom: 12rem;
    
          @media screen and (max-width: 1025px) {
            height: 50rem;
            margin-bottom: 8rem;
          }
    
          @media screen and (max-width: 768px) {
            display: none;
          }
    
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
      }
    
      &__list {
        display: flex;
        flex-flow: row wrap;
        gap: 9.6rem 4.8rem;
    
        @media screen and (max-width: 1025px) {
          gap: 4.8rem;
        }
      }
    
      &__item {
        width: calc(25% - 3.6rem);
        padding-top: 2.4rem;
        border-top: 1px solid var(--color-gray-light);
    
        @media screen and (max-width: 1025px) {
          width: calc(50% - 4.8rem);
        }
    
        @media screen and (max-width: 480px) {
          width: 100%;
          max-width: 26.4rem;
        }
    
        &-name {
          margin-bottom: 8px;
          font-family: "HelveticaNow", sans-serif;
          font-size: 2.4rem;
          font-weight: 700;
        }
    
        &-post {
          margin-bottom: 1.6rem;
          color: var(--color-dark-gray);
        }
    
        &-link {
          font-family: "HelveticaNow", sans-serif;
          font-size: 1.8rem;
          font-weight: 500;
          color: var(--color-blue);
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.3s ease-in-out;
    
          &:hover {
            color: var(--color-black);
          }
        }
    }
  }
}
`;
