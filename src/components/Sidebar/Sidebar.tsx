import { faThreads } from "@fortawesome/free-brands-svg-icons";
import {
  faHeart,
  faHouse,
  faInfo,
  faMagnifyingGlass,
  faSquarePlus,
  faThumbtack,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import NoLoginDialog from "../NoLoginDialog/NoLoginDialog";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const user = useSelector((state: any) => state.auth);

  return (
    <div className="flex flex-col items-center justify-between py-5 border border-r-2 w-20 h-screen">
      <div>
        <Link to="/">
          <FontAwesomeIcon icon={faThreads} size="3x" />
        </Link>
      </div>
      <div className="flex flex-col items-center gap-10 my-10">
        <Link to="/">
          <FontAwesomeIcon
            icon={faHouse}
            size="xl"
            className="p-2 hover:bg-slate-200 transition-all duration-300 ease-in-out rounded-md active:bg-blue-400"
          />
        </Link>
        <Link to="/search">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size="xl"
            className="p-2 hover:bg-slate-200 transition-all duration-300 ease-in-out rounded-md"
          />
        </Link>
        {user.username ? (
          <Link to="/">
            <FontAwesomeIcon
              icon={faSquarePlus}
              size="xl"
              className="p-2 hover:bg-slate-200 transition-all duration-300 ease-in-out rounded-md"
            />
          </Link>
        ) : (
          <NoLoginDialog
            icon={faSquarePlus}
            size="xl"
            dialogTitle="Đăng ký để đăng"
            dialogContent="Tham gia Threads để chia sẻ ý tưởng, đặt câu hỏi, đăng những suy nghĩ bất chợt và hơn thế nữa."
          />
        )}
        {user.username ? (
          <Link to="/">
            <FontAwesomeIcon
              icon={faHeart}
              size="xl"
              className="p-2 hover:bg-slate-200 transition-all duration-300 ease-in-out rounded-md"
            />
          </Link>
        ) : (
          <NoLoginDialog
            icon={faHeart}
            size="xl"
            dialogTitle="Bày tỏ nhiều hơn với Threads"
            dialogContent="Tham gia Threads để chia sẻ suy nghĩ, nắm bắt những gì đang diễn ra, theo dõi những người bạn yêu mến và hơn thế nữa."
          />
        )}
        {user.username ? (
          <Link to={`/profile/${user.username}`}>
            <FontAwesomeIcon
              icon={faUser}
              size="xl"
              className="p-2 hover:bg-slate-200 transition-all duration-300 ease-in-out rounded-md"
            />
          </Link>
        ) : (
          <NoLoginDialog
            icon={faUser}
            size="xl"
            dialogTitle="Bày tỏ nhiều hơn với Threads"
            dialogContent="Tham gia Threads để chia sẻ suy nghĩ, nắm bắt những gì đang diễn ra, theo dõi những người bạn yêu mến và hơn thế nữa."
          />
        )}
      </div>
      <div className="flex flex-col items-center gap-5">
        <NoLoginDialog
          icon={faThumbtack}
          size="xl"
          dialogTitle="Bày tỏ nhiều hơn với Threads"
          dialogContent="Tham gia Threads để chia sẻ suy nghĩ, nắm bắt những gì đang diễn ra, theo dõi những người bạn yêu mến và hơn thế nữa."
        />
        <button>
          <FontAwesomeIcon
            icon={faInfo}
            size="xl"
            className="p-2 hover:bg-slate-200 transition-all duration-300 ease-in-out rounded-md"
          />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
