import { useEffect, useState } from "react";
import { usePost } from "../../Context/PostContext";
import Post from "../../components/Post";
import { postFollow } from "../../utils/services/userServices";
import { useAuth } from "../../Context/AuthContext";
import SuggestedUsers from "./components/suggestedUsers";

const Home = () => {
  const {loading} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("trending");
  const [displayPosts, setDisplayPosts] = useState([]);
  const { state, getAllPost,userFetch, getAllUser } = usePost();
  
   useEffect(() => {
    setIsLoading(true);
    if(!loading) {
      userFetch();
    }
    if (!state.posts.all || state.posts.all.length === 0) {
      getAllPost();
    }
    if (!state.users.all || state.users.all.length === 0) {
      getAllUser();
    }
    setIsLoading(false);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setDisplayPosts(sortPosts(homePosts, filter));
    // eslint-disable-next-line
  }, [state.posts.all, state.profile, filter]);

  // Get current user's username and following list
  const currentUsername = state.profile.username;
  const following = state.profile.following || [];
  const followingUsernames = following.map((user) => user.username);
  
  // Filter posts: show posts from current user and users they follow
  const homePosts = state.posts.all.filter(
    (post) => post.username === currentUsername || followingUsernames.includes(post.username)
  );
  console.log("Current username : ",currentUsername)
  console.log("Following Username : ",followingUsernames)
  console.log("All posts : ",state.posts.all.filter(post=>post.username===currentUsername))
  // Sorting logic
  const sortPosts = (posts, type) => {
    if (type === "trending") {
      // Sort by likeCount descending
      return posts.sort((a, b) => (b.likes?.likeCount || 0) - (a.likes?.likeCount || 0));
    } else if (type === "latest") {
      // Sort by createdAt descending (newest first)
      return posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return posts;
  };

 
  const handleFollow = async (userId, token) => {
    try {
      await postFollow(userId, token);
      getAllUser();
    } catch (error) {
      console.error("Failed to follow user:", error.message || error.response?.data?.error || error);
      alert("Failed to follow user");
    }
  };

  if (isLoading || loading) {
    return (
      <div className="flex justify-center h-fit rounded-3xl items-center font-bold text-5xl p-10 m-5 bg-white shadow-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex gap-8">
      {/* Main content */}
      <div className="flex flex-col gap-8">
        
        <h1 className="text-primary-bg text-4xl font-bold">Home Page</h1>
        {displayPosts.length === 0 ? (
          <div className="text-center text-xl rounded-3xl bg-white shadow-xl text-primary-bg p-5">No posts to show.</div>
        ) : (
          displayPosts.map((post) => (
            <div key={post._id}>
              <Post myPost={post} />
            </div>
          ))
        )}
      </div>
      {/* Suggested Users Sidebar */}
      <div className="flex-col gap-4 lg:block">
        <div className="w-80 mb-4 p-1 rounded-2xl font-semibold text-xl h-fit bg-white shadow-lg shadow-blue-300 flex justify-between ">
          <button
            onClick={() => setFilter("trending")}
            className={`bg-blue-200 rounded-l-2xl p-2 hover:bg-blue-500 w-36 ${filter === "trending" ? "bg-blue-500 text-white" : ""}`}
          >
            Trending
          </button>
          <button
            onClick={() => setFilter("latest")}
            className={`bg-blue-200 rounded-r-2xl p-2 hover:bg-blue-500 w-36 ${filter === "latest" ? "bg-blue-500 text-white" : ""}`}
          >
            Latest
          </button>
        </div>
        <SuggestedUsers
          users={state.users.all}
          followingUsernames={followingUsernames}
          currentUsername={currentUsername}
          onFollow={handleFollow}
        />
      </div>
    </div>
  );
};

export default Home;
