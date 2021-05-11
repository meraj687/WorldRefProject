import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios'
function Login() {
 const [user , setUser] = useState({
  email : "",
  password : ""
 })

 const onChangeInput = e=>{
  const {name,value} = e.target;
  setUser({...user,[name]:value})
 }

 const loginSubmit=async e=>{
  e.preventDefault()
  try {
   await axios.post("/user/login",{...user})
   localStorage.setItem('firstLogin' ,true )

   // localStorage.setItem("firstLogin", true)

   window.location.href = "/"
  } catch (error) {
   alert(error.response.data.msg)
  }
 }
 return (
   <>

   <section className="row1">
    <section className="child">
    <div style={{marginLeft:'15%'}}>
     <button type="submit" class="button1" >Company</button>
     <button type="submit" class="button1 button2" >Associates</button>
     </div>
     <br /> <br /><br />
     <form action="" style={{padding:'0rem 6rem'}} onSubmit={loginSubmit}>
      <label htmlFor="" style={{color:'grey'}}>Email : </label>
      <input type="email" name="email" required placeholder="Email" value={user.email} onChange={onChangeInput}/><br /><br />
      <label htmlFor="" style={{color:'grey'}}>Password : </label>
      <input type="password" name="password" required placeholder="Password" autoComplete="on"  value={user.password} onChange={onChangeInput} />

      <button type="submit" className="button-3" >Sign In</button>
      <p>New to WorldRef ? <Link to="/register" >Create and account</Link></p>
     </form>
    </section>
    <section className="child">
     <img src="https://theforgecommunications.com/wp/wp-content/uploads/2017/03/Screenshot-2017-03-24-11.08.03.png" alt="" srcset="" style={{width: '46rem'
    ,height: '38rem'}} />
    <div class="centered">Globalization Simplified</div>
    </section>
   </section>
   
  {/* <div className="login-page" style={{textAlign:'center'}}>
   <form action="" onSubmit={loginSubmit}>
    <h2>Login</h2>
    <input type="email" name="email" required placeholder="Email" value={user.email} onChange={onChangeInput}/>

    <input type="password" name="password" required placeholder="Password" autoComplete="on"  value={user.password} onChange={onChangeInput}/>

    <div className="row">
     <button type="submit">Login</button>
     <Link to="/register">Register</Link>
    </div>
   </form>
  </div> */}
  </>
 )
}

export default Login
