import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/axios";

const Profile = () => {
  const { userId } = useParams();
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await API.get(`/posts/user/${userId}`);
        setUserPosts(res.data);
        if (res.data.length > 0) {
          setUserName(res.data[0].author.name);
        }
      } catch (err) {
        console.error("Error fetching user posts");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [userId]);

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Posts by {userName}</h1>
      {loading ? <p>Loading...</p> : userPosts.length === 0 ? <p>No posts yet.</p> : (
        userPosts.map((post) => (
          <div key={post._id} className="mb-6 p-5 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600 mt-2">{post.content}</p>
            <p className="text-sm text-gray-400 mt-4">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Profile;
