import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";

describe("Cart Value Field", () => {
  test("loads with value 0 €", () => {
    render(<App />);

    const cartValueField = screen.getByTestId("input-currency-field");

    expect(cartValueField).toBeInTheDocument();

    expect(cartValueField).toHaveDisplayValue("0 €");
  });
});
