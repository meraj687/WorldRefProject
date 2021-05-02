import React from 'react';
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

export default function Pages() {
 return (
  <Switch>
  <Route path="/" exact component={Products}/>
  <Route path="/detail/:id" exact component={DetailProduct}/>

  <Route path="/login" exact component={Login}/>
  <Route path="/register" exact component={Register}/>
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
