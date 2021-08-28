import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

export const StateBlueTextField = withStyles((theme) => ({
  root: {
    "& label.Mui-focused": {
      color: theme.palette.stateBlue,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: theme.palette.stateBlue,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.stateBlue,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.stateBlue,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.stateBlue,
      },
    },
  },
}))(TextField);