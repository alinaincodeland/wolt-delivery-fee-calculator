import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe("Cart Value Field", () => {
  test("loads with value 0 €", () => {
    render(<App />);

    const field = screen.getByTestId("input-currency-field");

    expect(field).toBeInTheDocument();

    expect(field).toHaveDisplayValue("0 €");
  });

  test("type a string fails", () => {
    render(<App />);

    const field = screen.getByTestId("input-currency-field");

    userEvent.type(field, "hello");

    expect(field).toHaveDisplayValue("0 €");
  });

  test("type a negative value fails", () => {
    render(<App />);

    const field = screen.getByTestId("input-currency-field");

    userEvent.type(field, "-10");

    expect(field).toHaveDisplayValue("10 €");
  });

  test("type a floating value", () => {
    render(<App />);

    const field = screen.getByTestId("input-currency-field");

    userEvent.type(field, "10.35");

    expect(field).toHaveDisplayValue("10.35 €");
  });
});
