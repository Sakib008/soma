import { useEffect, useState } from "react"
import { usePost } from "../../Context/PostContext"
import Post from "../../components/Post"
import { GET_LIKED_POSTS } from "../../utils/action"

const Like = () => {
    const {state,dispatch} = usePost()
    const [isLoading,setIsLoading] = useState(false)

    const user = state.profile.username;
    const likedPosts = state.posts.all.filter((post)=>post.likes.likedBy.find(({username})=>username === user))
    const getLikedPost =()=>{
        try {
            dispatch({type : GET_LIKED_POSTS,payload : likedPosts})
        } catch (error) {
            throw error
        }
    }
    useEffect(()=>{
        setIsLoading(true)
        try {
            
            getLikedPost()
        } catch (error) {
            console.error(error.message)
            throw error
        }finally{
            setIsLoading(false)
            
        }
    },[])
    if(isLoading){
        return (
            <div className="max-w-sm p-7 m-7 bg-white shadow-lg flex justify-center items-center">
                Loading...
            </div>
        )
    }
     if(state.posts.liked &&  state.posts?.liked?.length===0){
        return (
            <div className="max-w-sm h-32 text-3xl rounded-2xl p-7 m-7 bg-white shadow-lg flex justify-center items-center">
               No Liked Post
            </div>
        )
    }
  return (
    <div>
        {likedPosts.map((post,index)=>(
            <div key={index}>
                <Post myPost={post}/>
            </div>
        ))}
    </div>
  )
}

export default Like










