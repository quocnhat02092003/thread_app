import React from "react";
import {
  faFaceSmile,
  faImage,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  faCheckToSlot,
  faLocationDot,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { PostData } from "../../types/PostType";
import { uploadPost } from "../../services/postServices";
import { enqueueSnackbar } from "notistack";

interface DialogUploadPostProps {
  open: boolean;
  handleClose: () => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: "10px",
};

const DialogUploadPost = (props: DialogUploadPostProps) => {
  // Lấy thông tin người dùng từ Redux store
  const user = useSelector((state: any) => state.auth);
  console.log("user", user);

  // Khởi tạo state cho quyền riêng tư và hình ảnh xem trước
  const [privacy, setPrivacy] = React.useState<string>("Public");
  const [previewImages, setPreviewImages] = React.useState<
    (string | ArrayBuffer | null)[]
  >([]);

  // Khởi tạo state cho bài đăng
  const [postValue, setPostValue] = React.useState<PostData>({
    content: "",
    images: [],
    visibility: privacy,
    userId: "",
  });

  console.log("postValue", postValue);
  // Hàm xử lý thay đổi quyền riêng tư
  const handleChange = (event: SelectChangeEvent) => {
    setPrivacy(event.target.value);
    setPostValue({
      ...postValue,
      visibility: event.target.value, // Cập nhật quyền riêng tư trong postValue
    });
  };

  // Hàm xử lý thay đổi hình ảnh
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []); // Lấy tất cả file được chọn
    const imagePreviews: (string | ArrayBuffer | null)[] = [];

    files.forEach((file) => {
      const reader: FileReader = new FileReader();
      reader.onloadend = () => {
        imagePreviews.push(reader.result); // Lưu URL của hình ảnh
        if (imagePreviews.length === files.length) {
          setPreviewImages(imagePreviews); // Cập nhật state khi tất cả file được xử lý
          setPostValue({
            ...postValue,
            images: imagePreviews, // Cập nhật hình ảnh trong postValue
          });
        }
      };
      reader.readAsDataURL(file); // Đọc file dưới dạng Data URL
    });
  };

  // Hàm upload bài đăng
  const uploadPostData = async () => {
    try {
      setPostValue({
        ...postValue,
        userId: user.id,
      });
      const response = await uploadPost(postValue);
      console.log("response", response);
      if (response) {
        enqueueSnackbar("Đăng bài thành công!", {
          variant: "success",
        });
        props.handleClose(); // Đóng modal sau khi đăng thành công
      }
    } catch (error) {
      console.error("Lỗi khi upload bài đăng:", error);
    }
  };

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-between items-center border-b border-black px-4">
            <p onClick={props.handleClose} className="cursor-pointer">
              Huỷ
            </p>
            <h3>Thread mới</h3>
            <FontAwesomeIcon
              icon={faUser}
              size="sm"
              className="p-2 hover:bg-slate-200 transition-all duration-300 ease-in-out rounded-md"
            />
          </div>
          <div className="flex flex-row items-start gap-3 m-2">
            <div className="">
              <Link to="/profile">
                <img
                  className="w-[50px] min-w-[50px] h-[50px] rounded-[50%] object-cover"
                  src={user.avatarURL}
                  alt="Avatar"
                />
              </Link>
            </div>
            <div className="flex flex-col w-full">
              <p className="font-bold">{user.username}</p>
              <textarea
                className="w-full border-0 outline-none resize-none min-h-[40px] placeholder:text-sm text-sm"
                placeholder="Có gì mới?"
                rows={1}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto";
                  target.style.height = target.scrollHeight + "px";
                }}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setPostValue({
                    ...postValue,
                    content: e.target.value,
                  });
                }}
              />
              <div className="flex flex-row items-center gap-2 overflow-x-auto mx-5">
                {previewImages.map((image, index) => (
                  <div className="flex-shrink-0 relative my-2" key={index}>
                    <img
                      key={index}
                      src={image as string}
                      alt={`Preview ${index}`}
                      className="w-[300px] h-auto max-h-[500px] rounded-md object-contain"
                    />
                    <div className="absolute top-2 right-2 rounded-full cursor-pointer">
                      <FontAwesomeIcon
                        icon={faXmark}
                        size="xl"
                        className="text-white bg-black rounded-full p-2"
                        onClick={() => {
                          const newImages = [...previewImages];
                          newImages.splice(index, 1);
                          setPreviewImages(newImages);
                          setPostValue({
                            ...postValue,
                            images: newImages, // Cập nhật hình ảnh trong postValue
                          });
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-row items-center gap-5 mt-2">
                <div>
                  <label htmlFor="image" className="cursor-pointer">
                    <FontAwesomeIcon icon={faImage} size="lg" />
                  </label>
                  <input
                    multiple
                    type="file"
                    id="image"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleImageChange(e)
                    }
                  />
                </div>
                <FontAwesomeIcon icon={faFaceSmile} size="lg" />
                <FontAwesomeIcon icon={faCheckToSlot} size="lg" />
                <FontAwesomeIcon icon={faLocationDot} size="lg" />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center m-2">
            <FormControl sx={{ m: 1, minWidth: 250 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Quyền riêng tư
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={privacy}
                onChange={handleChange}
                autoWidth
                label="Quyền riêng tư"
              >
                <MenuItem value="Public">Công khai</MenuItem>
                <MenuItem value="Friends">Chỉ với bạn bè</MenuItem>
                <MenuItem value="Private">Riêng tư</MenuItem>
              </Select>
            </FormControl>
            <button
              onClick={uploadPostData}
              disabled={
                postValue.content === "" && postValue.images.length === 0
                  ? true
                  : false
              }
              className="border px-3 py-1 rounded-md disabled:cursor-not-allowed hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out disabled:hover:bg-gray-300 disabled:hover:text-black"
            >
              <small>Đăng</small>
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DialogUploadPost;
