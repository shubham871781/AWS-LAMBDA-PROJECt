import * as React from "react";

function SvgUserYellow(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={55} height={55} {...props}>
      <defs>
        <style>
          {
            ".user_yellow_svg__b{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.8px}"
          }
        </style>
      </defs>
      <circle cx={27.5} cy={27.5} r={27.5} fill="#fb0" />
      <path
        className="user_yellow_svg__b"
        d="M37.029 38.533v-2.5a5.007 5.007 0 00-5.007-5.011H22.007A5.007 5.007 0 0017 36.029v2.5M32.022 21.007A5.007 5.007 0 1127.014 16a5.007 5.007 0 015.008 5.007z"
      />
    </svg>
  );
}

export default SvgUserYellow;
