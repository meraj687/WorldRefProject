import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'

function Cart() {
 const state = useContext(GlobalState)
 const [cart , setCart] = state.UserAPI.cart
 const [total , setTotal] = useState(0)

 if(cart.length === 0) 
        return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Cart Empty</h2> 
 return (
  <div >
  {
   cart.map(product =>(
     <div className="container detail cart" key={product._id} style={{padding: '0rem 11rem'}}>
   <img src={product.images.url} alt="" srcset="" style={{width:'100%',marginLeft:'3%'}} className="img_container"/>

   <div className="box-detail" >
    {/* <div className="row"> */}
     <h2>{product.title}</h2>
     {/* <h6>#id: {product.product_id}</h6> */}
    <h3>${product.price * product.quantity}</h3>
    <p>{product.description}</p>
    <p>{product.content}</p>

    <div className="amount">
     <button>-</button>
     <span>{product.quantity}</span>
     <button>+</button>
    </div>
    {/* <Link to="/cart" className="cart">Buy Now</Link> */}
    <div className="delete">X</div>
   </div>
  </div>
    ) )
  }
  <div className="total">
   <h3 style={{    padding: '0rem 10rem'}}>Total : $ {total}</h3>
   <Link to="#!">Payment</Link>
  </div>
  </div>
 )
}

export default Cart
