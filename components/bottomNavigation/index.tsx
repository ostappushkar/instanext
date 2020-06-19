import { useState } from "react";
import { isMobileOnly } from "react-device-detect";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faImages,
  faHeart,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { connect } from "react-redux";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import styles from "../../styles/bottomNav.module.scss";
import { IStoreState } from "../../interfaces/store";
import Router from "next/router";
interface IBottomNavProps {
  currentUser: firebase.User;
  isLogged: boolean;
}
const BottomNav = (props: IBottomNavProps) => {
  const [value, setValue] = useState("/");
  const { currentUser, isLogged } = props;
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
    Router.push(newValue);
  };
  return isMobileOnly ? (
    <BottomNavigation
      className={styles.container}
      showLabels={false}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        className={styles.navItem}
        value="/"
        icon={<FontAwesomeIcon icon={faImages} />}
      />
      <BottomNavigationAction
        className={styles.navItem}
        value="/add"
        icon={<FontAwesomeIcon icon={faPlusSquare} />}
      />
      <BottomNavigationAction
        className={styles.navItem}
        value="/likes"
        icon={<FontAwesomeIcon icon={faHeart} />}
      />
      <BottomNavigationAction
        className={styles.navItem}
        value="/profile"
        icon={
          isLogged ? (
            <img className={styles.userPhoto} src={currentUser.photoURL} />
          ) : (
            <FontAwesomeIcon icon={faUser} />
          )
        }
      />
    </BottomNavigation>
  ) : null;
};
const mapsStateToProps = (state: IStoreState) => {
  return {
    currentUser: state.login.currentUser,
    isLogged: state.login.isLogged,
  };
};
export default connect(mapsStateToProps)(BottomNav);
