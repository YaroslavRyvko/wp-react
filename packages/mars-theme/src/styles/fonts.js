import { css } from "frontity";

import HelveticaNowB from "../../src/fonts/HelveticaNow/font.woff2";
import HelveticaNowM from "../../src/fonts/HelveticaNow/fontM.woff2";
import GeneralSans from "../../src/fonts/GeneralSans/GeneralSans-Regular.woff2";
import GeneralSansM from "../../src/fonts/GeneralSans/GeneralSans-Medium.woff2";
import GeneralSansB from "../../src/fonts/GeneralSans/GeneralSans-Semibold.woff2";


export const fontFace = css`
  @font-face {
    font-family: "GeneralSans";
    src: url(${GeneralSans});
    font-weight: 400;
    font-display: swap;
  }

  @font-face {
    font-family: "GeneralSans";
    src: url(${GeneralSansM});
    font-weight: 500;
    font-display: swap;
  }

  @font-face {
    font-family: "GeneralSans";
    src: url(${GeneralSansB});
    font-weight: 700;
    font-display: swap;
  }

  @font-face {
    font-family: "HelveticaNow";
    src: url(${HelveticaNowB});
    font-weight: 700;
    font-display: swap;
  }

  @font-face {
    font-family: "HelveticaNow";
    src: url(${HelveticaNowM});
    font-weight: 500;
    font-display: swap;
  }
`;
