import Head from "next/head";
import MyProfile from "../components/profile";
import { connect } from "react-redux";
import { IStoreState } from "../interfaces/store";
import { getUserPosts } from "../redux/posts/actions";
import { useEffect } from "react";
interface IProfileProps {
  isLogged: boolean;
  getUserPosts: Function;
}
const Profile = (props: IProfileProps) => {
  const { isLogged, getUserPosts } = props;
  useEffect(() => {
    getUserPosts();
  }, [getUserPosts]);
  if (isLogged) {
    return (
      <section>
        <Head>
          <title>My profile</title>
        </Head>
        <MyProfile />
      </section>
    );
  }
};
const mapsStateToProps = (state: IStoreState) => {
  return {
    isLogged: state.login.isLogged,
    userPosts: state.posts.userPosts,
  };
};
const mapDispatchToProps = {
  getUserPosts,
};
export default connect(mapsStateToProps, mapDispatchToProps)(Profile);
