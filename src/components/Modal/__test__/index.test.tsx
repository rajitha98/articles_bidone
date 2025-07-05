import React from "react";
import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import ModalAlert from "..";

describe("ModalAlert Component", () => {
  test("WHEN isVisible is true THEN modal should render children", () => {
    render(
      <ModalAlert isVisible={true} onClose={jest.fn()}>
        <div>Test Modal</div>
      </ModalAlert>
    );

    expect(screen.getByText("Test Modal")).toBeInTheDocument();
  });

  test("WHEN isVisible is false THEN modal should not render anything", () => {
    render(
      <ModalAlert isVisible={false} onClose={jest.fn()}>
        <div>Hidden</div>
      </ModalAlert>
    );

    expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
  });

});
