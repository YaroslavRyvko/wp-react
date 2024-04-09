import { css } from "frontity";

function CtaBlack({ text, href }) {
  return (
    <a href={href} target="_self" css={styles}>
      {text}
    </a>
  );
}

export default CtaBlack;

const styles = css`
  padding: 1.4rem 2.4rem;
  height: 4.8rem;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  border-radius: 6.4rem;
  background-color: #151618;
  color: #fff;
  transition: background-color 0.5s ease;
  font-weight: 700;
`;
