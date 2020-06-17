import { authRef, GoogleProvider, persistance } from "../config/firebase";

export const logOut = (
  successCallback: () => void = () => {},
  errorCallback: (message: string) => void = () => {}
) => {
  authRef
    .signOut()
    .then(() => {
      localStorage.clear();
      console.log("Logged out...");
      successCallback();
    })
    .catch((e) => {
      const { message } = e;
      console.warn(message);
      errorCallback(message);
    });
};

export const googleLogin = (
  successCallback: () => void = () => {},
  errorCallback: (message: string) => void = () => {}
) => {
  authRef
    .setPersistence(persistance)
    .then(() => {
      authRef
        .signInWithPopup(GoogleProvider)
        .then(() => {
          successCallback();
        })
        .catch((e) => {
          const { message, code } = e;
          console.warn(message);
          let err: string;
          switch (code) {
            case "auth/cancelled-popup-request":
              err = "Cancelled";
              break;
            case "auth/account-exists-with-different-credential":
              err = "Try other method";
              break;
            case "auth/auth-domain-config-required":
              err = "Domain config required";
              break;
            case "auth/popup-blocked":
              err = "Popup blocked by browser";
              break;
            case "auth/popup-closed-by-user":
              err = "Popup closed by user";
              break;
            case "auth/unauthorized-domain":
              err = "Unauthorized domain";
              break;
            case "auth/operation-not-allowed":
              err = "Operation is not allowed";
              break;

            default:
              err = message;
              break;
          }
          errorCallback(err);
        });
    })
    .catch((e) => {
      const { message } = e;
      console.warn(message);
      errorCallback(message);
    });
};
