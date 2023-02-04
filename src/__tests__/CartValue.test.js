import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe("Cart Value Field", () => {
  test("loads with value 0 €", () => {
    render(<App />);

    const cartValueField = screen.getByTestId("input-currency-field");

    expect(cartValueField).toBeInTheDocument();

    expect(cartValueField).toHaveDisplayValue("0 €");
  });

  test("type a string fails", () => {
    render(<App />);

    const cartValueField = screen.getByTestId("input-currency-field");

    userEvent.type(cartValueField, "hello");

    expect(cartValueField).toHaveDisplayValue("0 €");
  });

  test("type a negative value fails", () => {
    render(<App />);

    const cartValueField = screen.getByTestId("input-currency-field");

    userEvent.type(cartValueField, "-10");

    expect(cartValueField).toHaveDisplayValue("10 €");
  });

  test("type a floating value", () => {
    render(<App />);

    const cartValueField = screen.getByTestId("input-currency-field");

    userEvent.type(cartValueField, "10.35");

    expect(cartValueField).toHaveDisplayValue("10.35 €");
  });
});
