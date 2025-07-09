import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import NoLoginCard from "../components/NoLoginCard/NoLoginCard";
import { useDispatch, useSelector } from "react-redux";
import { GetUserInformation } from "../services/authServices";
import { login } from "../features/auth/authSlice";

const HomeLayout: React.FC = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.auth);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!user.username) {
          const userInfo = await GetUserInformation();
          dispatch(login(userInfo));
        }
      } catch (error) {
        // console.error("Lỗi lấy thông tin người dùng:", error);
      }
    };
    fetchUser();
  }, []);
  return (
    <div className="flex flex-row w-full h-screen overflow-y-scroll">
      {/* Navbar */}
      <div className="fixed">
        <Sidebar />
      </div>
      {/* Home-body */}
      <div className="flex flex-row items-start justify-center w-full gap-5">
        <div className="-ml-32">
          <Outlet />
        </div>
        {!user.username && (
          <div className="mt-16">
            <div className="fixed">
              <NoLoginCard />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeLayout;
