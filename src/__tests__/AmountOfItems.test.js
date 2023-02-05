import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe("Amount of items field", () => {
  test("type a string fails", () => {
    render(<App />);

    const field = screen.getByTestId("amount-items-field");

    userEvent.type(field, "hello");

    expect(field).toHaveDisplayValue("");
  });

  test("type a negative value fails", () => {
    render(<App />);

    const field = screen.getByTestId("amount-items-field");

    userEvent.type(field, "-");

    expect(field).toHaveDisplayValue("");
  });

  test("type a floating value fails", () => {
    render(<App />);

    const field = screen.getByTestId("amount-items-field");

    userEvent.type(field, "1");
    userEvent.type(field, "0");
    userEvent.type(field, ".");

    expect(field).toHaveDisplayValue("");
  });
});
