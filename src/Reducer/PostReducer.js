import {
  CREATE_POST,
  GET_ALL_POSTS,
  GET_ALL_USERS,
  ADD_BOOKMARK,
  USER_PROFILE,
  GET_LIKED_POSTS,
  EDIT_POSTS,
  DELETE_POSTS,
  GET_SEARCH_USERS,
  GET_USER_FOLLOWING,
  GET_USER_FOLLOWERS,
  GET_SUGGESTED_USERS
} from "../utils/action";

export const initialState = {
  posts: {
    all: [],
    bookmark: [],
    liked: [],
  },
  users: {
    all: [],
    suggested : [],
    following: [],
    followers: [],
    search: [],
  },
  profile: {
    avatar: "",
    bio: "",
    portfolio: "",
  },
};

const postReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_POSTS:
      return { ...state, posts: { ...state.posts, all: action.payload } };
    case GET_ALL_USERS:
      return { ...state, users: { ...state.users, all: action.payload } };
    case GET_SUGGESTED_USERS:
      return { ...state, users: { ...state.users, suggested: action.payload } };
    case GET_USER_FOLLOWERS:
      return { ...state, users: { ...state.users, followers: action.payload } };
    case GET_USER_FOLLOWING:
      return { ...state, users: { ...state.users, following: action.payload } };
    case GET_SEARCH_USERS:
      return { ...state, users: { ...state.users, search: action.payload } };
    case USER_PROFILE:
      return {
        ...state,
        profile: Object.assign(state.profile, action.payload),
      };
    case CREATE_POST:
      return {
        ...state,
        posts: { ...state.posts, all: [...state.posts.all, action.payload] },
      };
    case GET_LIKED_POSTS : 
      return {
        ...state,posts : {...state.posts,liked : action.payload}
      }
    case ADD_BOOKMARK:
      return {
        ...state,
        posts: { ...state.posts, bookmark: action.payload },
      };
    case EDIT_POSTS:
      return { ...state, posts: { ...state.posts, all: action.payload } };
    case DELETE_POSTS:
      return { ...state, posts: { ...state.posts, all: action.payload } };
    default:
      return state;
  }
};

export default postReducer;
