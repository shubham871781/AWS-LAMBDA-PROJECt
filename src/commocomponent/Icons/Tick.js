import * as React from "react";

function SvgTick(props) {
  return (
    <svg
      width={37}
      height={36}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.333 0C8.208 0 0 8.003 0 17.875S8.208 35.75 18.333 35.75c10.126 0 18.334-8.003 18.334-17.875S28.459 0 18.333 0zM5.37 17.875l9.26 9.028 16.666-16.25-2.61-2.564L14.63 21.793 7.98 15.33l-2.61 2.546z"
        fill="#099A3A"
      />
    </svg>
  );
}

export default SvgTick;
