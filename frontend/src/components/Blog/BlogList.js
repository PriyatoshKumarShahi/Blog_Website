import React, { useEffect, useState, useContext } from "react";
import API from "../../services/api";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data);
    } catch (err) {
      toast.error("Failed to fetch posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(posts.filter((post) => post._id !== id));
      toast.success("Post deleted!");
    } catch (err) {
      toast.error("Failed to delete post");
    }
  };

  return (
    <div className="p-6 bg-gray-950 text-white min-h-screen flex justify-center">
      <div className="w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-6">All Posts</h2>
        <div className="space-y-4">
          {posts.map((post) => {
  console.log("User:", user?._id, "Post Author:", post.author?._id);
  return (
    <div
      key={post._id}
      className="bg-gray-900 p-4 rounded-lg shadow hover:shadow-lg transition flex items-center justify-between"
    >
      <div className="flex flex-col max-w-[80%]">
        <Link
          to={`/posts/${post._id}`}
          className="text-blue-400 text-xl truncate"
        >
          {post.title}  <p className="text-sm text-gray-500">Click here to view</p>
        </Link>
        <p className="text-gray-400 text-sm">
          By <span className="font-medium">{post.author?.name}</span> •{" "}
          {new Date(post.createdAt).toLocaleString()}
        </p>
      </div>

     {user && post.author && String(user._id) === String(post.author._id) && (
  <button
    onClick={() => handleDelete(post._id)}
    className="ml-4 bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
  >
    Delete
  </button>
)}


    </div>
  );
})}

        </div>
      </div>
    </div>
  );
};

export default BlogList;
