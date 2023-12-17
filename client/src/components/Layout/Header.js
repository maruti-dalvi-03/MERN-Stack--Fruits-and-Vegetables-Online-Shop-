import React from "react";
import { NavLink ,Link } from "react-router-dom";
import './header.css'
import {FaUserCircle, FaShoppingBasket} from 'react-icons/fa'
import {BiLogOut, BiChevronDown} from 'react-icons/bi'
import {useAuth} from '../../context/auth';
import toast from 'react-hot-toast'
import useCategory from './../../hooks/useCategory';
import {  useCart } from "../../context/cart";
import { Badge } from 'antd';

const Header = () => {
  const [auth, setAuth] = useAuth();
  const {cartItems} = useCart();
  const categories = useCategory()
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (

  <div className="navbar">
    <div className="logo" style={{position:"relative"}}> 
      <label htmlFor="checkbox_toggle" className="hamburger">&#9776;</label> 
      <Link to="/" style={{color:"white"}}>GreenBee</Link>
    </div>

    {/* NAVIGATION MENU */}
    <ul className="nav-links">
      {/* USING CHECKBOX  */}
      <input type="checkbox" id="checkbox_toggle" />
      

      {/* NAVIGATION MENUS */}
      <div className="menu">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/products">Shop</NavLink></li>
        <li className="services">Categories<BiChevronDown/>
              <ul className="dropdown">
                  <li><NavLink to="/products">All</NavLink></li>
                  {categories?.map((c) => (
                  <li><NavLink to={`/category/${c.slug}`}>{c.name}</NavLink></li>
                ))}
              </ul>
        </li>
      </div>
    </ul>

    <div className="nav-right ">     
        <li className="services"><Link ><span className="user-icon"><FaUserCircle/></span> {auth?.user?.name}</Link>
              <ul className="dropdown">
                {!auth.user ? (
                  <>
                      <li><NavLink to="/register">SignUp</NavLink></li>
                      <li><NavLink to="/login">Login</NavLink></li>
                  </>
                  ) : (
                  <>
                        <li><NavLink to={'/dashboard/'+ (auth?.user?.role === 1 ? "admin" : "user")}>Dashboard</NavLink></li>
                        {(auth?.user?.role === 1) ? <li><NavLink to="/dashboard/admin/profile">Profile</NavLink></li> : null}
                        <li><NavLink to="/login" onClick={handleLogout}><span className="logout-icon"><BiLogOut/></span>Logout</NavLink></li>
                  </>)
                }
              </ul>
        </li>

        <li className="cart">
         <Badge count={cartItems?.length}>
            <NavLink to="/cart">
              <span className="cart-icon" style={{fontSize:"22px"}}><FaShoppingBasket/></span>
            </NavLink>
          </Badge>
        </li>
    </div>
</div>



  
  );
};

export default Header;
