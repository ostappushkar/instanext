import { connect } from "react-redux";
import { IStoreState } from "../../interfaces/store";
import Router from "next/router";
import Post from "../post";
import Loading from "../loading";
import styles from "../../styles/profile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft, faUser } from "@fortawesome/free-solid-svg-icons";
import { IPost } from "../../interfaces/post";
import { uploadPhoto } from "../../redux/user/actions";
import { CircularProgress } from "@material-ui/core";

interface IProfileProps {
  currentUser: firebase.User;
  userPosts: IPost[];
  loading: boolean;
  userLoading: boolean;
  uploadPhoto: Function;
}

const Profile = (props: IProfileProps) => {
  const { currentUser, userPosts, uploadPhoto, userLoading, loading } = props;
  const handleBackClick = () => {
    Router.push("/");
  };
  const handleImage = (event) => {
    console.log(event.target.files);
    if (event.target.files) {
      var file = event.target.files[0];
      uploadPhoto(file, () => {
        console.log("Photo uploaded");
      });
    }
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
          {currentUser.photoURL ? (
            <img src={currentUser.photoURL} alt="avatar" />
          ) : userLoading ? (
            <CircularProgress className={styles.photoLoader} />
          ) : (
            <label htmlFor="image-upload">
              <input
                name="photo"
                onChange={handleImage}
                id="image-upload"
                hidden
                type="file"
                accept="image/*"
              />
              <FontAwesomeIcon icon={faUser} />
            </label>
          )}
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
    userLoading: state.login.userLoading,
  };
};
const mapDispatchToProps = {
  uploadPhoto,
};
export default connect(mapsStateToProps, mapDispatchToProps)(Profile);
