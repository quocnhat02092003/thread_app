import {
  faArrowsRotate,
  faCirclePlus,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import {
  faCircleCheck,
  faComment,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
import UserItem from "../UserItem/UserItem";
import NoLoginDialog from "../NoLoginDialog/NoLoginDialog";
import "swiper/css";
import "swiper/css/pagination";
import { Box, Modal } from "@mui/material";
import React from "react";

interface PostProps {
  style?: string;
  // postId?: string;
  // postContent?: string;
  // postImage?: string;
  // postUser?: {
  //   username: string;
  //   displayName: string;
  //   avatarURL: string;
  // };
  // postTime?: string;
  // postLikes?: number;
  // postComments?: number;
  // postShares?: number;
  // postReposts?: number;
  // postType?: string; // "thread" | "repost" | "comment"
  // postReactions?: {
  //   likes: number;
  //   comments: number;
  //   shares: number;
  //   reposts: number;
  // };
  // postReplies?: Array<{
  //   username: string;
  //   displayName: string;
  //   avatarURL: string;
  //   content: string;
  //   time: string;
  // }>;
  // postMedia?: Array<{
  //   type: "image" | "video";
  //   url: string;
  // }>;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
};

const Post = (props: PostProps) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div
      className={
        props.style
          ? props.style
          : "border border-slate-200 px-5 py-5 rounded-lg mb-2 overflow-hidden"
      }
    >
      <div className="flex flex-row items-start gap-3">
        <div className="relative cursor-pointer" onClick={handleOpen}>
          <img
            className="w-[50px] min-w-[50px] h-[50px] rounded-[50%] object-cover"
            src="https://toyotahatinh.com.vn/wp-content/uploads/2018/07/FVD.png"
            alt="Avatar"
          />
          <div className="absolute bottom-0 right-0 rounded-full">
            <FontAwesomeIcon icon={faCirclePlus} />
          </div>
        </div>
        <div className="w-full ">
          <UserItem />
          <p className="text-sm mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Quisquam, voluptatibus.
          </p>
          <Swiper
            effect={"coverflow"}
            slidesPerView={2}
            spaceBetween={10}
            grabCursor={true}
            pagination={true}
            modules={[Pagination]}
            className="w-[70vh] overflow-hidden"
          >
            <SwiperSlide>
              <img
                src="https://swiperjs.com/demos/images/nature-1.jpg"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "30px",
                }}
                alt="Slide 1"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://swiperjs.com/demos/images/nature-2.jpg"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "30px",
                }}
                alt="Slide 2"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://swiperjs.com/demos/images/nature-2.jpg"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "30px",
                }}
                alt="Slide 2"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://swiperjs.com/demos/images/nature-2.jpg"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "30px",
                }}
                alt="Slide 2"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://swiperjs.com/demos/images/nature-2.jpg"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "30px",
                }}
                alt="Slide 2"
              />
            </SwiperSlide>
          </Swiper>
          <div className="flex gap-5 mt-2">
            <div
            // className="flex items-center cursor-pointer gap-1 p-2 rounded-md hover:bg-slate-300 transition-all duration-300 ease-in-out"
            >
              <NoLoginDialog
                icon={faHeart}
                type="react"
                dialogTitle="Bạn thích nội dung này ư? Bạn sẽ thích mê Threads."
                dialogContent="Hãy đăng ký để thích, trả lời và hơn thế nữa."
              />
            </div>
            <div
            // className="flex items-center cursor-pointer gap-1 p-2 rounded-md hover:bg-slate-300 transition-all duration-300 ease-in-out"
            >
              <NoLoginDialog
                icon={faComment}
                type="react"
                dialogTitle="Đăng ký để trả lời"
                dialogContent="Chỉ còn một bước nữa là bạn có thể tham gia cuộc trò chuyện rồi."
              />
            </div>
            <div
            // className="flex items-center cursor-pointer gap-1 p-2 rounded-md hover:bg-slate-300 transition-all duration-300 ease-in-out"
            >
              <NoLoginDialog
                icon={faArrowsRotate}
                type="react"
                dialogTitle="Đăng ký để đăng lại"
                dialogContent="Bạn đã tiến thêm được một bước trong hành trình khơi mào cuộc trò chuyện."
              />
            </div>
            <div className="flex items-center cursor-pointer gap-1 p-2 rounded-md hover:bg-slate-300 transition-all duration-300 ease-in-out">
              <FontAwesomeIcon icon={faShare} />
              <small>210</small>
            </div>
          </div>
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div className="border border-slate-200 bg-white rounded-md shadow-lg p-5">
                  <div className="flex flex-col">
                    <Link to="/profile">
                      <div className="flex flex-row items-center justify-between gap-3">
                        <div className="flex flex-col gap-1">
                          <p className="w-40 truncate text-[20px] font-bold">
                            fcbarcelonarewrwer{" "}
                            <FontAwesomeIcon
                              icon={faCircleCheck}
                              style={{ color: "#74C0FC" }}
                            />
                          </p>
                          <p className="text-sm w-40 truncate">quocnhat</p>
                        </div>
                        <div>
                          <img
                            src="https://toyotahatinh.com.vn/wp-content/uploads/2018/07/FVD.png"
                            alt="Avatar"
                            className="w-[80px] h-[80px] rounded-[50%] object-cover"
                          />
                        </div>
                      </div>
                    </Link>
                    <p className="text-sm mb-2 w-52 truncate">
                      Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor
                    </p>
                    <p className="text-sm mb-2">999 người theo dõi</p>
                    <button className="px-3 py-2 bg-blue-300 rounded-lg mt-3">
                      <p>Theo dõi</p>
                    </button>
                  </div>
                </div>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
