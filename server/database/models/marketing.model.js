const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema for MarketingCampaign
const marketingCampaignSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: "properties",
      required: true,
    },
    buyerList: {
      type: Schema.Types.ObjectId,
      ref: "BuyerList",
      required: false,
    },
    buyersEmails: [String],
    CampaignName: {
      type: String,
      required: true,
    },
    campaignDetails: {
      type: String,
      required: true,
    },
    emailsSent: {
      type: Number,
      default: 0,
    },

    smsSent: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Define and export models
const MarketingCampaign = mongoose.model(
  "MarketingCampaign",
  marketingCampaignSchema
);

module.exports = {
  MarketingCampaign,
};
