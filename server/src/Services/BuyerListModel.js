const asyncHandler = require("express-async-handler");
//const Buyers = require('G://Graduation Project - Rockstar Lift//server//database//models//BuyerList.model.js');
const Buyers = require("../../database/models/BuyerList.model.js");

async function getBuyers(filtered = {}) {
  return Buyers.find({});
}

async function getBuyerById(id) {
  return Buyers.findById(id);
}

async function insertBuyer(buyersData) {
  const buyer = new Buyers(buyersData);
  await buyer.save();
  return buyer;
}
async function updateBuyer(id, buyersData) {
  return Buyers.findByIdAndUpdate(id, buyersData, {
    new: true,
    runValidators: true,
  });
}

async function deleteBuyer(id) {
  return Buyers.findByIdAndDelete(id);
}

module.exports = {
  getBuyers,
  getBuyerById,
  insertBuyer,
  updateBuyer,
  deleteBuyer,
};
