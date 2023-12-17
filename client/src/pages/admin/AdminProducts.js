import React , {useState, useEffect}from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios';
import toast from 'react-hot-toast';
import {BiSolidEdit} from 'react-icons/bi';
import {Link} from 'react-router-dom';
import SearchInput from '../../components/Forms/SearchInput';


const AdminProducts = () => {
    const [products, setProducts] = useState()

    //get All Products
    const getAllProducts = async() => {
        try {          
            const {data} = await axios.get('/api/v1/product/get-product');
            setProducts(data.products);
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    //Lifecycle method
    useEffect(() => {
        getAllProducts();
    },[]);

  return (
<Layout title={"Dashboard - Create Product"}>   
    <div className='dashboard-container'>

      <div className='dashboard-menu'>
        <AdminMenu/>
      </div>

      <div className='dashboard-content' style={{overflowX:"auto"}}>
         <h1 style={{width:"100%", paddingInline:"15px"}}>All Products</h1>
         <div className='search-bar'><SearchInput/></div>
         <div className='all-products scroll' style={{marginInline:"auto", width:"100%", display:"unset"}}>
           <table className="table table-bordered table-striped" style={{margin:"auto"}}>
             <thead>
                <tr className='text-center' >
                  <th scope="col">Photo</th>
                  <th scope="col">Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Price</th>
                  <th scope="col">Discounted Price</th>
                  <th scope="col">Description</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Action</th>
                </tr>
             </thead> 
                
             {products?.map(p => (
              <tbody className='text-center' style={{color:(p.quantity < 30) ? "red" : "black"}}> 
                    <tr  key={p._id} >
                      <td><img src={`/api/v1/product/product-photo/${p._id}`} alt='pic' width='70px' height="100px"/></td>
                      <td>{p.name}</td>
                      <td>{p.category.name}</td>
                      <td>&#8377;{p.price}</td>
                      <td>&#8377;{(!p.discountedPrice ? p.price : p.discountedPrice)}</td>
                      <td>{p.description.substring(0,50)}...</td>
                      <td >{p.quantity}</td>
                      <td>
                        <button className="blue-btn">
                          <Link to={`/dashboard/admin/product/${p.slug}`} >
                            <span style={{color:"white"}}><BiSolidEdit/></span>
                          </Link>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                  ))}     
            </table>
          </div>
      </div>

    </div>
</Layout>
    
  )
}

export default AdminProducts