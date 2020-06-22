import Head from "next/head";
import Home from "../components/home";
import { connect } from "react-redux";
import { getPosts } from "../redux/posts/actions";
import { useEffect } from "react";
import { watchAuthState } from "../redux/user/actions";

interface IDashboard {
  getPosts: Function;
  watchAuthState: Function;
}
const Dashboard = (props: IDashboard) => {
  const { getPosts, watchAuthState } = props;
  useEffect(() => {
    watchAuthState();
    getPosts();
  }, [getPosts, watchAuthState]);
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
        },
        login: {
          userLoading: false,
        },
      },
    },
  };
};
