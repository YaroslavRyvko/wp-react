import { css } from "frontity";

export const variables = css`
  .text-l {
    font-family: "GeneralSans", sans-serif;
    font-size: 2.4rem;
    font-weight: 400;
    line-height: 1.5;
    color: var(--color-dark-gray);

    @media screen and (max-width: 1025px) {
      font-size: 1.8rem;
    }
  }

  .text-m {
    font-family: "GeneralSans", sans-serif;
    font-size: 2rem;
    font-weight: 400;
    line-height: 1.5;
    color: #100c14;
  }

  .text-s {
    font-family: "GeneralSans", sans-serif;
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 1.6;
    color: #100c14;
  }

  .text-xs,
  .text-xs-medium {
    font-family: "GeneralSans", sans-serif;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 1.5;
    color: #100c14;
  }

  .text-xs-medium {
    font-weight: 500;
  }

  .text-xxs,
  .text-xxs-medium {
    font-family: "GeneralSans", sans-serif;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.4;
    color: #100c14;
  }

  .text-xxs-medium {
    font-weight: 500;
  }

  .title-1 {
    font-family: "HelveticaNow", sans-serif;
    font-size: 6.4rem;
    font-weight: 700;
    line-height: 1.125;
  }

  .title-2 {
    font-family: "HelveticaNow", sans-serif;
    font-size: 5.6rem;
    font-weight: 700;
    line-height: 1.14;

    @media screen and (max-width: 1025px) {
      font-size: 4rem;
    }
  }

  .title-3 {
    font-family: "HelveticaNow", sans-serif;
    font-size: 4rem;
    font-weight: 700;
    line-height: 1.2;

    @media screen and (max-width: 1025px) {
      font-size: 2.4rem;
    }
  }

  .title-4 {
    font-family: "HelveticaNow", sans-serif;
    font-size: 2.8rem;
    font-weight: 700;
    line-height: 1.28;
  }

  .title-5 {
    font-family: "HelveticaNow", sans-serif;
    font-size: 2.4rem;
    font-weight: 500;
    line-height: 1.5;
  }

  .title-6 {
    font-family: "HelveticaNow", sans-serif;
    font-size: 2rem;
    font-weight: 500;
    line-height: 1.4;
  }
`;
