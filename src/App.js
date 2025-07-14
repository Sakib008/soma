import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/Login";
import Layout from "./components/Layout";
import Explore from "./Pages/Explore/Explore";
import SinglePost from "./Pages/SinglePost/SinglePost.jsx";
import Signup from "./components/auth/Signup.jsx";
import Like from "./Pages/Likes/Like.jsx";
import Bookmark from "./Pages/Bookmark/Bookmark.jsx";
import Home from "./Pages/Home/Home.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Profile from "./Pages/Profile/Profile.jsx";

function App() {
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
            <ProtectedRoute>

            <Layout>
              <Home />
            </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/explore"
          element={
            <ProtectedRoute>

            <Layout>
              <Explore />
            </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path={`/post/:postId`}
          element={
            <ProtectedRoute>

            <Layout>
              <SinglePost />
            </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/like"
          element={
            <ProtectedRoute>

            <Layout>
              <Like />
            </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookmark"
          element={
            <ProtectedRoute>

            <Layout>
              <Bookmark />
            </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>

            <Layout>
              <Profile />
            </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
