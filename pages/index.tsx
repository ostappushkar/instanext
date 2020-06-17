import Head from "next/head";
import Post from "../components/post";
import Navbar from "../components/navbar";
import { connect } from "react-redux";
import { getPosts } from "../redux/posts/actions";
import { useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { IPost, IStoreState } from "../interfaces";
import { watchAuthState } from "../redux/user/actions";

interface IDashboard {
  posts: Array<IPost>;
  loading: boolean;
  getPosts: Function;
  watchAuthState: Function;
}
const Dashboard = (props: IDashboard) => {
  const { posts, loading, getPosts,watchAuthState } = props;
  useEffect(() => {
    watchAuthState();
    getPosts();
  }, [getPosts, watchAuthState]);
  return (
    <section>
      <Head>
        <title>Instogram</title>
      </Head>
      <Navbar />
      <main className="container">
        <div className="pageTitle">
          <h1>Posts</h1>
          {loading ? <CircularProgress className="loader" /> : ""}
        </div>
        {posts.map((post, index) => {
          return <Post item={post} key={index} />;
        })}
      </main>
    </section>
  );
};

const mapsStateToProps = (state: IStoreState) => {
  return {
    loading: state.posts.loading,
    posts: state.posts.posts,
  };
};
const mapDispatchToProps = {
  getPosts,
  watchAuthState,
};
export default connect(mapsStateToProps, mapDispatchToProps)(Dashboard);
export const getStaticProps = () => {
  getPosts();
  return {
    props: {
      initialReduxState: {
        posts: {
          loading: false,
          posts: [],
        },
      },
    },
  };
};
