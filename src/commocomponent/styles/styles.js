import { createGlobalStyle } from "styled-components";

import { device, fontSize, colors } from "./settings";

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    font-weight: normal;
    font-size: 16px;
    position: relative;
    color: #454B60;

    .ots-annotation-toolbar-container {
      display: none !important;
    }
  }

  * {
      box-sizing: border-box;
  }

  button {
    border: 0;
    background: transparent;
    padding: 0;
    cursor: pointer;

    &:focus {
      outline: 0;
    }
  }

  img {
    max-width: 100%;
  }

  #root {
    position: relative;
    min-height: 100vh;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    border: 0;
  }

  .flex {
    display: flex;
  }

  .align-start {
    align-items: flex-start;
  } 
  
   .align-end {
     display: flex;
    align-items: flex-end;
  }

  .align-end-no-mobile {
    @media ${device.notMobile} {
      display: flex;
      align-items: flex-end;
    }
  }

  .align-center {
    align-items: center;

    @media ${device.mobile} {
      flex-wrap: wrap;
    }
  }

  .align-self-center {
    align-self: center;
  }

  .align-self-baseline {
    align-self: baseline;
  } 

  .justify-end {
    display: flex;
    justify-content :flex-end;
  }

  .justify-center {
    display: flex;
    justify-content :center;
  }

  .justify-start {
    display: flex;
    justify-content :flex-start;
  }

  .justify-start-no-mobile {
    @media ${device.notMobile} {
      display: flex;
      justify-content :flex-start;
    }
  }

  .justify-between {
    display: flex;
    justify-content: space-between;
  }

  .justify-end-no-desktop {
    @media ${device.notDesktop} {
      display: flex;
      justify-content :flex-end;
    }
  }
  
  .justify-end-no-mobile {
    @media ${device.notMobile} {
      display: flex;
      justify-content :flex-end;
    }
  }

  .direction-column {
    flex-direction: column;
  }

  .no-mg-bottom {
    margin-bottom: 0;
  }

  .no-mg-top {
    margin-top: 0;
  }

  .mg-top-sm {
    margin-top: 20px;
  }

  .mg-top-md {
    margin-top: 40px;
  }

  .mg-top-lg {
    margin-top: 60px;
  }

  .underline {
    text-decoration: underline;
  }

  .full-width {
    width: 100%;
  }

  .last {
    order: 2;
  }

  .btn-reset {
    margin-right: 20px;
    ${fontSize("14px", "20px")};

    @media ${device.mobile} {
      align-self: center;
      margin: 10px auto 0;
      order: 2;
    }
  }

  .back-button {
      display: flex;
      align-items: center;
      text-transform: uppercase;
      ${fontSize("14px", "14px")};
      color: ${colors.color2};

      &__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 6px;
      }
    }

  .pos-relative {
    position: relative;
  }

  .center {
    text-align: center;
  }
`;
