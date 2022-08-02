import styled, { css } from "styled-components";
import { CommonColors, CommonVariables } from "../FormFields.style";

const variables = {
  radioSizeInner: "13px",
  radioSizeOuter: "25px",
  radioPaddingLeft: "25px",
  radioBorderWidth: "1px"
};

const colors = {
  radioBg: "#fff",
  radioCheckedBg: "#ffbb00",
  radioDisabled: "#707070"
};

export function RadioStyle() {
  return css`
input[type="radio"] {
position: absolute;
left: -9999px;
opacity: 0;

+ label {
position: relative;
display: inline-flex;
align-items: center;
cursor: pointer;
pointer-events: visible;
padding-left: 30px;
min-height: ${variables.radioSizeOuter};
margin-bottom: 20px;
margin-right: 15px;

&:after {
content: "";
position: absolute;
left: 0;
top: 50%;
transform: translateY(-50%);
width: 18px;
height: 18px;
background-color: ${colors.radioBg};
border: ${variables.radioBorderWidth} solid #ffbb00;
border-radius: 50%;
}

}

&:checked {
+ label {
&:before {
position: absolute;
left: calc(
(
(
21px +
${variables.radioBorderWidth} * 2
) - ${variables.radioSizeInner}
) / 2
);
top: 50%;
transform: translateY(-50%);
content: " ";
display: block;
height: 8px;
width:  8px;
z-index: 1;
background-color: ${colors.radioCheckedBg};
transition: all $transition-time;
border-radius: 50%;
}
}
}

&:focus + label:after {
outline: $focus-border-width ${CommonVariables.focusBorderWidth} solid
${CommonColors.focusShadow};
}

&:disabled + label {
color: ${CommonColors.labelDisabled};
cursor: default;

&:before {
color: ${colors.radioDisabled};
}

&:after {
border-color: ${CommonColors.disabledBorder};
background-color: ${CommonColors.disabledBg};
}
}
}

legend {
display: block;
color: ${CommonColors.labelText};
margin-bottom: 3px;
}
`;
}

export const RadioGroupWrapperStyled = styled.div`
${RadioStyle};

fieldset {
border: 0;
padding: 0;
display: flex;
}
`;