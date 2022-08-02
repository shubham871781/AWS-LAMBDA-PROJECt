import * as React from "react";

function SvgNotification(props) {
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
        d="M29.68 26.314H10.222V24.23c.027 0 2.863-7.707 3.33-9.223.973-3.152 2.84-5.6 6.399-5.6 4.178 0 5.641 2.84 6.543 6.071.458 1.641 3.149 8.753 3.185 8.753v-.001 2.084zM19.95 30.66a2.809 2.809 0 01-2.809-2.81h5.618a2.809 2.809 0 01-2.809 2.81zM20 1.667C9.875 1.667 1.666 9.875 1.666 20c0 10.125 8.209 18.333 18.334 18.333S38.333 30.125 38.333 20C38.333 9.875 30.126 1.667 20 1.667z"
        fill="#4A90E2"
      />
    </svg>
  );
}

export default SvgNotification;
