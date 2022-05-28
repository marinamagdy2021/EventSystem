const Student = require("./../Models/StudentModel");
const {validationResult}=require("express-validator");
const bcrypt = require("bcrypt");
const req = require("express/lib/request");
const saltRounds = 10;

const Event = require("./../Models/EventModel");


/**************** student role ********************* */
module.exports.getStudent = (request,res,next)=>
{
    //console.log("hereeeee");
    if (request.role== "student")
    {
        //console.log(request.id);
        Student.findOne({_id:request.id})
        .then(data=>{
            if(data==null)
            throw new Error("student does not exists");
            res.status(200).json({data});
        })

        .catch(error=>next(error))
    }else
    {
        throw new Error("not autherized");
    }
}

 
 module.exports.updateStudent = (request, response, next) => {

    let results = validationResult(request);
    if(!results.isEmpty()){
        if(results.array()[0].value==request.email &&results.array().length==1 ){
            console.log("pass");
        }else{
            let message = results.array().reduce( (current,error)=> current + error.msg + ", ", " ");
            let error = new Error(message);
            error.status = 422;
            throw error;
        }
    }
    if(request.role == "student"){
        Student.findOne({ email: request.email, _id: { $ne: request.id }})
        .then(data =>{
         if(data) throw new Error("This Email used by another student")
        })

      let hashedPass = bcrypt.hashSync(request.body.password, saltRounds);
      Student
        .findByIdAndUpdate(
            request.id,
            { $set:{
              email: request.body.email,
              password: hashedPass,
            } }
        )
      .then(data => {
        if(!data){
          let error = new Error("student not found");
          error.status = 422;
          throw error;
        }
        response.status(200).json({msg:"updated",data})
      })
      .catch(error => next(error))
    }else
    {
        throw new Error("not autherized");
    }
};
 


exports.getAllRegisterdEvents=(request,response,next)=>{
    if (request.role=="student")
    {
        let stdId=request.id;
        Event.find({students:{$elemMatch:{$eq:stdId}}})
        .populate("mainSpeaker").populate("otherSpeakers").populate("students")
        .then(data =>{
           // console.log("bbbbbb");
            if(data.length==0){
                throw new Error("No Event has Registered Student No."+ stdId)
            }
            response.status(200).json(data);
        })
        .catch((err)=>{
            console.log("err");
            next(err);
        })
    }else
    {
        throw new Error("not autherized");
    }
}



/**************** Admin role ********************* */

module.exports.deleteStudent = (request , response)=>{
    let result=validationResult(request);
    if(!result.isEmpty())
    {
        let message=result.array().reduce((current,error)=>current+error.msg+" , ","  ");
        let error=new Error(message);
        error.status=422;
        throw error;  
    } 
    if (request.role=="admin"){
        Student.deleteOne({_id:request.params.id}).then(data=>{
            if(data==null)
                throw new Error("student does not exists");
      
         response.status(200).json({message:"student Deleted"});
    }).catch(error=>next(error));
    
    }else
    {
        throw new Error("not autherized");
    }



}
module.exports.updateStudentByAdmin = (request, response, next) => {
    let results = validationResult(request)
   

    if (!results.isEmpty()) {
      let message = results
        .array()
        .reduce((current, error) => current + error.msg + ", ", " ");
      let error = new Error(message);
      error.status = 422;
      throw error;
    }
    if(request.role == "admin"){
        Student.findOne({ email: request.email, _id: { $ne: request.id }})
        .then(data =>{
         if(data) throw new Error("This Email used by another student")
        })

      Student.findByIdAndUpdate(request.params.id,
        {
          $set: {email:request.body.email},
        }).then((data) => {
            console.log(data)
          if (!data) {
            let error = new Error("student not found");
            error.status = 422;
            throw error;
          }
          response.status(200).json({ msg: `student with id ${request.params.id} has updated`});
        })
        .catch((error) => {
            console.log("jjjjjjjjjjjj");
            next(error)});
      }else
      {
          throw new Error("not autherized");
      }
};
  
module.exports.getAllStudents= (request,res,next)=>{
    if(request.role == "admin"){
         Student.find({})
         .then(data=>{
         res.status(200).json({message:"list of all student",data})
        })
        .catch(error=>next(error))
    }else
    {
        throw new Error("not autherized");
    }
}

module.exports.getStudentById = (request,res,next)=>
{
    //console.log("hereeeee");
    if (request.role== "admin")
    {
        //console.log(request.id);
        Student.findOne({_id:request.params.id})
        .then(data=>{
            if(data==null)
            throw new Error("student does not exists");
            res.status(200).json({data});
        })

        .catch(error=>next(error))
    }else
    {
        throw new Error("not autherized");
    }
}




    
    /*
module.exports.createStudent=(request,res,next)=>{
    let result=validationResult(request);
    if(!result.isEmpty())
    {
        let message=result.array().reduce((current,error)=>current+error.msg+" "," ");
        let error=new Error(message);
        error.status=422;
        throw error;  
    } 
    let student=new Student({
        _id:request.body.id,
        email:request.body.email,
        password:request.body.password,
       
    });
    student.save()
    .then((data)=>{ 
        res.status(200).json({message:"student created",data})
    }).catch(error=>next(error));
}

*/