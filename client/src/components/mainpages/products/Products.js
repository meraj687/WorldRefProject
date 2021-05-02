import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'
import loading from '../utils/loading/Loading'
import Loading from '../utils/loading/Loading'
// import axios from 'axios';

function Products() {
 const state = useContext(GlobalState)
 const [products] = state.productsAPI.products
 const [isAdmin] = state.UserAPI.isAdmin

 return (
   <>
  <div className="products container-fluid" style={{padding: '0rem 12rem',margin: '0rem 1.27rem'}}>
            {
    products.map(product => {
                    return <ProductItem key={product._id} product={product}
                    isAdmin = {isAdmin}
                    />
     })
   }
  </div>
  {products.length === 0 && <Loading/>}
  </>
 )
}

export default Products;
