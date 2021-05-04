import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios';

function Cart() {
 const state = useContext(GlobalState)
 const [cart , setCart] = state.UserAPI.cart
 const [total , setTotal] = useState(0)
const [token] = state.token

 useEffect(()=>{
    const getTotal=()=>{
        const total = cart.reduce((prev,item)=>{
            return prev + (item.price * item.quantity)
        },0)
        setTotal(total)
    }
    getTotal()

    
 },[cart])

 const addToCart = async(cart)=>{
   await axios.patch('/user/addcart',{cart},{
     headers : {Authorization:token}
   })
 }

 const increment = (id)=>{
    cart.forEach(item=>{
      if(item._id === id){
        item.quantity += 1
      }
    })

    setCart([...cart])
    addToCart(cart)
 }

  const decrement = (id)=>{
    cart.forEach(item=>{
      if(item._id === id){
        item.quantity === 1 ? item.quantity =1 : item.quantity -= 1
      }
    })

    setCart([...cart])
 }

 const removeProduct = (id)=>{
   if(window.confirm("Do you want to delete this product?")){
     cart.forEach((item , index)=>{
       if(item._id === id){
         cart.splice(index,1)
       }
     })
     setCart([...cart])
   }
 }


 if(cart.length === 0) 
        return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Cart Empty</h2> 
 return (
  <div className="cnt" style={{marginLeft:'10%'}} >
  {
   cart.map(product =>(
     <div className="container detail cart" key={product._id} style={{padding: '0rem 11rem'}}>
   <img src={product.images.url} alt="" srcset="" style={{width:'100%',marginLeft:'3%'}} />

   <div className="box-detail" >
    {/* <div className="row"> */}
     <h2>{product.title}</h2>
     {/* <h6>#id: {product.product_id}</h6> */}
    <h3>${product.price * product.quantity}</h3>
    <p>{product.description}</p>
    <p>{product.content}</p>

    <div className="amount">
     <button onClick={()=>{
      decrement(product._id)
    }}>-</button>
     <span>{product.quantity}</span>
     <button onClick={()=>{
      increment(product._id)
    }}>+</button>
    </div>
    {/* <Link to="/cart" className="cart">Buy Now</Link> */}
    <div className="delete" onClick={()=>{
      removeProduct(product._id)
    }} >X</div>
   </div>
  </div>
    ) )
  }
  <div className="total">
   <h3 >Total : $ {total}</h3>
   <Link to="#!">Payment</Link>
  </div>
  </div>
 )
}

export default Cart
