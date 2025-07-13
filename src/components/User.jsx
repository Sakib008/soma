
const User = ({user}) => {
  if (!user) return null;
  return (
    <div className="flex items-center gap-3 p-2">
      <div>
        {user.avatar ? (
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={user.avatar}
            alt={user.username}
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold">
            {user.username?.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="flex flex-col text-xl">
        <span className="font-semibold">@{user.username}</span>
        <span>{user.firstName} {user.lastName}</span>
      </div>
    </div>
  );
};

export default User;
