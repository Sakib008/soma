import { BiBookmark, BiHome } from "react-icons/bi";
import { BsHeart, BsPerson } from "react-icons/bs";
import { RiRocket2Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const Sidebar = ({ onOpenModal }) => {
  const sideLink = [
    { name: "home", path: "/", icon: BiHome },
    { name: "explore", path: "/explore", icon: RiRocket2Line },
    { name: "bookmark", path: "/bookmark", icon: BiBookmark },
    { name: "profile", path: "/profile", icon: BsPerson },
    { name: "likes", path: "/like", icon: BsHeart },
  ];
  return (
    <div className="flex flex-col h-screen fixed bg-secondary-bg text-2xl w-80 text-primary-text justify-start">
      {sideLink.map(({ name, path, icon: Icon }, index) => (
        <Link
          className="ml-6 my-1 flex items-center p-2 gap-2"
          key={index}
          to={path}
        >
          <Icon className="text-2xl" size={30} />
          <span className="capitalize">{name}</span>
        </Link>
      ))}
      <button
        className="bg-primary-text text-secondary-bg my-6 p-2 w-4/5 mx-auto font-bold"
        onClick={onOpenModal}
      >
        Create a Post
      </button>
    </div>
  );
};

export default Sidebar;
