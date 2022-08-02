import React from "react";
import PropTypes from "prop-types";
import { ErrorWrapperStyled } from "./ErrorMessage.style";

export const ErrorMessage = ({ error, touched }) =>
  error && touched ? (
    <ErrorWrapperStyled className="errorlist">{error}</ErrorWrapperStyled>
  ) : null;

ErrorMessage.propTypes = {
  touched: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
    PropTypes.object
  ]),
  error: PropTypes.string
};
