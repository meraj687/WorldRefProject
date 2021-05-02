import React , {createContext,useEffect,useState} from 'react';
import ProductsAPI from './api/ProductaAPI';
import axios from 'axios'
import UserAPI from './api/UserAPI'

export const GlobalState = createContext()

export const DataProvider = ({children})=>{
  const[token , setToken] = useState(false)


  const refreshToken = async()=>{
    const res = await axios.get('/user/refresh_token')

    // console.log(token)
    setToken(res.data.accesstoken)
  }

  useEffect(()=>{
    const firstLogin = localStorage.getItem("firstLogin")
     if(firstLogin) refreshToken()
  },[])


  ProductsAPI()
  const state = {
    token: [token , setToken],
    productsAPI : ProductsAPI(),
    UserAPI: UserAPI(token)
  }
  return(
   <GlobalState.Provider value={state}>
    {children}
   </GlobalState.Provider>
  )
}