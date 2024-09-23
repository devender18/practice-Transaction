const jwt = require('jsonwebtoken');
const { JWT_Secret } = require('./config');

const authMiddleware = (req,res,next)=>{
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")){
        return res.status(403).json({
            "msg" : "authorization failed"
        })
    }

    const token = authorization.split(" ")[1];
    
    try{
        const decoded = jwt.verify(token, JWT_Secret);

        req.userId = decoded.userId;
        next();

    }catch(err){
        return res.status(411).json({
            "msg" : "token verification failed"
        })
    }
}


module.exports = authMiddleware;