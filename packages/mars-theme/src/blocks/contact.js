import { css } from "frontity";
import Link from "@frontity/components/link";

const ContactBlock = ({ fields }) => {
  return (
    <section className="contact" css={styles}>
      {fields.image && (
        <div className="contact__image">
          <img src={fields.image.url} alt={fields.image.alt} />
        </div>
      )}

      <div className="site-container">
        <div className="contact__wrapper">
          <div className="contact__block">
            {fields.title && (
              <h2 className="contact__title title-2">{fields.title}</h2>
            )}

            {fields.text && (
              <p className="contact__text text-l">{fields.text}</p>
            )}

            {fields.cta && (
              <Link link={fields.cta.url} className="contact__cta black-cta-l">
                {fields.cta.title}
              </Link>
            )}
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactBlock;

const styles = css`
  position: relative;
  padding: 10rem 0;

  @media screen and (max-width: 1025px) {
    height: 68rem;
    padding: 0 0 4rem;
  }

  .contact{
    &__image {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
    
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
    
          @media screen and (max-width: 480px) {
            object-position: 80% 50%;
          }
        }
      }
    
      .site-container {
        height: 100%;
      }
    
      &__wrapper {
        height: 100%;
    
        @media screen and (max-width: 1025px) {
          display: flex;
          align-items: flex-end;
        }
      }
    
      &__block {
        max-width: 66.4rem;
        position: relative;
        padding: 6.4rem 7.2rem;
        border-radius: 2.4rem;
        background-color: #fff;
    
        @media screen and (max-width: 1025px) {
          max-width: 66rem;
          padding: 4rem 3.2rem;
        }
      }
    
      &__title {
        margin-bottom: 1.6rem;
      }
    
      &__text {
        margin-bottom: 4rem;
        font-weight: 400;
      }
  }
}
`;
