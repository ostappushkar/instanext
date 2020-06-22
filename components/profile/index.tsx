import { connect } from "react-redux";
import { IStoreState } from "../../interfaces/store";
import Router from "next/router";
import Post from "../post";
import Loading from "../loading";
import styles from "../../styles/profile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { IPost } from "../../interfaces/post";

interface IProfileProps {
  currentUser: firebase.User;
  userPosts: IPost[];
  loading: boolean;
}
const Profile = (props: IProfileProps) => {
  const { currentUser, userPosts, loading } = props;
  const handleBackClick = () => {
    Router.push("/");
  };
  return (
    <main className={styles.container}>
      <div className={styles.profileInfo}>
        <button onClick={handleBackClick} className={styles.backButton}>
          <FontAwesomeIcon icon={faLongArrowAltLeft} />
          Go back
        </button>
        <div className={styles.profileText}>
          <h3>{currentUser.displayName}</h3>
          <h6>{currentUser.email}</h6>
          <p>{userPosts.length} posts </p>
        </div>
        <div className={styles.profileAvatar}>
          <img src={currentUser.photoURL} alt="avatar" />
        </div>
      </div>
      <div className={styles.userPosts}>
        {loading ? <Loading /> : null}
        {userPosts.map((post, index) => {
          return <Post item={post} key={index} />;
        })}
      </div>
    </main>
  );
};

const mapsStateToProps = (state: IStoreState) => {
  return {
    currentUser: state.login.currentUser,
    userPosts: state.posts.userPosts,
    loading: state.posts.loading,
  };
};

export default connect(mapsStateToProps)(Profile);
