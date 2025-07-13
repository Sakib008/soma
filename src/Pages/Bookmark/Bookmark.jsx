import { useEffect, useState } from "react"
import { usePost } from "../../Context/PostContext"
import { useAuth } from "../../Context/AuthContext"
import Post from "../../components/Post"

const Bookmark = () => {
    const {state,getAllBookmarkPosts} = usePost()
    const {Token} = useAuth()
    const [isLoading,setIsLoading] = useState(false)
    
    useEffect(()=>{
        const fetchBookmarks = async () => {
            setIsLoading(true)
            try {
                if(state.posts.bookmark.length===0){
                    await getAllBookmarkPosts(Token)
                }
            } catch (error) {
                console.error("Error fetching bookmarks:", error.message)
            } finally {
                setIsLoading(false)
            }
        }
        
        if(Token) {
            fetchBookmarks()
        }
    },[Token])
    if(isLoading){
        return (
            <div className="max-w-sm h-32 rounded-2xl p-7 m-7 bg-white shadow-lg flex justify-center items-center">
                Loading...
            </div>
        )
    }
    if(state.posts.bookmark &&  state.posts?.bookmark?.length===0){
        return (
            <div className="max-w-sm h-32 text-3xl rounded-2xl p-7 m-7 bg-white shadow-lg flex justify-center items-center">
               No Bookmark Post
            </div>
        )
    }
    
  return (
    <div>
        {state.posts.bookmark.map((post,index)=>(
            <>
            <h1 className="text-3xl font-bold text-white">Liked Posts</h1>
            <div key={index}>
                <Post myPost={post} bookmarkPage/>
            </div>
            </>
        ))}
    </div>
  )
}

export default Bookmark