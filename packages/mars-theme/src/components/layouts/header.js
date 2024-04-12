import React, { useState, useEffect } from "react";
import axios from "axios";
import Linkedin from "../../images/linkedin";
import { css } from "frontity";
import Link from "@frontity/components/link";

const Header = () => {
  const [logo, setLogo] = useState(null);
  const [headerLinks, setHeaderLinks] = useState({});

  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);

  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios
      .get("https://www.wp-react.bato-webdesign.net/wp-json/acf/v3/options/options")
      .then((response) => {
        setLogo(response.data.acf.logo);
        setHeaderLinks(response.data.acf.header_links);
      })
      .catch((error) => {
        console.error("Error fetching header options:", error);
      });

    axios
      .get("https://www.wp-react.bato-webdesign.net/wp-json/menus/v1/menus/main-menu")
      .then((response) => {
        setMenu(response.data.items);
      });

    const handleScroll = () => {
      const header = document.querySelector(".header");
      if (header) {
        const sticky = header.offsetTop;
        if (window.pageYOffset > sticky + header.offsetHeight) {
          setIsHeaderFixed(true);
        } else {
          setIsHeaderFixed(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
    document.body.classList.toggle("overflow", !isMenuActive);
    document.documentElement.classList.toggle("overflow", !isMenuActive);
  };

  return (
    <header
      className={`header ${isHeaderFixed ? "fixed" : ""} ${
        isMenuActive ? "active" : ""
      }`}
      css={styles}
    >
      <div className="header__wrapper">
        <div className="burger-wrapper">
          <div
            className={`burger-menu ${isMenuActive ? "active" : ""}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
          </div>
        </div>

        {logo && (
          <div className="logo-wrapper">
            <Link link="/" className="header__logo">
              <img src={logo.url} alt="Logo" />
            </Link>
          </div>
        )}

        <div className="header__links">
          {headerLinks.login && (
            <Link link={headerLinks.login.url} className="header__link">
              {headerLinks.login.title}
            </Link>
          )}

          {headerLinks.contact_us && (
            <Link link={headerLinks.contact_us.url} className="black-cta-s">
              {headerLinks.contact_us.title}
            </Link>
          )}

          {headerLinks.linkedin && (
            <Link link={headerLinks.linkedin.url} className="header__link-icon">
              <Linkedin />
            </Link>
          )}
        </div>
      </div>
      <nav className={`header__navigation ${isMenuActive ? "active" : ""}`}>
        <div className="header__wrapper">
          <ul className="header__menu">
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
        </div>
      </nav>
    </header>
  );
};

export default Header;

const styles = css`
  position: relative;
  padding: 2.4rem 0;
  transition: background-color 0.3s ease-in-out;

  &.active {
    background-color: var(--color-black);

    @media screen and (max-width: 1025px) {
      .logo-wrapper {
        position: relative;
        z-index: 2;
        filter: brightness(0) invert(1);
      }
    }
  }

  &.fixed {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
    background-color: white;
    box-shadow: 0 2px 1px -2px var(--color-black);
    padding: 1.4rem 0;
    animation: smooth-scroll 0.5s forwards;

    @media screen and (max-width: 1025px) {
      .header__navigation.active {
        transform: translateY(0);
      }
    }
  }

  &.fixed.active {
    background-color: var(--color-black);
  }

  .burger-wrapper,
  .logo-wrapper {
    flex: 1;
  }

  .burger-wrapper {
    @media screen and (max-width: 1025px) {
      display: flex;
      justify-content: flex-end;
      order: 2;
    }
  }

  .burger-menu {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    z-index: 2;
    width: 2.8rem;
    height: 2.8rem;
    gap: 5px;
    cursor: pointer;

    &.active {
      span {
        position: relative;
        background-color: #a0a0a0;
      }

      span:first-child {
        transform: rotate(45deg);
        top: 6px;
      }

      span:last-child {
        transform: rotate(-45deg);
        top: 0;
      }
    }

    span {
      width: 2.1rem;
      height: 1px;
      border-radius: 5rem;
      background-color: var(--color-black);
    }
  }

  .logo-wrapper {
    display: flex;
    justify-content: center;

    @media screen and (max-width: 1025px) {
      justify-content: flex-start;
      order: 1;
    }
  }

  .header {
    &__wrapper {
      display: flex;
      align-items: center;
      max-width: 123rem;
      padding: 0 1.5rem;
      margin: 0 auto;
    }

    &__links {
      display: flex;
      align-items: center;
      flex: 1;
      justify-content: flex-end;

      @media screen and (max-width: 1025px) {
        display: none;
      }
    }

    &__logo {
      width: 12.4rem;
      height: 2.2rem;
      mix-blend-mode: luminosity;

      img {
        width: 100%;
      }
    }

    &__link {
      position: relative;
      margin-right: 2.4rem;
      font-size: 1.4rem;
      font-weight: 500;
      color: var(--color-black);

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
        &::after {
          width: 100%;
        }
      }
    }

    &__link-icon {
      margin-left: 1.6rem;

      &:hover {
        rect {
          fill: #f0f0f4;
        }
      }

      &:active {
        rect {
          fill: #d9d9e8;
        }
      }
    }

    &__navigation {
      min-height: 70rem;
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      transform: translateY(-350vh);
      padding-top: 22rem;
      z-index: 1;
      transition: transform 1.5s ease;
      background-color: var(--color-black);
      box-shadow: 64.01px 113px 80px rgba(0, 0, 0, 0.15),
        41.4px 49.7px 46.8519px rgba(0, 0, 0, 0.053),
        24.6px 29.5px 25.48px rgba(0, 0, 0, 0.042),
        12.8px 15.36px 13px rgba(0, 0, 0, 0.035),
        5.21px 6.25px 6.51px rgba(0, 0, 0, 0.027),
        1.18px 1.42px 3.14px rgba(0, 0, 0, 0.016);

      @media screen and (max-width: 1025px) {
        padding-top: 8rem;
        padding-bottom: 17rem;
        height: 100vh;
        min-height: unset;
        overflow: auto;
      }

      &.active {
        transform: translateY(0);

        @media screen and (max-width: 1025px) {
          transform: translateY(7.5rem);
        }
      }

      .header__wrapper {
        @media screen and (max-width: 1300px) {
          padding: 0 3.5rem;
        }

        @media screen and (max-width: 1025px) {
          padding: 0 2rem;
        }
      }
    }

    &__menu {
      width: 100%;
      column-count: 2;
      column-gap: 39rem;

      @media screen and (max-width: 1025px) {
        column-count: unset;
      }

      .menu-item {
        margin-bottom: 5rem;
        font-family: "HelveticaNow", sans-serif;
        font-weight: 700;
        font-size: 4rem;
        line-height: 1.2;
        color: var(--color-white);

        &.linkedin {
          a {
            display: block;
            width: 4.8rem;
            height: 4.8rem;
            background-color: #4b4b4b;
            border-radius: 50%;
            background-image: url("../images/icons/linked.svg");
            background-repeat: no-repeat;
            background-position: center;
            background-size: auto;
            cursor: pointer;
            transition: background-color 0.5s ease;

            @media screen and (max-width: 1025px) {
              margin-top: 3.2rem;
            }

            &:hover {
              background-color: #a0a0a0;
            }

            &::after {
              content: none;
            }
          }
        }

        @media screen and (max-width: 1025px) {
          margin-bottom: 0;
          padding: 1.6rem 0;
          font-size: 2.8rem;
          border-bottom: 1px solid #494848;

          &.linkedin {
            border-bottom: none;
          }

          &.current-menu-item {
            border-bottom: 1px solid var(--color-blue);
          }
        }

        a {
          position: relative;
          color: currentcolor;

          &::after {
            content: "";
            position: absolute;
            top: 100%;
            left: 0;
            background-color: currentcolor;
            width: 0;
            height: 1px;
            transition: width 0.5s ease;

            @media screen and (max-width: 1025px) {
              content: none;
            }
          }

          &:hover {
            &::after {
              width: 100%;
            }
          }
        }
      }
    }
  }
`;
