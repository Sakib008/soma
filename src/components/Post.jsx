import { BsThreeDots } from "react-icons/bs";
import { BiBookmark, BiComment, BiHeart, BiShare } from "react-icons/bi";
import { usePost } from "../Context/PostContext";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";

const Post = ({ myPost }) => {
  const { state, likePost, dislikePost } = usePost();
  const { Token } = useAuth();
  const foundUser = state.users?.all?.find(
    (user) => user.username === myPost?.username
  );

  const isLiked = myPost?.likes?.likedBy?.find(
    ({ username }) => state.profile?.username === username
  );

  const handleLikeClick = async () => {
    try {
      if (!isLiked) {
        await likePost(myPost._id, Token);
        console.log("Post liked successfully");
      } else {
        await dislikePost(myPost._id, Token);
        console.log("Post disliked successfully");
      }
    } catch (error) {
      console.error("Error liking/disliking post:", error);
    }
  };

  return (
      <div className="max-w-[28vw] w-full flex flex-col items-center border-2 border-gray-400 rounded-3xl m-4 text-primary-text">
        <div className=" flex justify-between w-full m-4 items-center">
          <div className="flex">
            <div className="size-14 mx-4 rounded-full bg-secondary-text">
              {/* {`${
            foundUser?.avatar !== undefined ? (
              <img
              src={foundUser?.avatar ?? ""}
              alt={foundUser?.username ?? ""}
              />
              ) : ( */}
              <span className="font-bold flex justify-center items-center size-full text-3xl">
                {myPost?.username?.at(0)?.toUpperCase() || '?'}
              </span>
              {/* )
          }`} */}
            </div>
            <div className="flex flex-col items-start justify-center text-xl">
              <p>{foundUser ? `${foundUser.firstName} ${foundUser.lastName}` : 'Unknown User'}</p>
              <p className="text-lg opacity-70">{`@${myPost?.username || 'unknown'}`}</p>
            </div>
          </div>
          <div className="mx-4">
            <button onClick={() => {}}>
              <BsThreeDots size={30} />
            </button>
          </div>
        </div>
        <div className=" flex flex-col mx-4 items-center">
          <Link to={`/post/${myPost._id}`}>
          <div>
            <p>{myPost?.content || 'No content'}</p>
          </div>
          </Link>
          <div className="w-full my-4">
            <ul className="list-none flex justify-between items-center">
              <li>
                <button
                  onClick={handleLikeClick}
                  className="flex gap-1 text-2xl font-bold items-center"
                >
                  <BiHeart
                    className={`${
                      isLiked
                        ? "bg-red-600 rounded-3xl border-primary-text border-2 p-0.5"
                        : ""
                    } `}
                    size={30}
                  />
                  {myPost?.likes?.likeCount || 0}
                </button>
              </li>
              <li>
                <button>
                  <BiBookmark size={30} />
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
