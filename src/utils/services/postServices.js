import axios from "axios";

const allPosts = async ()=>{
    try {
        return await axios.get(`/api/posts`)
    } catch (error) {
        console.error(error.message)
        throw error
    }
}

const singlePost = async (postId)=>{
    try {
        return await axios.get(`/api/posts/${postId}`)
    } catch (error) {
        console.error(error)
        throw error
    }
}

const userPosts = async (username)=>{
    try {
        return await axios.get(`/api/posts/user/${username}`)
    } catch (error) {
        console.error(error)
        throw error
    }
}

const postCreate = async (content)=>{
    try {
        return await axios.post(`/api/user/posts`,content)
    } catch (error) {
        console.error(error)
        throw error

    }
}

const postEdit = async (postId,postData)=>{
    try {
        return await axios.post(`/api/posts/edit/${postId}`,postData)
    } catch (error) {
        console.error(error)
        throw error
    }
}

const postLike = async (postId)=>{
    try {
        return await axios.post(`/api/posts/like/${postId}`)
    } catch (error) {
        console.error(error)
        throw error
    }
}

const postDislike = async (postId)=>{
    try {
        return await axios.post(`/api/posts/dislike/${postId}`)
    } catch (error) {
        console.error(error)
        throw error
    }
}

const postDelete = async (postId)=>{
    try {
        return await axios.post(`/api/user/posts/${postId}`)
    } catch (error) {
        console.error(error)
        throw error
    }
}

export {allPosts,singlePost,userPosts,postCreate,postEdit,postLike,postDelete,postDislike}