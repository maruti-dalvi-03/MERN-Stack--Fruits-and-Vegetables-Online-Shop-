import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import {Checkbox ,Radio} from 'antd';
import { Prices } from '../components/Layout/Prices';
import SearchInput from '../components/Forms/SearchInput';
import {useNavigate} from 'react-router-dom';
import { useCart} from './../context/cart';
import ProductCard from '../components/Layout/ProductCard';

const ProductsPage = () => {
    const navigate = useNavigate()
    const { addToCart } = useCart()
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    //get total count
    const getTotal = async () => {
      try {
        const { data } = await axios.get("/api/v1/product/product-count");
        setTotal(data?.total);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      if (page === 1) return;
      loadMore();
      // eslint-disable-next-line 
    },[page]);
    
    //load more
    const loadMore = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
        setLoading(false);
        setProducts([...products, ...data?.products]);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

      //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

    //get products
    const getAllProducts = async () =>{
        try {
          setLoading(true)
            const {data} = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false)
            setProducts(data.products);
        } catch (error) {
          setLoading(false)
            console.log(error)
        }
    }
    //filter by category
    const handlefilter = (value,id) => {
      let all = [...checked]
      if (value) {
        all.push(id) 
      } else {
          all = all.filter((c) => c!== id)
      }
      setChecked(all)
    }
    useEffect(() => {
      if (!checked.length || !radio.length) getAllProducts();
      // eslint-disable-next-line 
    }, [checked.length, radio.length]);
  
    useEffect(() => {
      if (checked.length || radio.length) filterProduct();
      // eslint-disable-next-line 
    }, [checked, radio]);

    //get filterd product
    const filterProduct = async () => {
      try {
        const { data } = await axios.post("/api/v1/product/product-filters", {checked, radio, });
        setProducts(data?.products);
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <Layout title={"Products - Fruits & Vegetables"}>
      <div className='productsPage'>
        <div className='category-slider scroll'>
          <h5>Categories:</h5>
          {categories?.map((c) => (
            <Checkbox className='cate-checkbox' key={c._id} onChange={(e) => handlefilter(e.target.checked, c._id)}>
              {c.name}
            </Checkbox>
          ))}
        </div>

        {/* Price Filter */}
        <div className='category-slider scroll'>
          <h5>Price Filter</h5>
          <Radio.Group className='price-filter-list scroll' onChange={(e) => setRadio(e.target.value)}>
            {Prices?.map((p) => (
              <div key={p._id}>
                <Radio value={p.array}>{p.name} </Radio>
              </div>
            ))}
          </Radio.Group>

        </div>

        <div className='content'>

          <h1>All Products <SearchInput /></h1>

          <div className='products-list scroll '>
            {products?.map(p => (
              <ProductCard key={p._id} product={p} addToCart={addToCart} navigate={navigate} />
            ))}
          </div>
          
          <div className='text-center'>
            {products && products.length < total && (
              <button className='blue-btn' onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}>
                {loading ? "Loading..." : "Loadmore.."}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProductsPage