import User from "../../components/User";
import { usePost } from "../../Context/PostContext";
import { useAuth } from "../../Context/AuthContext";
import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { postDelete } from "../../utils/services/postServices";
import Post from "../../components/Post";

const Profile = () => {
  const { state, userFetch, getAllPost } = usePost();
  const { logoutUser, loading } = useAuth();
  const [actionMenu, setActionMenu] = useState(null); // postId for which menu is open
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    userFetch();
    getAllPost();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <div className="text-center text-xl font-semibold">Loading...</div>;
  }

  const user = state.profile;
  const userPosts = state.posts.all.filter(
    (post) => post.username === user.username
  );
  const followers = user.followers || [];
  const following = user.following || [];

  const handleDelete = async (postId) => {
    setDeleting(true);
    try {
      await postDelete(postId);
      getAllPost();
      setActionMenu(null);
    } catch (e) {
      alert("Failed to delete post");
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = (postId) => {
    // TODO: Implement edit modal
    alert("Edit functionality coming soon!");
    setActionMenu(null);
  };

  return (
    <div className="flex flex-col items-center gap-8 max-w-3xl mx-auto py-8">
      {/* Profile Header */}
      <div className="w-full bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center gap-4">
        <img
          className="w-24 h-24 rounded-full object-cover border-4 border-blue-300"
          src={user.avatar || `https://ui-avatars.com/api/?name=${user.username}&length=1`}
          alt={user.username}
        />
        <div className="text-2xl font-bold">{user.firstName} {user.lastName}</div>
        <div className="text-lg text-gray-500">@{user.username}</div>
        {user.bio && <div className="text-center text-base text-gray-700">{user.bio}</div>}
        {user.portfolio && (
          <a
            href={user.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {user.portfolio}
          </a>
        )}
        <div className="flex gap-8 mt-4 text-lg">
          <div><span className="font-bold">{userPosts.length}</span> Posts</div>
          <div><span className="font-bold">{followers.length}</span> Followers</div>
          <div><span className="font-bold">{following.length}</span> Following</div>
        </div>
        <button
          onClick={logoutUser}
          className="text-xl text-white font-semibold rounded-2xl p-2 bg-secondary-bg mt-4"
        >
          Log out
        </button>
      </div>

      {/* User's Posts */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {userPosts.length === 0 ? (
          <div className="col-span-full text-center text-lg text-gray-500">No posts yet.</div>
        ) : (
          userPosts.map((post) => (
            <div
              key={post._id}
              className="relative group bg-white rounded-2xl shadow-md p-6 min-h-[120px] flex flex-col justify-between"
            >
              {/* Post Content */}
              <div className="text-base mb-2">{post.content}</div>
              {/* Hover Action Icon */}
              <div
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <button
                  onClick={() => setActionMenu(actionMenu === post._id ? null : post._id)}
                  className="p-1 rounded-full hover:bg-gray-200"
                >
                  <BsThreeDots size={24} />
                </button>
                {/* Action Menu */}
                {actionMenu === post._id && (
                  <div className="absolute z-10 right-0 mt-2 w-28 bg-white border rounded-xl shadow-lg flex flex-col">
                    <button
                      onClick={() => handleEdit(post._id)}
                      className="px-4 py-2 text-left hover:bg-gray-100 rounded-t-xl"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="px-4 py-2 text-left hover:bg-gray-100 rounded-b-xl text-red-600"
                      disabled={deleting}
                    >
                      {deleting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;
