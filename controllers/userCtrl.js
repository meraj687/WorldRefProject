const Users= require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userCtrl = {
 register:async(req,res)=>{
  try {
   const {name ,email , password , organization_name , phone_number} = req.body;

   const user = await Users.findOne({email})
   if(user) 
   {
    return res.status(400).json({msg:"The email already exist. "})
   }
    if(password.length<6){
     return res.status(400).json({msg:"Password is at least 6 character"})
    }
    if(organization_name == "organization_name"){
     return res.status(400).json({msg:"The member already exist. "})
    }
    if(phone_number.length < 10 || phone_number.length>10 ){
     return res.status(400).json({msg:"Incomplete or either more than 10"})
    }

    //Password Encryption 
     const passwordHash = await bcrypt.hash(password, 10)

     const newUser = new Users({
      name,email,password:passwordHash , phone_number , organization_name
     })
      //Save mongodb
      await newUser.save()

      const accesstoken = createAccessToken({id:newUser._id})

      const refreshtoken = createRefreshToken({id:newUser._id})

      res.cookie('refreshtoken',refreshtoken,{
       httpOnly : true,
       path : '/user/refresh_token',
       maxAge : 7*24*60*60*1000
      })
      
    // res.json({newUser})
    res.json({accesstoken})
    // res.json({msg: "Registered Success!"})

  } catch (error) {
   return res.status(500).json({msg:error.message})
  }
 },
 login:async(req,res)=>{
  try {
   const {email,password} = req.body;

   const user = await Users.findOne({email})
   if(!user)
   return res.status(400).json({msg:"User does not exist."})

   const isMatch = await bcrypt.compare(password,user.password)
   if(!isMatch)
   return res.status(400).json({msg:"Incorrect password."})

    const accesstoken = createAccessToken({id:user._id})
    const refreshtoken = createRefreshToken({id:user._id})   

    res.cookie('refreshtoken',refreshtoken,{
      httpOnly : true,
      path : '/user/refresh_token',
      maxAge : 7*24*60*60*1000

    })

    res.json({accesstoken})

  //  res.json({msg:"Login Success"})
   
  } catch (error) {
   return res.status(500).json({msg:error.message})
  }
 },

 logout: async(req,res)=>{
    try {
      res.clearCookie('refreshtoken',{path:'/user/refresh_token'})
      return res.json({msg:"Logged out"})
    } catch (error) {
      return res.status(500).json({msg:error.message})
    }
 },
 refreshToken : (req,res)=>{
  try {
   const rf_token = req.cookies.refreshtoken;
  if(!rf_token)
  return res.status(400).json({msg:"Please Login or Register"})
  jwt.verify(rf_token,process.env.REFRESH_TOKEN_SECRET,(error,user)=>{
   if(error)
   return res.status(400).json({msg:"Please Login or Register"})

   const accesstoken = createAccessToken({id:user.id})

   res.json({accesstoken})
  })

  // res.json({rf_token}) 
   
  } catch (error) {
   return res.status(500).json({msg:err.message})
  }
 },
 getUser: async(req,res)=>{
   try {
     const user = await Users.findById(req.user.id).select('-password')
    //  res.json(req.user)
    if(!user)
    return res.status(500).json({msg:"User does not exist"})

    res.json(user)
   } catch (error) {
     return res.status(400).json({msg:err.message})
   }
 },
 addCart : async(req,res)=>{
   try {
     const user = await Users.findById(req.user.id)
     if(!user) return res.status(500).json({msg:"User does not exist."})

     await Users.findByIdAndUpdate({_id:req.user.id},{
       cart : req.body.cart
     })

     return res.json({msg:"Added to cart"})
   } catch (error) {
     return res.status(500).json({msg: error.message})
   }
 }
}

const createAccessToken=(user)=>{
 return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET , {expiresIn : '11m'})
}
const createRefreshToken=(user)=>{
 return jwt.sign(user,process.env.REFRESH_TOKEN_SECRET , {expiresIn : '7d'})
}

module.exports = userCtrl