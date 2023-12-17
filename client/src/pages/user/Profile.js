import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth';
import axios from 'axios';
import { toast } from 'react-hot-toast';


const Profile = () => {
  //context
  const [auth, setAuth] = useAuth()
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  //get user data
  useEffect(() => {
    const {email, name, phone, address} = auth?.user
    setName(name)
    setEmail(email)
    setPhone(phone)
    setAddress(address)
  },[auth?.user])

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const {data} = await axios.put('/api/v1/auth/profile', {
            name,
            email,
            password,
            phone,
            address,
          });
          if (data?.error) {
            toast.error(data?.error)
          }else{
            setAuth({...auth, user:data?.updatedUser})
            let ls = localStorage.getItem('auth')
            ls = JSON.parse(ls)
            ls.user = data.updatedUser
            localStorage.setItem('auth', JSON.stringify(ls))
            
          }
          if (data.success) {
            console.log(data)
            toast.success(data && data.message);
          
          } else {
            toast.error(data && data.message);
           
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      };
  return (
    <Layout title={"Dashboard - Your Profile"}>
       
        <div className='dashboard-container'>
            <div className='dashboard-menu'>
                <UserMenu/>
            </div>
            <div className='dashboard-content my-0'>
               <div className="register my-4">
                <div className="wrapper">
                  <div className='heading' style={{fontFamily:"fantasy !important"}}><h2>Your Profile</h2></div>
                  <form onSubmit={handleSubmit}>

                    <div className="input-box">
                      <input type="text" placeholder="Enter your name"  
                      value={name}
                      onChange= {(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="input-box">
                      <input type="email" placeholder="Enter your email"  disabled
                      value={email}
                      onChange= {(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className="input-box">
                      <input type="password" placeholder="Update password"  
                      value={password}
                      onChange= {(e) => setPassword(e.target.value)}/>
                    </div>

                    <div className="input-box">
                      <input type="tel" placeholder="Enter your phone " pattern="[0-9]{10}"  
                      value={phone}
                      onChange= {(e) => setPhone(e.target.value)}/>
                    </div>

                    <div className="input-box">
                      <textarea placeholder="Enter your address" rows={3}
                      value={address}
                      onChange= {(e) => setAddress(e.target.value)}/>
                    </div>

                    <div className="input-box button mt-5">
                      <input type="Submit" defaultValue="Update" />
                    </div>       

                  </form>
                </div>
              </div>

            </div>
        </div>
    </Layout>
  )
}

export default Profile;