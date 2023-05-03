const express = require("express")
const { createItinery, getItinery, updateItinery, deleteItinery } = require("../controllers/itinerarayContro")
const { authentication } = require("../middi/auth")

const router = express.Router()



router.route("/createItineray").post( authentication ,createItinery)

router.route("/getItinery").get( authentication ,getItinery)

router.route("/updateItinery/:Id").put( authentication ,updateItinery)

router.route("/deleteItinery/:Id").delete( authentication ,deleteItinery)

module.exports = router
