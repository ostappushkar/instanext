import { useState } from "react";
import { connect } from "react-redux";
import Post from "../post";
import styles from "../../styles/home.module.scss";
import Loading from "../loading";
import { IStoreState } from "../../interfaces/store/";
import { IPost } from "../../interfaces/post/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import AddDialog from "../addPost";
interface IHomeProps {
  loading: boolean;
  posts: IPost[];
  error: any;
  isLogged: boolean;
}
const Home = (props: IHomeProps) => {
  const { loading, posts, error, isLogged } = props;
  const [open, setOpen] = useState(false);
  const handleAddClick = () => {
    setOpen(true);
  };
  return (
    <main className={styles.container}>
      <div className={styles.pageTitle}>
        <h1>
          Posts<span>.</span>
        </h1>
        {isLogged ? (
          <button onClick={handleAddClick} className={styles.addPostButton}>
            Add post <FontAwesomeIcon icon={faPlusSquare} />
            <AddDialog open={open} setOpen={setOpen} />
          </button>
        ) : null}
      </div>
      {loading ? <Loading /> : null}
      {error ? (
        <h3 className={styles.loadingError}>Loading error</h3>
      ) : (
        posts.map((post, index) => {
          return <Post item={post} key={index} />;
        })
      )}
    </main>
  );
};
const mapsStateToProps = (state: IStoreState) => {
  return {
    loading: state.posts.loading,
    posts: state.posts.posts,
    error: state.posts.error,
    isLogged: state.login.isLogged,
  };
};
export default connect(mapsStateToProps)(Home);
