import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"
import {useCart} from './../context/cart';
import ProductCard from "../components/Layout/ProductCard";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
    // eslint-disable-next-line
  }, [params?.slug]);

  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={`${category?.name} - category`}>
      <div className='container'>
        <div className="category-banner position-relative">
          <img src="/img/category-header-banner.jpg" alt={category?.name} style={{width:"100%", height:"180px", borderRadius:"25%", marginTop:"20px"}}/>
          <p className="text-center position-absolute" style={{left:"25px",top:"50%",transform:"translateY(-50%)",fontFamily:"cursive",fontSize:"35px",fontWeight:"800",}}>{category?.name}</p>
        </div>
        
        <h6 className="text-center fw-light">{products?.length} results found </h6>
        <div className='products-list scroll my-4 text-center'>
            <div className="d-flex flex-wrap justify-content-center">
              {products?.map((p) => (
                <ProductCard key={p._id} product={p} addToCart={addToCart} navigate={navigate} />
              ))}
            </div>
            {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
          </div>
    </div>
       
        
    </Layout>
  )
}

export default CategoryProduct