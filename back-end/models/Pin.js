const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        min: 3,
        max: 60,
      },
      longitude: {
        type: Number,
        required: true,
      },
      latitude: {
        type: Number,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      location_string: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Pin", PinSchema);