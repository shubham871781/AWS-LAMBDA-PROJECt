import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Field, useField } from "formik";
import { TextWrapperStyled } from "./TextField.style";
import { ErrorMessage } from "../../ErrorMessage/index";
import HelpText from "../../HelpText/index";

export const TextField = ({
  label,
  type,
  name,
  placeholder,
  disabled,
  showPasswordToggleButton,
  togglePasswordVisibility,
  helpText,
  optional,
  className,
  step,
  handleChange
}) => {
  const [field, meta, helpers] = useField(name);
  const { onBlur } = field;
  const { value, error, touched } = meta;
  const { setValue } = helpers;
  let [active, setActive] = useState("inactive");
  let [labelWidth, setLabelWidth] = useState("inactive");
  let [showEyeIcon, setShowEyeIcon] = useState(true);

  const ref = useRef(null);

  function handleLabelWidth() {
    setLabelWidth(ref.current.offsetWidth + 6);
  }

  function handleBlur(e) {
    const value = e.target.value;
    let active = value ? "active" : "inactive";
    value ? handleLabelWidth() : setLabelWidth(0);
    setActive(active);
    onBlur(e);
  }

  function handleFocus() {
    handleLabelWidth();
    setActive("active");
  }

  function handleTogglePassword() {
    setShowEyeIcon(showEyeIcon => !showEyeIcon);
    togglePasswordVisibility();
  }

  function onChange(e) {
    setValue(e.target.value, false);
    if (handleChange) {
      handleChange(e);
    }
  }

  useEffect(() => {
    if (value) {
      let active = value ? "active" : "inactive";
      handleLabelWidth();
      setActive(active);
    }
  }, [active, name, value]);

  return (
    <TextWrapperStyled
      className={`${error && touched && "has-error"} ${active} ${className}`}
    >
      <div className="field-wrapper">
        <Field
          type={type}
          step={step}
          name={name}
          id={name}
          placeholder={placeholder}
          disabled={disabled}
          onBlur={e => {
            handleBlur(e);
          }}
          onFocus={e => {
            handleFocus(e.currentTarget.value);
          }}
          onChange={e => onChange(e)}
        />
        <label ref={ref} htmlFor={name}>
          {label}
          {optional && ` (optional)`}
        </label>
        {showPasswordToggleButton && (
          <button
            type="button"
            className="show-password"
            onClick={handleTogglePassword}
          >
           
          </button>
        )}
        <fieldset aria-hidden="true">
          <legend style={{ width: labelWidth }}>
            <span>​</span>
          </legend>
        </fieldset>
      </div>
      <ErrorMessage error={error} touched={touched} />
      {helpText && (!error || !touched) && <HelpText text={helpText} />}
    </TextWrapperStyled>
  );
};
TextField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  togglePasswordVisibility: PropTypes.func,
  showPasswordToggleButton: PropTypes.bool,
  helpText: PropTypes.string,
  optional: PropTypes.bool,
  className: PropTypes.string,
  step: PropTypes.string,
  handleChange: PropTypes.func
};
