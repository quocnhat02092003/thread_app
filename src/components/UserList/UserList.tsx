import React from "react";
import { Link } from "react-router-dom";
import UserItem from "../UserItem/UserItem";

const UserList = () => {
  return (
    <div className=" px-5 py-3 my-2 border-b border-slate-300">
      <div className="flex flex-row items-start gap-3">
        <div className="">
          <Link to="/profile">
            <img
              className="w-[50px] min-w-[50px] h-[50px] rounded-[50%] object-cover"
              src="https://toyotahatinh.com.vn/wp-content/uploads/2018/07/FVD.png"
              alt="Avatar"
            />
          </Link>
        </div>
        <div className="flex-1">
          <div className="flex flex-col gap-1">
            <div className="flex flex-row items-start justify-between mb-2">
              <div className="flex flex-col gap-1">
                <UserItem />
                <span className="text-sm w-40 truncate">
                  DisplayNameDisplayNameDisplayNameDisplayName
                </span>
              </div>
              <div>
                <button className="px-4 py-3 bg-blue-300 rounded-lg text-sm">
                  Theo dõi
                </button>
              </div>
            </div>
            <p className="text-sm mb-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Quisquam,
              voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Quisquam, voluptatibus.
            </p>
            <p className="text-sm mb-2">999.999 người theo dõi</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
