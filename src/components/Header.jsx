import { TbMessageForward } from "react-icons/tb";


const Header = () => {
  return (
    <div className="bg-secondary-bg p-2 flex justify-between m-auto">
        <div className='logo mx-8'><h1 className='font-bold font-primary flex items-center text-4xl text-primary-text'><TbMessageForward size={50}/>SOMA</h1></div>
        <div className="auth text-2xl flex items-center cursor-pointer font-semibold text-primary-text mx-4 border-4 border-secondary-text px-2 rounded-3xl"> Logout </div>
    </div>
  )
}

export default Header