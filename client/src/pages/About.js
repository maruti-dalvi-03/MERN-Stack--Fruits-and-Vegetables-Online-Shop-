import React from "react";
import Layout from "../components/Layout/Layout";
// import profile from "../img/profile.jpg";

const About = () => {
  return (
    <Layout title={"About Us - GreenBee"}>
      <div className="aboutus">

            <h2 className="headingText text-center">About us</h2>
            <h4 className="subHeadingText">What is greenbee.com</h4>
            <p className="text-blk description p-3">
            &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;<span style={{color:"teal"}}>greenbee.com</span> is India’s largest online Fruits and Vegetables store. With over 18,000 products and over a 1000 brands in our catalogue you will find everything you are looking for. Right from fresh Fruits and Vegetables, Rice and Dals, Spices and Seasonings to Packaged products, Beverages, Personal care products, Meats – we have it all.
            Choose from a wide range of options in every category, exclusively handpicked to help you find the best quality available at the lowest prices. Select a time slot for delivery and your order will be delivered right to your doorstep, anywhere in Bangalore, Hyderabad, Mumbai, Pune, Chennai, Delhi, Noida, Mysore, Coimbatore, Vijayawada-Guntur, Kolkata, Ahmedabad-Gandhinagar, Lucknow-Kanpur, Gurgaon, Vadodara, Visakhapatnam, Surat, Nagpur, Patna, Indore and Chandigarh Tricity You can pay online using your debit / credit card or by cash / sodexo on delivery.
            We guarantee on time delivery, and the best quality!
            </p>
            <h4 className="subHeadingText">Why should I use greenbee.com?</h4>
            <p className="text-blk description p-3">
            &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;<span style={{color:"teal"}}>greenbee.com</span>  allows you to walk away from the drudgery of grocery shopping and welcome an easy relaxed way of browsing and
             shopping for groceries. Discover new products and shop for all your grocery needs from the comfort of your home or office. No more getting stuck in 
             traffic jams, paying for parking, standing in long queues and carrying heavy bags – get everything you need, when you need, right at your doorstep. 
             Fruits and Vegetables shopping online is now easy as every product on your monthly shopping list, is now available online at <span style={{color:"teal"}}>greenbee.com</span>, India’s best online store.
            </p>
    
        </div>
    </Layout>
  );
};

export default About;
