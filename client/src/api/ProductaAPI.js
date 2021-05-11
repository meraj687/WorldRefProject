import { useEffect, useState } from 'react'
import axios from 'axios';

function ProductaAPI() {
 const [products , setProducts] = useState([])
 const [callback , setCallback] = useState(false)
    const [result, setResult] = useState(0)

 
 
  useEffect(()=>{
   const getProducts = async()=>{
  const res = await axios.get("/api/products")
  setProducts(res.data.products)
 }
   getProducts()
 },[callback])

  
 // useEffect(()=>{
 //   const getProducts = async()=>{
   
 //  const res = await axios.get("/api/products")
 //  setProducts(res.data.products)
 // } 
 //   getProducts()
 // },[callback])
 

 return {
 products : [products , setProducts],
 callback : [callback , setCallback],
        result: [result, setResult]

 }
 }

export default ProductaAPI
