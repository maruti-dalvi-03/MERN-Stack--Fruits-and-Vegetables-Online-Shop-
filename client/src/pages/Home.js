import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'
import { Carousel } from 'antd';
import { IoMdArrowForward } from 'react-icons/io';
import { useCart } from './../context/cart';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/Layout/ProductCard';


const Home = () => {
  const navigate = useNavigate()
  // eslint-disable-next-line
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState()
  const { addToCart } = useCart()

  //get All Products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/get-product');
      setProducts(data.products);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllProducts();
  }, []);

  // 50% discounted product 
  const productsWith50PercentDiscount = products
    ? products?.filter((product) => product.discount === 50)
    : [];

  // Exotic Fruits
  const exoticFruitsList = products ? // eslint-disable-next-line
  products?.filter((p)=> {
    if (p.category.slug === "exotic-fruits") {
      return p.name
    }
  } 
  ) : [];
  
  return (

    <Layout title={"Best Offers"}>
      <div className='homePage'>

        {/* Banner Slider  */}
        <div className='banner-slider'>
          <Carousel autoplay>
            {/* Banner 1 */}
            <div className='banner-container item d-flex justify-content-center'>
              <div className="banner-image">
                <img src='/img/slide-banner-1.jpg' alt='c' width={"100%"} />
              </div>
              <div className='banner-content-1'>
                <h6 style={{ color: "grey" }}>On All Orders</h6>
                <h1 style={{ color: "white" }}>Free Home Delivery <br />by
                  <span style={{ color: "teal" }}> GreenBee</span></h1>
                <Link to={'/products'} className='btn px-1 my-3' style={{ color: "#56f1ff", background: "rgb(47, 84, 95)" }}>
                  Shop With Free Delivery
                </Link>
              </div>
            </div>
            {/* Banner 2 */}
            <div className='banner-container item d-flex justify-content-center'>
              <div className="banner-image">
                <img src='/img/slide-banner-2.jpg' alt='c' width={"100%"} />
              </div>
              <div className='banner-content-1'>
                <b style={{ color: "yellowgreen", fontFamily: "cursive", fontSize: "35px", marginTop: "-20px" }}>
                  Fresh GreenBee
                </b>
                <h1 style={{ color: "black", fontWeight: "900" }}>VEGETABLES <br />
                  <span style={{ fontWeight: "normal" }} >AND</span> FRUITS <br />
                </h1>
                <Link to={'/products'} className='p-1' style={{ color: "green", background: "yellowgreen", fontWeight: "500", fontFamily: "cursive" }}>
                  SHOP NOW
                </Link>
              </div>
            </div>
            {/* Banner 3 */}
            <div className='banner-container item d-flex justify-content-center'>
              <div className="banner-image">
                <Link to={'/products'}><img src='/img/slide-banner-3.jpg' alt='c' width={"100%"} /></Link>
              </div>
              <div className='banner-content-1' style={{ fontFamily: "cursive", marginLeft: "10px" }}>
                <b style={{ color: "yellowgreen", fontSize: "35px", marginTop: "-20px" }}>
                  Fresh <span style={{ color: "black" }}></span>
                  <h1 style={{ color: "black", fontWeight: "900" }}>From <span style={{ color: "teal" }}>Farms</span> to <br />at your <br />
                    <span style={{ color: "teal" }}> Doorstep</span></h1>
                </b>
              </div>
            </div>
          </Carousel>
        </div>

        {/* Features of Us  */}
        <div className='features mt-5 mb-5'>
          <div className='item'>
            <img src='img/cod.png' alt='cod' />
            <p>Cash On Delivery</p>
          </div>
          <div className='item'>
            <img src='img/freeship.png' alt='free shippping' />
            <p>Free Shipping</p>
          </div>
          <div className='item'>
            <img src='/img/fresh.png' alt='fresh' />
            <p>Always Fresh</p>
          </div>
          <div className='item'>
            <img src='img/best.png' alt='best' />
            <p>100% Natural</p>
          </div>
        </div>


        {/* Welcome Banner */}
        <div className='welcome-banner position-relative'>
          <img src='/img/welcome-banner.jpg' alt='welcome' height={"180px"} width={"100%"} style={{ borderRadius: "15%" }} />
          <div className='welcome-banner-content text-center'>
            <p style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", width: "100%", fontFamily: "cursive", fontSize: "35px", color: "teal", textShadow: "0 0 10px rgba(126, 255, 255, 0.5)" }}>
              Welcome To GreenBee Shop
            </p>
          </div>
        </div>

        {/* Flat 50% off */}
        <div className='latest-products my-5'>
          <h2 className='m-3' style={{fontFamily:"fantasy"}}>FLAT 50% OFF STORE <IoMdArrowForward /></h2>
          <div className='slider'>
            <div className='products-list scroll '>
              {productsWith50PercentDiscount.map((product) => (
                <ProductCard key={product._id} product={product} addToCart={addToCart} navigate={navigate} />
              ))}
            </div>
          </div>
        </div>

        {/*Exotic Fruits List */}
        <div className='latest-products my-5'>
          <h2 className='m-3' style={{fontFamily:"fantasy"}}>EXOTIC FRUITS <IoMdArrowForward /></h2>
          <div className='slider'>
            <div className='products-list scroll '>
              {exoticFruitsList.map((product) => (
                
                  <ProductCard key={product._id} product={product} addToCart={addToCart} navigate={navigate} />
              
              ))}
            </div>
          </div>
        </div>

    

        {/* Home page Banner  */}
        <div className='home-mix-fruit-veg-banner my-5 d-flex align-item-center justify-content-center' >
          <img src='/img/banner-mix-fruit-veg.jpg' alt='home-mix-fruit-banner' width="100%" style={{ maxWidth: "1100px" }} />
        </div>


        {/*Recently Added  */}
        <div className='latest-products my-5'>
          <h2 className='m-3' style={{fontFamily:"fantasy"}}>RECENTALY ADDED <IoMdArrowForward /></h2>
          <div className='slider'>
            <div className='products-list scroll '>
              {products?.slice(0, 4).map(p => (
                <ProductCard key={p._id} product={p} addToCart={addToCart} navigate={navigate} />
              ))}
            </div>
          </div>
        </div>


        {/* Shop Banner  */}
        <div className='shop-banner d-flex justify-content-center' style={{ background: "pink", borderRadius: "30px" }}>
          <Link to={"category/fresh-fruits"} ><img src='https://thefruitshop.in/images/header3/slider3.jpg' alt='banner' width={"100%"} style={{ maxHeight: "250px", maxWidth: "1200px", borderRadius: "30px", marginBlock: "5px" }} /></Link>
        </div>

      </div>
    </Layout>
  )
}

export default Home;