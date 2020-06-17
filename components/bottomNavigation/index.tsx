import { useState } from "react";
import { isMobileOnly } from "react-device-detect";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeSharpIcon from "@material-ui/icons/HomeSharp";
import AddPhotoAlternateSharpIcon from "@material-ui/icons/AddPhotoAlternateSharp";
import FavoriteSharpIcon from "@material-ui/icons/FavoriteSharp";
import PersonSharpIcon from "@material-ui/icons/PersonSharp";
import styles from "../../styles/bottomNav.module.scss";
const BottomNav = () => {
  const [value, setValue] = useState("home");

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
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
        value="home"
        icon={<HomeSharpIcon />}
      />
      <BottomNavigationAction
        className={styles.navItem}
        value="add"
        icon={<AddPhotoAlternateSharpIcon />}
      />
      <BottomNavigationAction
        className={styles.navItem}
        value="Likes"
        icon={<FavoriteSharpIcon />}
      />
      <BottomNavigationAction
        className={styles.navItem}
        value="profile"
        icon={<PersonSharpIcon />}
      />
    </BottomNavigation>
  ) : null;
};
export default BottomNav;
