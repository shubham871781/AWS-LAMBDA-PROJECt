import styled, { css } from "styled-components";
import { colors, device } from "../../styles/settings";

export function UploadFileStyle({ color, fullWidth }) {
  return css`
    display: inline-flex;
    position: relative;
    cursor: pointer;

    .button {
      display: block;
      position: relative;
      text-align: center;
      border-style: solid;
      cursor: pointer;
      background-color: transparent;
      color: ${props => props.theme.primary};
      border-color: ${props => color === "secondary" && props.theme.primary};
      padding: 8px 30px;
      font-size: 16px;
      line-height: 22px;
      border-radius: 21px;
      border-width: 2px;
      ${fullWidth && "width: 100%"};
      transition: padding 0.2s;

      &:hover {
        background-color: ${props => props.theme.primary};
        

        padding-left: 23px;
        padding-right: 37px;

        svg {
          right: 20px;
          opacity: 1;
          path {
            stroke: ${colors.colorWhite};
          }
        }
      }

      &:focus {
        outline: 0;
        &:after {
          content: "";
          display: block;
          position: absolute;
          top: -6px;
          bottom: -6px;
          left: -6px;
          right: -6px;
          border: 2px solid ${colors.focusOutline};
          border-radius: 25px;
        }
      }

      @media ${device.mobile} {
        width: 100%;
      }

      svg {
        position: absolute;
        right: 17px;
        top: 50%;
        transform: translateY(-50%);
        opacity: 0;
        transition: right 0.15s;
      }
    }

    input[type="file"] {
      position: absolute;
      left: -9999px;
      opacity: 0;
      cursor: pointer;
    }

    .label-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 38px;
      height: 38px;
      background: ${colors.colorWhite};
      border-radius: 50%;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
      cursor: pointer;
    }
  `;
}

export const UploadFileWrapperStyled = styled.div`
  ${UploadFileStyle};
`;
