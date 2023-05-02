const jwt = require("jsonwebtoken")


exports.authentication = (req, res, next)=>{

const token = req.headers["x-auth-token"]

if(!token){
    return res.status(400).send({status:false , message:"header token is reqired"})
}

jwt.verify(token , process.env.JWT_SECRET_KEY, function(err, decoded){
    if(err){
        return res.status(401).send({status:false , message:err.message})
    }

req.userId = decoded.id

console.log(req.userId)
next()
})
}