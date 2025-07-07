import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/Login";
import Header from "./components/Header";
import Layout from "./components/Layout";
import { useAuth } from "./Context/AuthContext";
import Explore from "./Pages/Explore/Explore";
import SinglePost from "./Pages/SinglePost/SinglePost.jsx";

function App() {
  const { Token } = useAuth();
  return (
    <>
      {!Token ? (
        <div className="">
          <Login />
        </div>
      ) : (
        <div className="">
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  
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
                  <SinglePost/>
                </Layout>
              }
            />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
