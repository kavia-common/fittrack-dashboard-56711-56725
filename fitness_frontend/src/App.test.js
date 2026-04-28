import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders FitTrack shell", () => {
  render(<App />);
  expect(screen.getByText("FitTrack")).toBeInTheDocument();
});
