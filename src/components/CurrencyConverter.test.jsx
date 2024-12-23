import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CurrencyConverter from "./CurrencyConverter";
import CurrencyContext from "../contexts/CurrencyContext";

describe("CurrencyConverter", () => {
  const renderCurrencyConverter = (fromCurrency, toCurrency) => {
    return render(
      <CurrencyContext.Provider
        value={{
          fromCurrency,
          toCurrency,
        }}
      >
        <CurrencyConverter />
      </CurrencyContext.Provider>
    );
  };

  it("renders out input and output element", () => {
    renderCurrencyConverter("USD", "SGD");
    expect(screen.getByPlaceholderText("Enter amount")).toBeInTheDocument();
    expect(screen.getByText("USD")).toBeInTheDocument();
    expect(screen.getByText("SGD")).toBeInTheDocument();
    expect(screen.getByText("=")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("user input and output display", () => {
    renderCurrencyConverter("USD", "SGD");
    const inputElement = screen.getByPlaceholderText("Enter amount");
    fireEvent.change(inputElement, { target: { value: "10" } });
    expect(screen.getByText("20")).toBeInTheDocument();
  });

  it("user input and output display", () => {
    renderCurrencyConverter("USD", "SGD");
    const inputElement = screen.getByPlaceholderText("Enter amount");
    fireEvent.change(inputElement, { target: { value: "" } });
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("rerenders correctly currencies", () => {
    const { rerender } = renderCurrencyConverter("USD", "EUR");
    expect(screen.getByText("USD")).toBeInTheDocument();
    expect(screen.getByText("EUR")).toBeInTheDocument();

    rerender(
      <CurrencyContext.Provider
        value={{
          fromCurrency: "GBP",
          toCurrency: "JPY",
        }}
      >
        <CurrencyConverter />
      </CurrencyContext.Provider>
    );
    expect(screen.getByText("GBP")).toBeInTheDocument();
    expect(screen.getByText("JPY")).toBeInTheDocument();
  });

  it("should give 0 for alphabet input", () => {
    renderCurrencyConverter("USD", "SGD");
    const inputElement = screen.getByPlaceholderText("Enter amount");
    fireEvent.change(inputElement, { target: { value: "abc" } });
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
