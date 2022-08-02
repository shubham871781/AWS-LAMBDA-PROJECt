import styled, { css } from "styled-components";

import { CommonColors, CommonVariables } from "../FormFields.style";
import { fontSize, colors } from "../../styles/settings";

const variables = {
  selectPaddingRight: "4px"
};

export function SelectStyle() {
  return css`

    position: relative;
    margin-bottom: 44px;

    &.hide {
      display: none;
    }

    .react-select {
      &__container {
        &:focus {
          outline: 0;
        }
      }

      &__value-container {
        padding: 0;
      }

      &__control {
        color: ${CommonColors.formInput};
        width: 100%;
        border: 0;
        appearance: none;
        cursor: pointer;
        padding: 7px ${variables.selectPaddingRight} 7px
          ${CommonVariables.paddingH};
        line-height: ${CommonVariables.inputLineHeight};
        box-shadow: none;

        &:focus {
          outline: 0;
        }

        &:focus,
        .no-touch &:hover {
          background-color: transparent;
        }

        &--menu-is-open {
          svg {
            transform: rotate(-180deg);
          }
        }
      }

      &__indicator-separator {
        background-color: transparent;
      }

      &__indicator {
        color: #454b60;
      }

      &__menu {
        margin-top: 0;
        box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2),
          0px 3px 14px rgba(0, 0, 0, 0.12), 0px 8px 10px rgba(0, 0, 0, 0.14);
        z-index: 3;
      }

      &__menu-list {
        padding: 7px 10px;
      }

      &__option {
        padding-right: 5px;
        padding-left: 5px;
        &:first-letter {
          text-transform: uppercase;
        }
      }
    }

    .color-select {
      .react-select {
        &__option,
        &__single-value {
          &:before {
            content: "";
            border-radius: 4px;
            display: inline-block;
            height: 20px;
            width: 20px;
          }
        }

        &__single-value {
          &:before {
            margin-right: 8px;
          }
        }

        &__option {
          font-size: 0;
          display: inline-block;
          width: auto;
        }
      }
    }

    .field-wrapper {
      position: relative;
    }

    label {
      display: block;
      pointer-events: none;
      color: ${CommonColors.labelText};
      opacity: 0.5;
      ${fontSize("16px", "22px")};
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
      ${fontSize("11px", "15px")};
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

    &.button-look {
      .react-select__control {
        color: ${colors.color1};
        background: ${props => props.theme.secondary1};
      }

      label {
        opacity: 1;
      }

      fieldset {
        border-color: #454b60;
        border-width: 2px;
      }
    }


    .react-select__control{
      padding:0px 0px 0px 14px;
    }
  `;
}

export const SelectWrapperStyled = styled.div`
  ${SelectStyle};
`;
