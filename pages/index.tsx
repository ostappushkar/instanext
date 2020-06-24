import Head from "next/head";
import Home from "../components/home";
import { connect } from "react-redux";
import { getPosts, postsWatcher } from "../redux/posts/actions";
import { useEffect } from "react";
import { watchAuthState } from "../redux/user/actions";

interface IDashboard {
  getPosts: Function;
  watchAuthState: Function;
  postsWatcher:Function
}
const Dashboard = (props: IDashboard) => {
  const { getPosts, watchAuthState,postsWatcher } = props;
  useEffect(() => {
    watchAuthState();
    getPosts();
    postsWatcher();
  }, [getPosts, watchAuthState,postsWatcher]);
  return (
    <section>
      <Head>
        <title>Instogram</title>
      </Head>
      <Home />
    </section>
  );
};

const mapDispatchToProps = {
  getPosts,
  watchAuthState,
  postsWatcher
};
export default connect(null, mapDispatchToProps)(Dashboard);
export const getStaticProps = () => {
  return {
    props: {
      initialReduxState: {
        posts: {
          loading: false,
          posts: [],
          error: null,
          userPosts: [],
          addLoading: false,
          newPostsAvailable:false
        },
        login: {
          userLoading: false,
        },
      },
    },
  };
};
