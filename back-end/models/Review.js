const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
    {
      id: {
        type: String,
        required: true,
        min: 1,
        max: 60,
      },
      title: {
        type: String,
        required: true,
        min: 5,
        max: 60,
      },
      description: {
        type: String,
        required: false,
        min: 0,
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
  
  module.exports = mongoose.model("Review", ReviewSchema);