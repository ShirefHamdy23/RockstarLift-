const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "properties",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    reply: {
      type: String,
    },
  },
  { timestamps: true }
);

// Apply the virtual field in the schema
schema.set("toJSON", { virtual: true });
const propertyMessage = mongoose.model("propertyMessage", schema);
module.exports = propertyMessage;
