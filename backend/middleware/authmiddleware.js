const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

exports.verifyToken = (req,res,next)=>{
    const authHeader = req.header("Authorization")
    if (!authHeader && !authHeader.startswith('Bearer')) {
        return res.status(401).json({message:'Invalid no or token'})
    }
    const token = authHeader.split(" ")[1]
    try {
        req.user = jwt.verify(token,JWT_SECRET)
        next()
    } catch (error) {
        console.error('invalid no or token',error)
        res.status(403).json({message:'Invalid no or token'})
    }
}
exports.requireRole = (role)=>(req,res,next)=>{
    try {
        if(req.user && req.user.role === role){
            return next()
        }
        res.status(403).json({message:'Invalid no or token'})
    } catch (error) {
        console.error('invalid no or token',error)
        res.status(403).json({message:'Invalid no or token'})
    }
}