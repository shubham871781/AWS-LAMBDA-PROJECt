import styled, { css } from "styled-components";
import { CommonColors, CommonVariables } from "../FormFields.style";
// import { fontSize } from "../../styles/settings";

export function TextStyle() {
  return css`
    position: relative;
    margin-bottom: 44px;

    input[type="email"],
    input[type="number"],
    input[type="decimalNumber"],
    input[type="password"],
    input[type="tel"],
    input[type="url"],
    input[type="text"],
    input[type="search"] {
      color: ${CommonColors.formInput};
      max-width: 100%;
      width: 100%;
      border-radius: ${CommonVariables.borderRadius};
      border: 0;
      padding: 8px 16px;
      line-height: ${CommonVariables.inputLineHeight};

      &:focus {
        outline: 0;
      }
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      -webkit-animation: autofill 0s forwards;
      animation: autofill 0s forwards;
    }

    @keyframes autofill {
      100% {
        background: ${CommonColors.bg};
        color: inherit;
      }
    }

    @-webkit-keyframes autofill {
      100% {
        background: ${CommonColors.bg};
      }
    }

    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type="decimalNumber"]::-webkit-inner-spin-button,
    input[type="decimalNumber"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    .field-wrapper {
      position: relative;
    }

    label {
      display: block;
      pointer-events: none;
      color: ${CommonColors.labelText};
      opacity: 0.5;
      position: absolute;
      top: 0;
      left: 0;
      transform: translate(16px, 15px);
      transform-origin: top left;
      padding-right: ${CommonVariables.labelPaddingH};
      padding-left: ${CommonVariables.labelPaddingH};
      transition: transform 0.2s;
    }

    &.active label,
    input:focus ~ label,
    input:not(:empty) ~ label {
      transform: translate(18px, ${CommonVariables.labelTranslateY});
      opacity: 1;
    }
    fieldset {
      position: absolute;
      top: -7px;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0;
      padding: 0 0 0 15px;
      pointer-events: none;
      border-radius: ${CommonVariables.borderRadius};
      border: ${CommonVariables.borderWidth} solid ${CommonColors.border};
    }

    &.active {
      fieldset {
        border-color: ${CommonColors.activeBorder};
      }
    }

    legend {
      line-height: 11px;
      text-align: left;
      transform-origin: top left;
      width: unset;
    }

    &.has-error {
      fieldset {
        border-color: ${CommonColors.errorBorder};
        border-width: ${CommonVariables.errorBorderWidth};
      }

      &.active label {
        color: ${CommonColors.errorText};
      }
    }

    .show-password {
      position: absolute;
      right: 30px;
      z-index: 10;
      top: 50%;
      transform: translateY(-50%);
    }
  `;
}

export const TextWrapperStyled = styled.div`
  ${TextStyle};
`;
