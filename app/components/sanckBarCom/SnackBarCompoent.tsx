"use client"
import { Button, IconButton, Snackbar, SnackbarCloseReason } from "@mui/material";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';


type SnackBarObj = {
  open: boolean;
  message: string;
};

type MyProps = {
  snackBarobj: SnackBarObj;
  setsnackBarobj: React.Dispatch<React.SetStateAction<SnackBarObj>>;
};
const SnackBarComponent:React.FC<MyProps> = (props) => {
//   const [open, setOpen] = React.useState(false);
const {snackBarobj,setsnackBarobj} = props;

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    // setOpen(false);
    setsnackBarobj({ ...snackBarobj, open: false });
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={snackBarobj.open}
        autoHideDuration={3000}

        onClose={handleClose}
        message={snackBarobj.message}
        action={action}
      />
    </div>
  );
} ;

export default SnackBarComponent;   