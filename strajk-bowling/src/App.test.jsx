import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BookingInfo from "./components/BookingInfo/BookingInfo";
import Shoes from "./components/Shoes/Shoes";
import Confirmation from "./components/Confirmation/Confirmation";
import { beforeEach, describe } from "vitest";
import { useState } from "react";

// Mock component to handle state for Shoes component
function MockShoesComponent() {
  const [shoes, setShoes] = useState([]);

  const updateSize = (e) => {
    setShoes(
      shoes.map((shoe) =>
        shoe.id === e.target.name ? { ...shoe, size: e.target.value } : shoe
      )
    );
  };

  const addShoe = (id) => {
    setShoes([...shoes, { id, size: "" }]);
  };

  const removeShoe = (id) => {
    setShoes(shoes.filter((shoe) => shoe.id !== id));
  };

  return (
    <Shoes
      updateSize={updateSize}
      addShoe={addShoe}
      removeShoe={removeShoe}
      shoes={shoes}
    />
  );
}

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

describe("Userstory 2 and 3 - Shoes component", () => {
  beforeEach(() => {
    render(<MockShoesComponent />);
  });

  test("user can add shoe size for each player", () => {
    const addButton = screen.getByTestId("add-shoe");

    // Simulate adding two shoe size fields
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    console.log("Add button clicked twice");

    // Get all shoe input fields
    const shoeInputs = screen.getAllByTestId(/Shoe size \/ person \d+/);
    console.log("Number of shoe inputs after adding:", shoeInputs.length);
    expect(shoeInputs).toHaveLength(2);

    // Simulate entering shoe sizes
    fireEvent.change(shoeInputs[0], { target: { value: "42" } });
    fireEvent.change(shoeInputs[1], { target: { value: "38" } });
    console.log("Shoe sizes set to 42 and 38");

    // Verify the shoe sizes
    expect(shoeInputs[0].value).toBe("42");
    expect(shoeInputs[1].value).toBe("38");
  });

  test("user can remove a shoe size field", () => {
    const addButton = screen.getByTestId("add-shoe");

    // Simulate adding two shoe size fields
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    console.log("Add button clicked twice");

    // Get all shoe input fields
    let shoeInputs = screen.getAllByTestId(/Shoe size \/ person \d+/);
    console.log("Number of shoe inputs after adding:", shoeInputs.length);
    expect(shoeInputs).toHaveLength(2);

    // Simulate removing the first shoe size field
    const removeButtons = screen.getAllByTestId(/remove-shoe-\d+/);
    fireEvent.click(removeButtons[0]);
    console.log("Remove button clicked for the first shoe");

    // Verify the number of shoe input fields after removal
    shoeInputs = screen.getAllByTestId(/Shoe size \/ person \d+/);
    console.log("Number of shoe inputs after removing:", shoeInputs.length);
    expect(shoeInputs).toHaveLength(1);
  });
});

describe("Userstory 5 - Confirmation component", () => {
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
