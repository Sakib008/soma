import {
  CREATE_POST,
  GET_ALL_POSTS,
  GET_ALL_USERS,
 
  USER_PROFILE,
} from "../utils/action";

export const initialState = {
  posts: {
    all: [],
  },
  users: {
    all: [],
  },
  profile: {
    data: {},
    avatar: "",
    bio: "",
    portfolio: "",
    follow: [],
    follower: [],
    post: [],
  },
};

const postReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_POSTS:
      return { ...state, posts: { ...state.posts, all: action.payload } };
    case GET_ALL_USERS:
      return { ...state, users: { ...state.users, all: action.payload } };
    case USER_PROFILE:
      return { ...state, profile: { ...state.profile, data: action.payload } };
    case CREATE_POST:
      return {
        ...state,
        posts: { ...state.posts, all: [...state.posts.all, action.payload] },
      };

    default:
      return state;
  }
};

export default postReducer;