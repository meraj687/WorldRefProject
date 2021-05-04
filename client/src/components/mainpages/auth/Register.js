import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios'

function Register() {
 const [user , setUser] = useState({
  name: "",
  email : "",
  password : "",
  organization_name: "",
  phone_number : ""
 })

 const onChangeInput = e=>{
  const {name,value} = e.target;
  setUser({...user,[name]:value})
 }

 const RegisterSubmit=async e=>{
  e.preventDefault()
  try {
   await axios.post("/user/register",{...user})

   // localStorage.setItem("firstLogin", true)

   window.location.href = "/"
  } catch (error) {
   alert(error.response.data.msg)
  }
 }
 return (
  <div className="login-page" style={{textAlign:'center'}}>
   <form action="" onSubmit={RegisterSubmit}>
    <h2>Register</h2>
   <input type="name" name="name" required placeholder="Name" value={user.name} onChange={onChangeInput}/>

    <input type="email" name="email" required placeholder="Email" value={user.email} onChange={onChangeInput}/>

    <input type="password" name="password" required placeholder="Password" autoComplete="on"  value={user.password} onChange={onChangeInput}/>

    <input type="organization_name" name="organization_name" required placeholder="Organization_name" value={user.organization_name} onChange={onChangeInput}/>

    <input type="phone_number" name="phone_number" required placeholder="Phone_number" autoComplete="on"  value={user.phone_number} onChange={onChangeInput}/>

    <div className="row">
     <button type="submit">Register</button>
     <Link to="/login">Login</Link>
    </div>
   </form>
  </div>
 )
}

export default Register
