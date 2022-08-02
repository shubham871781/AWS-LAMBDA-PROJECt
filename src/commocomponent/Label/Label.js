import React from "react";
import PropTypes from "prop-types";
import { LabelWrapperStyled } from "./Label.style";

export const Label = ({ label, name, children, className }) => {
  return (
    <LabelWrapperStyled htmlFor={name} className={className}>
      {label}
      {children}
    </LabelWrapperStyled>
  );
};

Label.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string
};
