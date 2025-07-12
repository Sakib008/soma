import { createContext, useContext, useEffect, useReducer } from "react";

import postReducer from "../Reducer/PostReducer";
import { initialState } from "../Reducer/PostReducer";
import {
  allPosts,
  allUsers,
  postCreate,
  postDislike,
  postLike,
  singlePost,
} from "../utils/services";
import { GET_ALL_POSTS, GET_ALL_USERS, USER_PROFILE } from "../utils/action";
import { useAuth } from "./AuthContext";

export const PostContext = createContext();

export function PostProvider({ children }) {
  const [state, dispatch] = useReducer(postReducer, initialState);
  const { User } = useAuth();

  const getAllPost = async () => {
    try {
      const {
        data: { posts },
      } = await allPosts();
      dispatch({ type: GET_ALL_POSTS, payload: posts });
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };
  const createPost = async (token,content)=>{
    try {
      const {data : {posts},status}  = await postCreate(token,content)
      if(status ===200 || status===201){
        dispatch({ type: GET_ALL_POSTS, payload: posts });
      }
    } catch (error) {
      console.error(error.message)
      throw error
    }
  }
  const likePost = async (postId, token) => {
    try {
      const {
        data: { posts },
        status,
      } = await postLike(postId, token);
      if (status === 200 || status === 201) {
        dispatch({ type: GET_ALL_POSTS, payload: posts });
      }
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };
  const dislikePost = async (postId, token) => {
    try {
      const {
        data: { posts },
        status,
      } = await postDislike(postId, token);
      if (status === 200 || status === 201) {
        dispatch({ type: GET_ALL_POSTS, payload: posts });
      }
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };
  const getAllUser = async () => {
    try {
      const {
        data: { users },
        status,
      } = await allUsers();
      if (status === 200 || status === 201) {
        dispatch({ type: GET_ALL_USERS, payload: users });
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const getSinglePost = async (postId) => {
    try {
      const {
        data: { post },
        status,
      } = await singlePost(postId);
      if (status === 200 || status === 201){
        const existingPost = state.posts.all.find(p=>p._id===postId);
        if(!existingPost){
          dispatch({type:GET_ALL_POSTS,payload:[...state.posts.all,post]})
        }
        return post;
      };
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };
  const userFetch = () => dispatch({ type: USER_PROFILE, payload: User });
  useEffect(() => {
    userFetch();
    getAllUser();
    getAllPost();
  }, []);
  console.log("All the post : ", state.posts.all);
  return (
    <PostContext.Provider
      value={{
        getSinglePost,
        getAllPost,
        state,
        dispatch,
        likePost,
        dislikePost,
        createPost
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export const usePost = () => useContext(PostContext);
