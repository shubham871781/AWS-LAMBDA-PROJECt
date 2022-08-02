import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Modal from "./index";

afterEach(cleanup);
describe("Test Modal", () => {
  const handleClose = jest.fn();
  let container;
  function renderModal(props) {
    container = render(
      <Modal handleClose={handleClose} {...props}>
        <div>Modal Content</div>
      </Modal>
    );
    return container;
  }
  it("renders the children inside a div through a portal", () => {
    const container = renderModal();
    expect(container.getByText("Modal Content")).toBeTruthy();
  });
  it("should close", () => {
    handleClose.mockClear();
    const container = renderModal();
    const button = container.getByTestId("close-button");
    fireEvent.click(button);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
  it("should attach handler when clicking outside", () => {
    handleClose.mockClear();
    const container = renderModal();
    const modal = container.getByTestId("modal");
    fireEvent.mouseDown(modal);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
  it("should let user disable click outside triggering handleClose", () => {
    handleClose.mockClear();
    const container = renderModal({ closeOnClickOutside: false });
    const modal = container.getByTestId("modal");
    fireEvent.mouseDown(modal);
    expect(handleClose).toHaveBeenCalledTimes(0);
  });
});
