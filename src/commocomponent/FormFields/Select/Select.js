import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { useField } from "formik";

import { SelectWrapperStyled } from "./Select.style";
import { ErrorMessage } from "../../ErrorMessage";
import HelpText from "../../HelpText";

export const CustomSelect = ({
  label,
  name,
  children,
  helpText,
  optional,
  colorSelect,
  setFieldValue,
  handleChange,
  disabled,
  isOptionDisabled,
  hide,
  isMulti,
  className,
  selected
}) => {
  const [field, meta, helpers] = useField(name);
  const { value, error, touched } = meta;
  const { setValue } = helpers;
  let [active, setActive] = useState("inactive");
  let [labelWidth, setLabelWidth] = useState("inactive");
  const ref = useRef(null);

  const onChange = option => {
    isMulti
      ? setValue(option ? option.map(item => item.value) : [], true)
      : setValue(option.value, true);
    if (handleChange) {
      if (isMulti) {
        handleChange(option, name);
      } else {
        handleChange(option.value, name);
      }
    }
  };

  function handleLabelWidth() {
    setLabelWidth(ref.current.offsetWidth + 6);
  }

  function handleFocus() {
    handleLabelWidth();
    setActive("active");
  }

  function handleBlur(value) {
    if (value) {
      let active = value.length ? "active" : "inactive";
      value.length ? handleLabelWidth() : setLabelWidth(0);
      setActive(active);
    }
  }

  useEffect(() => {
    if ((isMulti && value && value.length > 0) || (!isMulti && value)) {
      let active = value ? "active" : "inactive";
      handleLabelWidth();
      setActive(active);
    }
  }, [active, isMulti, name, value]);

  var optionsList = [];
  var len;

  if (children) {
    len = children.length;
    for (var i = 0; i < len; i++) {
      if (typeof children[i] === "object") {
        optionsList = [...children];
        break;
      } else {
        optionsList.push({
          value: children[i],
          label: children[i]
        });
      }
    }
  }

  const dot = (color = "#ccc") => ({
    alignItems: "center",
    display: "flex",

    ":before": {
      backgroundColor: color
    }
  });

  const colourStyles = {
    option: (styles, { data }) => ({
      ...styles,
      ...dot(data.value)
    }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.value) })
  };
  const newValue = value;

  const getValue = () => {
    if (optionsList) {
      return isMulti
        ? optionsList.filter(option => field.value.indexOf(option.value) >= 0)
        : optionsList.find(option => option.value === field.value);
    } else {
      return isMulti ? [] : "";
    }
  };

  return (
    <SelectWrapperStyled
      className={`${className} ${error &&
        touched &&
        "has-error"} ${active} ${hide && "hide"}`}
    >
      <div className="field-wrapper">
        <Select
          key={`key-${newValue}`}
          id={name}
          options={optionsList}
          multi={false}
          isMulti={isMulti}
          onChange={onChange}
          value={getValue()}
          selected={selected}
          placeholder=""
          isDisabled={disabled}
          isOptionDisabled={isOptionDisabled}
          onMenuOpen={handleFocus}
          onMenuClose={() => handleBlur(value)}
          styles={colorSelect ? colourStyles : {}}
          className={
            colorSelect
              ? "react-select__container color-select"
              : "react-select__container"
          }
          classNamePrefix="react-select"
        />
        <label name={name} ref={ref}>
          {label}
          {optional && ` (optional)`}
        </label>
        <fieldset aria-hidden="true">
          <legend style={{ width: labelWidth }}>
            <span>​</span>
          </legend>
        </fieldset>
      </div>
      <ErrorMessage error={error} touched={touched} />
      {helpText && (!error || !touched) && <HelpText text={helpText} />}
    </SelectWrapperStyled>
  );
};

CustomSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  isOptionDisabled: PropTypes.func,
  helpText: PropTypes.string,
  optional: PropTypes.bool,
  colorSelect: PropTypes.bool,
  setFieldValue: PropTypes.func,
  handleChange: PropTypes.func,
  hide: PropTypes.bool,
  isMulti: PropTypes.bool,
  className: PropTypes.string,
  selected: PropTypes.string
};

// Specifies the default values for props:
CustomSelect.defaultProps = {
  colorSelect: false
};
