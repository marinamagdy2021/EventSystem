const express = require('express');
const {body,param,query}=require("express-validator");

const router = express.Router();
const controller = require("./../Conrollers/EventsController");

const auth = require('./../MiddleWare/authMW');
router.use(auth);


router.route("/admin/events").get(controller.getAllEvents)
router.route("/admin/events/:id").get(controller.getEvent);
router.route("/admin/events/add")
.post(
    [
    body("title").isString(),
    // body("date").customSanitizer((value)=>{
    //     let regx=/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/gm .test(value);
    //     if(regx==false){
    //         throw new Error("invalid date Format must be in this format(YYYY-MM-DD)");
    //     }
    // }),
  //  body("mainSpeaker").isString().withMessage("invalid value"),
    body("otherSpeakers").isArray().withMessage("array of speakers is invalid"),
    body("students").isArray().withMessage("array of students is invalid"),
],controller.createEvent);

router.put("/admin/events/edit/:id",
    [
        body("title").isString(),
        body("date").customSanitizer((value)=>{
        // let regx=/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/gm .test(value);
        // if(regx==false){
        //     throw new Error("invalid date Format must be in this format (YYYY-MM-DD)");
        // }
    }),
    // body("mainSpeaker").isNumeric().withMessage("invalid value"),
    // body("otherSpeakers").isArray().withMessage("array of speakers is invalid"),
    // body("students").isArray().withMessage("array of students is invalid"),
],controller.updateEvent);
router.delete("/admin/events/:id",controller.deleteEvent);

// router.get("/events/:id",controller.getEvent);

module.exports=router;

/*
1- _id (Number)
2- title (required)
3- event date
4- mainSpeaker id (only one speaker will talk at the beginning of event)
5- otherSpeakers [ids] (those speaker will continue after main spekar)
6- students [ids] 
*/