const express = require('express');
const {body,param,query}=require("express-validator");
const authMW=require("./../MiddleWare/authMW");

const router = express.Router();
const controller = require("./../Conrollers/SpeakersController");
const Speaker = require("../Models/SpeakerModel");

const auth = require('./../MiddleWare/authMW');

router.use(auth);
/**Speaker:
1- _id (ObjectID)
2- Email which is unique
3- UserName
4- Password [encrypted BONUS]
5- Address (city ,street and building)
 */

/************ Speaker ***************** */


router.route("/speakers/edit").put(
    [
        body("username").isString().withMessage("invalid username"),
        body("password").isAlphanumeric().withMessage("invalid password"),
      ],controller.updateSpeaker
)

router.get("/speakers/",controller.getSpeaker);
router.get("/speakers/events",controller.getRegisteredEvents);


/************ admin ***************** */
router.route("/admin/speakers").get(controller.getAllSpeakers)


router.delete("/admin/speakers/:id",controller.deleteSpeaker);

router.route("/admin/speakers/edit/:id").get(controller.getSpeakerById);

router.route("/admin/speakers/edit/:id").put(controller.updateSpeakerByAdmin);

module.exports=router;