import { render, screen } from "@testing-library/react";
import EventsFormContainer from "./EventsFormContainer";

jest.mock("./EventsForm", () => ({ onSubmit }) => (
  <button data-testid="btn" onClick={() => onSubmit("test")}></button>
));

global.fetch = async () => ({ status: 201, json: async () => "test" });

describe("EventsFormContainer", () => {
  test("should send API call on submit", async () => {
    render(<EventsFormContainer />);
    const btn = screen.getByTestId("btn");
    btn.click();
    const successMsg = await screen.findByText(
      "Your event has been successfully created!"
    );
    expect(successMsg).toBeTruthy();
  });
});
