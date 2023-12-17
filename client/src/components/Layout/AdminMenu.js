import React, { useState } from 'react';
import './DashboardMenu.css'
import { FaTh,FaBars,FaUsers}from "react-icons/fa";
import { BiSolidCartAdd,BiSolidStore} from 'react-icons/bi'
import {HiOutlineViewGridAdd} from 'react-icons/hi'
import {LiaClipboardListSolid} from 'react-icons/lia'
import { NavLink } from 'react-router-dom';


const AdminMenu = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/dashboard/admin",
            name:"Dashboard",
            icon:<FaTh/>
        },
           {
            path:"/dashboard/admin/users",
            name:"Users",
            icon:<FaUsers/>
        },
        {
            path:"/dashboard/admin/create-category",
            name:"Create Category",
            icon:<HiOutlineViewGridAdd/>
        },
        {
            path:"/dashboard/admin/create-product",
            name:"Create Product",
            icon:<BiSolidCartAdd/>
        },    
        {
            path:"/dashboard/admin/products",
            name:"Products",
            icon:<BiSolidStore/>
        },
        {
            path:"/dashboard/admin/all-orders",
            name:"All Orders",
            icon:<LiaClipboardListSolid/>
        },
        // {
        //     path:"/dashboard/admin/flash-deals",
        //     name:"Flash Deals",
        //     icon:<BiSolidOffer/>
        // }
    ]
    return (
        <div className="adminMenu-container" >
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="title">Admin Panel</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="admin-links" >
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default AdminMenu;