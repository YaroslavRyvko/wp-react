import { css } from "frontity";

export const resetCSS = css`
*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  vertical-align: baseline;
}

html {
  font-size: var(--base-font-size);
  overflow-x: hidden;
}

body {
  color: var(--base-text-color);
  background: var(--base-background-color);
  font-family: var(--base-font-family);
  font-size: var(--base-font-size);
  line-height: var(--base-line-height);
  font-weight: var(--base-font-weight);
}

a,
button {
  cursor: pointer;
  outline: none !important;
  text-decoration: none;
}

// adaptive images
img {
  max-width: 100%;
  height: auto;
}

// google map fix
.gm-style img {
  max-width: none;
}

figure {
  margin: 1.5rem 0;
}

strong {
  font-weight: 700;
}

ul,
li {
  list-style: none;
}
`;
