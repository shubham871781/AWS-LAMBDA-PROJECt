import { connect } from "formik";
import PropTypes from "prop-types";

const ErrorFocus = ({ formik: { isSubmitting, isValidating, errors } }) => {
  const keys = Object.keys(errors);
  if (keys.length > 0 && isSubmitting && !isValidating) {
    const selector = `[name="${keys[0]}"]`;
    const errorElement = document.querySelector(selector);
    if (errorElement) {
      // using setTimout in order to let React render cycle finishes before focusing on element
      setTimeout(function() {
        errorElement.focus();
      }, 100);
    }
  }
  return null;
};

ErrorFocus.propTypes = {
  isSubmitting: PropTypes.bool,
  isValidating: PropTypes.bool,
  errors: PropTypes.array
};

export default connect(ErrorFocus);
