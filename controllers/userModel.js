

const TravellerModel = require("../models/userModel")

const jwt = require("jsonwebtoken")

// ================= register =====================

exports.register = async (req, res)=>{
    try{
let data = req.body
let{name , email , password} = data
if(!name){return res.status(400).send({status:false , message:"Please provide your name"})}
if(!email){return res.status(400).send({status:false , message:"Please provide your email"})}
let checkEmail = await TravellerModel.findOne({email:email})
if(checkEmail){
   return res.status(400).send({status:false , message:"This email is already exist"})
}
if(!password){return res.status(400).send({status:false , message:"Please provide your name"})}

const savedata = await TravellerModel.create(data)
res.status(201).send({status:true , message:"successfully registered", data:savedata})
    }catch(err){
        res.status(500).send({status:true , message:err.message})
    }
}

//============ login ======================


exports.logIn = async (req,res)=>{
    try{
    let data = req.body

    let {email , password} = data

    if(!email || !password){
        return res.status(400).send({status:false , message:"your email or password is missing "})
    }

    let checkUser = await TravellerModel.findOne({email:email, password:password})
if(!checkUser){
    return res.status(400).send({status:false , message:"your email or password is incorrect "})

}

const token = jwt.sign({id:checkUser._id}, process.env.JWT_SECRET_KEY)

res.status(200).send({status:true, message:"successfully Logged in", token:token})
}catch(err){
    res.status(500).send({status:true , message:err.message})
}
}

//========================= update =================================

exports.update = async (req, res)=>{
    try{
let data = req.body
let{name , email , password} = data
if(email){
let checkEmail = await TravellerModel.findOne({email:email})
if(checkEmail){
   return res.status(400).send({status:false , message:"This email is already exist"})
}
}
const updateData = await TravellerModel.findOneAndUpdate({_id:req.userId},{...data},{new:true})
res.status(200).send({status:true , message:"successfully updated", data:updateData})
    }catch(err){
        res.status(500).send({status:true , message:err.message})
    }
}


//====================== delete ===========================================


exports.deleteData = async (req,res)=>{
    try{
    const deleteData = await TravellerModel.findOneAndDelete({_id:req.userId})
if(!deleteData){
    return res.status(400).send({status:false , message:"Already Deleted"})

}
    res.status(200).send({status:true, message:"deleted Successfully"})
}catch(err){
    res.status(500).send({status:true , message:err.message})
}
}


//================= get details ==============================

exports.getData = async (req, res)=>{
    
const data = await TravellerModel.findById(req.userId)

res.status(200).send({status:true, data:data})
}




