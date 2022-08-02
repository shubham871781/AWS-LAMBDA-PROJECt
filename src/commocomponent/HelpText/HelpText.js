import React from "react";
import PropTypes from "prop-types";
import { HelpTextWraperStyle } from "./HelpText.style";

const HelpText = ({ text, className }) => {
  return (
    <HelpTextWraperStyle className={`help-text ${className}`}>
      <span>{text}</span>
    </HelpTextWraperStyle>
  );
};

HelpText.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default HelpText;
