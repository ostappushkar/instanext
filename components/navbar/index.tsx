import styles from "../../styles/navbar.module.scss";
import Auth from "../auth";

export default () => {
  return (
    <nav className={styles.navbar}>
      <Auth />
    </nav>
  );
};
