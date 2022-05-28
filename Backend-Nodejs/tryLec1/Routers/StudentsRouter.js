const express = require('express');
const {body,param,query}=require("express-validator");
const authorizationMW=require("./../MiddleWare/authMW");

const router = express.Router();
const controller = require("./../Conrollers/StudentsController");
const Student = require("../Models/StudentModel");

router.use(authorizationMW);


console.log("from router")
/**************** admin role ***************** */
 router.route("/admin/students")
 .get(controller.getAllStudents)

 router.route("/admin/students/edit/:id")
 .get(controller.getStudentById)

router.route("/admin/students/:id")
.delete(controller.deleteStudent)

router.route("/admin/students/edit/:id")
.put(controller.updateStudentByAdmin)

/**************** student role ***************** */
router.route("/students/edit").put(
     [
        body("password").isLength({min:5}).withMessage("password must be greater than 5 letters ")
    ], controller.updateStudent);

router.route("/students/").get(controller.getStudent);
router.get("/students/events",controller.getAllRegisterdEvents)

module.exports=router;

