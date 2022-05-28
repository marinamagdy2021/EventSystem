let express = require("express");
let server = express();
const body_parser=require("body-parser");
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose=require("mongoose");

const authorizationRouter = require('./Routers/authenticaionRouter');
const StudentRouter = require('./Routers/StudentsRouter');
const speakerRouter = require('./Routers/speakersRouter');
const eventRouter = require('./Routers/eventsRouter');
const dotenv = require('dotenv');
dotenv.config({
    path: './config.env'
});


process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION!!! shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

const database = process.env.DATABASE;
// connection to DB
mongoose.connect(database)
        .then(()=>{
            console.log("DB connectd");
            server.listen(process.env.PORT,()=>{
                console.log("I am Listening ....... ",process.env.PORT)
            });
        })
        .catch(error=>console.log(error))


//middleware


//** Logger MW ***/
server.use((request,response,next)=>{
    console.log(request.url, request.method);
    next();
});


// adding Helmet to enhance your Rest API's security
//server.use(helmet());
// body parsing middleware
server.use(body_parser.json());
server.use(body_parser.urlencoded({extended:false}));
// enabling CORS for all requests
server.use(cors());

// //routers
server.use(authorizationRouter);
server.use(eventRouter);
server.use(StudentRouter);
server.use(speakerRouter);

//** not found MW ***/
server.use((request,response)=>{
    response.status(404).json({message:"page not found"});
});


//** Error MW ***/
server.use((error,req,res,next)=>{
    let status = error.status||500 ;
    res.status(status).json({message:error +" "});
    //handling Error
    })



