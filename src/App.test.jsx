import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App Component", () => {
  it("should render title and not be empty", () => {
    render(<App />);
    const elementWithText = screen.getByText("Currency Converter");
    expect(elementWithText).toBeInTheDocument();
  });
});
