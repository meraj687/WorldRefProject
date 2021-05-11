import React, { useContext , useState} from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'
// import loading from '../utils/loading/Loading'
import Loading from '../utils/loading/Loading'
import axios from 'axios';

function Products() {
 const state = useContext(GlobalState)
 const [products , setProducts] = state.productsAPI.products
 const [isAdmin] = state.UserAPI.isAdmin
 const [token] = state.token
 const [callback , setCallback] = state.productsAPI.callback



//  const getProducts = async()=>{
   
//   const res = await axios.get("/api/products")
//   setProducts(res.data.products)
//  }
  
//  useEffect(()=>{
//    const getProducts = async()=>{
//   const res = await axios.get("/api/products")
//   setProducts(res.data.products)
//  }
//    getProducts()
//  },[setProducts])
 

 return (
   <>
  <div className="products container-fluid" style={{padding: '0rem 12rem',margin: '0rem 1.27rem'}}>
            {
    products.map(product => {
                    return <ProductItem key={product._id} product={product}
                    isAdmin = {isAdmin}
                    callback = {callback}
                    setCallback = {setCallback} token={token}
                    />
     })
   }
  </div>
  {products.length === 0 && <Loading/>}
  </>
 )
}

export default Products;
