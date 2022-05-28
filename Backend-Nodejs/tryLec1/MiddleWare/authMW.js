const jwt=require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config({
    path: './../config.env'
});


module.exports= (request,response,next)=>{
    let token , decodedToken;
    try{
        token = request.get("Authorization").split(" ")[1];
        decodedToken = jwt.verify(token,process.env.SECRETKEY);
    }
    catch(error){
        let err= new Error("Not athenticated");
        err.status=403;
        next(err);
    }
    //authenticated
    request.role=  decodedToken.role;
    request.id=  decodedToken.id;
    request.email= decodedToken.email;
    next();
}