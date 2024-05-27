import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BookingInfo from "./components/BookingInfo/BookingInfo";

describe("BookingInfo component", () => {
  beforeEach(() => {
    render(<BookingInfo />);
  });

  test("user can select date, time, number of players and number of lanes", async () => {
    // Find the input elements by data-testid
    const dateInput = screen.getByTestId("Date");
    const timeInput = screen.getByTestId("Time");
    const playersInput = screen.getByTestId("Number of awesome bowlers");
    const lanesInput = screen.getByTestId("Number of lanes");

    // Log the current input values before change
    console.log("Before fireEvent.change:");
    console.log("Date:", dateInput.value);
    console.log("Time:", timeInput.value);
    console.log("Number of awesome bowlers:", playersInput.value);
    console.log("Number of lanes:", lanesInput.value);

    // Simulate user input
    fireEvent.change(dateInput, { target: { value: "2024-05-29" } });
    fireEvent.change(timeInput, { target: { value: "20:30" } });
    fireEvent.change(playersInput, { target: { value: "4" } });
    fireEvent.change(lanesInput, { target: { value: "2" } });

    // Wait for the inputs to update
    await waitFor(() => {
      // Log the current input values after the change
      console.log("After fireEvent.change:");
      console.log("Date:", dateInput.value);
      console.log("Time:", timeInput.value);
      console.log("Number of awesome bowlers:", playersInput.value);
      console.log("Number of lanes:", lanesInput.value);

      // Assert that the inputs have the expected values
      expect(dateInput.value).toBe("2024-05-29");
      expect(timeInput.value).toBe("20:30");
      expect(playersInput.value).toBe("4");
      expect(lanesInput.value).toBe("2");
    });
  });
});
