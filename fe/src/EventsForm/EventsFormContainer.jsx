import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import EventsForm from "./EventsForm";
import EventsFormStatus from "./EventsFormStatus";

const useStyles = makeStyles((theme) =>
  createStyles({
    loadIndicator: {
      padding: "2rem",
    },
    container: {
      padding: "2rem",
      width: (matches) =>
        matches ? `${theme.breakpoints.values.sm.valueOf()}px` : "100%",
    },
  })
);

const EventsFormContainer = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const { loadIndicator, container } = useStyles(matches);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (event) => {
    try {
      setLoading(true);
      const rawResult = await fetch(process.env.REACT_APP_API_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });
      const result = await rawResult.json();
      if (rawResult.status !== 201) {
        const details = result?.details?.body?.map(({ message }) => message);
        setError({ message: result.message, details });
        setSuccess(false);
      } else {
        setError(null);
        setSuccess(true);
      }
      setLoading(false);
    } catch {
      setLoading(false);
      setSuccess(false);
      setError({ message: 'An error occurred trying to create your event. Please try again later.' });
    }
  };

  const onBack = () => {
    setError(null);
    setSuccess(false);
  }

  return (
    <Paper className={container} data-testid="EventsFormContainer">
      <Typography variant="h2" align="center">
        Create event
      </Typography>
      {(success || error) && (
        <EventsFormStatus
          success={success}
          error={error}
          onBack={onBack}
        />
      )}
      {!success && !error && loading && (
        <Box display="flex" justifyContent="center">
          <CircularProgress size={100} className={loadIndicator} />
        </Box>
      )}
      {!success && !error && !loading && <EventsForm onSubmit={onSubmit} />}
    </Paper>
  );
};

export default EventsFormContainer;
