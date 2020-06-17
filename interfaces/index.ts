export interface IPost {
  id: string;
  imageUrl: string;
  likes: number;
  userName: string;
  avatar: string;
  description: string;
  comments: Array<string>;
  createdAt: string;
}
export interface IPostsState {
  loading: boolean;
  posts: IPost[];
}
export interface ILoginState {
  isLogged: boolean;
  currentUser: firebase.User;
}
export interface IDispathAction {
  type: string;
  payload: {
    data: any;
    error: any;
  };
}
export interface IStoreState {
  login: ILoginState;
  posts: IPostsState;
}
export interface IPostProps {
  item: IPost;
}
