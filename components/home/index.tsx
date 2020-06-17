import { connect } from "react-redux";
import Post from "../post";
import styles from "../../styles/home.module.scss";
import Loading from "../loading";
import { IStoreState } from "../../interfaces/store/";
import IPost from "../../interfaces/post/";
interface IHomeProps {
  loading: boolean;
  posts: IPost[];
  error: any;
}
const Home = (props: IHomeProps) => {
  const { loading, posts, error } = props;
  return (
    <main className={styles.container}>
      <div className={styles.pageTitle}>
        <h1>Posts</h1>
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
  };
};
export default connect(mapsStateToProps)(Home);
