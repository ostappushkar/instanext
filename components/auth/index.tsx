import { useState } from "react";
import Link from "next/link";
import styles from "../../styles/auth.module.scss";
import { logOut } from "../../redux/user/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { connect } from "react-redux";
import ExitToAppSharpIcon from "@material-ui/icons/ExitToAppSharp";
import { IStoreState } from "../../interfaces/store";
import AuthDialog from "../dialog";
interface IAuth {
  currentUser: firebase.User;
  isLogged: boolean;
  logOut: Function;
}

const Auth = (props: IAuth) => {
  const [open, setOpen] = useState(false);

  const { currentUser, logOut, isLogged } = props;

  const handleLoginClick = () => {
    setOpen(true);
  };
  const handleLogoutClick = () => {
    logOut();
    setOpen(false);
  };
  if (isLogged) {
    return (
      <div className={styles.loginNavbar}>
        <Link href="/profile">
          <div className={styles.profileInfo}>
            {currentUser?.photoURL ? (
              <div className={styles.navbarAvatar}>
                <img alt="User Avatar" src={currentUser.photoURL} />
              </div>
            ) : (
              <div className={styles.userIcon}>
                <FontAwesomeIcon icon={faUser} />
              </div>
            )}
            <p className={styles.navbarUsername}>{currentUser?.displayName}</p>
          </div>
        </Link>
        <button onClick={handleLogoutClick}>
          <ExitToAppSharpIcon />
        </button>
      </div>
    );
  } else {
    return (
      <>
        <button className={styles.userButton} onClick={handleLoginClick}>
          <FontAwesomeIcon icon={faUser} />
        </button>
        <AuthDialog open={open} setOpen={setOpen} />
      </>
    );
  }
};
const mapsStateToProps = (state: IStoreState) => {
  return {
    currentUser: state.login.currentUser,
    isLogged: state.login.isLogged,
  };
};
const mapDispatchToProps = {
  logOut,
};
export default connect(mapsStateToProps, mapDispatchToProps)(Auth);
