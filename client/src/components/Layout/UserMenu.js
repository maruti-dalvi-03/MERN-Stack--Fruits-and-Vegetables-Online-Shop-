import React, { useState } from 'react';
import './DashboardMenu.css'
import { FaTh,FaBars,FaUserCircle}from "react-icons/fa";
import {LiaClipboardListSolid} from 'react-icons/lia'
import { NavLink } from 'react-router-dom';

const UserMenu = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/dashboard/user",
            name:"Dashboard",
            icon:<FaTh/>
        },
           {
            path:"/dashboard/user/profile",
            name:"Profile",
            icon:<FaUserCircle/>
        },
        {
            path:"/dashboard/user/orders",
            name:"Orders",
            icon:<LiaClipboardListSolid/>
        }
    ]
    return (
        <div className="adminMenu-container">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="title">User Panel</h1>
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

export default UserMenu;