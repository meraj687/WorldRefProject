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
 const [loading ,setLoading] = useState(false)
 const [isCheck , setIsCheck] = useState(false)


  const handleCheck=(id)=>{
  //  let newProduct = [...product]
  // //  console.log(product.checked)
  // newProduct.checked = !newProduct.checked
  // setProducts(newProduct)
  // console.log(id)
  products.forEach(product=>{
    if(product._id === id) product.checked = !product.checked
  })
  setProducts([...products])
  
 }

 const checkAll=()=>{
   products.forEach(product=>{
     product.checked = !product.checked
   })
   setProducts([...products])
   setIsCheck(!isCheck)
 }

 const deleteAll=()=>{
   products.forEach(product=>{
     if(product.checked) deleteProduct(product._id , product.images.public_id)
   })
 }

  const deleteProduct = async(id,public_id)=>{
    console.log({id,public_id})
  // console.log(product)
  try {
    setLoading(true)
    const destroyImg =  axios.post('/api/destroy',{public_id},{
     headers : {Authorization : token}
    })
    const deleteProduct =  axios.delete(`/api/products/${id}`,{
     headers : {Authorization : token}
    })
    await destroyImg
    await deleteProduct
    setCallback(!callback)
    setLoading(false)
  } catch (err) {
   alert(err.response.data.msg)
  }
 }

 if(loading) return <div ><Loading/></div>


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
   {
     isAdmin && 
     <div className="delete-all">
       <span >Select All</span>
       <input type="checkbox" checked={isCheck} onChange={checkAll} />
       <button onClick={deleteAll}>Delete All</button>
     </div>
   }
  <div className="products container-fluid" style={{padding: '0rem 12rem',margin: '0rem 1.27rem'}}>
            {
    products.map(product => {
                    return <ProductItem key={product._id} product={product}
                    isAdmin = {isAdmin}
                      deleteProduct={deleteProduct} handleCheck={handleCheck}
                    />
     })
   }
  </div>
  {products.length === 0 && <Loading/>}
  </>
 )
}

export default Products;
