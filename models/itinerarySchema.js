const mongoose = require("mongoose")

const itinerarySchema = new mongoose.Schema({
    destination: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    activities: [{
      name: String,
      cost: Number,
    }],
    accommodations: [{
      name: String,
      cost: Number,
    }],
  });
  
  const Itinerary = mongoose.model('Itinerary', itinerarySchema);