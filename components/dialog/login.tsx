import { useState } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import GoogleButton from "react-google-button";
import styles from "../../styles/dialog.module.scss";
import TextField from "@material-ui/core/TextField";
import { googleLogin, logIn } from "../../redux/user/actions";
import { connect } from "react-redux";
import { IStoreState } from "../../interfaces/store";
import { CircularProgress } from "@material-ui/core";
interface ILoginProps {
  setSignup: Function;
  setOpen: Function;
  logIn: Function;
  googleLogin: Function;
  loading: boolean;
}
interface IAuthData {
  email: string;
  password: string;
}
const LoginDialog = (props: ILoginProps) => {
  const { setSignup, loading, logIn, googleLogin, setOpen } = props;
  const [errorMessage, setErrorMessage] = useState("");
  const handleGoogleSignIn = () => {
    googleLogin(
      () => {
        console.log("Logged in with Google");
        setOpen(false);
      },
      (err) => {
        setErrorMessage(err);
      }
    );
  };

  const handleLogIn = (event) => {
    event.preventDefault();
    let data = new FormData(event.target);
    let object: IAuthData = { email: "", password: "" };
    data.forEach((value, key) => {
      object[key] = value;
    });
    logIn(
      object.email,
      object.password,
      () => {
        console.log("Logged in");
        setOpen(false);
      },
      (err) => {
        setErrorMessage(err);
      }
    );
  };
  return (
    <>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <form onSubmit={handleLogIn}>
          <TextField
            className={styles.inputField}
            error={errorMessage.includes("Invalid email")}
            label="Email"
            type="email"
            name="email"
            fullWidth
            required
          />
          <TextField
            required
            error={errorMessage.includes("The password is invalid")}
            className={styles.inputField}
            label="Password"
            type="password"
            name="password"
            fullWidth
          />
          <p className={styles.errorText}>{errorMessage}</p>

          <button type="submit" className={styles.loginButton}>
            {loading ? <CircularProgress className={styles.loader} /> : "Login"}
          </button>
        </form>
        <GoogleButton
          className={styles.googleButton}
          onClick={handleGoogleSignIn}
          type="light"
        ></GoogleButton>
        <button
          onClick={() => {
            setSignup(true);
          }}
          className={styles.loginSignupToggler}
        >
          Create account
        </button>
      </DialogContent>
    </>
  );
};
const mapDispatchToProps = {
  logIn,
  googleLogin,
};
const mapsStateToProps = (state: IStoreState) => {
  return {
    loading: state.login.userLoading,
  };
};

export default connect(mapsStateToProps, mapDispatchToProps)(LoginDialog);
