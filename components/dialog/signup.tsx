import { useState } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleButton from "react-google-button";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/dialog.module.scss";
import TextField from "@material-ui/core/TextField";
import { googleLogin, signUp } from "../../redux/user/actions";
import { connect } from "react-redux";
import { IStoreState } from "../../interfaces/store";
import { CircularProgress } from "@material-ui/core";
interface ISignupProps {
  setSignup: Function;
  setOpen: Function;
  signUp: Function;
  googleLogin: Function;
  loading: boolean;
}
interface IAuthData {
  email: string;
  username: string;
  photo: File;
  password: string;
}
const SignupDialog = (props: ISignupProps) => {
  const { setSignup, setOpen, loading, signUp, googleLogin } = props;
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState(null);
  const handleGoogleSignIn = () => {
    googleLogin(
      () => {
        console.log("Signed up in with Google");
        setOpen(false);
        setSignup(false);
      },
      (err) => {
        setErrorMessage(err);
      }
    );
  };
  const handleImage = (event) => {
    if (event.target.files) {
      var file = event.target.files[0];
      var fr = new FileReader();
      fr.onloadend = (e) => {
        setImage(e.target.result);
      };
      fr.readAsDataURL(file);
    }
  };
  const handleSignup = (event) => {
    event.preventDefault();
    let data = new FormData(event.target);
    let object: IAuthData = {
      email: "",
      password: "",
      photo: null,
      username: "",
    };
    data.forEach((value, key) => {
      object[key] = value;
    });
    if (
      object.email === "" ||
      object.password === "" ||
      object.username === ""
    ) {
      setErrorMessage("All fields required");
      return;
    } else {
      console.log(object);
      signUp(
        object.email,
        object.password,
        object.username,
        object.photo,
        () => {
          console.log("Registered new user");
          setOpen(false);
          setSignup(false);
        },
        (err) => {
          setErrorMessage(err);
        }
      );
    }
  };
  return (
    <>
      <DialogTitle>Sign up</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSignup}>
          <div className={styles.uploader}>
            <label className={styles.inputLabel} htmlFor="image-upload">
              <input
                name="photo"
                onChange={handleImage}
                id="image-upload"
                hidden
                type="file"
                accept="image/*"
              />
              <div className={styles.imagePreview}>
                {image ? (
                  <img src={image} alt="" />
                ) : (
                  <FontAwesomeIcon icon={faCamera} />
                )}
              </div>
            </label>
          </div>

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
            className={styles.inputField}
            error={errorMessage.includes("Invalid email")}
            label="Username"
            type="text"
            name="username"
            fullWidth
            required
          />
          <TextField
            error={errorMessage.includes("The password is invalid")}
            className={styles.inputField}
            label="Password"
            type="password"
            name="password"
            fullWidth
            required
          />
          <p className={styles.errorText}>{errorMessage}</p>

          <button type="submit" className={styles.loginButton}>
            {loading ? (
              <CircularProgress className={styles.loader} />
            ) : (
              "Signup"
            )}
          </button>
        </form>
        <GoogleButton
          className={styles.googleButton}
          label="Sign up with Google"
          onClick={handleGoogleSignIn}
          type="light"
        ></GoogleButton>
        <button
          onClick={() => {
            setSignup(false);
          }}
          className={styles.loginSignupToggler}
        >
          Login to existing account
        </button>
      </DialogContent>
    </>
  );
};
const mapDispatchToProps = {
  signUp,
  googleLogin,
};
const mapsStateToProps = (state: IStoreState) => {
  return {
    loading: state.login.userLoading,
  };
};

export default connect(mapsStateToProps, mapDispatchToProps)(SignupDialog);
