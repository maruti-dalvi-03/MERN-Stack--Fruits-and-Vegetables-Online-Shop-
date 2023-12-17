import React from 'react'
import './footer.css'
import { NavLink , Link} from "react-router-dom";
import {FiFacebook,FiInstagram,FiTwitter,FiLinkedin} from "react-icons/fi"
import {TfiGoogle} from "react-icons/tfi"


const Footer = () => {
 
  return (
    <>
    <footer className='footer'>
        <div className="footer-content">
          <h3>Green Bee - Fresh vegetables & fruits</h3>
          <p>Get great discounts on thousands of products across categories on GreenBee. Order Now. Skip the queue and order from the wide range of products available at GreenBee.com. Assured Quality. Lowest Prices. Contact Less delivery. Wide Range of Products.</p>
          <ul className="socials">
            <li><Link to="https://www.facebook.com/"><i className="facebook"><FiFacebook/></i></Link ></li>
            <li><Link to="#"><i className="twitter"><FiTwitter/></i></Link ></li>
            <li><Link to="#"><i className="google-plus"><TfiGoogle/></i></Link ></li>
            <li><Link to="https://www.instagram.com/"><i className="instagram"><FiInstagram/></i></Link ></li>
            <li><Link to="#"><i className="linkedin"><FiLinkedin/></i></Link ></li>
          </ul>
        </div>

      <div className="footer-bottom">
       
        <div className="footer-menu">
          <ul className="f-menu">
            <li><NavLink to="/">Home</NavLink ></li>
            <li><NavLink to="/about">About</NavLink ></li>
            <li><NavLink to="/contact">Contact</NavLink ></li>
            <li><NavLink to="/policy-terms-conditions">Policy</NavLink ></li>
          </ul>
        </div>
        <p>copyright © <Link  to="/">GreenBee</Link ></p>
      </div>
    </footer>
    </>
  )
}

export default Footer