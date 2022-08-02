import styled, { css } from "styled-components";
import ReactTable from "react-table";

import { hexToRGBA, fontSize, device } from "../styles/settings";
import rightArrow from "../../assets/images/rightTriangleArrow.svg";
import leftArrow from "../../assets/images/leftTriangleArrow.svg";
import arrowDown from "../../assets/images/arrowDown.svg";
import arrowUp from "../../assets/images/arrowUp.svg";
import arrowDownSmall from "../../assets/images/arrowDownSmall.svg";

export const colors = {
  buttonText: "#000",
  buttonTextHover: "#454B60",
  InputBg: "#fff"
};

function TableStyle() {
  return css`
    border: 0 !important;


    &.ReactTable .rt-noData {
        background-color: transparent;
    }

    &.loading {
      pointer-events: none;
    }

    .rt-table {
      .rt-thead {
        &.-header {
          box-shadow: none;
          border-top: 1px solid ${props => props.theme.secondary1};
          border-bottom: 1px solid ${props => props.theme.secondary1};
        }
        .rt-th {
          ${fontSize("13px", "20px")};
          border-right: 0;
          text-align: left;
          text-transform: uppercase;
          padding: 14px 5px;

          &.-cursor-pointer div:after {
              content: "";
              display: inline-block;
              width: 14px;
              height: 8px;
              background: url(${arrowDown});
              background-size: contain;
              background-repeat: no-repeat;
              margin-left: 13px;
            }

          &.-sort-asc {
            box-shadow: none;
            div:after {
              background: url(${arrowUp});
            }
          }

          &.-sort-desc {
            box-shadow: none;
            div:after {
              background: url(${arrowDown});
            }
          }
        }

      }
          .rt-tbody .rt-td{
            padding: 8px 5px;

            &:not(.white-space) {
              white-space: unset;
            }
          }

      .rt-tbody .rt-tr-group {
        border-bottom: 0;
      }
    }

    .pagination-bottom {
      background-color: ${props => hexToRGBA(props.theme.secondary1, 0.2)};
      border: 1px solid ${props => props.theme.secondary1};
      margin-top: 14px;
      text-transform: uppercase;

      .-pagination {
        ${fontSize("13px", "20px")};
        box-shadow: none;
        padding: 7px 15px;
        border: 0;

        .-center {
          justify-content: center;

          @media ${device.mobile} {
            order: 3;
            flex-basis: 100%;
          }
        }

        .-pageInfo {
          margin-right: 60px;

          @media ${device.mobile} {
            margin-right: 0;
            margin-left: 0;
            margin-top: 12px;
          }
        }

        .-next,
        .-previous {
          flex: 0 auto;
        }

        .-previous {
          .-btn {
            &:before {
              content: "";
              display: inline-block;
              width: 8px;
              height: 10px;
              background: url(${leftArrow});
              background-size: contain;
              background-repeat: no-repeat;
              margin-right: 13px;
            }
          }
        }

        .-next {
          .-btn {
            &:after {
              content: "";
              display: inline-block;
              width: 8px;
              height: 10px;
              background: url(${rightArrow});
              background-size: contain;
              background-repeat: no-repeat;
              margin-left: 13px;
            }
          }
        }

        .-btn {
          background: none;
          color: ${colors.buttonText};

          &:not([disabled]):hover {
            background: none;
            color: ${colors.buttonTextHover};
          }

          &[disabled] {
            opacity: 0.38;
          }
        }

        .-pageJump {
          margin-left: 10px;
          margin-right: 10px;
          input {
            width: 45px;
            height: 30px;
            border: 1px solid ${props => props.theme.secondary1};
          }
        }

        select {
          padding: 7px 30px 7px 16px; 
          border: 1px solid ${props => props.theme.secondary1};
          appearance: none;
          background: ${
            colors.InputBg
          } url("${arrowDownSmall}") no-repeat right 8px center;
          &::-ms-expand {
          display: none;
          text-transform: uppercase;
        }
      }

      .-pageSizeOptions {
        @media ${device.mobile} {
            display: none;
          }
      }

      button {
        text-transform: uppercase;
      }

      .-totalPages {
        margin-left: 5px;
      }
    }

    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  `;
}

export const ReactTableWrapperStyled = styled(ReactTable)`
  ${TableStyle};
`;
