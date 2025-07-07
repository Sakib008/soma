import Sidebar from "./Sidebar"

const Layout = ({children}) => {
  return (
    <div className="flex h-screen pt-16"> 
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="flex justify-center pt-6 h-full">
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout