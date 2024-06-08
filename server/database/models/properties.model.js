const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    streetAddress: {
      type: String,
      trim: true,
      required: true,
    },
    city: {
      type: String,
      trim: true,
      required: true,
    },
    state: {
      type: String,
      trim: true,
      required: true,
    },
    zipCode: {
      type: String,
      trim: true,
      required: true,
    },
    county: {
      type: String,
      trim: true,
      required: true,
    },
    propertyType: {
      type: String,
      enum: [
        "Single Family Home",
        "Condo",
        "Townhouse",
        "Multi Family Home",
        "Apartment",
        "Air Bnb",
        "Commercial",
        "Lot",
        "Farm",
        "Ranch",
        "Manufactured",
        "Mobile Home",
        "Other",
      ],
      trim: true,
      required: true,
    },
    sqft: {
      type: String,
      trim: true,
      required: true,
    },
    yearBuilt: {
      type: String,
      trim: true,
      required: true,
    },
    lotSize: {
      type: String,
      trim: true,
      required: true,
    },
    bedRooms: {
      type: String,
      trim: true,
      required: true,
    },
    bathRooms: {
      type: String,
      trim: true,
      required: true,
    },
    longTitude: {
      type: String,
      trim: true,
      required: true,
    },
    latTitude: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    mainPhoto: {
      type: Buffer,
      required: true,
    },
    photos: [
      {
        type: Buffer,
      },
    ], // Array of GridFS file IDs for photos
    //videos: [ObjectId],// Array of video URLs added by the user
    walkthroughStartDate: Date, // Date for walkthrough availability
    walkthroughEndDate: Date,
    title: {
      type: String,
      trim: true,
      required: true,
    },
    buyNowPrice: {
      type: String,
      trim: true,
      required: true,
    },
    minEMD: {
      type: String,
      trim: true,
      required: true,
    },
    sellingPrice: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Sold", "Archived", "Draft"],
      default: "Draft",
    },
    ARV: {
      type: Number,
      trim: true,
      required: false,
    },
    COMPS: {
      type: String,
      trim: true,
      required: false,
    },
  },
  { timestamps: true }
);

// Define a virtual field for the username
schema.virtual("address").get(function () {
  return `${this.streetAddress}${this.city}${this.state}${this.zipCode}`;
});

schema.methods.toJSON = function () {
  const property = this;
  const propertyObject = property.toObject();

  return propertyObject;
};

// Apply the virtual field in the schema
schema.set("toJSON", { virtual: true });

const properties = mongoose.model("properties", schema);
module.exports = properties;
