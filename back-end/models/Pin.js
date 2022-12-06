const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 1,
      max: 60,
    },
    description: {
      type: String,
      required: false,
      min: 1,
      max: 200,
    },
    ambianceRating: {
      type: String,
      required: true,
    },
    foodRating: {
      type: String,
      required: true,
    },
    serviceRating: {
      type: String,
      required: true,
    },
    priceRating: {
      type: String,
      required: true,
    },
    overallRating: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: false,
    },
    restaurantId: {
      type: String,
      required: false,
    }
  },
  { timestamps: true }
);
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
      review: {
        type: ReviewSchema,
        required: false,
      }
    },
    { timestamps: true }
);  
  module.exports = mongoose.model("Pin", PinSchema);
