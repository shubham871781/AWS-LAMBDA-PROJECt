export const deviceSize = {
  mobile: 767,
  mobileP: 468,
  mobileLMin: 481,
  mobileLMax: 767,
  tabletMin: 768,
  tabletMax: 1199,
  desktop: 1200
};

export const device = {
  mobile: `(max-width: 767px)`,
  mobileP: `(max-width: 468px)`,
  mobileL: `(min-width: 481px) and (max-width: 767px)`,
  tablet: `(min-width: 768px) and (max-width: 1199px)`,
  desktop: `(min-width: 1200px)`,
  notMobile: `(min-width: ${deviceSize.tabletMin}px)`,
  notDesktop: `(max-width: ${deviceSize.desktop - 1}px)`
};

export const orivetColors = {
  green: "#2fb7c2"
};

export const colors = {
  colorWhite: "#fff",
  primaryButtonBG: "#000",
  color1: "#febb02",
  color2: "#454B60",
  color3: "#2C2F39",
  color4: "#B6E3EC",
  color5: "#1C1D4C",
  color6: "#4A90E2",
  color7: "#8493A8",
  color8: "#ecedef",
  color9: "#d2d7de",
  color10: "#f9bbbc",
  color11: "#c4c4c4",
  color12: "#f7ba2a",
  color13: "#DD2727",
  color14: "#E24C4C",
  color15: "#f7f7f7",
  color16: "#afb8c4",
  formInput: "#454B60",
  h1: "#454B60",
  h2: "#454B60",
  h3: "#454B60",
  h4: "#454B60",
  h5: "#454B60",
  h6: "#454B60",
  p: "#454B60",
  focusOutline: "#4A90E2",
  colorDisabledDate: "#cecece"
};

export const variables = {
  borderRadius: `2px`
};

export const fontSize = (fontSize, lineHeight) => {
  let lineHeightRel = (
    parseInt(lineHeight, 10) / parseInt(fontSize, 10)
  ).toFixed(2);
  return `
  font-size: ${fontSize};
  line-height: ${lineHeightRel};
`;
};

export const hexToRGBA = (h, opacity) => {
  let r = 0,
    g = 0,
    b = 0;

  // 3 digits
  if (h.length === 4) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];

    // 6 digits
  } else if (h.length === 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }

  return `rgba(${+r},${+g},${+b}, ${opacity})`;
};

/*
==========================================================================
   #Fonts
========================================================================== */
const fontStack = [
  {
    group: "ptserif",
    id: "regular",
    font: ["PT Serif", "Arial", "serif"],
    weight: 400,
    style: "normal"
  }
];

// #Font family
export const fontFamily = (groupName, groupId) => {
  fontStack.map(font => {
    if (font.group === groupName && font.id === groupId) {
      return `
        font-family: ${font.font};
        font-weight: ${font.weight};
        font-style: ${font.style};
      `;
    } else {
      return false;
    }
  });
};
