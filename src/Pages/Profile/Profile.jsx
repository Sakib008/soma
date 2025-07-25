import { usePost } from "../../Context/PostContext";
import { useAuth } from "../../Context/AuthContext";
import { useEffect } from "react";
import Post from "../../components/Post";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { state, getAllUser, getAllPost } = usePost();
  const { logoutUser, loading } = useAuth();
  const { username } = useParams();
  const owner = state.profile.username === username;
  const user = owner ?
    state.profile :
    state.users.all.find((user) => user.username === username) ||
    {};

    console.log("user", !user.username ? "No user found" : user);
    console.log("posts", state.posts.all);
  useEffect(() => {
   const fetchUserData = async () => {
     if (!user.username) {
        await getAllUser(username);
      }
      if (!state.profile.username) {
        await getAllUser(username);
      }
      // Fetch all posts if not already fetched
      if (state.posts.all.length === 0) {
        await getAllPost();
      }
    }
    fetchUserData();
  }, [user.username,state.profile.username, state.posts.all.length]);

  if (loading) {
    return <div className="text-center text-xl font-semibold">Loading...</div>;
  }

  const userPosts = state.posts.all.filter(
    (post) => post.username === user.username
  );
  const followers = user.followers || [];
  const following = user.following || [];

  return (
    <div className="flex flex-col items-center gap-8 max-w-3xl mx-auto py-8">
      {/* Profile Header */}
      <div className="w-full bg-white rounded-3xl shadow-lg p-8 flex flex-col justify-center items-center gap-4">
        <div className="flex items-center gap-6">
          <img
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-300"
            src={
              user.avatar ||
              `https://ui-avatars.com/api/?name=${user.username}&length=1`
            }
            alt={user.username}
          />
          <div>
            <div className="text-2xl font-bold">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-lg text-gray-500">@{user.username}</div>
          </div>
        </div>

        {user.bio && (
          <div className="text-center text-base text-gray-700">{user.bio}</div>
        )}
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
          <div>
            <span className="font-bold">{userPosts.length}</span> Posts
          </div>
          <div>
            <span className="font-bold">{followers.length}</span> Followers
          </div>
          <div>
            <span className="font-bold">{following.length}</span> Following
          </div>
        </div>
       {owner && <button
          onClick={logoutUser}
          className="text-xl text-white font-semibold rounded-2xl p-2 bg-secondary-bg mt-4"
        >
          Log out
        </button>}
      </div>

      {/* User's Posts */}
      <div className="w-full grid grid-cols-1 gap-6">
        {userPosts.length === 0 ? (
          <div className="col-span-full text-center text-lg text-gray-500">
            No posts yet.
          </div>
        ) : (
          userPosts.map((post) => <Post key={post._id} myPost={post} />)
        )}
      </div>
    </div>
  );
};

export default Profile;
