import React, { useContext } from 'react';
import {Switch,Route} from 'react-router-dom'
import Products from './products/Products';
import Login from './auth/Login';
import Register from './auth/Register';
import Cart from './cart/Cart';
import NotFound from './utils/not_found/Notfound';
import DetailProduct from '../mainpages/detailProduct/DetailProduct'
import ImagesVideo from '../../screen/ImagesVideo';
import Tags from '../../screen/Tags';
import MyNetwork from '../../screen/MyNetwork';
import Transaction from '../../screen/Transaction';
import WorldRefServices from '../../screen/WorldRefServices';
import Deals from '../../screen/Deals';

import {GlobalState} from '../../GlobalState'
import Categories from './categories/Categories';
import CreateProduct from './createProduct/CreateProduct'

export default function Pages() {

 const state = useContext(GlobalState)
 const [isLogged] = state.UserAPI.isLogged;
 const [isAdmin] = state.UserAPI.isAdmin;


 return (
  <Switch>
  <Route path="/" exact component={Products}/>
  <Route path="/detail/:id" exact component={DetailProduct}/>

  <Route path="/category" exact component={isAdmin ? Categories:NotFound}/>
  <Route path="/category_product" exact component={isAdmin ? CreateProduct :NotFound} />
  <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct :NotFound} />



  <Route path="/login" exact component={isLogged? NotFound : Login}/>
  <Route path="/register" exact component={isLogged? NotFound : Register}/>



  <Route path="/imagevideo" exact component={ImagesVideo}/>
  <Route path="/tags" exact component={Tags}/>
  <Route path="/Mynetwork" exact component={MyNetwork}/>
  <Route path="/Transaction" exact component={Transaction}/>
  <Route path="/worldrefservices" exact component={WorldRefServices}/>
  <Route path="/deals" exact component={Deals}/>
  <Route path="/cart" exact component={Cart}/>



  <Route path="*" exact component={NotFound}/>



  </Switch>
 )
}
