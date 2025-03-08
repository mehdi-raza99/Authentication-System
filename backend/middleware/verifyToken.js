const jwt=require('jsonwebtoken')
const verifyToken=(req,res,next) => {    
    const token=req.cookies.token
    if(!token)
        return res.status(401).json({
        success: false,
        message: "Unauthorized - no token provided."
    })
    try {
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        if(!decode)
            return res.status(401).json({
                success: false,
                message: "Unauthorized - invalid token provided."
            })
        req.userId=decode.userId
        next()
    } catch (error) {
        console.log(error.message);        
    }
}
module.exports={verifyToken}