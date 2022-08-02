import * as React from "react";

function SvgTrash(props) {
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
        d="M2 6a1 1 0 011-1h18a1 1 0 110 2H3a1 1 0 01-1-1z"
        fill="#454B60"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 3a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1h-4zm7 2V4a3 3 0 00-3-3h-4a3 3 0 00-3 3v1H5a1 1 0 00-1 1v14a3 3 0 003 3h10a3 3 0 003-3V6a1 1 0 00-1-1h-2zM6 7v13a1 1 0 001 1h10a1 1 0 001-1V7H6z"
        fill="#454B60"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 10a1 1 0 011 1v6a1 1 0 11-2 0v-6a1 1 0 011-1zM14 10a1 1 0 011 1v6a1 1 0 11-2 0v-6a1 1 0 011-1z"
        fill="#454B60"
      />
    </svg>
  );
}

export default SvgTrash;
