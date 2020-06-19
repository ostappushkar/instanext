import { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { IStoreState } from "../../interfaces/store";
import { connect } from "react-redux";
import styles from "../../styles/dialog.module.scss";
import Login from "./login";
import Signup from "./signup";

interface IAuthDialogProps {
  open: boolean;
  setOpen: Function;
}
const AuthDialog = (props: IAuthDialogProps) => {
  const { open, setOpen } = props;
  const [isSignup, setSignup] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog className={styles.dialog} open={open} onClose={handleClose}>
      {isSignup ? (
        <Signup setOpen={setOpen} setSignup={setSignup} />
      ) : (
        <Login setOpen={setOpen} setSignup={setSignup} />
      )}
    </Dialog>
  );
};

export default AuthDialog;
