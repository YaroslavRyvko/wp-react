import { useState, useEffect } from "react";
import axios from "axios";
import LinkedinIcon from "../../images/linkedin";
import { css } from "frontity";
import iconSubmitUrl from "../../images/footer-form-icon.svg";
import Link from "@frontity/components/link";
import Cf7FormWrapper from "../inc/cf7";
import NewsLetterForm from "../inc/newsletterform";

const Footer = () => {
  const [logo, setLogo] = useState(null);
  const [headerLinks, setHeaderLinks] = useState({});
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://www.wp-react.bato-webdesign.net/wp-json/menus/v1/menus/main-menu"
      )
      .then((response) => {
        setMenu(response.data.items);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://www.wp-react.bato-webdesign.net/wp-json/acf/v3/options/options")
      .then((response) => {
        const data = response.data.acf;
        setLogo(data.logo);
        setHeaderLinks(data.header_links);
        setTitle(data.title);
        setText(data.text);
        setForm(data.form); // Assuming this is the form shortcode or HTML
      })
      .catch((error) => {
        console.error("Error fetching footer options:", error);
      });
  }, []);

  return (
    <footer className="footer" css={styles}>
      <div className="site-container">
        <div className="footer__wrapper">
          <div className="footer__left">
            {logo && (
              <div className="footer__logo">
                <img src={logo.url} alt="Footer Logo" />
              </div>
            )}
            <div className="footer__copyright text-xxs">
              Copyright &copy; {new Date().getFullYear()} IMA ASIA All Rights
              Reserved
            </div>
            {headerLinks.linkedin && (
              <Link
                link={headerLinks.linkedin.url}
                className="footer__link-icon"
              >
                <LinkedinIcon />
              </Link>
            )}
          </div>
          <div className="footer__middle">
            <p className="footer-title text-xs-medium">Sitemap</p>
            <nav className="footer__navigation">
              <ul className="footer__menu">
                {menu.map((item, index) => (
                  <li key={index} className="menu-item">
                    <Link
                      onClick={() => {
                        toggleMenu();
                      }}
                      link={item.slug || "/"}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="footer__right">
            {title && <p className="footer-title text-xs-medium">{title}</p>}
            {text && <p className="footer-text">{text}</p>}

            <div className="footer-form">
              <Cf7FormWrapper url="https://www.wp-react.bato-webdesign.net/wp-json/contact-form-7/v1/contact-forms/100/feedback/">
                <NewsLetterForm />
              </Cf7FormWrapper>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const styles = css`
  padding: 8rem 0;
  border-top: 1px solid var(--color-gray-light);
  background-color: var(--color-gray2);
  font-family: "GeneralSans", sans-serif;

  .form-response {
    font-size: 12px;
    margin-top: 10px;
  }

  .single-insights & {
    background-color: #fff;
  }

  @media screen and (max-width: 1025px) {
    padding: 6.4rem 0;
  }

  .footer {
    &__wrapper {
      display: flex;
      justify-content: space-between;

      @media screen and (max-width: 991px) {
        flex-direction: column;
        gap: 5rem 0;
      }
    }

    &__logo {
      width: 12.4rem;
      height: 2.2rem;
      margin-bottom: 2.4rem;
      mix-blend-mode: luminosity;

      img {
        width: 100%;
        object-fit: cover;
      }
    }

    &__copyright {
      max-width: 16rem;
      margin-bottom: 3.2rem;
      color: var(--color-dark-gray);
    }

    &__link-icon {
      display: inline-block;

      &:hover {
        svg {
          rect {
            fill: #a0a0a0;
          }
        }
      }

      svg {
        rect {
          fill: #fff;
          transition: fill 0.5s ease;

          .single-insights & {
            fill: #f8f8fa;
          }
        }
      }
    }

    &-title {
      margin-bottom: 1.6rem;
      font-weight: 600;
    }

    &__menu {
      column-count: 2;
      column-gap: 12rem;

      @media screen and (max-width: 1025px) {
        column-gap: 7rem;
      }

      .menu-item {
        margin-bottom: 8px;
        font-size: 1.4rem;
        line-height: 1.7;
        font-weight: 500;
        color: var(--color-dark-gray);

        a {
          position: relative;
          color: var(--color-dark-gray);

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

          &:hover {
            color: var(--color-black);

            &::after {
              width: 100%;
            }
          }
        }
      }
    }

    &-text {
      max-width: 22rem;
      margin-bottom: 4rem;
      font-size: 1.4rem;
      line-height: 1.28;
      color: var(--color-dark-gray);

      @media screen and (max-width: 1025px) {
        margin-bottom: 3rem;
      }
    }

    &-form {
      form {
        display: flex;
        position: relative;
        flex-flow: column wrap;
        width: 100%;

        &.invalid {
          input {
            border: 1px solid #d32424;
          }
        }
      }

      input {
        height: 5.6rem;
        width: 100%;
        padding: 1.8rem 6rem 1.8rem 2rem;
        border: 1px solid transparent;
        border-radius: 5rem;
        outline: none;
        background-color: #fff;

        &:focus {
          border: 1px solid var(--color-blue);
        }
      }

      .submit-btn {
        position: absolute;
        right: 0;
        width: 5.6rem;
        height: 5.6rem;
        padding: 0;
        border: 0;
        border-radius: 50%;
        background-color: var(--color-black);
        background-image: url(${iconSubmitUrl});
        background-repeat: no-repeat;
        background-position: center;
        transition: background-color 0.3s ease-in-out;

        &:hover {
          background-color: #313234;
        }
      }
    }

    &__left {
      flex: 1;
      max-width: 28rem;
    }

    &__middle {
      margin-left: auto;

      @media screen and (max-width: 1025px) {
        margin-left: unset;
      }
    }

    &__right {
      flex: 1;
      max-width: 26rem;
      margin-left: auto;

      @media screen and (max-width: 1025px) {
        margin-left: unset;
      }

      @media screen and (max-width: 480px) {
        max-width: 100%;
      }
    }
  }
`;
