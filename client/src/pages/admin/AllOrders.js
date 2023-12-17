import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import moment from "moment";
import axios from 'axios';
import { useAuth } from '../../context/auth';
import {Select} from 'antd';
import { toast } from 'react-hot-toast';
const {Option} = Select

const AllOrders = () => {
  const[isOpen ,setIsOpen] = useState(false);
  const toggle = () => setIsOpen (!isOpen);
  // eslint-disable-next-line
  const [status, setStatus] = useState(["Not Process", "Processing", "Shipped", "Deliverd", "Cancelled"])
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  

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

  //handle chnage
  const handleChange = async(orderId, value) => {
    try {
      const {data} = await axios.put(`/api/v1/auth/order-status/${orderId}`, {status:value});
      toast.success(`Updated Status : ${data.status}`)
      getOrders();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout title={"Dashboard - All Orders"}>
    <div className='dashboard-container'>
        <div className='dashboard-menu'>
            <AdminMenu/>
        </div>
        <div className='dashboard-content allOrders scroll' style={{overflow:"auto", maxHeight:"120vh"}}>
           <div className="heading" style={{width:"100%",paddingInline:"10px"}}>
              <h1>All Orders</h1>
           </div>
           <button className="blue-btn" style={{position:"absolute", top:"132px", right:"5px", zIndex:"99"}}
            onClick={toggle}>
                {isOpen ? "List View" : "View in Detail"}
            </button>

           <div className='abc' style={{marginBlock:"auto",marginTop:"24px", width:"100%", overflow:"scroll"}}> 
              {orders?.map((o, i) => {
                return (
                  <div className="shadow" style={{ width:"100%"}} >
                    <table className="table mt-1 table-bordered table-striped text-center" style={{overflow:"scroll"}} >
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Status</th>
                          <th scope="col">Buyer</th>
                          <th scope="col">Date</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Items</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>
                            <Select onChange={(value) => handleChange(o._id, value)}  defaultValue={o?.status} style={{width:"100%"}}>
                              {status.map((s, i) => (
                                <Option key={i} value={s}> {s} </Option>
                              ))}
                            </Select>
                          </td>
                          <td >{o?.buyer?.name}</td>
                          <td >{moment(o?.createdAt).fromNow()}</td>
                          <td>{o?.payment.success ? "Success" : "Failed"}</td>
                          <td>{o?.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="container p-0" style={{display: isOpen ? "block" : "none"}}>
                      <div className="shop p-0" >
                        {o?.products.map((p,i) => (
                        <div className="box m-0" style={{width:"100%"}}>
                          <img src={`/api/v1/product/product-photo/${p._id}`} alt='pic' height={"50px"} width={"50px"}/>
                          <div className="content">
                            <h3>{p.name}</h3>
                            <small>{p.description.substring(0,30)}...</small>
                            <h4>Price: ₹{p.price}</h4>
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

export default AllOrders