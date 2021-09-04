import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import EventsForm from "./EventsForm";
import './App.css';

const App = () => (
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <EventsForm />
  </MuiPickersUtilsProvider>
);

export default App;
