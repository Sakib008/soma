import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Post from '../../components/Post'
import { usePost } from '../../Context/PostContext'

const SinglePost = () => {
  const { postId } = useParams()
  const { getSinglePost, state } = usePost()
  const [loading, setLoading] = useState(false)
  
  // Find the post from global state
  const post = state.posts?.all?.find(p => p._id === postId)

  useEffect(() => {
    const fetchPost = async () => {
      // Only fetch if the post is not already in global state
      if (!post && postId && !loading) {
        try {
          setLoading(true)
          await getSinglePost(postId)
        } catch (err) {
          console.error('Error fetching post:', err)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchPost()
  }, [postId, post, loading])

  if (loading || !post) {
    return <div className="p-4 text-center text-gray-500">Loading post...</div>
  }

  return (
    <div>
      <Post myPost={post} />
      <div className="max-w-[28vw] w-full flex flex-col items-center border-2 border-gray-400 rounded-3xl m-4 text-primary-text">
        {/* Additional post details can go here */}
      </div>
    </div>
  )
}

export default SinglePost