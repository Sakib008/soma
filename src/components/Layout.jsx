import Header from "../components/Header/Header";
import Sidebar from "./Sidebar";
import CreatePostModal from "./CreatePostModal";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";

const Layout = ({ children }) => {
  const { User } = useAuth();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-10 w-full">
        <Header />
      </div>
      <div className="flex h-[calc(100vh-4rem)] pt-0">
        <Sidebar onOpenModal={() => setShowModal(true)} />
        <main className="flex-1 overflow-auto">
          <div className="flex justify-center pt-6 h-full">{children}</div>
        </main>
      </div>
      {showModal && (
        <CreatePostModal user={User} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default Layout;
