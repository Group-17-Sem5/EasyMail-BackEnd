const config = require('../config/config');
const jwt = require('jsonwebtoken');

function authorization(req, res, next){
    const token = req.header('x-auth-token');
    //check for token
    if(!token){
        const response = {
            err: 1,
            obj: {},
            msg: "No token, authorization denied"
        }
        return res.json(response);
    }

    try{
        //verify token
        //console.log(token);
        const decoded = jwt.verify(token, config.key);
        if(!decoded){
            const response = {
                err: 1,
                obj: {},
                msg: "Token verification failed"
            }
            return res.json(response);
        }else{
            req.user = decoded;
            next();
        }
        //add user from payload
        //req.user = decoded;
        //console.log(req.user.id);
        //console.log(decoded.id);

    }catch(err){
        const response = {
            err: 1,
            obj: {},
            msg: "Access denied, no session"
        }
        return res.json(response);
    }
}

module.exports = authorization;