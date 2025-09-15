import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    API.get(`/posts/${id}`).then((res) => setPost(res.data));
  }, [id]);

  if (!post) return <p className="text-white">Loading...</p>;

  return (
    <div className="p-6 bg-gray-950 text-white min-h-screen">
      <div className="bg-gray-900 p-6 rounded-lg shadow">
        <h2 className="text-3xl font-bold">{post.title}</h2>
        <p className="mt-4">{post.content}</p>
        <small className="text-gray-400">By {post.author?.name}</small>
      </div>
    </div>
  );
};

export default BlogPost;
