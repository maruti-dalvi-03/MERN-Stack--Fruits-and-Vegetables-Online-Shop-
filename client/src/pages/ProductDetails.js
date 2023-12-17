import React, {useState, useEffect,} from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import {useParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import { useCart} from '../context/cart';
import {IoMdArrowRoundBack, IoMdArrowForward} from 'react-icons/io';
import { toast } from 'react-hot-toast';
import ProductCard from '../components/Layout/ProductCard';

const ProductDetails = () => {
    const params = useParams()
    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([])
    const navigate = useNavigate()
    const { addToCart } = useCart()


//initial product details
useEffect(() => {
    if(params?.slug) getProduct()
    // eslint-disable-next-line
},[params?.slug])

//get product
const getProduct = async () => {
    try {
        const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`)
        setProduct(data?.product)
        getSimilarProduct(data?.product._id, data?.product.category._id)
    } catch (error) {
        console.log(error)
    }
}

//Get Similar Products
const getSimilarProduct = async (pid, cid) => {
    const {data} = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
    setRelatedProducts(data?.products);
}


  return (
    <Layout title={`${product.name} - Product Details`}>
      <div className='product-details-page'>
        <h1>Product Details</h1>
        <div className='container m-2 d-flex' style={{width:"100%"}}>
         <div className='image col-md-3' >
            <button onClick={() => navigate('/products')}><IoMdArrowRoundBack/></button>
            <img src={`/api/v1/product/product-photo/${product._id}`} alt={product.name} width={"150px"}/>
         </div>
                <div className='content col-md-9'>
                    <h4>{product?.name}</h4>
                    <p style={{fontWeight:"200"}}>{product?.category?.name}</p>
                    <div><small>
            {product.discount > 0 ? (
              <p style={{ fontFamily: "cursive", fontSize: "12px", borderBottomLeftRadius: "25%", borderBottomRightRadius: "25%", marginRight: "-21px", marginBottom: "0", marginTop: "-5px", padding: "4px", background: "pink",width:"fit-content" }}>
                 Get {product.discount}% OFF
              </p>
            ) : null}</small>
          </div>
                    <h5><span style={{ fontSize: "12px" }}><del>&#8377;{product.price}</del></span>
                <sup>&#8377;</sup>{!product.discountedPrice ? product.price : product.discountedPrice}</h5>
                    
                    <button className='blue-btn'
                    onClick={() => {
                        addToCart(product)
                        toast.success("Item Added to Cart")}}>Add to Cart</button>
                </div>
            </div>
            
            <div className='description m-2 p-3 pt-1' style={{background:"lightgray",borderRadius:"15px"}}>
                <h2>Description:</h2>
                {product.description}
            </div>         
        </div>

        <div className='similar-products'>
                <h2 className='m-1'>Similar Products<IoMdArrowForward/></h2>
                {relatedProducts.length < 1 && (
                    <p className="text-center">No Similar Products found</p>
                )}
                <div className='list d-flex scroll' style={{overflowX:"scroll"}}>
                    {relatedProducts?.map(p => (
                    <ProductCard key={p._id} product={p} addToCart={addToCart} navigate={navigate} />
                    ))}
                </div>
            </div>


    </Layout>
  )
}

export default ProductDetails