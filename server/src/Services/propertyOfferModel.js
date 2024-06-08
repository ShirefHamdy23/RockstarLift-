const asyncHandler = require("express-async-handler");
const Offer = require("../../database/models/propertyOffer.model.js");

async function getOffers(userId, filter = {}) {
  return Offer.find(filter)
    .populate({
      path: "property",
      populate: {
        path: "user",
        model: "User",
        select: "-profilePic",
      },
    })
    .populate("buyer");
}

async function getOfferById(id) {
  return Offer.findById(id);
}

async function insertOffer(offerData) {
  const offer = new Offer(offerData);
  await offer.save();
  return offer;
}
async function updateOffer(id, offerData) {
  return Offer.findByIdAndUpdate(id, offerData, {
    new: true,
    runValidators: true,
  });
}

async function deleteOffer(id) {
  return Offer.findByIdAndDelete(id);
}

module.exports = {
  getOffers,
  getOfferById,
  insertOffer,
  updateOffer,
  deleteOffer,
};
