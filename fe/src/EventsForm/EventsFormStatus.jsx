import React from "react";
import Box from "@material-ui/core/Box";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    marginTop: {
      marginTop: "1rem",
    },
  });

const EventsFormStatus = ({ onBack, success, error }) => {
  const { marginTop } = useStyles();

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
      {success && (
        <CheckCircleIcon
          className={marginTop}
          fontSize="large"
          color="primary"
        />
      )}
      <Typography variant="h6" align="center">
        {success && "Your event has been successfully created!"}
        {error?.message}
      </Typography>

      {error?.details?.map((message) => (
        <Box display="flex" justifyContent="center" alignItems="center" className={marginTop}>
          <CancelIcon fontSize="small" color="error" />
          <Typography key={message}>{message}</Typography>
        </Box>
      ))}
      <Button
        className={marginTop}
        onClick={onBack}
        color="primary"
        variant="outlined"
        size="large"
      >
        Go Back
      </Button>
    </Box>
  );
};

EventsFormStatus.propTypes = {
  onBack: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
};

export default EventsFormStatus;
