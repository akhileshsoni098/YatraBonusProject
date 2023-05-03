const mongoose = require("mongoose")
const itinerarySchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true
  },
  travelDates: {
    type: String,
    required: true
  },
  activities: [{
    type: String
  }],
  accommodations: [{
    type: String
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Traveller"
  },
  isDeleted : {
    type : Boolean,
    default : false
}
});

module.exports = mongoose.model('Itinerary', itinerarySchema);