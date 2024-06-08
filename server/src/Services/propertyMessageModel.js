const asyncHandler = require("express-async-handler");
//const propertyMessage = require('G://Graduation Project - Rockstar Lift//server//database//models//propertyMessage.model.js');
const propertyMessage = require("../../database/models/propertyMessage.model.js");

async function getMessage(filter = {}) {
  return propertyMessage
    .find(filter)
    .populate({
      path: "receiver",
    })
    .populate({
      path: "property",
      populate: {
        path: "user",
        model: "User",
        select: "-profilePic",
      },
    })
    .populate({
      path: "sender",
    });
}

async function getMessageById(id) {
  return propertyMessage.findById(id);
}

async function insertMessage(messageData) {
  const message = new propertyMessage(messageData);
  await message.save();
  return message;
}

async function sendReply(messageId, reply) {
  const message = await propertyMessage.findById(messageId);
  message.reply = reply;
  await message.save();
  return message;
}
module.exports = {
  getMessage,
  getMessageById,
  insertMessage,
  sendReply,
};
