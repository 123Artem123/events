import { render, screen } from "@testing-library/react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import EventsForm from "./EventsForm";
import userEvent from "@testing-library/user-event";

describe("EventsForm", () => {
  test("renders", () => {
    const { asFragment } = render(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <EventsForm onSubmit={() => {}} />
      </MuiPickersUtilsProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should call submit", async () => {
    const onSubmit = jest.fn();
    render(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <EventsForm onSubmit={onSubmit} />
      </MuiPickersUtilsProvider>
    );
    const emailField = screen.getByTestId("EventsForm-email");
    const fnField = screen.getByTestId("EventsForm-fn");
    const lnField = screen.getByTestId("EventsForm-ln");
    const submitBtn = screen.getByTestId("EventsForm-submit");
    userEvent.type(emailField, "test@test.com");
    userEvent.type(fnField, "fn");
    userEvent.type(lnField, "ln");
    userEvent.click(submitBtn);
    expect(onSubmit).toHaveBeenCalledWith({
      date: new Date().toISOString().substring(0, 10),
      email: "test@test.com",
      firstName: "fn",
      lastName: "ln",
    });
  });
});
