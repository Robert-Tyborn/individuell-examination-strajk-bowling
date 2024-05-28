import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BookingInfo from "./components/BookingInfo/BookingInfo";
import Shoes from "./components/Shoes/Shoes";
import Confirmation from "./components/Confirmation/Confirmation";
import { describe } from "vitest";

describe("Userstory 1 - BookingInfo", () => {
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

describe("Userstory 2 and 3 - Shoes", () => {
  test("user can add shoe size for each player", () => {
    const addButton = screen;
  });
});

describe("Userstory 5 - Confirmation", () => {
  // Test case to ensure the user can navigate back to the booking page
  test("user can go back to the booking page", async () => {
    // Mock function to simulate the setConfirmation function
    const mockSetConfirmation = vi.fn();

    // Sample confirmation details to pass as props to the Confirmation component
    const confirmationDetails = {
      active: true,
      when: "2024-05-29T20:30",
      people: "4",
      lanes: "2",
      id: "ABC123",
      price: 680,
    };

    // Render the Confirmation component with the provided props
    console.log(
      "Rendering Confirmation component with props:",
      confirmationDetails
    );
    render(
      <Confirmation
        confirmationDetails={confirmationDetails}
        setConfirmation={mockSetConfirmation}
      />
    );

    // Find the back button within the rendered component
    const backButton = screen.getByRole("button");
    console.log("Back button found:", backButton);

    // Simulate a click event on the back button
    console.log("Simulating click event on back button");
    fireEvent.click(backButton);

    // Wait for the mockSetConfirmation function to be called
    await waitFor(() => {
      console.log("Checking if mockSetConfirmation was called");
      expect(mockSetConfirmation).toHaveBeenCalledTimes(1);
      console.log("mockSetConfirmation called successfully");
    });
  });
});
