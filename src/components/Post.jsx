import { BsThreeDots } from "react-icons/bs";
import { BiBookmark, BiComment, BiHeart, BiShare } from "react-icons/bi";
import { usePost } from "../Context/PostContext";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import { useState } from "react";

const Post = ({ myPost ,bookmarkPage }) => {
  const { state, likePost, dislikePost ,bookmarkPost,removeBookmarkPost, editPost, deletePost, addComment } = usePost();
  const { Token } = useAuth();
  const [actionMenu, setActionMenu] = useState(null)
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [commenting, setCommenting] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const foundUser = state.users?.all?.find(
    (user) => user.username === myPost?.username
  );
  const isByUserPost = state.profile?.username === myPost?.username;
  const isBookmark = state.posts.bookmark.find((post)=>post._id === myPost._id); 
  const isLiked = myPost?.likes?.likedBy?.find(
    ({ username }) => state.profile?.username === username
  );
   const handleDelete = async (postId,Token) => {
    setDeleting(true);
    try {
      await deletePost(postId, Token);
      setActionMenu(null);
    } catch (e) {
      alert("Failed to delete post");
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = (postId) => {
    setEditContent(myPost.content);
    setEditing(true);
    setActionMenu(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    try {
      await editPost(myPost._id, editContent, Token);
      setEditing(false);
    } catch (e) {
      alert("Failed to edit post");
    } finally {
      setEditLoading(false);
    }
  };
  const handleBookmark=async()=>{
    try {
      if(!isBookmark){
       await bookmarkPost(myPost._id,Token)
      }else{
       await removeBookmarkPost(myPost._id,Token)
      }
    } catch (error) {
      console.error("Error due to Bookmark of Post : ",error.message)
      throw error
    }
  }

  const handleLikeClick = async () => {
    try {
      if (!isLiked) {
        await likePost(myPost._id, Token);
      } else {
        await dislikePost(myPost._id, Token);
      }
    } catch (error) {
      console.error("Error liking/disliking post:", error);
    }
  };

  const handleCommentClick = () => {
    setCommenting((prev) => !prev);
    setCommentText("");
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setCommentLoading(true);
    try {
      await addComment(myPost._id, commentText, Token);
      setCommentText("");
      setCommenting(false);
    } catch (e) {
      alert("Failed to add comment");
    } finally {
      setCommentLoading(false);
    }
  };

  const handleShareClick = () => {
    setShareOpen(true);
    setCopySuccess(false);
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin + "/post/" + myPost._id);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 1500);
    } catch {
      setCopySuccess(false);
    }
  };

  return (
    <>
      {editing && (
        <div className="fixed inset-0 h-full bg-black bg-opacity-40 flex items-center justify-center z-10 pointer-events-auto">
          <div className="bg-white text-primary-bg rounded-lg shadow-lg p-6 w-full max-w-md relative z-20 pointer-events-auto" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-4xl" onClick={() => setEditing(false)}>&times;</button>
            <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
            <form onSubmit={handleEditSubmit} className="flex h-full flex-col gap-4 mt-2">
              <textarea
                className="text-xl outline-none rounded p-2 resize-none h-44 min-h-[100px]"
                value={editContent}
                onChange={e => setEditContent(e.target.value)}
                disabled={editLoading}
              />
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() => setEditing(false)}
                  disabled={editLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-text text-secondary-bg rounded font-bold"
                  disabled={editLoading}
                >
                  {editLoading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {shareOpen && (
        <div className="fixed inset-0  h-full bg-black bg-opacity-40 flex items-center justify-center z-20 pointer-events-auto">
          <div className="bg-white text-primary-bg rounded-lg shadow-lg p-6 w-[90vw] md:w-96 max-w-md relative z-30 pointer-events-auto" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-4xl" onClick={() => setShareOpen(false)}>&times;</button>
            <h2 className="text-2xl font-bold mb-4">Share Post</h2>
            <div className="flex items-center gap-2">
              <input
                className="flex-1 border rounded p-2 text-lg"
                value={window.location.origin + "/post/" + myPost._id}
                readOnly
              />
              <button
                className="px-3 py-2 bg-secondary-text text-white rounded flex items-center"
                onClick={handleCopyUrl}
                type="button"
              >
                {copySuccess ? "Copied!" : <BiShare size={22} />}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="md:max-w-[56vw] lg:max-w-[28vw] w-[90vw] px-6 flex flex-col items-center shadow-xl rounded-3xl m-4 text-primary-bg">
      <div className=" relative flex justify-between w-full m-4 items-center">
        <div className="flex">
          <div className="size-14 ">
              <img className="rounded-full object-cover w-full h-full "
              src={foundUser?.avatar || `https://ui-avatars.com/api/?name=${foundUser?.username}&length=1&background=0D8ABC&color=fff`}
              alt={foundUser?.username ?? ""}
              />
          </div>
          <div className="flex mx-4 flex-col items-start justify-center text-xl">
            <p>
              {foundUser
                ? `${foundUser.firstName} ${foundUser.lastName}`
                : "Unknown User"}
            </p>
            <p className="text-lg opacity-70">{`@${
              myPost?.username || "unknown"
            }`}</p>
          </div>
        </div>
       {isByUserPost && <div className=" absolute top-1 right-1 opacity-100 transition-opacity duration-300">
          <button className="hover:bg-gray-300 hover:rounded-full p-1" onClick={() => {setActionMenu(actionMenu === myPost._id ? null : myPost._id)}}>
            <BsThreeDots size={30} />
          </button>
           {actionMenu === myPost._id && (
                  <div className="absolute z-10 right-0 mt-2 w-28 bg-white border rounded-xl shadow-lg flex flex-col">
                    <button
                      onClick={() => handleEdit(myPost._id)}
                      className="px-4 py-2 text-left hover:bg-gray-100 rounded-t-xl"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(myPost._id,Token)}
                      className="px-4 py-2 text-left hover:bg-gray-100 rounded-b-xl text-red-600"
                      disabled={deleting}
                    >
                      {deleting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                )}
        </div>}
      </div>
      <div className="flex flex-col w-full justify-center items-start">
        <Link to={`/post/${myPost._id}`}>
          <div>
            <p>{myPost?.content || "No content"}</p>
          </div>
        </Link>
        <div className="w-full my-4">
          <ul className="list-none flex justify-between items-center">
           {!bookmarkPage && <li>
              <button
                onClick={handleLikeClick}
                className="flex gap-1 text-2xl font-bold items-center"
              >
                <BiHeart
                  className={`${
                    isLiked
                      ? "bg-red-600 text-white rounded-3xl p-0.5"
                      : ""
                  } `}
                  size={30}
                />
                {myPost?.likes?.likeCount || 0}
              </button>
            </li>}
            <li>
              <button onClick={handleBookmark} >
                <BiBookmark size={30}  className={`${
                    isBookmark
                      ? "bg-blue-600 rounded-3xl text-white p-1"
                      : ""
                  } `}/>
              </button>
            </li>
            <li>
              <button onClick={handleCommentClick}>
                <BiComment size={30} />
              </button>
            </li>
            <li>
              <button onClick={handleShareClick}>
                <BiShare size={30} />
              </button>
            </li>
          </ul>
        </div>
      
        {commenting && (
          <form className="w-full flex flex-col gap-2 mb-2" onSubmit={handleCommentSubmit}>
            <textarea
              className="w-full border rounded p-2 resize-none min-h-[60px]"
              placeholder="Add a comment..."
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              disabled={commentLoading}
            />
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setCommenting(false)}
                disabled={commentLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-text text-secondary-bg rounded font-bold"
                disabled={commentLoading}
              >
                {commentLoading ? "Posting..." : "Post Comment"}
              </button>
            </div>
          </form>
        )}
        
      </div>
    </div>
    </>
  );
};

export default Post;
