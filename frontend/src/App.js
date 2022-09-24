import React, { useEffect, useState } from 'react';
import Header from './Components/Home/Header.jsx';
import ProductDetails from "./Components/Products/ProductDetails"
import "./App.css";
import Home from './Components/Home/Home.jsx';
import webFont from "webfontloader";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginSignup from './Components/Authentication/LoginSignup.jsx';
import { useSelector } from 'react-redux';
import UserData from './more/UserData.jsx';
import Store from "./Store"
import { loadUser } from './actions/userAction.js';
import Profile from './Components/User/Profile.jsx';
//import ProtectedRoute from './route/ProtectedRoute.js';
import UpdatePassword from './Components/User/UpdatePassword.jsx';
import About from './Components/about/About.jsx';
import Products from './Components/Products/Products.jsx';
import Search from './Components/Products/Search.jsx';
import Support from './more/Support.jsx';
import Cart from './Components/cart/Cart.jsx';
import Favourite from './Components/cart/Favourite.jsx';
import Shipping from './Components/cart/Shipping.jsx';
import ConfirmOrder from './Components/cart/ConfirmOrder.jsx';
import Payment from './Components/cart/Payment.jsx';
import axios from "axios"; 
import {loadStripe} from '@stripe/stripe-js';
import {
  
  Elements
} from '@stripe/react-stripe-js';
import Success from './Components/cart/Success.jsx';
import BottomTab from './more/BottomTab.jsx';
import MoreOption from './Components/User/MoreOption.jsx';
import Dashboard from './Components/Admin/Dashboard.jsx';
import CreateProduct from './Components/Admin/CreateProduct.jsx';
import AllProducts from './Components/Admin/AllProducts.jsx';
import EditProduct from './Components/Admin/EditProduct.jsx';
import AllOrder from './Components/Admin/AllOrder.jsx';
import UpdateOrder from './Components/Admin/UpdateOrder.jsx';
import AllUsers from './Components/Admin/AllUsers.jsx';
import UpdateUser from './Components/Admin/UpdateUser.jsx';
import AllReviews from './Components/Admin/AllReviews.jsx';
import Contact from './more/Contact.jsx';
import Rules from './more/Rules.jsx';
import Registration from './Components/Authentication/Registration.jsx';
import ForgotPassword from './Components/User/ForgotPassword.jsx';
import ResetPassword from './Components/User/ResetPassword.jsx';
import MyOrder from './Components/User/MyOrder.jsx';


// const promise = loadStripe(
//   "pk_test_51LhIOaJkj63K7pnU9GiT5YjHovEX50TuuxR7W0DZ5Wnb1rjsQLT22rI1sqbJCYRrmVMoqeUqTaWvAhM2RBSFOSuu00czRQnHJC"
// );


const App = () => {

  const {isAuthenticated,user} = useSelector((state) =>state.user);

  const [stripeApiKey, setStripeApiKey] = useState(" ");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v2/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(()=>{
    webFont.load({
      google:{
        families: ["Roboto", "Droid Sans", "Chilanka"],
      }
    });
    Store.dispatch(loadUser());
    getStripeApiKey();

  },[]);

 

  return (
    <BrowserRouter>
     
    <Header />
    <BottomTab />
    {isAuthenticated && <UserData user={user} />}

     <Routes  >
         <Route path="/" element={< Home  />} />
         <Route path="/about" element={< About />} />
         <Route path="/contact" element={< Contact />} />
         <Route path="/faq" element={< Rules />} />
         <Route path="/products" element={< Products   />} />
         <Route path="/search" element={< Search   />} />
         <Route path="/products/:keyword" element= {<Products />} />
         <Route path="/product/:id" element={< ProductDetails   />} />
         <Route path="/login" element={< LoginSignup   />} />
         <Route path="/registration" element={< Registration  />} />
         <Route path="/me" element={< Profile />} />
         <Route path="/me/update" element={< UpdatePassword />} />
         <Route path="/support" element={< Support/>} />
         <Route path="/cart" element={< Cart />} />
         <Route path="/favourites" element={< Favourite />} />
         <Route path="/shipping" element={< Shipping />} />
         <Route path="/order/confirm" element={< ConfirmOrder />} />

         <Route
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            }
          />
          <Route path="/success" element={< Success />} />
          <Route path="/more" element={< MoreOption />} />
          <Route path="/dashboard" element={< Dashboard />} />
          <Route path="/admin/product" element={< CreateProduct />} />
          <Route path="/admin/products" element={< AllProducts />} />  
          <Route path="/edit/product/:id" element={< EditProduct />} /> 
          <Route path="/admin/orders" element={< AllOrder />} /> 
          <Route path="/admin/order/:id" element={< UpdateOrder />} /> 
          <Route path="/admin/users" element={< AllUsers />} /> 
          <Route path="/admin/user/:id" element={< UpdateUser />} /> 
          <Route path="/admin/reviews" element={< AllReviews />} />
          <Route path="/password/forgot" element={< ForgotPassword />} />
          <Route path="/password/reset/:token" element={< ResetPassword />} />
          <Route path="/orders" element={< MyOrder />} /> 
                  
     </Routes>


    </BrowserRouter>
  );
};

export default App;