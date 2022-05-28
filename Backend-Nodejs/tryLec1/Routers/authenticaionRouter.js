
const jwt=require("jsonwebtoken");

const express=require("express");
const router=express.Router();
const {body,param,query}=require("express-validator");

const authController = require("./../Conrollers/authController");

router.post(
    "/studentregister/",
    [
      body("email").isEmail().withMessage("invalid email"),
      body("role").isIn(["student"]).withMessage(" nooooooooooooo "),
      body("password").isAlphanumeric().withMessage("invalid password")
    ],
    authController.signup
  );

  router.post(
    "/speakerregister/",
    [
      body("email").isEmail().withMessage("invalid email"),
      body("role").isIn(["speaker"]).withMessage(" nooooooooooooo "),
      body("password").isAlphanumeric().withMessage("invalid password"),
      body("city").isString().withMessage("invalid city datatype"),
      body("username").isAlphanumeric().withMessage("invalid username (isAlphanumeric)"),


    ],
    authController.signup
  );

  router.post(
    "/login/",
    [
      body("email").isEmail().withMessage("invalid email"),
      body("password").isAlphanumeric().withMessage("invalid password"),
      body("role").isIn(["student","speaker","admin"]).withMessage("role is invalid"),

    ],
    authController.login
  );
  
  module.exports = router;