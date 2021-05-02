import React, { useContext,useState } from 'react'
import {GlobalState} from '../../GlobalState';
import Menu from './icon/menu.svg';
import Close from './icon/close.svg';
import Cart from './icon/cart.svg';
import {Link} from 'react-router-dom';
import axios from 'axios'


export default function Header() {
 const state = useContext(GlobalState)
//  console.log(state)
const [isLogged ] = state.UserAPI.isLogged
const [isAdmin ] = state.UserAPI.isAdmin
const [cart] =state.UserAPI.cart

const logoutUser=async()=>{
  await axios.get('/user/logout')
  localStorage.clear()
  // setIsAdmin(false)
  // setIsLogged(false)
  window.location.href = "/"
}

const adminRouter = ()=>{
  return(
    <>
    <li><Link to="/category_product">Create Product</Link></li>
    <li><Link to="/category">Categories</Link></li>

    </>
  )
}

const loggedRouter = ()=>{
  return(
    <>
    <li><Link to="/history">History</Link></li>
    <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
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
    <li><Link to="/">{isAdmin ? 'Products' : "Shop"}</Link></li>

    {isAdmin && adminRouter()}
    {
      isLogged ? loggedRouter() :<li><Link to="/login">Login & Register</Link></li>
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
   <a><Link to="/"><img src="https://worldref.co/wp-content/uploads/2021/01/Worldref-scaled.jpg" alt="" width="100%"/></Link></a>
   <br/>
  <a><Link to="/">Home</Link></a>
  <a><Link to="/Transaction">Transaction</Link></a>
  <a><label htmlFor="" style={{fontSize:'55%',color:'blue'}}>Product And Services</label></a>
  <a><Link to="/worldrefservices">WorldRef Services</Link></a>
  <a><Link to="Mynetwork">My Network</Link></a>
  <a><Link to="tags">Tags</Link></a>
  <a><Link to="imagevideo">Images And Videos</Link></a>
</div>
  </>
  
 )
}
