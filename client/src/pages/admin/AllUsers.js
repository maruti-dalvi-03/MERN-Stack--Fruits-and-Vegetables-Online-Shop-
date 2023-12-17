import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {RiDeleteBin6Line} from 'react-icons/ri';
import {BiSolidEdit} from 'react-icons/bi';

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  //get all users list
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-users");
      if (data?.success) {
        setUsers(data?.users);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting all users list");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Layout title={"Dashboard - All Users"}>
       
        <div className='dashboard-container'>
            <div className='dashboard-menu'>
                <AdminMenu/>
            </div>
            <div className='dashboard-content'style={{overflow:"auto", maxHeight:"120vh"}}>
              <h1 >All Users</h1> 

              <div className='all-users' style={{margin:"auto", width:"100%", overflow:"scroll"}} >  
              <table className="table table-bordered" style={{margin:"auto"}}>
              <thead>
                <tr className='text-center' >
                  <th scope="col" style={{minWidth:"120px"}} >Name</th>
                  <th scope="col">Email</th>
                  <th scope="col" style={{minWidth:"200px"}}>Address</th>
                  <th scope="col">Role</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody className='text-center'>
               {users?.map((u) => ( 

              
                <> 
                <tr  key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.address}</td>
                  <td style={{color: (u.role === 1) ? "green" : "black"}}>
                    {(u.role === 1) ? "admin" : "user"}
                  </td>
                  <td className='d-flex'>
                    <button className="blue-btn">
                       <span ><BiSolidEdit/></span>
                    </button>
                    <button className="red-btn" >
                        <RiDeleteBin6Line/>
                    </button>
                  </td>
                </tr>
              </>
              ))}
              </tbody>
            </table>
               </div>
            </div>
        </div>
    </Layout>
  )
}

export default AllUsers