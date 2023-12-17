import React , {useState} from 'react'
import Layout from '../../components/Layout/Layout'
import './register.css'
import {toast} from 'react-hot-toast'
import axios from 'axios'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {useAuth} from '../../context/auth';
import {MdLock, MdMail} from 'react-icons/md'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth,setAuth] = useAuth();
    
    const navigate = useNavigate();
    const location = useLocation()
    //form function
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/login",{
              email,
              password,
            })
              if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                setAuth({
                  ...auth,
                  user:res.data.user,
                  token:res.data.token,
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state||"/");
              } else {
                toast.error(res.data && res.data.message);
               
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
            <div className='heading'><h2>Sign In</h2></div>
            <form onSubmit={handleSubmit}>
              
              <div className="input-box">
                <input type="email" placeholder="  Enter your email" required 
                value={email}
                onChange= {(e) => setEmail(e.target.value)}/>
                <i><MdMail/></i>
              </div>
              <div className="input-box">
                <input type="password" placeholder="  Enter password" required 
                value={password}
                onChange= {(e) => setPassword(e.target.value)}/>
                <i><MdLock/></i>
              </div>
              <div className="text forgot-pass">
                <small><Link to="/forgot-password">forgot password?</Link></small>
              </div>
              <div className="text">
                <small>I accept all <Link to="/policy-terms-conditions">terms &amp; condition</Link></small>
              </div>
              
              <div className="input-box button">
                <input type="Submit" defaultValue="Login Now" />
              </div>
              
              <div className="text">
                <h3>Not have an account? <Link to="/register">Register now</Link></h3>
              </div>
              
            </form>
          </div>
      </div>

    </Layout>
  )
}

export default Login;