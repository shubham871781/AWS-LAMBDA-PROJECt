import * as React from "react";

function SvgArrowRight1(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 12a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1z"
        fill="#454B60"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.293 4.293a1 1 0 011.414 0l7 7a1 1 0 010 1.414l-7 7a1 1 0 01-1.414-1.414L17.586 12l-6.293-6.293a1 1 0 010-1.414z"
        fill="#454B60"
      />
    </svg>
  );
}

export default SvgArrowRight1;
