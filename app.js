
const express =require("express")

const app = express()

app.use(express.json())

const user = require("./routes/travellerroute")

const itinerary = require("./routes/itinerarayRoutes")

app.use("/", user )

app.use("/iti", itinerary)

module.exports = app