import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import {useAuth} from '../../context/auth'

const Dashboard = () => {
  const [auth] = useAuth() 
  return (
    
   <Layout>
       
   <div className='dashboard-container'>
       <div className='dashboard-menu'>
           <UserMenu/>
       </div>
       <div className='dashboard-content p-3'>
           <div className="card p-3  w-100" style={{background:"lightgray", borderRadius:"15px"}}>            
             
                 <h3 className="name" style={{textTransform:"capitalize"}}>{auth?.user?.name}</h3>
                 <p className="description">Email: {auth?.user?.email}</p>
                 <p className="description">Phone: {auth?.user?.phone}</p>
                 <p className="description">Address: {auth?.user?.address}</p>
            
           </div>
       </div>
   </div>
</Layout>
  )
}

export default Dashboard