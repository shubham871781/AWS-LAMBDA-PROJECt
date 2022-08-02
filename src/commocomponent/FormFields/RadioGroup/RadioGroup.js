import React from "react";
import PropTypes from "prop-types";
import { Field, useField } from "formik";
import { RadioGroupWrapperStyled } from "./RadioGroup.style";
import { ErrorMessage } from "../../ErrorMessage";
import { Label } from "../../Label";

export const RadioGroup = ({ label, name, children, handleChange, id}) => {
  const [ filed, meta, helpers] = useField(name);
  const { setValue } = helpers;
  const onChange = async option => {
    setValue(option.target.value, false);
    if (handleChange) {
      handleChange(option.target.value);
    }
  };

  return (
    <RadioGroupWrapperStyled>
      <fieldset>
        <legend>{label}</legend>
        {children.map((option, i) => (
          <div key={option.value}>
            <Field
              name={name}
              component="input"
              type="radio"
              id={id ? `${id}-${i}` : `${name}-${i}`}
              value={option.value}
              onChange={option => onChange(option)}
            />
            <Label
              name={id ? `${id}-${i}` : `${name}-${i}`}
              label={option.label}
            />
          </div>
        ))}
        <ErrorMessage error={meta.error} touched={meta.touched} />
      </fieldset>
    </RadioGroupWrapperStyled>
  );
};
RadioGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  children: PropTypes.array.isRequired,
  handleChange: PropTypes.func
};
