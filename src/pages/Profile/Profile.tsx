import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { data, Link, Params, useParams } from "react-router-dom";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { GetDataProfileUser } from "../../services/featureServices";
import Post from "../../components/Post/Post";
import { CircularProgress } from "@mui/material";
import NoData from "./NoData";
import UploadPost from "../../components/UploadPost/UploadPost";
import { useSelector } from "react-redux";

const Profile = () => {
  let param: Readonly<Params<string>> = useParams();

  const [type, setType] = React.useState("thread");
  const [loading, setLoading] = React.useState(true);

  const [dataProfile, setDataProfile] = React.useState<any>({});

  const user = useSelector((state: any) => state.auth);

  React.useEffect(() => {
    const userData = GetDataProfileUser(param.username || "");
    setLoading(true);
    userData
      .then((data) => {
        console.log("User Data:", data);
        setLoading(false);
        setDataProfile(data);
        document.title = `${data.displayName} (@${data.username}) | Threads, bày tỏ nhiều hơn`;
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const tabs: {
    label: string;
    value: string;
  }[] = [
    { label: "Thread", value: "thread" },
    { label: "File phương tiện", value: "replies" },
    { label: "Thread đăng lại", value: "reposts" },
  ];

  return (
    <div className="profile">
      <div className="text-center">
        <h3>Trang cá nhân</h3>
      </div>

      <div className="w-[90vh] max-w-[90vh] border border-slate-200 rounded-md">
        {loading ? (
          <div className="flex justify-center items-center h-[80vh]">
            <CircularProgress color="success" />
          </div>
        ) : (
          <div>
            <div className="flex flex-col gap-5 mx-2 px-5 py-5">
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold">
                    {dataProfile?.displayName}
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      style={{ color: "#74C0FC", marginLeft: "5px" }}
                    />
                  </h3>
                  <p>{dataProfile.username}</p>
                </div>
                <div>
                  <img
                    className="w-[100px] min-w-[100px] h-[100px] rounded-[50%] object-cover"
                    src={dataProfile.avatarURL}
                    alt="Avatar"
                  />
                </div>
              </div>
              <div>
                <p className="mt-2 mb-5">{dataProfile.introduction}</p>
              </div>
              <div className="flex flex-row justify-between items-center">
                <p className="mt-2 mb-5 w-[40vh] truncate">
                  {dataProfile.follower} người theo dõi •{" "}
                  <Link to={dataProfile.anotherPath}>
                    {dataProfile.anotherPath}
                  </Link>
                </p>
                <div className="flex gap-5 items-center">
                  <FontAwesomeIcon
                    icon={faChartLine}
                    size="lg"
                    title="Thông tin chi tiết"
                  />
                  <FontAwesomeIcon icon={faInstagram} size="lg" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <button className="px-4 py-3 bg-blue-300 rounded-lg">
                  Theo dõi
                </button>
                <button className="px-4 py-3 rounded-lg border">
                  Nhắc đến
                </button>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 text-center">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setType(tab.value)}
                  style={{ fontWeight: type === tab.value ? "bold" : "normal" }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="mt-5">
              {type === "thread" && (
                <div>
                  {dataProfile.username === user.username && (
                    <UploadPost style="w-full border-y px-5 py-5" />
                  )}
                  <NoData message="Chưa có thread nào." />
                  {/* Assuming you will map through posts here */}
                  {/* {dataProfile.posts.map((post: any) => (
                    <Post key={post.id} post={post} />
                  ))} */}
                </div>
              )}

              {type === "replies" && <NoData message="Chưa có thread nào." />}
              {type === "reposts" && (
                <NoData message="Chưa có bài đăng lại nào." />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
