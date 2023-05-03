const express = require("express");
const { register, logIn, update, deleteData, getData } = require("../controllers/userModel");
const { authentication } = require("../middi/auth");

const router = express.Router();

router.route("/register").post(register)

router.route("/login").post(logIn)

router.route("/getData").get(authentication, getData)

router.route("/update").put(authentication, update)

router.route("/delete").delete(authentication, deleteData)

module.exports = router