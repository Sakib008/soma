import { BsThreeDots } from "react-icons/bs";
import { BiBookmark, BiComment, BiHeart, BiShare } from "react-icons/bi";
import { usePost } from "../Context/PostContext";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";

const Post = ({ myPost ,bookmarkPage }) => {
  const { state, likePost, dislikePost ,bookmarkPost,removeBookmarkPost} = usePost();
  const { Token } = useAuth();
  const foundUser = state.users?.all?.find(
    (user) => user.username === myPost?.username
  );
  const isBookmark = state.posts.bookmark.find((post)=>post._id === myPost._id); 
  const isLiked = myPost?.likes?.likedBy?.find(
    ({ username }) => state.profile?.username === username
  );
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

  return (
    <div className="max-w-[28vw] w-full px-6 flex flex-col items-center shadow-xl rounded-3xl m-4 text-primary-bg">
      <div className=" flex justify-between w-full m-4 items-center">
        <div className="flex">
          <div className="size-14 rounded-full bg-secondary-text">
            {/* {`${
            foundUser?.avatar !== undefined ? (
              <img
              src={foundUser?.avatar ?? ""}
              alt={foundUser?.username ?? ""}
              />
              ) : ( */}
            <span className="font-bold flex justify-center items-center size-full text-3xl">
              {myPost?.username?.at(0)?.toUpperCase() || "?"}
            </span>
            {/* )
          }`} */}
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
        <div className="">
          <button onClick={() => {}}>
            <BsThreeDots size={30} />
          </button>
        </div>
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
              <button>
                <BiComment size={30} />
              </button>
            </li>
            <li>
              <button>
                <BiShare size={30} />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Post;
