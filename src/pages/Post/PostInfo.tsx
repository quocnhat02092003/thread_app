import React from "react";
import { Link } from "react-router-dom";
import Post from "../../components/Post/Post";
import { useSelector } from "react-redux";
import Comment from "../../components/Comment/Comment";

const PostInfo: React.FC = () => {
  const user = useSelector((state: any) => state.auth);
  console.log("user", user);
  document.title = "Trang chủ | Threads.net";

  return (
    <div className="w-[90vh] max-w-[90vh] mt-5">
      <div className="text-center">
        <h3>Thread</h3>
      </div>
      <div className="border border-slate-200 rounded-md w-[90vh]">
        <Post style="w-full px-5 py-5" />
        <Comment style="border-y px-10 py-5 overflow-hidden w-full pb-14" />
        <div className="flex flex-row items-center gap-3 px-5 py-2 fixed bottom-0 z-10 bg-white border border-slate-200 w-[90vh] max-w-[90vh]">
          <div className="">
            <Link to="/profile">
              <img
                className="w-[30px] min-w-[30px] h-[30px] rounded-[50%] object-cover"
                src={user.avatarURL}
                alt="Avatar"
              />
            </Link>
          </div>
          <div className="w-full cursor-text">
            <input
              className="text-sm text-slate-500 w-full outline-none"
              placeholder="Có gì mới?"
            />
          </div>
          <button className="border border-slate-300 px-2 py-1 rounded-lg">
            <small>Comment</small>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostInfo;
