// Posts Action Types
const GET_ALL_POSTS = 'post/getAll';
const GET_SUGGESSTED_POSTS = 'post/suggested';
const GET_BOOKMARK_POSTS = 'post/bookmarked';
const GET_LIKED_POSTS = 'post/liked';
const CREATE_POST = 'post/create';
const LIKE_POST = 'post/like';
const BOOKMARK_POST = 'post/bookmark'
const EDIT_POSTS = 'post/edit';
const DELETE_POSTS = 'post/delete';

// User Action Types
const ADD_USER_AVATAR = 'profile/avatar';
const ADD_USER_BIO = 'profile/bio';
const ADD_USER_PORTFOLIO = 'profile/portfolio';
const FOLLOW_USER ='user/follow';
const UNFOLLOW_USER = 'user/unfollow';
const USER_PROFILE = 'user/profile';

// Getting User Data and His Posts
const GET_ALL_USERS = 'user/getAll';
const GET_USER_POSTS = 'user/posts';
const ADD_BOOKMARK = 'posts/add-bookmark';

export {ADD_BOOKMARK,GET_ALL_POSTS,GET_BOOKMARK_POSTS,GET_LIKED_POSTS,GET_SUGGESSTED_POSTS,CREATE_POST,LIKE_POST,BOOKMARK_POST,EDIT_POSTS,DELETE_POSTS,ADD_USER_AVATAR,ADD_USER_BIO,ADD_USER_PORTFOLIO,FOLLOW_USER,UNFOLLOW_USER,USER_PROFILE,GET_ALL_USERS,GET_USER_POSTS}