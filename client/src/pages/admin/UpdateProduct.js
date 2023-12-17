import React, { useState ,useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from "react-hot-toast";
import axios from "axios";
import {Select} from 'antd';
import {useNavigate, useParams} from 'react-router-dom';

const {Option} = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([])
  const [photo, setPhoto] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")// eslint-disable-next-line
  const [discount, setDiscount] = useState("")
  const [discountedPrice, setDiscountedPrice] = useState("")
  const [category, setCategory] = useState("")
  const [quantity, setQuantity] = useState("")// eslint-disable-next-line
  const [shipping, setShipping] = useState("")
  const [id, setId] = useState("");
  
   //Get Single Product
   const getSingleProduct = async () => {
    try {
        const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`);
        setName(data.product.name);
        setId(data.product._id);
        setDescription(data.product.description);
        setCategory(data.product.category._id);
        setPhoto(data.product.photo);
        setPrice(data.product.price);
        setDiscount(data.product.discount);
        setDiscountedPrice(data.product.discountedPrice)
        setQuantity(data.product.quantity);
    } catch (error) {
        console.log(error);
    }
   };
   useEffect(() => {
     getSingleProduct()
     // eslint-disable-next-line
   },[])


   //get all category
   const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

//handle create funtion
const handleUpdate = async (e) => {
  e.preventDefault()
  try {
    const productData= new FormData()
    productData.append("name", name)
    productData.append("description", description)
    productData.append("price", price)
    productData.append("discount", discount)
    productData.append("discountedPrice", discountedPrice)
    productData.append("quantity", quantity)
    photo && productData.append("photo", photo)
    productData.append("category", category)

    const { data } = axios.put(`/api/v1/product/update-product/${id}`, productData);

    if (data?.success) {
      toast.error(data?.message);
    } else {
      toast.success("Product Update Successfully");
      navigate("/dashboard/admin/products")
    }
  } catch (error) {
    console.log(error);
    toast.error("something went wrong");
  }
};


//Delete Product
const handleDelete = async() => {
    try {
        let answer = window.prompt("Are You Sure to delete this Product ? (yes / no)");
        if(!answer) return;
        const {data} = await axios.delete(`/api/v1/product/delete-product/${id}`);
        navigate("/dashboard/admin/products")
        toast.success(`${data.products.name} Product Delete Successfully`)
    } catch (error) {
        console.log(error)
        toast.error("Something went Wrong..")
    }
}

const calculateDiscountedPrice = (priceValue, discountValue) => {
  if ((priceValue) && (discountValue)) {
    const priceFloat = parseFloat(priceValue);
    const discountFloat = parseFloat(discountValue);
    const discountedPrice = priceFloat - (priceFloat * (discountFloat / 100));
    return discountedPrice.toFixed(2);
  }
  return "";
};

// Calculate discounted price when either discount or price changes
useEffect(() => {
  setDiscountedPrice(calculateDiscountedPrice(price, discount));
}, [price, discount]);

// Calculate discounted price when the discount input changes
const handleDiscountChange = (e) => {
  const discountValue = e.target.value;
  setDiscount(discountValue);
  setDiscountedPrice(calculateDiscountedPrice(price, discountValue));
};

  return (
    <Layout title={"Dashboard - Update Product"}>
       
    <div className='dashboard-container'>
        <div className='dashboard-menu'>
            <AdminMenu/>
        </div>
        <div className='dashboard-content'>
          <div className='create-product'>
            
              <h1 className='title'>Update Product</h1>

              <Select placeholder="Select a category" showSearch className='select'
              onChange={(value) => {setCategory(value);}}
              value={category}>
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
              </Select>

              <div className='product-photo m-2' >
                <label className="blue-btn" style={{width: "100%"}}> {photo ? photo.name : "Upload Photo"} 
                    <input type='file' name='photo' accept='image/*'
                    onChange={(e) => setPhoto(e.target.files[0])} hidden/>
                </label>             
              </div>

              <div className='mb-1'>
                {photo ? (
                  <div className='text-center'>
                    <img src={URL.createObjectURL(photo)} alt="product_photo" height={"200px"}/> 
                  </div>
                ) : (
                    <div className='text-center'>
                    <img src={`/api/v1/product/product-photo/${id}`} alt="product_photo" height={"200px"}/> 
                  </div>
                )}
              </div>

              <div className='mb-3 '>
                <input type='text' value={name} placeholder='Write a name' 
                onChange={(e) => setName(e.target.value)}/>
              </div>

              <div className='mb-3 '>
                <textarea value={description} placeholder='Write a description' rows={5}
                onChange={(e) => setDescription(e.target.value)}/>
              </div>

              <div className='mb-3 '>
                <input type='number' value={price} placeholder='Write a price in ₹'
                 onChange={(e) => setPrice(e.target.value)}/>
              </div>

              <div className='mb-3 d-flex gap-1'>
                <input type='number' min={1} max={99} value={discount} placeholder='Write a discount in %'
                 onChange={handleDiscountChange}/>
                
                 <input type='number' value={discountedPrice} placeholder='Discounted Price'
                 onChange={(e) => setDiscountedPrice(e.target.value)} disabled/>
              </div>

              <div className='mb-3 '>
                <input type='number' value={quantity} placeholder='Write a quantity' 
                onChange={(e) => setQuantity(e.target.value)}/>
              </div>

              
                <Select placeholder="Select Shipping" showSearch className='select'
                onChange={(value) => {setShipping(value);}} 
                value={shipping ?  "No" : "Yes"}>
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                </Select>
            

              <div className='text-center m-2'>
                <button className='blue-btn' onClick={handleUpdate}>Update Product</button>
                <button className='red-btn' onClick={handleDelete}>Delete Product</button>
              </div>

              
              
         </div>
      </div>
    </div>
</Layout>
  )
}

export default UpdateProduct