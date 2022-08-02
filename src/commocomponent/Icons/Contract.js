import * as React from "react";

function SvgContract(props) {
  return (
    <svg
      width={45}
      height={40}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.5 1.667h-20A3.343 3.343 0 004.167 5v23.333H7.5V5h20V1.667zm5 6.666H14.166a3.343 3.343 0 00-3.333 3.334V35c0 1.833 1.5 3.333 3.333 3.333H32.5c1.833 0 3.333-1.5 3.333-3.333V11.667c0-1.834-1.5-3.334-3.333-3.334zM14.166 35H32.5V11.667H14.166V35z"
        fill="#fff"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M37.961 4.341l2.925 3.087a1.366 1.366 0 010 1.86l-2.288 2.415-4.687-4.947 2.288-2.415c.237-.25.55-.383.875-.383.325 0 .637.12.887.383zm-19.212 18.42v4.947h4.687l13.825-14.593-4.688-4.948L18.749 22.76zm3.65 2.309h-1.15v-1.214L32.573 11.9l1.15 1.214L22.399 25.07z"
        fill="#fff"
      />
    </svg>
  );
}

export default SvgContract;
