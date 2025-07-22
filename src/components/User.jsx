
const User = ({user}) => {
  if (!user) return null;
  return (
    <div className="flex items-center gap-3 p-2">
      <div>
          <img
            className="w-12 h-12 rounded-full object-cover flex items-center justify-center text-xl font-bold"
            src={user.avatar || `https://ui-avatars.com/api/?name=${user.username}&length=1`}
            alt={user.username}
          />
      </div>
      <div className="flex flex-col text-xl">
        <span className="font-semibold">@{user.username}</span>
        <span>{user.firstName} {user.lastName}</span>
      </div>
    </div>
  );
};

export default User;
