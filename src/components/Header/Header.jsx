import { TbMessageForward } from "react-icons/tb";
import { usePost } from "../../Context/PostContext";
import { Link } from "react-router-dom";
import SearchBar from "./components/SearchBar";

const Header = () => {
  const {state} = usePost(); 
  return (
    <div className="bg-secondary-bg p-2 top-0 w-full flex h-16 justify-between items-center shadow-md">
        <div className='logo mx-2 md:mx-8'>
          <h1 className='font-bold font-primary flex items-center text-xl md:text-4xl text-primary-text'>
            <TbMessageForward className="text-4xl"/>
            <span className="hidden md:block">SOMA</span>
          </h1>
        </div>
        <SearchBar/>
        <Link to={'/profile'} className="text-xl size-14 rounded-full cursor-pointer p-1 font-semibold text-primary-text  border-secondary-text hover:bg-primary-text hover:text-secondary-bg transition-colors"> 
          <img className="rounded-full w-full h-full" src={state.profile.avatar || `https://ui-avatars.com/api/?name=${state.profile.username}&length=1`} alt={state.profile.username}/> 
        </Link>
    </div>
  )
}

export default Header