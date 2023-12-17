import './App.css';
import { Route, Routes } from "react-router-dom";
import About from './pages/About';
import Home from './pages/Home';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Policy from './pages/policy';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/PrivateRoute';
import ForgotPassword from './pages/auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateCategory from './pages/admin/CreateCategory';
import CreateProduct from './pages/admin/CreateProduct';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import AllOrders from './pages/admin/AllOrders';
import UpdateProduct from './pages/admin/UpdateProduct';
import CartPage from './pages/CartPage';
import ProductsPage from './pages/ProductsPage';
import SearchPage from './pages/SearchPage';
import ProductDetails from './pages/ProductDetails';
import CategoryProduct from './pages/CategoryProduct';
import AdminProducts from './pages/admin/AdminProducts';
import AdminSearchPage from './pages/admin/AdminSearchPage';
import AdminProfile from './pages/admin/AdminProfile';
import AllUsers from './pages/admin/AllUsers';




function App() {
  return (
    <>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/dashboard' element={<PrivateRoute/>}>
            <Route path='user' element={<Dashboard/>}></Route>
            <Route path='user/profile' element={<Profile/>}></Route>
            <Route path='user/orders' element={<Orders/>}></Route>
          </Route>

          {/* Admin Routes */}
          <Route path='/dashboard' element={<AdminRoute/>}>
            <Route path='admin' element={<AdminDashboard/>}></Route>
            <Route path='admin/profile' element={<AdminProfile/>}></Route>
            <Route path='admin/users' element={<AllUsers/>}></Route>
            <Route path='admin/create-category' element={<CreateCategory/>}></Route>
            <Route path='admin/create-product' element={<CreateProduct/>}></Route>
            <Route path='admin/product/:slug' element={<UpdateProduct/>}></Route>
            <Route path='admin/products' element={<AdminProducts/>}></Route>
            <Route path='admin/search' element={<AdminSearchPage/>}></Route>
            <Route path='admin/all-orders' element={<AllOrders/>}></Route>
           
          </Route>

          <Route path='/register' element={<Register/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/forgot-password' element={<ForgotPassword/>}></Route> 
          <Route path='/products' element={<ProductsPage/>}></Route>
          <Route path='/category/:slug' element={<CategoryProduct/>}></Route>
          <Route path='/cart' element={<CartPage/>}></Route>
          <Route path='/search' element={<SearchPage/>}></Route>
          <Route path='/product/:slug' element={<ProductDetails/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/policy-terms-conditions' element={<Policy/>}></Route>
          <Route path="*" element={<NotFound/>}></Route>
        </Routes>
    </>

  );
}

export default App;
