import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import User from "./User";
import { useAuth } from "../Context/AuthContext";
import { usePost } from "../Context/PostContext";

const CreatePostModal = ({ user, onClose }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const {Token} = useAuth();
  const {createPost} = usePost();

  useEffect(() => {
    setMounted(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      setMounted(false);
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("Post content cannot be empty.");
      return;
    }
    if(!Token){
      setError("You are not authorized to create post")
    }
    setLoading(true);
    setError("");

    try {
      await createPost(Token,content);
      console.log("content of create page : ",content)
      setContent("");
      onClose();
    } catch (err) {
      console.error("Error on create model",err)
      setError("Failed to create post. Try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleChangePost =(e)=>{
    setContent(e.target.value);
  }
  

  const modalContent = (
    <div className="fixed inset-0 h-full bg-black bg-opacity-40 flex items-center justify-center z-[9999] pointer-events-auto" onClick={onClose}>
      <div className="bg-white text-primary-bg rounded-lg shadow-lg p-6 w-full max-w-md relative z-[10000] pointer-events-auto" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-4 right-4 text-4xl  " onClick={onClose}>&times;</button>
        <h2 className="text-2xl font-bold mb-4">Create a Post</h2>
        <User user={user} />
        <form onSubmit={handleSubmit} className="flex h-full flex-col gap-4 mt-2">
          <textarea
            className="text-xl outline-none rounded p-2 resize-none h-44 min-h-[100px]"
            placeholder="What's on your mind?"
            value={content}
            onChange={handleChangePost}
            disabled={loading}
          />
          {error && <span className="text-red-500 text-sm">{error}</span>}
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-text text-secondary-bg rounded font-bold"
              disabled={loading}
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return mounted ? createPortal(modalContent, document.body) : null;
};

export default CreatePostModal; 