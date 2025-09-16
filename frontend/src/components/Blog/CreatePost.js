import React, { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({}); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (!title.trim()) validationErrors.title = "Title is required";
    if (!content.trim()) validationErrors.content = "Content is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await API.post(
        "/posts",
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Post created!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to create post");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-lg shadow-lg w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Create Post</h2>

        <div>
          <input
            className="w-full p-2 rounded bg-gray-800 text-white"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors({ ...errors, title: "" }); 
            }}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <textarea
            className="w-full p-2 rounded bg-gray-800 text-white h-32"
            placeholder="Content"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              setErrors({ ...errors, content: "" }); 
            }}
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
