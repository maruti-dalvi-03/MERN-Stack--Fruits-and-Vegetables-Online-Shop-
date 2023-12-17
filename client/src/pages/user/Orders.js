import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "./../../context/auth";
import moment from "moment";

const Orders = () => {
  const[isOpen ,setIsOpen] = useState(false);
  const toggle = () => setIsOpen (!isOpen);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(`/api/v1/auth/orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Dashboard - Your Orders"}>
       
        <div className='dashboard-container'>
          <div className='dashboard-menu'>
                <UserMenu/>
          </div>
          <div className='users-orders dashboard-content scroll' style={{overflowX:"auto", maxHeight:"120vh"}}>
              <div className="heading" style={{width:"100%",paddingInline:"10px"}}>
                <h1>Your Orders</h1>
              </div>
              <button className="blue-btn" style={{position:"absolute", top:"131px", right:"1px", zIndex:"99",outline:"0"}}
              onClick={toggle}>
                  {isOpen ? "List View" : "View in Detail"}
              </button>

              <div className='abc' style={{marginBlock:"auto", width:"100%", overflow:"scroll"}}>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow" style={{marginInline:"auto", width:"100%"}}>
                  <table className="table table-bordered table-striped text-center" style={{ width: '100%', overflow:"scroll" }}>
                    <thead>
                      <tr>
                      <th scope="col" style={{ width: '10.67%' }}>#</th>
                      <th scope="col" style={{ width: '22%' }}>Status</th>
                      <th scope="col" style={{ width: '22.67%' }}>Buyer</th>
                      <th scope="col" style={{ width: '16.67%' }}>Date</th>
                      <th scope="col" style={{ width: '16.67%' }}>Payment</th>
                      <th scope="col" style={{ width: '16.67%' }}>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td> 
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container p-0" style={{display: isOpen ? "block" : "none"}}>
                  <div className=" p-0" >
                    {o?.products.map((p,i) => (
                      <div className="box m-0" style={{height:"122px"}}>
                        <img src={`/api/v1/product/product-photo/${p._id}`} alt='pic' style={{height:"80px", width:"80px"}}/>
                        <div className="content">
                          <h5>{p.name}</h5>
                          <small>{p.description.substring(0,30)}...</small>
                          <h6>Price: <span style={{ fontSize: "12px" }}><del>&#8377;{p.price}</del></span><sup>&#8377;</sup>{!p.discountedPrice ? p.price : p.discountedPrice}</h6>
                          
                
                        
                        </div>
                      </div>
                    ))}
                  </div>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Orders;