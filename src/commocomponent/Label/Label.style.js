import styled, { css } from "styled-components";

export const colors = {
  labelText: "#2a2525"
};

export function LabelStyle() {
  return css`
    display: block;
    pointer-events: none;
    color: ${colors.labelText};
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(16px, 15px) scale(1);
  `;
}

export const LabelWrapperStyled = styled.label`
  ${LabelStyle};
`;
