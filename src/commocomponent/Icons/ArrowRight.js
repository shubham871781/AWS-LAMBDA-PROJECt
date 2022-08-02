import * as React from "react";

function SvgArrowRight(props) {
  return (
    <svg
      width={8}
      height={14}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 13l6-6-6-6"
        stroke="#2E307F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgArrowRight;
