import styled, { css } from "styled-components";
import { CommonVariables, CommonColors } from "../FormFields.style";

export const variables = {
  checkboxHeight: "25px",
  checkboxWidth: "25px",
  checkboxPaddingLeft: "19px",
  checkboxTickPositionLeft: "7px",
  checkboxTicksize: "10px",
  checkboxBorderWidth: "1px"
};

export const colors = {
  border: "#c6ccd2",
  disabledBg: "#f4f5f6",
  disabledBorder: "#dee2e7",
  labelText: "#2a2525",
  labelDisabled: "#707070",
  checkboxBg: "#fff",
  checkboxTick: "#000",
  checkboxTickDisabled: "#707070",
  focusShadow: "#66afe9",
  checkboxListViewBg: "rgba(69, 75, 96, 0.5);",
  checkboxListViewColor: "#fff",
  checkboxListViewCheckedBg: "#2E307F"
};

export function CheckboxStyle({ noMarginBottom }) {
  return css`
  margin-bottom: 30px;
  ${noMarginBottom && "margin-bottom : 0"};

      position: relative;
      input[type="checkbox"] {
        left: -9999px;
      }
    &.checkbox-view {
      input[type="checkbox"] {
        + label {
          position: relative;
          display: inline-flex;
          align-items: center;
          cursor: pointer;
          padding-left: calc(
            ${variables.checkboxWidth} + ${variables.checkboxPaddingLeft}
          );
          min-height: ${variables.checkboxHeight};
          margin-bottom: 10px;

          &:after {
            content: "";
            position: absolute;
            display: block;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: ${variables.checkboxWidth};
            height: ${variables.checkboxHeight};
            background-color: ${colors.checkboxBg};
            border: ${variables.checkboxBorderWidth} solid ${colors.border};
          }
      
        }

        &:checked {
          + label {
            &:before {
              position: absolute;
              left: ${variables.checkboxTickPositionLeft};
              top: 50%;
              transform: translateY(-50%);
              z-index: 1;
                center center;
              transition: all $transition-time;
              content: " ";
              display: block;
              width: 12px;
              height: 9px;
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
            color: ${colors.checkboxTickDisabled};
          }

          &:after {
            border-color: ${CommonColors.disabledBorder};
            background-color: ${CommonColors.disabledBg};
          }
        }
      }
    }

    legend {
      display: block;
      color: ${CommonColors.labelText};
      margin-bottom: 3px;
      margin-bottom: 20px;

    }

    &.list-view {
      .checkboxes {
        display: flex;
        flex-wrap: wrap;
      }
      input[type="checkbox"] {
        position: absolute;
        left: -9999px;
        opacity: 0;

      + label {
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        margin-bottom: 10px;
        background: ${colors.checkboxListViewBg};
        color: ${colors.checkboxListViewColor};
        padding: 5px 20px;
        border-radius: 4px;
        margin-right: 10px;
      }

      &:checked {
        + label {
          background:  ${colors.checkboxListViewCheckedBg};
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
          color: ${colors.checkboxTickDisabled};
        }

        &:after {
          border-color: ${CommonColors.disabledBorder};
          background-color: ${CommonColors.disabledBg};
        }
      }
    }
    }
  `;
}

export const CheckBoxWrapperStyled = styled.div`
  ${CheckboxStyle};

  fieldset {
    border: 0;
    padding: 0;
  }
`;
