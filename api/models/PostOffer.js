const mongoose = require("mongoose");

const PostOfferSchema = new mongoose.Schema(
  {
    email: {
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
        min: 3,
        max: 50,
    },
    desc: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    picture:{
        type: [String],
        required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PostOffer", PostOfferSchema);