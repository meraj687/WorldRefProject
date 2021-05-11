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

   localStorage.setItem("firstLogin", true)

   window.location.href = "/"
  } catch (error) {
   alert(error.response.data.msg)
  }
 }
 return (

     <section className="row1">
    <section className="child">
    <div style={{marginLeft:'15%'}}>
     <button type="submit" class="button1" >Company</button>
     <button type="submit" class="button1 button2" >Associates</button>
     </div>
     <br /> <br /><br />
     <form action="" style={{padding:'0rem 6rem'}} onSubmit={RegisterSubmit} >
      <label htmlFor="" style={{color:'grey'}}>Email : </label>
      <input type="name" name="name" required placeholder="Name" value={user.name} onChange={onChangeInput}/><br /><br />
      <label htmlFor="" style={{color:'grey'}}>Password : </label>
      <input type="password" name="password" required placeholder="Password" autoComplete="on"  value={user.password} onChange={onChangeInput} /><br /><br />
      <label htmlFor="" style={{color:'grey'}}>Organization Name : </label>
      <input type="organization_name" name="organization_name" required placeholder="Organization_name" value={user.organization_name} onChange={onChangeInput}/><br /><br />
      <label htmlFor="" style={{color:'grey'}}>Phone Number : </label>
      <input type="phone_number" name="phone_number" required placeholder="Phone_number" autoComplete="on"  value={user.phone_number} onChange={onChangeInput}/><br /><br />
      

      <button type="submit" className="button-3" >Registered</button>
      <p>Already have an account ? <Link to="/login">Login</Link></p>
     </form>
    </section>
    <section className="child">
     <img src="https://theforgecommunications.com/wp/wp-content/uploads/2017/03/Screenshot-2017-03-24-11.08.03.png" alt="" srcset="" style={{width: '46rem'
    ,height: '38rem'}} />
    <div className="centered">Globalization Simplified</div>
    </section>
   </section>
  // <div className="login-page" style={{textAlign:'center'}}>
  //  <form action="" onSubmit={RegisterSubmit}>
  //   <h2>Register</h2>
  //  <input type="name" name="name" required placeholder="Name" value={user.name} onChange={onChangeInput}/>

  //   <input type="email" name="email" required placeholder="Email" value={user.email} onChange={onChangeInput}/>

  //   <input type="password" name="password" required placeholder="Password" autoComplete="on"  value={user.password} onChange={onChangeInput}/>

  //   <input type="organization_name" name="organization_name" required placeholder="Organization_name" value={user.organization_name} onChange={onChangeInput}/>

  //   <input type="phone_number" name="phone_number" required placeholder="Phone_number" autoComplete="on"  value={user.phone_number} onChange={onChangeInput}/>

  //   <div className="row">
  //    <button type="submit">Register</button>
  //    <Link to="/login">Login</Link>
  //   </div>
  //  </form>
  // </div>
 )
}

export default Register
