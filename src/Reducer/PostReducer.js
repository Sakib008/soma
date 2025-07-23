import {
  CREATE_POST,
  GET_ALL_POSTS,
  GET_ALL_USERS,
  ADD_BOOKMARK,
  USER_PROFILE,
  GET_LIKED_POSTS,
  EDIT_POSTS,
  DELETE_POSTS,
} from "../utils/action";

export const initialState = {
  posts: {
    all: [],
    bookmark: [],
    liked: [],
  },
  users: {
    all: [],
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
