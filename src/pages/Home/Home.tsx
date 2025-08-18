import React from "react";
import { Link } from "react-router-dom";
import Post from "../../components/Post/Post";
import { useSelector, useDispatch } from "react-redux";
import UploadPost from "../../components/UploadPost/UploadPost";
import { GetAllPostsFromAllUsers } from "../../services/featureServices";
import { clearPostUpload } from "../../features/post/PostUploadSlice";
import { PostData } from "../../types/PostType";
import { InfoUser } from "../../types/AuthType";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const user: InfoUser = useSelector((state: any) => state.auth);
  const newPost: PostData = useSelector((state: any) => state.postUpload);

  const [posts, setPosts] = React.useState<PostData[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [page, setPage] = React.useState<number>(1);
  const [hasMore, setHasMore] = React.useState<boolean>(true);

  document.title = "Trang chủ | Threads.net";

  const fetchPosts = async (pageNumber: number) => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const response = await GetAllPostsFromAllUsers(pageNumber);
      if (response.length < 10) {
        setHasMore(false);
      }
      setPosts((prev) => [...prev, ...response]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchPosts(page);
  }, [page]);

  React.useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        fetchPosts(page);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchPosts]);

  React.useEffect(() => {
    if (newPost && newPost.id && user.username) {
      setPosts((prev) => [newPost, ...prev]);
    }
    dispatch(clearPostUpload());
  }, [newPost, user.username, dispatch]);

  return (
    <div>
      <div>
        <Link to="/">
          <h3 className="text-center my-5">Trang chủ</h3>
        </Link>
      </div>
      <div className="w-[90vh] mx-auto">
        {user.username && <UploadPost />}

        {posts.map((post, index) => (
          <Post
            avatarURL={post.user.avatarURL}
            displayName={post.user.displayName}
            introduction={post.user.introduction}
            isVerified
            username={post.user.username}
            postImage={post.images}
            key={index}
            postContent={post.content}
            likeCount={post.likeCount}
            commentCount={post.commentCount}
            shareCount={post.shareCount}
            postId={post.id}
            postCreatedAt={post.createdAt}
            repostCount={post.reupCount}
            postUser={post.user}
            followersCount={post.user.follower}
            isLiked={post.isLiked}
          />
        ))}

        {loading && <p className="text-center my-4">Loading...</p>}
        {!hasMore && (
          <p className="text-center my-4">Không còn bài viết nào.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
