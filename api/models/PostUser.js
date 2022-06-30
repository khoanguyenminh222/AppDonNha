const mongoose = require("mongoose");

const PostUserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        default: "Point",
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
    },
    title: {
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
    picture: {
      type: [String],
      required: true,
    },
    nameOrganization: {
      type: String,
    },
    emailOrgazization: {
      type: String,
    },
    phonenumber: {
      type: String,
    },
    website: {
      type: String,
    },
    isWaiting:{
      type: Boolean,
      default: true,
    },
    isCancel:{
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("PostUser", PostUserSchema);
