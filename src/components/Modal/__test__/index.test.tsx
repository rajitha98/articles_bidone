import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ModalAlert from "..";
import { ThemeProvider } from "styled-components";

const mockTheme = {
  background: "#fff",
  primary: "#000",
  text: "#333",
};

describe("ModalAlert Component", () => {
  test("WHEN isVisible is true THEN modal should render children", () => {
    render(
      <ThemeProvider theme={mockTheme}>
        <ModalAlert isVisible={true} onClose={jest.fn()}>
          <div>Test Modal</div>
        </ModalAlert>
      </ThemeProvider>
    );

    expect(screen.getByText("Test Modal")).toBeInTheDocument();
  });

  test("WHEN isVisible is false THEN modal should not render anything", () => {
    render(
      <ThemeProvider theme={mockTheme}>
        <ModalAlert isVisible={false} onClose={jest.fn()}>
          <div>Hidden</div>
        </ModalAlert>
      </ThemeProvider>
    );

    expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
  });
});
