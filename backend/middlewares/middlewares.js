const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config');

function authMiddleware(req, res, next){
    const bearerToken = req.headers.authorization;
    if(!bearerToken.startsWith("Bearer ")){
        return res.status(403).json({});
    }

    const splitToken = bearerToken.split(" ");
    const token = splitToken[1];

    const decodedValue = jwt.verify(token, JWT_SECRET);

    if(decodedValue.userId){
        req.userId = decodedValue.userId;
        next();
    }else{
        res.status(403).json({
            message: "you are not authenticated"
        })
    }
    
}

module.exports = authMiddleware;