import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Post from '../../components/Post'
import { usePost } from '../../Context/PostContext'

const SinglePost = () => {
  const { postId } = useParams()
  const { getSinglePost, state } = usePost()
  const [loading, setLoading] = useState(false)
  const post = state.posts?.all?.find(p => p._id === postId)

  useEffect(() => {
    const fetchPost = async () => {
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
      <div className="max-w-[28vw] w-full flex flex-col items-center shadow-lg rounded-3xl m-4 ">
        {/* Comments Section */}
        <div className="w-full p-4">
          <h3 className="text-xl font-bold mb-2 text-secondary-bg underline underline-offset-2">Comments</h3>
          {post.comment && post.comment.length > 0 ? (
            <ul className="space-y-3">
              {post.comment.map((c) => (
                <div key={c._id} className="border-b border-gray-200 bg-white shadow-sm p-2 rounded-lg">
                  <span className="font-semibold">@{c.username}:</span> 
                  <p>{c.text}</p>
                </div>
              ))}
            </ul>
          ) : (
            <div className="text-gray-500">No comments yet.</div>
          )}
         
        </div>
      </div>
    </div>
  )
}

export default SinglePost