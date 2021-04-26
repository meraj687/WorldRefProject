const router = require("express").Router()
const cloudinary = require('cloudinary')
const auth = require("../middleware/auth")
const authAdmin = require("../middleware/authAdmin")
const fs = require("fs")
const { route } = require("./userRouter")


cloudinary.config({
 cloud_name : process.env.CLOUD_NAME,
 api_key:process.env.CLOUD_API_KEY,
  api_secret : process.env.CLOUD_API_SECRET
})

router.post("/upload",auth , authAdmin,(req,res)=>{
 try {
  console.log(req.files)
  if(!req.files || Object.keys(req.files).length===0)
  return res.status(400).json({msg:"No file were uploaded."})

  const file = req.files.file;
  if(file.size> 1024*1024)
  {
   removeTmp(file.tempFilePath)
   return res.status(400).json({msg:"Size too large"})
  }

  if(file.mimetype !== "image/jpeg" && file.mimetype !== "image/png")
  {
   removeTmp(file.tempFilePath)
   return res.status(400).json({msg:"File format is incorrect."})
  }

cloudinary.v2.uploader.upload(file.tempFilePath,{folder:"test"},async(error,result)=>{
 if(error) throw error;

removeTmp(file.tempFilePath)

 res.json({public_id : result.public_id , url:result.secure_url})

})

  
 } catch (error) {
   res.status(500).json({msg:error.message})
 }
})

router.post('/destroy' ,auth,authAdmin, (req,res)=>{
 try {
  const {public_id} = req.body;
   if(!public_id)
   return res.status(400).json({msg:"No image Selected."})

   cloudinary.v2.uploader.destroy(public_id,async(error,result)=>{
    if(error) throw error;

    res.json({msg:"Deleted Image"})
   })
 } catch (error) {
  return res.status(500).json({msg:error.message})
 }
})

const removeTmp = (path)=>{
 fs.unlink(path,error=>{
  if(error) throw error;
 })
}

module.exports = router