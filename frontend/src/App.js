import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Navbar from "./components/Layout/Navbar";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import BlogList from "./components/Blog/BlogList";
import BlogPost from "./components/Blog/BlogPost";
import CreatePost from "./components/Blog/CreatePost";
import "./index.css";


const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="text-white text-center p-4">Loading...</div>; 
  return user ? children : <Navigate to="/login" replace />;
};


const App = () => (
  <AuthProvider>
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<PrivateRoute><BlogList /></PrivateRoute>} />
          <Route path="/posts/:id" element={<PrivateRoute><BlogPost /></PrivateRoute>} />
          <Route path="/create" element={<PrivateRoute><CreatePost /></PrivateRoute>} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
       <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  </AuthProvider>
);

export default App;
