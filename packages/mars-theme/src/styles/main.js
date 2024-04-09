import { Global } from "frontity";

import { resetCSS } from "../styles/reset";
import { fontFace } from "../styles/fonts";
import { global } from "../styles/global";
import { variables } from "../styles/variables";
import { buttons } from "../styles/buttons";

import SwiperStyles from "swiper/swiper-bundle.min.css";

export const Styles = () => (
  <>
    <Global styles={resetCSS} />
    <Global styles={fontFace} />
    <Global styles={global} />
    <Global styles={variables} />
    <Global styles={buttons} />
    <Global styles={SwiperStyles} />
  </>
);
