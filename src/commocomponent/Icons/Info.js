import * as React from "react";

function SvgInfo(props) {
  return (
    <svg
      width={40}
      height={40}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.333 1C9.208 1 1 9.208 1 19.333 1 29.46 9.208 37.667 19.333 37.667c10.126 0 18.334-8.208 18.334-18.334C37.667 9.208 29.459 1 19.333 1zM21 12.667a1.667 1.667 0 11-3.333 0 1.667 1.667 0 013.333 0zm-1.667 5c.92 0 1.667.746 1.667 1.666V26a1.667 1.667 0 11-3.333 0v-6.667c0-.92.746-1.666 1.666-1.666z"
        fill="#F7BA2A"
      />
    </svg>
  );
}

export default SvgInfo;
