import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const NoLoginCard = () => {
  return (
    <div className="flex flex-col items-center justify-center border bg-gray-100 w-[350px] rounded-3xl px-4 py-4">
      <h3>Đăng nhập hoặc đăng ký Threads</h3>
      <small className="text-center">
        Xem mọi người đang nói về điều gì và tham gia cuộc trò chuyện.
      </small>
      <Link to="/login">
        <button className="bg-blue-200 px-4 py-2 rounded-md my-2 text-sm">
          <FontAwesomeIcon icon={faInstagram} size="xl" /> Tiếp tục bằng tài
          khoản Threads
        </button>
      </Link>
      <small>Hoặc</small>
      <Link to="/register">
        <button className="bg-blue-200 px-4 py-2 rounded-md my-2 text-sm">
          Đăng ký tài khoản Threads
        </button>
      </Link>
    </div>
  );
};

export default NoLoginCard;
