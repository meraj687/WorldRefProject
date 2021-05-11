import React, { useContext,useState } from 'react'
import {GlobalState} from '../../GlobalState';
import Menu from './icon/menu.svg';
import Close from './icon/close.svg';
import Cart from './icon/cart.svg';
import {Link} from 'react-router-dom';
import axios from 'axios'
import { FaAddressBook, FaHistory, FaHome, FaLock, FaNetworkWired, FaProductHunt,  FaRegImages, FaServer, FaShopify, FaShoppingCart, FaShopware, FaSign, FaTags } from 'react-icons/fa';
import Login from '../mainpages/auth/Login'


export default function Header() {
 const state = useContext(GlobalState)
//  console.log(state)
const [isLogged ] = state.UserAPI.isLogged
const [isAdmin ] = state.UserAPI.isAdmin
const [cart] =state.UserAPI.cart

const logoutUser=async()=>{
  await axios.get('/user/logout')

  localStorage.removeItem('firstLogin')
  
  // localStorage.clear()
  // setIsAdmin(false)
  // setIsLogged(false)
  window.location.href = "/"
}

const adminRouter = ()=>{
  return(
    <>
    
    <li><Link to="/category_product"><FaProductHunt/>Create Product</Link></li>
    <li><Link to="/category"><FaShoppingCart/>Categories</Link></li>

    </>
  )
}

const loggedRouter = ()=>{
  return(
    <>
    <li><Link to="/history"><FaHistory/>History</Link></li>
    <li><Link to="/" onClick={logoutUser}><FaLock/>Logout</Link></li>
    </>
  )
}

 return (
  <>
  <header>
   <div className="menu">
    <img src={Menu} alt="" width="30"/>
   </div>

   <div className="logo">
    <h1>
     <Link to="/">{isAdmin ? 'Admin' : ""}</Link>
    </h1>
   </div>
   <ul>
    <li><Link to="/">{isAdmin ? <p><FaShopware/>Products</p> : 
    
    <p><FaShopify/>Shop</p>}</Link></li>

    {isAdmin && adminRouter()}
    {
      isLogged ? loggedRouter() :<li><Link to="/login"><FaSign/>Login & Register </Link></li>
    }

    <li>
     <img src={Close} alt="" width="30" className="menu"/>
    </li>
   </ul>
   {
     isAdmin ? '' 
     :<div className="cart-icon">
    <span>{cart.length}</span>
    <Link to="/cart">
     <img src={Cart} alt="" width="30"/>
    </Link>
   </div>
   }
  </header>
  <div class="sidenav">
   <a><Link to="/"><img src="https://worldref.co/wp-content/uploads/2021/01/Worldref-scaled.jpg" alt="" width="100%" className="Imagecontrol"/></Link></a>
   <br/>
  <a><Link to="/"><FaHome/>Home</Link></a>
  <a><Link to="/deals"><FaHome/>Deals</Link></a>
  <a><Link to="/Transaction"><FaAddressBook/>Transaction</Link></a>
  <br/>
  <label htmlFor="" style={{fontSize:'78%',color:'blue',textTransform:'uppercase'}}>Product And Services</label><br/>
  <br/>
  <a><Link to="/worldrefservices"><FaServer/>WorldRef Services</Link></a>
  <a><Link to="Mynetwork"><FaNetworkWired/>My Network</Link></a>
  <a><Link to="tags"><FaTags/>Tags</Link></a>
  <a><Link to="imagevideo"><FaRegImages/>Images And Videos</Link></a>
</div>
  </>
  
 )
}
