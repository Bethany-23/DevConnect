import {useEffect, useState} from "react";
import API from "../utils/axios";
import CreatePost from "../components/createPost";


const Home = () =>{
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("")

    useEffect(()=>{
        const fetchPosts = async() =>{
            try{
                const res = await API.get("/posts");
            }catch(err){
                setError("Failed to fetch posts")
            } finally{
              setLoading(false);
            }
        };
        fetchPosts();
    }, []);
    return (
  <div className="max-w-2xl mx-auto mt-10 px-4">
    <h1 className="text-3xl font-bold mb-6">📝 Dev Posts</h1>

    {/* Post Form */}
    <CreatePost onPostCreated={(newPost) => setPosts([newPost, ...posts])} />

    {/* Post Feed */}
    {loading && <p>Loading...</p>}
    {error && <p className="text-red-500">{error}</p>}

    {posts.map((post) => (
  <div key={post._id} className="mb-6 p-5 bg-white rounded-lg shadow">
    <h2 className="text-xl font-semibold">{post.title}</h2>
    <p className="text-gray-600 mt-2">{post.content}</p>
    <p className="text-sm text-gray-400 mt-4">
      By {post.author?.name || "Unknown"} •{" "}
      {new Date(post.createdAt).toLocaleString()}
    </p>

    {/* Show delete/edit if current user is author */}
    {post.author?._id === user._id && (
      <div className="mt-2 flex gap-4">
        <button
          onClick={() => handleDelete(post._id)}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
        <button
          onClick={() => startEdit(post)}
          className="text-blue-500 hover:underline"
        >
          Edit
        </button>
      </div>
    )}
  </div>
))}

  </div>
);

};

export default Home;