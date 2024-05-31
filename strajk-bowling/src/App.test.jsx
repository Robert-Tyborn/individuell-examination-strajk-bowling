import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BookingInfo from "./components/BookingInfo/BookingInfo";
import Confirmation from "./components/Confirmation/Confirmation";
import { beforeEach, describe } from "vitest";
import Booking from "./views/Booking";

describe("Userstory 1 - BookingInfo component", () => {
  beforeEach(() => {
    render(<BookingInfo />);
  });

  test("user can select date and time and add the number of players and lanes", async () => {
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
  test("user can add a shoe size for each player", () => {
    render(<Booking />);

    // Click the add button twice
    const addButton = screen.getByTestId("add-shoe");
    fireEvent.click(addButton);
    fireEvent.click(addButton);

    // Get all shoe input fields
    const shoeInputs = screen.getAllByTestId(/Shoe size \/ person \d+/);

    // Fill out the shoe size inputs
    fireEvent.change(shoeInputs[0], { target: { value: "42" } });
    fireEvent.change(shoeInputs[1], { target: { value: "38" } });

    // Verify the shoe sizes
    expect(shoeInputs[0].value).toBe("42");
    expect(shoeInputs[1].value).toBe("38");
  });

  test("user can remove a shoe size field", () => {
    render(<Booking />);

    // Click the add button twice
    const addButton = screen.getByTestId("add-shoe");
    fireEvent.click(addButton);
    fireEvent.click(addButton);

    // Click the remove button for the first shoe size field
    const removeButtons = screen.getAllByTestId(/remove-shoe-\d+/);
    fireEvent.click(removeButtons[0]);

    // Verify the remaining shoe size field
    const shoeInputs = screen.getAllByTestId(/Shoe size \/ person \d+/);
    console.log("Number of remaining shoe input fields:", shoeInputs.length);
    expect(shoeInputs).toHaveLength(1);
  });
});

describe("User story 4 - Booking submission", () => {
  beforeEach(() => {
    render(<Booking />);
  });

  test("user can submit the reservation", async () => {
    // Fill out booking information
    const date = screen.getByTestId("Date");
    const time = screen.getByTestId("Time");
    const numberOfPlayers = screen.getByTestId("Number of awesome bowlers");
    const lanes = screen.getByTestId("Number of lanes");

    fireEvent.change(date, { target: { value: "2024-05-29" } });
    fireEvent.change(time, { target: { value: "20:30" } });
    fireEvent.change(numberOfPlayers, { target: { value: "2" } });
    fireEvent.change(lanes, { target: { value: "1" } });

    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("+"));

    await waitFor(() => {
      const shoe1 = screen.getByTestId("Shoe size / person 1");
      const shoe2 = screen.getByTestId("Shoe size / person 2");
      fireEvent.change(shoe1, { target: { value: "42" } });
      fireEvent.change(shoe2, { target: { value: "43" } });
    });

    // Submit the booking
    fireEvent.click(screen.getByText("strIIIIIike!"));

    // Wait for the confirmation to be displayed
    await waitFor(() => {
      expect(screen.getByText("See you soon!")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Rob666"));
      expect(screen.getByDisplayValue("2"));
      expect(screen.getByDisplayValue("1"));
    });
  });
});

describe("Userstory 5 - Confirmation component", () => {
  beforeEach(() => {
    render(<Booking />);
  });

  test("user can navigate back to the booking view after receiving the booking confirmation", async () => {
    // Fill out booking information
    const date = screen.getByTestId("Date");
    const time = screen.getByTestId("Time");
    const numberOfPlayers = screen.getByTestId("Number of awesome bowlers");
    const lanes = screen.getByTestId("Number of lanes");

    fireEvent.change(date, { target: { value: "2024-05-29" } });
    fireEvent.change(time, { target: { value: "20:30" } });
    fireEvent.change(numberOfPlayers, { target: { value: "2" } });
    fireEvent.change(lanes, { target: { value: "1" } });

    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("+"));

    await waitFor(() => {
      const shoe1 = screen.getByTestId("Shoe size / person 1");
      const shoe2 = screen.getByTestId("Shoe size / person 2");
      fireEvent.change(shoe1, { target: { value: "42" } });
      fireEvent.change(shoe2, { target: { value: "43" } });
    });

    // Submit the booking
    fireEvent.click(screen.getByText("strIIIIIike!"));

    await waitFor(() => {
      expect(screen.getByText("See you soon!")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId("burger"));
    fireEvent.click(screen.getByTestId("goback"));

    // Wait for the confirmation to be displayed
    await waitFor(() => {
      expect(screen.getByText("When, WHAT & Who"));
    });
  });
});
