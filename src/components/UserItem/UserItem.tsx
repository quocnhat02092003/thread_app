import { faCircleCheck, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import React from "react";

interface UserItemProps {
  avatarURL?: string;
  username?: string;
  displayName?: string;
  introduction?: string;
  followersCount?: number;
  isVerified?: boolean;
}

const UserItem = (props: UserItemProps) => {
  const [isHovered, setIsHovered] = React.useState<boolean>(false);

  return (
    <div
      className="relative w-fit"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/profile/${props.username}`}>
        <strong className="hover:text-blue-500 transition-all duration-300 ease-in-out">
          {props.username}{" "}
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#74C0FC" }} />
        </strong>
      </Link>
      {isHovered && (
        <div className="absolute left-5 top-full w-[300px] z-[999] border border-slate-200 bg-white rounded-md shadow-lg p-5">
          <div className="flex flex-col">
            <div className="flex flex-row items-center justify-between gap-3">
              <Link
                to={`/profile/${props.username}`}
                className="flex flex-col gap-1"
              >
                <strong className="w-24 truncate">
                  {props.username}{" "}
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    style={{ color: "#74C0FC" }}
                  />
                </strong>
                <p className="text-sm w-24 truncate">
                  {props.displayName || "Tên hiển thị"}
                </p>
              </Link>
              <div>
                <img
                  src={props.avatarURL || "https://i.pravatar.cc/150?img=3"}
                  alt="Avatar"
                  className="w-[80px] h-[80px] rounded-[50%] object-cover"
                />
              </div>
            </div>
            <p className="text-sm mb-2 w-52 truncate">
              {props.introduction ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
            </p>
            <p className="text-sm mb-2">
              {props.followersCount} người theo dõi
            </p>
            <button className="px-3 py-2 bg-blue-300 rounded-lg mt-3">
              <p>
                <FontAwesomeIcon icon={faSquarePlus} /> Theo dõi
              </p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserItem;
