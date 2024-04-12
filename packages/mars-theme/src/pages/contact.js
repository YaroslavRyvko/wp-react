import { css } from "frontity";
import ContactForm from "../components/inc/contactform";
import Cf7FormWrapper from "../components/inc/cf7";

const ContactPage = ({ fields }) => {
  return (
    <>
      {fields && (
        <section className="contact-page" css={page_styles}>
          <div className="site-container">
            <div className="contact-page__wrapper">
              {fields.title && (
                <h1 className="contact-page__title">{fields.title}</h1>
              )}

              {fields.items && (
                <div className="contact-page__list">
                  {fields.items.map((item, index) => (
                    <div className="contact-page__item" key={index}>
                      {item.title && (
                        <h2 className="contact-page__item-title">
                          {item.title}
                        </h2>
                      )}

                      {item.address && (
                        <address className="contact-page__item-address text-s">
                          {item.address}
                        </address>
                      )}

                      {item.tel && (
                        <a
                          href={`tel:${item.tel.replace(" ", "")}`}
                          className="contact-page__item-tel text-s"
                        >
                          Tel.{item.tel}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {fields.contact && (
        <section className="contact-page__form" css={form_styles}>
          <div className="site-container">
            <div className="contact-page__form-wrapper">
              {fields.contact.image && (
                <div className="contact-page__form-image">
                  <img
                    src={fields.contact.image.url}
                    alt={fields.contact.image.alt}
                  />
                </div>
              )}

              {fields.contact.form && (
                <div className="contact-page__form-form">
                  {fields.contact.title && (
                    <h2 className="contact-page__form-title title-2">
                      {fields.contact.title}
                    </h2>
                  )}

                  {fields.contact.text && (
                    <p className="contact-page__form-text text-l">
                      {fields.contact.text}
                    </p>
                  )}
                  <Cf7FormWrapper url="https://www.wp-react.bato-webdesign.net/wp-json/contact-form-7/v1/contact-forms/294/feedback/">
                    <ContactForm />
                  </Cf7FormWrapper>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ContactPage;

const page_styles = css`
  padding: 11rem 0 9rem;
  background-color: #f8f8fa;

  @media screen and (max-width: 1025px) {
    padding: 5rem 0 6.4rem;
  }

  .contact-page{
  &__title {
    margin-bottom: 4.3rem;
    padding-left: 11rem;
    font-family: "HelveticaNow", sans-serif;
    font-size: 8rem;

    @media screen and (max-width: 1025px) {
      margin-bottom: 4rem;
      padding-left: 0;
      font-size: 4rem;
      text-align: center;
    }
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    padding: 10.4rem 7rem 10.4rem 10rem;
    gap: 7rem;
    border-radius: 2.4rem;
    background-color: #fff;

    @media screen and (max-width: 1025px) {
      gap: 8rem;
      padding: 4rem 3.2rem;
    }
  }

  &__item {
    width: 100%;
    max-width: calc(25% - 5.3rem);

    @media screen and (max-width: 1025px) {
      max-width: calc(50% - 4.4rem);
    }

    @media screen and (max-width: 600px) {
      max-width: 100%;
    }

    &-title {
      margin-bottom: 2.4rem;
      font-family: "HelveticaNow", sans-serif;
      font-size: 2.4rem;
    }

    &-address {
      max-width: 21rem;
      color: var(--color-dark-gray);
      font-style: normal;
    }

    &-tel {
      color: var(--color-dark-gray);
      position: relative;

      &::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 0;
        background-color: currentcolor;
        width: 0;
        height: 1px;
        transition: width 0.5s ease;
      }

      &:hover::after {
        width: 100%;
      }
    }
  }
}
}`;

const form_styles = css`
  position: relative;
  min-height: 126rem;

  .form-response {
    font-size: 14px;
  }

  @media screen and (max-width: 1025px) {
    min-height: 111rem;
  }

  input:not([type="submit"]) {
    width: 100%;
    height: 6.4rem;
    padding: 3.3rem 1.6rem 0.9rem;
    border: 1px solid var(--color-gray-light);
    border-radius: 4px;
    font-size: 1.4rem;
    appearance: none;
    outline: none;

    &.wpcf7-not-valid {
      border: 1px solid #d61818;
    }
  }

  input[type="submit"] {
    margin: 0 auto;
    border-radius: 6.4rem;
    border: none;
    line-height: 23px;
  }

  textarea {
    width: 100%;
    height: 14.4rem;
    padding: 3.4rem 1.6rem;
    border: 1px solid var(--color-gray-light);
    border-radius: 4px;
    appearance: none;
    outline: none;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.4rem;

    &.invalid {
      svg {
        opacity: 1;
        visibility: visible;
      }
    }
  }

  .contact-page__form {
    &-wrapper {
      display: flex;
      justify-content: flex-end;
      padding: 12rem 0;

      @media screen and (max-width: 1025px) {
        justify-content: center;
        padding: 6.4rem 0;
      }
    }

    &-image {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &-title {
      margin-bottom: 1.6rem;
      text-align: center;
      color: var(--color-black);

      @media screen and (max-width: 1025px) {
        font-size: 2.8rem;
      }
    }

    &-text {
      max-width: 53rem;
      margin: 0 auto 6.4rem;
      text-align: center;
      color: var(--color-dark-gray);
      font-weight: 400;

      @media screen and (max-width: 1025px) {
        margin: 0 auto 4rem;
        font-size: 1.6rem;
      }
    }

    &-form {
      position: relative;
      width: 100%;
      max-width: 88rem;
      padding: 8rem;
      border-radius: 2.4rem;
      background-color: #fff;

      @media screen and (max-width: 1025px) {
        max-width: 77rem;
      }

      @media screen and (max-width: 768px) {
        padding: 5.2rem 2rem 4rem;
      }

      @media screen and (max-width: 480px) {
        max-width: 33.5rem;
      }
    }

    &-row {
      display: flex;
      align-items: center;
      gap: 2.4rem;
      width: 100%;

      @media screen and (max-width: 768px) {
        flex-direction: column;
      }
    }

    &-field {
      position: relative;
      flex: 1;

      @media screen and (max-width: 768px) {
        width: 100%;
      }

      svg {
        position: absolute;
        right: 1.7rem;
        top: 42%;
        transform: translateY(-50%);
        opacity: 0;
        visibility: hidden;
      }

      &.textarea {
        .contact-page__form-field-label {
          top: 2.2rem;
        }
      }

      &-label {
        position: absolute;
        left: 1.6rem;
        top: 2.1rem;
        transform: translateY(-50%);
        color: var(--color-gray);
        font-family: "GeneralSans", sans-serif;
        font-size: 1.6rem;
        transition: transform 0.5s ease;

        &.filled {
          font-size: 1rem;
          transform: translateY(-2rem);
        }
      }
    }
  }
`;
