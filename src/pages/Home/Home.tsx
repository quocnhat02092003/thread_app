import React from "react";
import { Link } from "react-router-dom";
import Post from "../../components/Post/Post";
import { useSelector } from "react-redux";
import UploadPost from "../../components/UploadPost/UploadPost";
import { GetAllPostsFromAllUsers } from "../../services/featureServices";

const Home: React.FC = () => {
  const user = useSelector((state: any) => state.auth);

  const [posts, setPosts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [start, setStart] = React.useState<number>(1);
  const [hasMore, setHasMore] = React.useState<boolean>(true);

  document.title = "Trang chủ | Threads.net";

  // // Fetch posts
  // const fetchPosts = async () => {
  //   if (loading || !hasMore) return;

  //   setLoading(true);
  //   try {
  //     const response = await fetch(
  //       `https://jsonplaceholder.typicode.com/posts?start=${start}&_limit=10`
  //     );
  //     const data = await response.json();

  //     // Nếu ít hơn limit, coi như hết
  //     if (data.length < 10) {
  //       setHasMore(false);
  //     }

  //     setPosts((prevPosts) => [...prevPosts, ...data]);
  //     setStart((prevStart) => prevStart + 1);
  //   } catch (err) {
  //     console.error("Error fetching posts:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // // Load đầu tiên
  // React.useEffect(() => {
  //   fetchPosts();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // // Infinite scroll listener
  // React.useEffect(() => {
  //   const handleScroll = () => {
  //     if (
  //       window.innerHeight + document.documentElement.scrollTop + 100 >=
  //       document.documentElement.scrollHeight
  //     ) {
  //       fetchPosts();
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [loading, hasMore, start]); // chú ý dependencies

  React.useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        // Giả sử bạn có một hàm để lấy bài viết từ API
        const response = await GetAllPostsFromAllUsers();
        setPosts(response);
        console.log("Posts fetched:", response);
        if (response.data.length < 10) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    // setPosts(fetchedPosts);
    fetchPosts();
  }, []);
  return (
    <div>
      <div>
        <Link to="/">
          <h3 className="text-center">Trang chủ</h3>
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
            repostCount={post.repostCount}
            postUser={post.user}
            followersCount={post.user.follower}
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
