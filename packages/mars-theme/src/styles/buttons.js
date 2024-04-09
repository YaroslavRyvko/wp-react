import { css } from "frontity";

export const buttons = css`
  .black-cta-l,
  .black-cta-m,
  .black-cta-s {
    display: flex;
    align-items: center;
    justify-content: center;
    width: max-content;
    padding: 2.2rem 5.6rem;
    height: 6.4rem;
    border-radius: 6.4rem;
    background-color: var(--color-black);
    color: var(--color-white);
    transition: background-color 0.5s ease;
    font-size: 1.6rem;
    font-weight: 500;
    font-family: "HelveticaNow", sans-serif;

    @media screen and (max-width: 480px) {
      width: 100%;
    }

    @media screen and (max-width: 374px) {
      font-size: 1.4rem;
    }

    &:hover {
      background-color: #313234;
    }

    &:active {
      background-color: #575758;
    }

    &.disabled {
      background-color: var(--color-gray-light);
      color: var(--color-gray);
    }
  }

  .black-cta-m {
    height: 4.8rem;
    padding: 1.4rem 4.5rem;
    font-size: 1.4rem;
  }

  .black-cta-s {
    height: 4.8rem;
    padding: 1.4rem 2.4rem;
    font-size: 1.4rem;
  }

  .black-cta-s-icon,
  .white-cta-s-icon {
    gap: 1.4rem;
  }

  .black-cta-s-external {
    gap: 2rem;
  }

  .white-cta {
    display: flex;
    align-items: center;
    justify-content: center;
    width: max-content;
    padding: 2.2rem 5.6rem;
    height: 6.4rem;
    border: 1px solid var(--color-gray-light);
    border-radius: 6.4rem;
    background-color: transparent;
    color: var(--color-black);
    transition: background-color 0.5s ease;
    font-size: 1.6rem;
    font-weight: 500;

    @media screen and (max-width: 480px) {
      width: 100%;
    }

    @media screen and (max-width: 374px) {
      font-size: 1.4rem;
    }

    &:hover {
      background-color: var(--color-gray2);
    }

    &:active {
      color: var(--color-dark-gray);
      background-color: var(--color-gray2);
    }
  }

  .white-cta-external {
    gap: 2rem;
  }
`;
