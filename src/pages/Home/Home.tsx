import React from "react";
import { Link } from "react-router-dom";
import Post from "../../components/Post/Post";
import { useSelector, useDispatch } from "react-redux";
import UploadPost from "../../components/UploadPost/UploadPost";
import { GetAllPostsFromAllUsers } from "../../services/featureServices";
import { clearPostUpload } from "../../features/post/PostUploadSlice";
import { PostData } from "../../types/PostType";
import { InfoUser } from "../../types/AuthType";
import InfiniteScroll from "react-infinite-scroll-component";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const user: InfoUser = useSelector((state: any) => state.auth);
  const newPost: PostData = useSelector((state: any) => state.postUpload);

  const [posts, setPosts] = React.useState<PostData[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [hasMore, setHasMore] = React.useState<boolean>(true); // Bắt đầu với true
  const [loading, setLoading] = React.useState<boolean>(false); // Thêm loading state

  document.title = "Trang chủ | Threads.net";

  const fetchPosts = async (pageNumber: number) => {
    if (loading) return; // Tránh gọi API nhiều lần cùng lúc

    try {
      setLoading(true);
      const response = await GetAllPostsFromAllUsers(pageNumber, 10); // Truyền limit = 10

      if (!response || response.length === 0) {
        setHasMore(false);
        return;
      }

      // Nếu là trang đầu tiên, thay thế posts
      if (pageNumber === 1) {
        setPosts(response);
      } else {
        // Nếu không phải trang đầu, thêm vào cuối
        setPosts((prev) => [...prev, ...response]);
      }

      // Chỉ tăng page sau khi đã set posts thành công
      setPage(pageNumber + 1);

      // Nếu response ít hơn expected items per page thì không còn data
      if (response.length < 10) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchPosts(1);
  }, []);

  React.useEffect(() => {
    if (newPost && newPost.id && user.username) {
      setPosts((prev) => [newPost, ...prev]);
    }
    dispatch(clearPostUpload());
  }, [newPost, user.username, dispatch]);

  const loadMore = () => {
    console.log("LoadMore called, current page:", page);
    fetchPosts(page);
  };

  return (
    <div>
      <div>
        <Link to="/">
          <h3 className="text-center my-5">Trang chủ</h3>
        </Link>
      </div>
      <div className="w-[90vh] mx-auto">
        {user.username && <UploadPost />}

        {posts.length > 0 && (
          <InfiniteScroll
            dataLength={posts.length}
            next={loadMore}
            hasMore={hasMore}
            loader={<p className="text-center my-4">Loading...</p>}
            endMessage={
              <p className="text-center my-4">Không còn bài viết nào.</p>
            }
          >
            {posts.map((post, index) => (
              <Post
                avatarURL={post.user.avatarURL}
                displayName={post.user.displayName}
                introduction={post.user.introduction}
                isVerified
                username={post.user.username}
                postImage={post.images}
                key={post.id ?? index}
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
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default Home;
