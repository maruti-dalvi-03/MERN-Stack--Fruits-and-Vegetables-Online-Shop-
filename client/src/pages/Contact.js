import React from 'react'
import Layout from '../components/Layout/Layout'
import './contact.css'
import {BsTelephoneFill} from 'react-icons/bs'
import {MdEmail,MdLocationPin} from 'react-icons/md'

const Contact = () => {
  return (
    <Layout title={"Contact Us"}>
      <div className='contactus'>
    <div className="c-container">
      <div className="content">
        <div className="left-side">
          <div className="address details">
            <i className="address-icon"><MdLocationPin/></i>
            <div className="topic">Address</div>
            <div className="text-one">Carter Road, Bandra</div>
            <div className="text-two">Mumbai</div>
          </div>
          <div className="phone details">
            <i className="phone-icon"><BsTelephoneFill/></i>
            <div className="topic">Phone</div>
            <div className="text-one">+9186 8980 4003</div>
            <div className="text-two">+9198 1923 8163</div>
          </div>
          <div className="email details">
            <i className="mail-icon" ><MdEmail/></i>
            <div className="topic">Email</div>
            <div className="text-one">maruti03@gmail.com</div>
            <div className="text-two">info.greenbee@gmail.com</div>
          </div>
        </div>
        <div className="right-side">
          <div className="topic-text">Send us a message</div>
          <p>If you have any Problem please contact with us. It's our pleasure to help you.</p>
          <form action="#">
            <div className="input-box">
              <input type="text" placeholder="Enter your name" />
            </div>
            <div className="input-box">
              <input type="text" placeholder="Enter your email" />
            </div>
            <div className="input-box message-box">
            <input type="textarea" placeholder="Enter your message" />
            </div>
            <div className="button">
              <input type="button" defaultValue="Send Now" />
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
    </Layout>

  )
}

export default Contact