import React from "react";
import PropTypes from "prop-types";
import { Field, useField } from "formik";

import { UploadFileWrapperStyled } from "./UploadFile.style";
import { ErrorMessage } from "../../ErrorMessage";
import ArrowRight from "../../Icons/ArrowRight";

export const UploadFile = ({
  name,
  handleChange,
  setFieldValue,
  variant,
  buttonText,
  buttonColor,
  buttonFullWidth,
  disabled
}) => {
  const [field, meta] = useField(name);
  const { error, touched } = meta;
  const button =
    variant === "button" ? (
      <span className="button">
        {buttonText}
        <ArrowRight />
      </span>
    ) : (
      <ArrowRight />
    );

  const labelClass = variant === "button" ? "label-button" : "label-icon";

  return (
    <UploadFileWrapperStyled
      className="upload-file"
      fullWidth={buttonFullWidth}
      color={buttonColor}
      variant="button"
    >
      <Field
        id={name}
        type="file"
        name={name}
        onChange={e => {
          handleChange(e.currentTarget.files[0]);
          setFieldValue(name, e.target.value);
        }}
        disabled={disabled}
      />
      <label htmlFor={name} className={labelClass}>
        {button}
      </label>
      <ErrorMessage error={error} touched={touched} />
    </UploadFileWrapperStyled>
  );
};
UploadFile.propTypes = {
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  setFieldValue: PropTypes.func,
  variant: PropTypes.oneOf(["button", "icon"]),
  buttonText: PropTypes.string,
  fullWidth: PropTypes.bool,
  buttonFullWidth: PropTypes.bool,
  buttonColor: PropTypes.string
};

UploadFile.defaultProps = {
  buttonText: "Upload",
  buttonColor: "primary"
};
