import Layout from '../components/Layout/Layout'
import React, { } from 'react'
import { useSearch } from "../context/search"
import { useCart } from './../context/cart';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/Layout/ProductCard';

const SearchPage = () => {
  const navigate = useNavigate()
  const [values] = useSearch()
  const { addToCart } = useCart()

  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className='products-list'>
            {values?.results.map((p) => (
              <ProductCard key={p._id} product={p} addToCart={addToCart} navigate={navigate} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SearchPage