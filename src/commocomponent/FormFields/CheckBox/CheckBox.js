import React from "react";
import PropTypes from "prop-types";
import { Field, useField } from "formik";
import { CheckBoxWrapperStyled } from "./Checkbox.style";
import { ErrorMessage } from "../../ErrorMessage/index";

export const CheckBox = ({
  label,
  name,
  disabled,
  handleChange,
  setFieldValue,
  noMarginBottom
}) => {
  const [meta] = useField(name);
  const { value, error, touched } = meta;
  function onChange(e) {
    setFieldValue(name, e.target.checked);
    if (handleChange) {
      handleChange(e);
    }
  }
  return (
    <CheckBoxWrapperStyled
      className="checkbox-view1"
      noMarginBottom={noMarginBottom}
    >
      <Field
        name={name}
        type="checkbox"
        checked={value}
        id={name}
        disabled={disabled}
        onChange={e => onChange(e)}
      />
      <label name={name} htmlFor={name}>
        {label}
      </label>
      <ErrorMessage error={error} touched={touched} />
    </CheckBoxWrapperStyled>
  );
};
CheckBox.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  noMarginBottom: PropTypes.bool,
  handleChange: PropTypes.func,
  setFieldValue: PropTypes.func
};
