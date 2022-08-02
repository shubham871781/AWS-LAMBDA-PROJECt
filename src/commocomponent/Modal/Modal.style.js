import styled, { css } from "styled-components";

import { device } from "../styles/settings";

const colors = {
  bg: "#fff",
};

function modalStyle({ customWidth }) {
  return css`
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    z-index: 1000;
    background-color: #000000a6;
    .close {
      position: absolute;
      right: 16px;
      top: 10px;
      border: 0;
      background: transparent;
      padding: 0;
      cursor: pointer;
      z-index: 1;

      &:focus {
        outline: 0;
      }
    }

    .align-vertical-center {
      display: flex;
      align-items: center;
    }

    .custom-modal-dialog {
      display: flex;
      align-items: center;
      align-self: center;
      position: relative;
      width: 904px;
      max-width: 100%;
      min-height: 130px;
      margin: auto auto;

      @media ${device.mobile} {
        max-width: 370px;
      }
    }

    .modal-body {
      display: flex;
      background: ${colors.bg};
      padding: 50px 35px 28px 30px;
      border-radius: 3px;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.16);
      min-height: 130px;
      width: 100%;

      @media ${device.mobile} {
        padding: 25px 20px 28px 20px;
      }
    }

    .custom-modal-content {
      flex: 1;

      div {
        button {
          @media ${device.mobile} {
            width: auto;
          }

          &:not(:last-of-type) {
            margin-right: 10px;
          }
        }
      }
    }

    .notification-icon {
      margin-right: 27px;
      width: 36px;

      @media ${device.mobile} {
        margin-right: 10px;
      }
    }

    &.quick-view-modal {
      .custom-modal-dialog {
        width: 406px;

        .modal-body {
          padding: 20px;
        }
      }
    }

    &.modal-book-appointment {
      .custom-modal-dialog {
        overflow: hidden;
      }
    }

    &.autoWidth {
      .custom-modal-dialog {
        width: 400px;
      }
    }

    &.customWidth {
      .custom-modal-dialog {
        width: ${customWidth};
      }
    }

    .back-button__icon {
      background-color: ${(props) => props.theme.secondary1};
    }

    .server-error {
      .notification-icon,
      .close {
        display: none;
      }
    }

    .has-tooltip {
      display: flex;
      align-items: center;
      position: relative;

      svg {
        margin-right: 10px;
      }

      &:hover {
        #creditCardTooltip {
          position: absolute;
          opacity: 1;
          visibility: visible;
          bottom: 100%;
          top: auto;
          left: 0;
          background-color: ${(props) => props.theme.primary};

          &.place-top {
            &:after {
              border-top-color: ${(props) => props.theme.primary} !important;
            }
          }
        }
      }
    }





      animation: fadeIn ease 0.2s;
      -webkit-animation: fadeIn ease 0.2s;
      -moz-animation: fadeIn ease 0.2s;
      -o-animation: fadeIn ease 0.2s;
      -ms-animation: fadeIn ease 0.2s;
      
      @keyframes fadeIn {
      0% {opacity:0;}
      100% {opacity:1;}
      }
      
      @-moz-keyframes fadeIn {
      0% {opacity:0;}
      100% {opacity:1;}
      }
      
      @-webkit-keyframes fadeIn {
      0% {opacity:0;}
      100% {opacity:1;}
      }
      
      @-o-keyframes fadeIn {
      0% {opacity:0;}
      100% {opacity:1;}
      }
      
      @-ms-keyframes fadeIn {
      0% {opacity:0;}
      100% {opacity:1;}
      }

      

  `;
}

export const ModalWrapperStyle = styled.div`
  ${modalStyle};
`;
