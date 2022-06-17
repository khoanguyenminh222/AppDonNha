const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    fullname: {
      type: String,
      require: true,
      min: 6,
    },
    dayOfBirth:{
      type: String,
      default: "",
    },
    profilePicture: {
      type: String,
      default: "",
    },
    idCardPicture: {
      type: [String],
      default: [],
    },
    crimCertificate:{
      type: String,
      default: '',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
      default: "",
    },
    phone:{
      type: String,
      max: 10,
      default: "",
    },
    city: {
      type: String,
      max: 50,
      default: "",
    },
    from: {
      type: String,
      max: 50,
      default: "",
    },
    isVerify:{
      type: Boolean,
      default: false,
    },
    waiting:{
      type: Boolean,
      default: false,
    },
    code:{
      type: String,
      default: "",
    },
    status:{
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);