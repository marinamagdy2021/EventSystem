const mongoose=require("mongoose");
//const Speaker=  mongoose.model("speakers");
//const Student= mongoose.model("students");

const jwt = require('jsonwebtoken');
const Student= require('./../Models/StudentModel');
const Speaker= require('./../Models/SpeakerModel');


const dotenv = require('dotenv');
const {validationResult}=require("express-validator");
const bcrypt=require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

dotenv.config({
    path: './../config.env'
});

module.exports.signup = (request, response, next)=>{
    let results = validationResult(request);
    // console.log(results);
    if(!results.isEmpty()){
        let message = results.array().reduce((current , error)=>
            current + error.msg + ", ", " ");
        let error = new Error(message);
        error.status = 422;
        throw error;
    }

    let body = request.body;
     if (body.role == "student") {
         
       console.log("hello student");
       Student.findOne({email:body.email})
            .then((data) => {
            if (data) throw new Error("E-mail already in use");
            let hashedPassword = bcrypt.hashSync(body.password,saltRounds);
            let student = new Student();
            student.email=body.email;
            student.password= hashedPassword;
            return student.save();
         })
         .then((data) => {
            response.status(200).json({ msg: "student added to DB ", data });
         })
         .catch((error) => next(error));

     } else if (body.role == "speaker") {
       console.log("hwllo from speaker");
       Speaker.findOne({ email:body.email })
         .then((data) => {
           if (data) throw new Error("E-mail already in use");
           let hashedPassword = bcrypt.hashSync(body.password,saltRounds);

           let speaker = new Speaker();
           speaker.email = body.email;
           speaker.password = hashedPassword;
           speaker.username = body.username;
           speaker.address.city = body.city;
           speaker.address.street = body.street;
           speaker.address.building = body.building;
           speaker._id=new mongoose.Types.ObjectId();
           return speaker.save();
         })
         .then((data) => {
           response.status(200).json({ message: "speaker added to DB ", data });
         })
         .catch((error) => next(error));
     }
};



exports.login=(request,response,next)=>{
    let result = validationResult(request);
    if(!result.isEmpty()){
        let message = result.array().reduce((current,error) => current + error.msg + ", ", " ");
        //  console.log(message);
        let error = new Error(message);
        error.status = 422;
        throw error;
    }

    let token ;
    //admin 
        /*********************admin****************************** */
    
    if(request.body.email=="marina@gmail.com"&&request.body.password==123456)
    {
        token= jwt.sign({role:"admin",email:"marina@gmail.com",username:"marina"},
                process.env.SECRETKEY,
                {expiresIn:process.env.JWT_EXPIRES_IN})
                response.status(200).json({message:"loged in",token});
    }else {//student 
        /*********************student****************************** */

         console.log(request.body.role +"...." +request.body.password);
        if(request.body.role == "student")
        {
        Student.findOne({email:request.body.email})
        .then((data)=>{
            console.log("hola")
            if(data==null || !bcrypt.compareSync(request.body.password,data.password)){
                message = "incorrect email or password";
                error = new Error(message);
                error.status = 500;
                throw error;
            }
            token= jwt.sign({role:"student",email:data.email,id:data._id},
            process.env.SECRETKEY,
            {expiresIn:process.env.JWT_EXPIRES_IN})
            response.status(200).json({message:"student loged in ",token});
        }).catch(error=> next(error))
        
        }else if(request.body.role=="speaker")
        {//speaker 
        /*********************speaker****************************** */
            Speaker.findOne({ email: request.body.email })
              .then((data) => {
           // console.log(data +  !bcrypt.compareSync(request.body.password,data.password)+"........" );

                if(data == null||!bcrypt.compareSync(request.body.password,data.password)){
                    message = "incorrect email or password";
                    error = new Error(message);
                    error.status = 500;
                    throw error;      
                    }
                token = jwt.sign(
                   {id:data._id,email:data.email,role:"speaker"},
                    process.env.SECRETKEY,
                    {expiresIn:process.env.JWT_EXPIRES_IN});
                response.status(200).json({ message: "speaker login", token });
              })
              .catch((error) => next(error));   
        }
    }
}




