import axios from "axios";

const allPosts = async () => {
  try {
    return await axios.get(`/api/posts`);
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const singlePost = async (postId) => {
  try {
    return await axios.get(`/api/posts/${postId}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const userPosts = async (username) => {
  try {
    return await axios.get(`/api/posts/user/${username}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const postCreate = async (encodedToken,content) => {
  try {
    return await axios.post(`/api/posts`, {content : content},{
      headers : {
        authorization : encodedToken
      }
    });
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const postEdit = async (postId, postData, encodedToken) => {
  try {
    return await axios.post(`/api/posts/edit/${postId}`, postData, {
      headers: { authorization: encodedToken },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const postLike = async (postId,encodedToken) => {
  try {
    return await axios.post(`/api/posts/like/${postId}`,{}, {
      headers: { authorization : JSON.stringify(encodedToken) },
    });
   
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const postDislike = async (postId,encodedToken) => {
  try {
    return await axios.post(`/api/posts/dislike/${postId}`,{},{
      headers: { authorization : JSON.stringify(encodedToken) }
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const postBookmark = async (postId,encodedToken)=>{
  try {
    return await axios.post(`/api/users/bookmark/${postId}`,{},{
      headers : {authorization : JSON.stringify(encodedToken)}
    })
    
  } catch (error) {
    console.error(error.message)
    throw error;
  }
}
const removePostBookmark = async (postId,encodedToken) => {
  try {
    return await axios.post(`/api/users/remove-bookmark/${postId}`,{},{
      headers : {authorization : JSON.stringify(encodedToken)}
    })
  } catch (error) {
    console.error(error.message)
    throw error;
  }
}
const allBookmarkPosts = async (encodedToken)=>{
  try {
    console.log("Making request to /api/users/bookmark with token:", encodedToken);
    const response = await axios.get(`/api/users/bookmark`,{},{
      headers : {
        authorization : JSON.stringify(encodedToken)
      }
    })
    console.log("Response from bookmark API:", response);
    return response;
  } catch (error) {
    console.error("Error in allBookmarkPosts:", error.message)
    console.error("Error details:", error.response?.data);
    throw error
  }
}
const postDelete = async (postId, encodedToken) => {
  try {
    return await axios.delete(`/api/user/posts/${postId}`, {
      headers: { authorization: encodedToken },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const postComment = async (postId, text, encodedToken) => {
  try {
    return await axios.post(`/api/posts/comment/${postId}`, { text }, {
      headers: { authorization: encodedToken },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {
  allPosts,
  singlePost,
  userPosts,
  postCreate,
  postEdit,
  postLike,
  postDelete,
  postDislike,
  postBookmark,
  removePostBookmark,allBookmarkPosts,
  postComment
};
