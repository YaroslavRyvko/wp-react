import { css } from "frontity";

export const global = css`
  a {
    text-decoration: none;
  }

  .site-container {
    width: 100%;
    margin: auto;
    max-width: 1240px;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .site-container-small {
    width: 100%;
    margin: auto;
    max-width: 1020px;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .scrollmagic-pin-spacer {
    background-color: var(--color-gray2);
  }
  
  #root:has(.header.fixed) {
    padding-top: 10rem;

    @media screen and (max-width: 1025px) {
      padding-top: 7.6rem;
    }
  }

  @keyframes smooth-scroll {
    0% {
      transform: translateY(-80px);
    }

    100% {
      transform: translateY(0);
    }
  }

  body.overflow,
  html.overflow {
    overflow: hidden;
  }
  
  :root {
    --rem: 10px;
    --transition: 0.4s;
  
    /**
  * Colors
  */
    --color-primary: #ff0000;
    --color-black: #151618;
    --color-dark-gray: #7a7a7a;
    --color-gray: #a0a0a0;
    --color-gray-light: #e4e4e4;
    --color-white: #fff;
    --color-blue: #246bfd;
    --color-sky-blue: #d9e5ff;
    --color-sky-blue2: #e1ebff;
    --color-sky-blue3: #e9eefc;
    --color-sky-blue4: #edf0f8;
    --color-gray2: #f8f8fa;
    --color-green-light: #d9ffe8;


    --base-background-color: white;
    --base-font-family: "HelveticaNow", sans-serif;
    --base-font-size: var(--rem);
    --base-line-height: 1.4;
    --base-font-weight: 400;
    --base-text-color: var(--color-black);
`;
