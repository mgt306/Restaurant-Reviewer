const mongoose = require("mongoose");

// review
const ReviewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
      min: 1,
      max: 60,
    },
    ambianceRating: {
      type: Number,
      required: false,
      min: 0,
      max: 5,
    },
    foodRating: {
      type: Number,
      required: false,
      min: 0,
      max: 5,
    },
    serviceRating: {
      type: Number,
      required: false,
      min: 0,
      max: 5,
    },
    priceRating: {
      type: Number,
      required: false,
      min: 0,
      max: 5,
    },
    overallRating: {
      type: Number,
      required: false,
      min: 0,
      max: 5,
    },
    postedBy:{
      username: {
        type: String,
        required: false,
      }
    }
  },
  { timestamps: true }
);
// pins or restaurants
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
      phone: {
        type: String,
        required: false,
      },
      website:{
        type: String,
        required: false,
      },
      cuisine: [
        {
        type: String,
        required: false,
      }
      ],
      booking: {
        provider: {
          type: String,
          required: false,
        },
        url: {
          type: String,
          required: false,
        }
      },
      images: {
        type: String,
        required: false,
      },
      reviews: [
      {
        type: ReviewsSchema,
        required: false,
      },
      ]
    },
  );
  
  module.exports = mongoose.model("Pin", PinSchema);
