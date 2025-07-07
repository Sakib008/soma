// action = {
//   name : 'name of action',
//   function : function() of action
// }

// user = user_object
const User = (user, action) => {
  return (
    <div>
      <div>
        {user?.avatar ? (
          <img
            className="w-full "
            src={user?.avtar ?? ""}
            alt={user?.username ?? ""}
          />
        ) : (
          <p className="w-full">{String(user.username).at(0)}</p>
        )}
      </div>
      <div className="flex justify-between mx-4">
        <div className="flex flex-col">
          <p>{`@${user.username}`}</p>
          <p>{`${user.firstName} ${user.lastName}`}</p>
        </div>
        <div><button onClick={action?.function ?? ''}>{action?.name ?? ''}</button></div>
      </div>
    </div>
  );
};

export default User;
