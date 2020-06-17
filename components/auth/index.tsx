import { IStoreState } from "../../interfaces";
import styles from "../../styles/auth.module.scss";
import { logOut, googleLogin } from "../../services/auth";
import PersonIcon from "@material-ui/icons/Person";
import { connect } from "react-redux";
interface IAuth {
  currentUser: firebase.User;
  isLogged: boolean;
}

const Auth = (props: IAuth) => {
  const { currentUser, isLogged } = props;
  const handleLoginClick = () => {
    googleLogin();
  };
  const handleLogoutClick = () => {
    logOut();
  };
  if (isLogged) {
    return (
      <div className={styles.loginNavbar}>
        <div className={styles.profileInfo}>
          {currentUser?.photoURL ? (
            <img alt="User Avatar" src={currentUser.photoURL} />
          ) : (
            <PersonIcon />
          )}
          <p className={styles.navbarUsername}>{currentUser?.displayName}</p>
        </div>
        <button onClick={handleLogoutClick}>Log out</button>
      </div>
    );
  } else {
    return <button onClick={handleLoginClick}>Log in</button>;
  }
};
const mapsStateToProps = (state: IStoreState) => {
  return {
    currentUser: state.login.currentUser,
    isLogged: state.login.isLogged,
  };
};
export default connect(mapsStateToProps)(Auth);
