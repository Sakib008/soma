import axios from "axios";

const allUsers = async ()=>{
    return await axios.get('/api/users')
}

const userGet =async (userId)=>{
    try {
        return await axios.get(`/api/users/${userId}`)
    } catch (error) {
        console.error(error.message)
        throw error
    }
}

const userEdit = async(userData)=>{
    try {
        return await axios.post(`/api/users/edit`,userData)
    } catch (error) {
        console.error(error.message)
        throw error
    }
}

const allUserBookmark = async ()=>{
    try {
        return await axios.get('/api/users/bookmark')
    } catch (error) {
        console.error(error.message)
        throw error
    }
}

const bookmarkPost =async (postId)=>{
    try {
        return await axios.post(`/api/users/bookmark/${postId}`)
    } catch (error) {
        console.error(error)
        throw error
    }
}

const removePost = async(postId)=>{
    try {
        return await axios.post(`/api/users/remove-bookmark/${postId}`)
    } catch (error) {
        console.error(error)
        throw error
    }
}

const postFollow =async (followUserId,encodedToken)=>{
    try {
        return await axios.post(`/api/users/follow/${followUserId}`,{},{
            headers : {
                authorization : encodedToken
            }
        })
    } catch (error) {
        console.error(error)
        throw error
    }
}

const postUnfollow = async (followUserId,encodedToken) =>{
    try {
        return await axios.post(`/api/users/unfollow/${followUserId}`,{},{
            headers : {
                authorization : encodedToken
            }
        })
    } catch (error) {
        console.error(error)
        throw error
    }
}


export {allUsers,userGet,userEdit,allUserBookmark,bookmarkPost,removePost,postFollow,postUnfollow}