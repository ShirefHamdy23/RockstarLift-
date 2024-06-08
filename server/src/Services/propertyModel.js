const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const express = require("express");
const { relative } = require("path");
const multer = require("multer");
//const Property = require('G://Graduation Project - Rockstar Lift//server//database//models//properties.model.js');
const Property = require("../../database/models/properties.model.js");
const app = express();

async function getProperties(filter = {}) {
  return Property.find(filter).populate({
    path: "user",
    select: "-profilePic",
  });
}

const BuyerList = require("../../database/models/BuyerList.model");
const {
  MarketingCampaign,
} = require("../../database/models/marketing.model.js");

const AddressRequest = require("../../database/models/propertyAddressRequest.model.js");
const propertyMessage = require("../../database/models/propertyMessage.model.js");
const propertyOffer = require("../../database/models/propertyOffer.model.js");

async function getPropertiesByFilter(filters = {}) {
  // Build the query object based on filters
  const query = {};
  for (const key in filters) {
    if (filters.hasOwnProperty(key)) {
      query[key] = filters[key]; // Add filter key-value pairs to query
    }
  }
  return Property.find(query);
}

async function getPropertyById(id) {
  return Property.findById(id).populate({
    path: "user",
  });
}

async function insertProperties(propertyData) {
  const property = new Property(propertyData);
  await property.save();
  return property;
}
async function updateProperties(id, propertyData) {
  return Property.findByIdAndUpdate(id, propertyData, {
    new: true,
    runValidators: true,
  });
}

async function deleteProperties(id) {
  await BuyerList.deleteMany({ property: id });
  await MarketingCampaign.deleteMany({ property: id });
  await AddressRequest.deleteMany({ property: id });
  await propertyMessage.deleteMany({ property: id });
  await propertyOffer.deleteMany({ property: id });
  return Property.findByIdAndDelete(id);
}

module.exports = {
  getProperties,
  insertProperties,
  updateProperties,
  deleteProperties,
  getPropertyById,
  getPropertiesByFilter,
};
