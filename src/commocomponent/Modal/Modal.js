import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";

import { ModalWrapperStyle } from "./Modal.style";
import Close from "../Icons/Close";
import Notification from "../Icons/Notification";
import Info from "../Icons/Info";

const Portal = ({ children }) => {
  let modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(modalRoot);
  }
  const el = document.createElement("div");

  useEffect(() => {
    modalRoot.appendChild(el);
  }, [el, modalRoot]);
  useEffect(() => {
    return () => modalRoot.removeChild(el);
  });
  return createPortal(children, el);
};

function useOnClickOutside(ref, handler, closeOnClickOutside) {
  useEffect(
    () => {
      const listener = event => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      };

      if (closeOnClickOutside) {
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
      }

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    [ref, handler, closeOnClickOutside]
  );
}

const Modal = ({
  children,
  variant,
  handleClose,
  hideIcon,
  className,
  hideClose,
  closeOnClickOutside,
  customWidth
}) => {
  // Create a ref that we add to the element for which we want to detect outside clicks
  const ref = useRef();
  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, () => handleClose(), closeOnClickOutside);

  return (
    <Portal>
      <ModalWrapperStyle className={className} customWidth={customWidth} data-testid="modal">
        <div className="custom-modal-dialog" ref={ref}>
          <div className="modal-body new-mod">
            {!hideClose && (
              <button
                className="close"
                onClick={handleClose}
                data-testid="close-button"
              >
                <Close />
                </button>
            )}
            {!hideIcon && (
              <span className="notification-icon">
                {variant === "notification" ? <Notification /> : <Info />}
              </span>
            )}
            <div className="custom-modal-content">{children}</div>
          </div>
        </div>
      </ModalWrapperStyle>
    </Portal>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(["notification", "info"]),
  handleClose: PropTypes.func,
  hideIcon: PropTypes.bool,
  hideClose: PropTypes.bool,
  className: PropTypes.string,
  closeOnClickOutside: PropTypes.bool
};

// Specifies the default values for props:
Modal.defaultProps = {
  closeOnClickOutside: false,
  hideIcon: true
};

export default Modal;
