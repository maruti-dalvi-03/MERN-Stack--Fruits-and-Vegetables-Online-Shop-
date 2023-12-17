import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import './Dashboard.css'
import {useAuth} from '../../context/auth'
import {BsTelephoneFill} from 'react-icons/bs'
import {MdEmail,MdCategory,MdListAlt} from 'react-icons/md'
import {FaUsersLine,FaCartShopping} from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import axios from 'axios'

const AdminDashboard = () => {
  const [auth] = useAuth() 
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState()
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  
  //get all users list
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-users");
      if (data?.success) {
        setUsers(data?.users);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  
    //get All Products
    const getAllProducts = async() => {
        try {          
            const {data} = await axios.get('/api/v1/product/get-product');
            setProducts(data.products);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAllProducts();
    },[]);

//get all cat
const getAllCategory = async () => {
  try {
    const { data } = await axios.get("/api/v1/category/get-category");
    if (data?.success) {
      setCategories(data?.category);
    }
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  getAllCategory();
}, []);

    //get All Orders
    const getOrders = async () => {
      try {
        const { data } = await axios.get(`/api/v1/auth/all-orders`);
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      if (auth?.token) getOrders();
    }, [auth?.token]);
   
  return (
    <Layout>
       
        <div className='dashboard-container'>
            <div className='dashboard-menu'>
                <AdminMenu/>
            </div>
            <div className='dashboard-content'>
                <div className="info">
                    <p className="phone"><i><BsTelephoneFill/></i>+91 {auth?.user?.phone}</p>
                    <p className="email"><i><MdEmail/></i> {auth?.user?.email}</p>   
                </div>
                <h3>Overview</h3>
                <div className='overview-container'>
                  
                  <Link to={"/dashboard/admin/users"}>
                    <div className='rect users'>
                      <div className='top'>
                        <p className='title'>Users</p>
                        <span><FaUsersLine/></span>
                      </div>
                      <p className='count'>{users.length}</p>                
                    </div>
                  </Link>
                  <Link to={"/dashboard/admin/products"}>
                    <div className='rect products' style={{backgroundColor:"orange"}}>
                      <div className='top'>
                        <p className='title'>Products</p>
                        <span><FaCartShopping/></span>
                      </div>
                      <p className='count'>{products?.length}</p>
                    </div>
                  </Link>
                  <Link to={"/dashboard/admin/create-category"}>
                    <div className='rect categories' style={{backgroundColor:"orange"}}>
                      <div className='top'>
                        <p className='title'>Categories</p>
                        <span><MdCategory/></span>
                      </div>                  
                      <p className='count'>{categories.length}</p>
                    </div>
                  </Link>
                  <Link to={"/dashboard/admin/all-orders"}>
                    <div className='rect orders' style={{backgroundColor:"orange"}}>
                      <div className='top'>
                        <p className='title'>Orders</p>
                        <span><MdListAlt/></span>
                      </div>                  
                      <p className='count'>{orders.length}</p>
                    </div>
                  </Link>
                </div>
            </div>
        </div>
    </Layout>
    
  )
}

export default AdminDashboard