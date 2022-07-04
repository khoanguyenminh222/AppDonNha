const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    idReviewer: {
      type: String,
      required: true,
    },
    ratingStar: {
      type: Number,
      required: true,
    },
    ratingText: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
