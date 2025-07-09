import React from "react";
import { Link } from "react-router-dom";
import Post from "../../components/Post/Post";
import { useSelector } from "react-redux";
import UploadPost from "../../components/UploadPost/UploadPost";

const Home: React.FC = () => {
  const user = useSelector((state: any) => state.auth);
  console.log("user", user);
  document.title = "Trang chủ | Threads.net";
  return (
    <div>
      <div>
        <Link to="/">
          <h3 className="text-center">Trang chủ</h3>
        </Link>
      </div>
      <div className="w-[90vh]">
        <UploadPost />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default Home;
