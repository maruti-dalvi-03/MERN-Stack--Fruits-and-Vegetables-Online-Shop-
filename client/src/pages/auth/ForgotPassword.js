import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./register.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Login"}>
       <div className="register">
          <div className="wrapper">
            <div className='heading'><h2>Reset Password</h2></div>
            <form onSubmit={handleSubmit}>
              
              <div className="input-box">
                <input type="email" placeholder="Enter your email" required 
                value={email}
                onChange= {(e) => setEmail(e.target.value)}/>
              </div>
              <div className="input-box">
                <input type="password" placeholder="Create New password" required 
                value={newPassword}
                onChange= {(e) => setNewPassword(e.target.value)}/>
              </div>
              <div className="input-box">
                <input type="text" placeholder="Your First Crush?" required 
                value={answer}
                onChange= {(e) => setAnswer(e.target.value)}/>
              </div>
    
              
              <div className="input-box button">
                <input type="Submit" defaultValue="Submit" />
              </div>
              
              <div className="text">
                <h3>Not have an account? <Link to="/register">Register now</Link></h3>
              </div>
              <div className="text">
                <h3>Already have an account? <Link to="/login">Login now</Link></h3>
              </div>
            </form>
          </div>
      </div>

    </Layout>
  )
}

export default ForgotPassword;