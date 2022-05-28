const Speaker = require("./../Models/SpeakerModel");
const {validationResult}=require("express-validator");
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const req = require("express/lib/request");
const saltRounds = 10;
const Event = require("./../Models/EventModel");


/***************** speaker role ******************** */
module.exports.getSpeaker= (request,response,next)=>
{
    //console.log(request.role);
    if (request.role =="speaker" ){
        //console.log(Speaker.find(Speaker.email==request.body.email));
        Speaker.findOne({email: request.email})
        .then((data) => {
          response.status(200).json({ message: "speaker data", data });
        })
        .catch((error) => next(error));
    }else
    {
        throw new Error("not autherized");
    }
}

module.exports.updateSpeaker= (request,response,next)=>{
    let results = validationResult(request);
    if (!results.isEmpty()) {
     // console.log(results);
      let message = results
        .array()
        .reduce((current, error) => current + error.msg + ", ", " ");
      let error = new Error(message);
      error.status = 422;
      throw error;
    }

    if(request.role == "speaker"){
        Speaker.findOne({ email: request.email, _id: { $ne: request.id }})
        .then(data =>{
         if(data) throw new Error("This Email used by another speaker")
        })

        let hashedPassword = bcrypt.hashSync(request.body.password, saltRounds);
        Speaker.findByIdAndUpdate(request.id, {
            $set: {
            password: hashedPassword,
            email: request.body.email,
            username: request.body.userName,
            address:{city:request.body.city,street:request.body.street,building:request.body.building}
            },
          })
          .then((data) => {
            if (!data) {
                let error = new Error("speaker not found");
                error.status = 422;
                throw error;
            }
            response.status(200).json({ message: "speaker updated" });
          })
          .catch((error) => next(error));
          }
        else
        {
            throw new Error("not autherized");
        }
}


module.exports.getRegisteredEvents=(request,response,next)=>{
    if(request.role=="speaker")
    {
        let speakerId=request.id;
       // console.log(speakerId)
        Event.find({$or:[{mainSpeaker:speakerId},{otherSpeakers:{$elemMatch:{$eq:speakerId}}}]})
        .populate("mainSpeaker").populate("otherSpeakers").populate("students")
        .then((data)=>{
            if(data.length==0){
                console.log(data +"bvn");
                throw new Error("No Events Registered for Speaker No.");
            }
            response.status(200).json(data);
        })
        .catch((err)=>{
        console.log(speakerId+">>>>>>")
        //throw new Error("No Events Registered for Speaker No."+speakerId);

         next(err.error);      
        })
    }else
    {
        throw new Error("not autherized");
    }
}

/***************** admin role ******************** */

module.exports.getAllSpeakers= (request,response,next)=>{
    if (request.role == "admin") {
    Speaker.find({}).then(data=>{
        response.status(200).json({message: "speakers data",data})
    })
    .catch(error=>next(error))
}else
{
    throw new Error("not autherized");
}

}

module.exports.getSpeakerById = (request, response, next) => {
    if (request.role == "admin") {
        Speaker.findOne({ _id: request.params.id })
        .then((data) => {
            if (data == null) throw new Error("Speaker not exist");
            return response.status(200).json({ message: 'success', data });
        })
        .catch((error) => next(error));
    }else
    {
        throw new Error("not autherized");
    }
    
}

module.exports.updateSpeakerByAdmin = (request, response, next) => {
    let results = validationResult(request);
    if (!results.isEmpty()) {
        let message = results.array().reduce((current, error) => current + error.msg + ", ", " ");
        let error = new Error(message);
        error.status = 422;
        throw error;
    }
    if (request.role == "admin") {
      
        Speaker.findOne({ email: request.email, _id: { $ne: request.id }})
        .then(data =>{
         if(data) throw new Error("This Email used by another speaker")
        })

      Speaker.findByIdAndUpdate(request.params.id, {
            $set: {
            email: request.body.email,
            address:{city:request.body.city,street:request.body.street,building:request.body.building}
          },
        })
        .then((data) => {
            if (!data) {
                let error = new Error("Speaker not found");
                error.status = 422;
                throw error;
            }
            response.status(200).json({ msg: "speaker updated",data});
        })
        .catch((error) => next(error));
    }else
    {
        throw new Error("not autherized");
    }
    
};

  module.exports.deleteSpeaker= (request,response,next)=>
  {
      let result=validationResult(request);
      if(!result.isEmpty())
      {
          let message=result.array().reduce((current,error)=>current+error.msg+" "," ");
          let error=new Error(message);
          error.status=422;
          throw error;
      }
  if (request.role == "admin") {
      Speaker.deleteOne({_id:request.params.id})
      .then(data=>{
          if(data==null)
          throw new Error("speaker does not exists");
          //Speaker.deleteOne({_id:request.params.id});
          response.status(200).json({message:"speaker Deleted"});
        }).catch(error=>next(error));
        
    }else
    {
        throw new Error("not autherized");
    }
}
    


/*
module.exports.createSpeaker= (request,response,next)=>
{
    /** i must check about the email exist before in database or not  */
    //console.log((Speaker.find({'email':request.body.email}).select('email  _conditions')));
    //Speaker.find(Speaker.email==request.body.email).select('email');
   /* let result=validationResult(request);
    if(!result.isEmpty())
    {
        let message=result.array().reduce((current,error)=>current+error.msg+" "," ");
        let error=new Error(message);
        error.status=422;
        throw error;
    }

    let speaker = new Speaker(
        {
            username:request.body.username,
            _id:new mongoose.Types.ObjectId(),
            email:request.body.email,
            password:request.body.password,
            address:{city:request.body.city,street:request.body.street,building:request.body.building},

        }
    );
    speaker.save().then((data)=>
    {
        response.status(200).json({message:"speaker created",data})
    }).catch(error=>next(error));
}

*/
