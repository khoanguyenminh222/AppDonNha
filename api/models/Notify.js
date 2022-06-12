const mongoose = require("mongoose");

const NotifySchema = new mongoose.Schema(
  {
    userId:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    text:{
        type: String,
        required: true,
    },
    readed: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notify", NotifySchema);