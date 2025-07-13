import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/Login";
import Layout from "./components/Layout";
import { useAuth } from "./Context/AuthContext";
import Explore from "./Pages/Explore/Explore";
import SinglePost from "./Pages/SinglePost/SinglePost.jsx";
import Signup from "./components/auth/Signup.jsx";
import Like from "./Pages/Likes/Like.jsx";
import Bookmark from "./Pages/Bookmark/Bookmark.jsx";
import Home from "./Pages/Home/Home.jsx";

function App() {
  const { Token } = useAuth();
  return (
    <div className="">
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Private Route */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/explore"
          element={
            <Layout>
              <Explore />
            </Layout>
          }
        />
        <Route
          path={`/post/:postId`}
          element={
            <Layout>
              <SinglePost />
            </Layout>
          }
        />
        <Route
          path="/like"
          element={
            <Layout>
              <Like />
            </Layout>
          }
        />
        <Route
          path="/bookmark"
          element={
            <Layout>
              <Bookmark />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
