import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

interface PostActionsProps {
  likes: number;
  comments: number;
  shares: number;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
}

const PostActions: React.FC<PostActionsProps> = ({
  likes,
  comments,
  shares,
  onLike,
  onComment,
  onShare,
}) => {
  return (
    <div className="flex gap-5 mt-2">
      <button
        onClick={onLike}
        className="p-2 hover:bg-slate-200 transition-all duration-300 ease-in-out rounded-md"
      >
        <FontAwesomeIcon icon={faHeart} /> <small>{likes}</small>
      </button>
      <Link to={"/fd/post/dsa"}>
        <button
          onClick={onComment}
          className="p-2 hover:bg-slate-200 transition-all duration-300 ease-in-out rounded-md"
        >
          <FontAwesomeIcon icon={faComment} /> <small>{comments}</small>
        </button>
      </Link>
      <button
        onClick={onShare}
        className="p-2 hover:bg-slate-200 transition-all duration-300 ease-in-out rounded-md"
      >
        <FontAwesomeIcon icon={faArrowsRotate} /> <small>{shares}</small>
      </button>
    </div>
  );
};

export default PostActions;
