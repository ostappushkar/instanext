import IPost from "../post/";

export default interface IPostsState {
  loading: boolean;
  posts: IPost[];
  error: any;
  userPosts: IPost[];
}
