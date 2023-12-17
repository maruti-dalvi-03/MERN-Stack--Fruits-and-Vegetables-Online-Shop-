import React from 'react'
import { NavLink } from 'react-router-dom'
import Layout from '../components/Layout/Layout'

const NotFound = () => {
  return (
    <Layout title={"Go Back - Page Not Found"}>
      <div className='notFound'>
         <div className="content">
            <h2>404</h2>
            <h4> Opps! Page not found</h4>
            <p>
               Sorry, the page you're looking for doesn't exist.
            </p>
            <div className="btn">
               <NavLink to="/">return home</NavLink>
            </div>
         </div>
      </div>
    </Layout>
  )
}

export default NotFound;