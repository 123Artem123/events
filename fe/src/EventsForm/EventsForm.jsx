import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { DatePicker } from "@material-ui/pickers";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles({
  input: {
    marginBottom: "1rem",
  },
});

const EMAIL_REGEXP = /\S+@\S+\.\S+/;
const FIELD_REGEXP = /^\S{1,64}$/;

const EventsForm = ({ onSubmit }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const { input } = useStyles();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [fn, setFn] = useState("");
  const [fnError, setFnError] = useState(null);
  const [ln, setLn] = useState("");
  const [lnError, setLnError] = useState(null);
  const [date, setDate] = useState(new Date());

  const validate = (regExp, value) => !regExp.test(value);

  const onEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    setEmailError(validate(EMAIL_REGEXP, value));
  };

  const onFnChange = (event) => {
    const value = event.target.value;
    setFn(value);
    setFnError(validate(FIELD_REGEXP, value));
  };

  const onLnChange = (event) => {
    const value = event.target.value;
    setLn(value);
    setLnError(validate(FIELD_REGEXP, value));
  };

  const onReset = () => {
    setEmail("");
    setLn("");
    setFn("");
    setDate(new Date());
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const emailErr = validate(EMAIL_REGEXP, email);
    setEmailError(emailErr);
    const fnErr = validate(FIELD_REGEXP, fn);
    setFnError(fnErr);
    const lnErr = validate(FIELD_REGEXP, ln);
    setLnError(lnErr);
    if (!emailErr && !fnErr && !lnErr) {
      onSubmit({
        email,
        date: date.toISOString().substring(0, 10),
        firstName: fn,
        lastName: ln,
      });
    }
  };

  return (
    <form noValidate autoComplete="off" onSubmit={onFormSubmit}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="stretch"
      >
        <TextField
          inputProps={{ "data-testid": "EventsForm-email" }}
          error={emailError}
          onBlur={(e) => setEmailError(validate(EMAIL_REGEXP, e?.target.value))}
          value={email}
          onChange={onEmailChange}
          className={input}
          label="Email"
          variant="outlined"
        />
        <TextField
          inputProps={{ "data-testid": "EventsForm-fn" }}
          error={fnError}
          onBlur={(e) => setFnError(validate(FIELD_REGEXP, e?.target.value))}
          value={fn}
          onChange={onFnChange}
          className={input}
          label="First Name"
          variant="outlined"
        />
        <TextField
          inputProps={{ "data-testid": "EventsForm-ln" }}
          error={lnError}
          onBlur={(e) => setLnError(validate(FIELD_REGEXP, e?.target.value))}
          value={ln}
          onChange={onLnChange}
          className={input}
          label="Last Name"
          variant="outlined"
        />
        <DatePicker
          disablePast
          className={input}
          label="Date"
          value={date}
          onChange={setDate}
          inputVariant="outlined"
        />
        <Grid
          container
          direction={matches ? "row" : "column"}
          justifyContent="space-evenly"
          alignItems="stretch"
          spacing={2}
        >
          <Grid item>
            <Button
              onClick={onReset}
              size="large"
              type="reset"
              color="secondary"
              variant="outlined"
              fullWidth
            >
              Clear
            </Button>
          </Grid>
          <Grid item>
            <Button
              data-testid="EventsForm-submit"
              disabled={emailError || fnError || lnError}
              size="large"
              type="submit"
              color="primary"
              variant="outlined"
              fullWidth
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

EventsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default EventsForm;
