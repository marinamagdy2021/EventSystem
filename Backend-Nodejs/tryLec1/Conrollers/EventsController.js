const Event = require("./../Models/EventModel");
const {validationResult}=require("express-validator");
//.populate({path:"students"})    
// otherSpeakers
//mainSpeaker


module.exports.getAllEvents= (request,response,next)=>
{
    if (request.role=="admin"){
        console.log("noooooo")
        Event.find({})
        .populate("otherSpeakers").populate("students").populate("mainSpeaker") 
        .then(data=>{
            response.status(200).json({data})
            console.log(data + "mmmmmmm");
        })
        .catch(error=>next(error))
    }else
    {
        throw new Error("not autherized");
    }
}
module.exports.getEvent= (request,response,next)=>{
  //  console.log(request.params.id +  request.role );

    if (request.role=="admin"){
    //    console.log(request.params.id);
        Event.findById(request.params.id).populate("otherSpeakers").populate("students").populate("mainSpeaker")
        .then(data=>{
            if(data==null)
            throw new Error("event does not exists");
            response.status(200).json({message:"event data",data});
        })
        .catch(error=>next(error))
    }else
    {
        throw new Error("not autherized");
    }
}
module.exports.createEvent= (request,response,next)=>
{
    if (request.role=="admin"){
        
        
        let result=validationResult(request);
        //console.log(result)

        if(!result.isEmpty())
        {
            let message=result.array().reduce((current,error)=>current+error.msg+" "," ");
            let error=new Error(message);
            error.status=422;
            throw error;  
        } 
        let event=new Event({
            title:request.body.title,
            mainSpeaker:request.body.mainSpeaker,
            otherSpeakers:request.body.otherSpeakers,
            students:request.body.students,
            date:request.body.date,
            //eventDate:getDate
        });
        event.save()
        .then((data)=>{ 
            console.log(data);
            response.status(200).json({data})
        }).catch(error=>next(error));
        
    }else
    {
        throw new Error("not autherized");
    }
}
module.exports.updateEvent= (request,response,next)=>{
    if (request.role=="admin"){
//console.log(request.params.id);
        Event.findById(request.params.id).populate("otherSpeakers").populate("students").populate("mainSpeaker")
            .then(data=>{

                if(data==null)
                throw new Error("Event does not exists");
                data.title=request.body.title;
                data.date=request.body.date;
                data.mainSpeaker=request.body.mainSpeaker;
                data.otherSpeakers=request.body.otherSpeakers;
                data.students = request.body.students;

                return data.save()
            })
            .then(data=>{
                response.status(200).json({message:"event updated",data});
            })
            .catch(error=>next(error))
    }else
    {
        throw new Error("not autherized");
    }

}
module.exports.deleteEvent= (request,response,next)=>
{
    if (request.role=="admin"){
            Event.deleteOne({_id:request.params.id}).then(data=>{
                if(data==null)
            throw new Error("event does not exists");
          
          response.status(200).json({message:"event Deleted"});
        }).catch(error=>next(error));
        
    }else
    {
        throw new Error("not autherized");
    }

}


