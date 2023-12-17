import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import {RiDeleteBin6Line} from 'react-icons/ri';
import {useAuth} from './../context/auth';
import {useNavigate} from 'react-router-dom';
import { useCart } from '../context/cart';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Button } from 'antd';

const CartPage = () => {
  const [auth] = useAuth();
  const [clientToken, setClientToken] = useState();
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity , calculateCartTotal, calculateActucalTotal} = useCart();

  
//Total of cart
const total = calculateCartTotal(cartItems);
const actual_total =calculateActucalTotal(cartItems);

//get Payment Gateway Token
const getToken = async () => {
  try {
    const { data } = await axios.get("/api/v1/product/braintree/token");
    setClientToken(data?.clientToken);
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  getToken();
}, [auth?.token]);


//handle payments
const handlePayment = async () => {
  try {
   
    setLoading(true);
    const { nonce } = await instance.requestPaymentMethod();
    // eslint-disable-next-line
    const { data } = await axios.post("/api/v1/product/braintree/payment", {
      nonce,
      cartItems,
    });
      
    setLoading(false);
    localStorage.removeItem("cart");
    clearCart()
    navigate(auth.user.role===1 ? "/dashboard/admin/all-orders" : "/dashboard/user/orders");
    toast.success("Payment Completed Successfully ");
  } catch (error) {
    console.log(error);
    setLoading(false);
    toast.error(error.response.data.error, {
      position: 'bottom-center', 
    });
  }
};


  return (
   <Layout title={"Shopping Cart"}>
   <div className='cartPage'>
  <h1 style={{fontFamily:"fantasy"}}>Shopping Cart</h1>
  <button className='red-btn p-1 position-absolute top-1 end-0 mx-2' onClick={() => clearCart()}>
    Clear
  </button>
  <h4 style={{fontStyle:"oblique"}}>{!auth?.user ? "Hello, Guest" : `Hello,  ${auth?.token && auth?.user?.name}`}</h4>
  <p className="text-center">
      {cartItems?.length ? `You Have ${cartItems.length} items in your cart ${ auth?.token ? "" :  ", Please login to checkout !"
          }` : " Your Cart Is Empty"
       }
  </p>

  <div className="project">

     <div className="shop">
        {cartItems.map((item) => (
        <div className="box position-relative">
          <img src={`/api/v1/product/product-photo/${item._id}`} alt='pic' height={"100px"} width={"100px"}/>
          <div className='stock position-absolute'><small>
            {item.discount > 0 ? (
              <p style={{ fontFamily: "cursive", fontSize: "12px", borderBottomLeftRadius: "25%", borderBottomRightRadius: "25%", marginRight: "-21px", marginBottom: "0", marginTop: "-5px", padding: "4px", background: "pink" }}>
                 Get {item.discount}% OFF
              </p>
            ) : null}</small>
          </div>
          
          <div className="content">
            <h3>{item.name}</h3>
            <small>{item.description.substring(0,30)}...</small>
            <h4>Price: <span style={{ fontSize: "14px" }}><del>&#8377;{item.price}</del></span>
            <sup>&#8377;</sup>{!item.discountedPrice ? item.price : item.discountedPrice}
            </h4>
            
            <p className="unit">
            <div className="d-flex">
            <li key={item.productId}>
            Quantity: 

            <Button onClick={() => decreaseQuantity(item._id)}>-</Button>    
            {item.quantity}        
            <Button onClick={() => increaseQuantity(item._id)}>+</Button>
          
          </li>
              </div>
            </p>
            <p className="btn-area p-2" onClick={() => removeFromCart(item._id)} >
              <i><RiDeleteBin6Line/></i>     <span className="btn2">Remove</span>
            </p>
          </div>
        </div>
        ))}
     </div>

    <div className="right-bar">
      {auth?.user?.address ? (
        <>
          <div className="mb-3 p-2" style={{background:"lightgray"}}>
              <h4>Current Address</h4>
              <h6>{auth?.user?.address}</h6>              
              <button className="blue-btn" style={{ background:"black"}} onClick={() => navigate(`/dashboard/${(auth?.user.role===1 ? "admin" : "user")}/profile`)}>
                Update Address
              </button> 
          </div>
        </>
        ) : (
        <div className="mb-3">
          {auth?.token ? (
              <button className="btn btn-outline-warning" onClick={() => navigate("/dashboard/user/profile")}>
                Update Address
              </button>
            ) : (
              <button className="btn btn-outline-warning" onClick={() => navigate("/login", {state: "/cart",})}>
                Plase Login to checkout
              </button>
          )}
        </div>
      )}
      <p><span>Subtotal</span> <span>{actual_total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      })}</span></p>
      <hr/>
      <p><span>Discout</span> <span style={{color:"green"}}>₹{(actual_total-total).toFixed(2)}</span></p>
      <p><span>Free Shipping</span> <span><del>₹50</del></span></p>
      <hr/>
      <p><b>Total</b> <span><b>{total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      })}</b></span></p>

    </div>

  </div>

  <div className="m-3">
                {!clientToken || !auth?.token || !cartItems?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button className="blue-btn"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
   </div>


   </Layout>
  )
}

export default CartPage;