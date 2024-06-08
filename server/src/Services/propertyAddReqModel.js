const asyncHandler = require("express-async-handler");
//const propertyAddressRequests = require('G://Graduation Project - Rockstar Lift//server//database//models//propertyAddressRequest.model.js');
const propertyAddressRequests = require("../../database/models/propertyAddressRequest.model.js");

async function getAllRequests(filter = {}) {
  return propertyAddressRequests
    .find(filter)
    .populate({
      path: "property",
      populate: {
        path: "user",
        model: "User",
      },
    })
    .populate({
      path: "user",
    });
}

async function getRequestById(id) {
  return propertyAddressRequests.findById(id);
}

async function SendAddressRequest(request) {
  const addRequest = new propertyAddressRequests(request);
  await addRequest.save();
  return addRequest;
}

async function deleteRequest(id) {
  return propertyAddressRequests.findByIdAndDelete(id);
}
async function updateRequestStatus(id, requestStatus) {
  return propertyAddressRequests.findByIdAndUpdate(id, requestStatus, {
    new: true,
    runValidators: true,
  });
}

module.exports = {
  getAllRequests,
  getRequestById,
  SendAddressRequest,
  deleteRequest,
  updateRequestStatus,
};
