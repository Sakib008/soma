import { useAuth } from "../../../Context/AuthContext";

const SuggestedUsers = ({ users, followingUsernames, currentUsername, onFollow }) => {
  const {Token} = useAuth()
  const suggested = users.filter(
    (user) => user.username !== currentUsername && !followingUsernames.includes(user.username)
  );
  console.log("Following users : ",followingUsernames)
  console.log("Suggested users : ",suggested)
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 w-72">
      <h2 className="font-bold text-lg mb-2">Suggested Users</h2>
      {suggested.length === 0 ? (
        <div className="text-gray-500">No suggestions</div>
      ) : (
        suggested.map((user) => (
          <div key={user._id} className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <img
                src={user.avatar || `https://ui-avatars.com/api/?name=${user.username}&length=1`}
                alt={user.username}
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium">{user.username}</span>
            </div>
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
              onClick={() => onFollow(user._id,Token)}
            >
              Follow
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default SuggestedUsers;