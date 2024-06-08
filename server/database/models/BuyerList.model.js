const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: String,
    email: String,
    phoneNumber: String,
    investorType: {
      type: String,
      enum: [
        "Buy and Hold Investor",
        "Fix and Flip Investor",
        "Wholesaler",
        "Real Estate Developer",
        "Realtor",
        "Other",
      ],
    },
    buyBoxRange: {
      minPrice: Number,
      maxPrice: Number,
    },
  },
  { timestamps: true }
);

schema.set("toJSON", { virtual: true });
const BuyerList = mongoose.model("BuyerList", schema);
module.exports = BuyerList;
