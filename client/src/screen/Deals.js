import React, { useState } from 'react'

function Deals() {
 
 const colorw = "white";
 const [ bg , setBg] = useState(colorw);
 const [name , setName] = useState("Buying")
 const [names  , setNames] = useState("Selling")
 const [checked, setChecked] = useState(false);
 const [bg1 , setBg1] = useState(colorw)
 const colorAdj=()=>{
  // console.log('clicked')
  let newBg = "#0071DF"
  setBg(newBg)
  setName(<span style={{color:'white'}}onChange={(e) => setChecked(e.currentTarget.checked)}>Buying</span>)
 }

 const colorAdj1=()=>{
  // console.log("clicked")
  let newBg1 = "#0071DF"
  setBg1(newBg1)
  setNames(<span style={{color:'white'}}onChange={(e) => setChecked(e.currentTarget.checked)}>Selling</span>)
 }

 return (
  <>
  <div >
   <button className="button-adj" onClick={colorAdj} style={{backgroundColor:bg , color:'#0071DF'}} value="1"
   >{name}</button>
   <button  className="button-adj1" onClick={colorAdj1} style={{backgroundColor:bg1 , color:'#0071DF'}} value="2" >{names}</button>
  </div>
    <div className="box">
   <div >
    
    </div>
    <div className="box1">
    </div>

    
     
   </div>
   
   

  </>
 )
}

export default Deals
