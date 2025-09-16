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
    <div className="bg-gray-950 text-white min-h-screen flex justify-center items-start py-10">
      <div className="bg-gray-900 p-4 sm:p-6 rounded-lg shadow w-full sm:w-11/12 md:w-4/5 lg:w-2/3 xl:w-1/2">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 break-words">{post.title}</h2>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-400 mb-3 gap-2">
          <span>By {post.author?.name}</span>
          <span>{new Date(post.createdAt).toLocaleString()}</span>
        </div>

        <p className="leading-relaxed break-words">{post.content}</p>
      </div>
    </div>
  );
};

export default BlogPost;
