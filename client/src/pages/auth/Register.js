import React , {useState} from 'react'
import Layout from '../../components/Layout/Layout'
import './register.css'
import {toast} from 'react-hot-toast'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate =useNavigate();

    //form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/register', {
                name,
                email,
                password,
                phone,
                address,
                answer,
              });
              if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate("/login");
              } else {
                toast.error(res.data && res.data.message);
               
              }
            } catch (error) {
              console.log(error);
              toast.error("Something went wrong");
            }
          };
        

  return (
    <Layout title={"Register"}>
       <div className="register">
          <div className="wrapper">
            <div className='heading'><h2>Sign Up</h2></div>
            <form onSubmit={handleSubmit}>
              <div className="input-box">
                <input type="text" placeholder="Enter your name" required 
                value={name}
                onChange= {(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-box">
                <input type="email" placeholder="Enter your email" required 
                value={email}
                onChange= {(e) => setEmail(e.target.value)}/>
              </div>
              <div className="input-box">
                <input type="password" placeholder="Create password" required 
                value={password}
                onChange= {(e) => setPassword(e.target.value)}/>
              </div>
              <div className="input-box">
                <input type="tel" placeholder="Enter your phone " required 
                value={phone}
                onChange= {(e) => setPhone(e.target.value)}/>
              </div>
              <div className="input-box">
              <textarea className='scroll' placeholder="Enter your address
                eg.(room no. 001, building name,road name, city-pincode)" required rows={2}
                value={address}
                onChange= {(e) => setAddress(e.target.value)}/>
              </div>
              <div className="input-box">
                <input type="text" placeholder="Your First Crush?" required 
                value={answer}
                onChange= {(e) => setAnswer(e.target.value)}/>
              </div>
              <div className="policy">
                <h3>I accept all terms &amp; condition</h3>
              </div>
              <div className="input-box button">
                <input type="Submit" defaultValue="Register Now" />
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

export default Register;