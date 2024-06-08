const Marketing = require("../../database/models/marketing.model.js");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(SENDGRID_API_KEY);
const Twilio = require("twilio");

const emailSender = async (
  user,
  propertyID,
  CampaignName,
  recipients,
  subject,
  text,
  html
) => {
  const msg = {
    to: recipients,
    from: "sales@rockstarcallers.com",
    subject: subject,
    text: text,
    html: html,
  };

  try {
    const response = await sgMail.sendMultiple(msg);
    // Update email campaign data in MongoDB
    const successfulEmails = response.filter(
      (res) => res.statusCode === 202
    ).length;
    const newCampaign = new Marketing.MarketingCampaign({
      campaignDetails:
        "subject: " + subject + "\ntext: " + text + "\nhtml: " + html,
      emailsSent: recipients.length,
      CampaignName: CampaignName,
      property: propertyID,
      user: user,
      //sms
    });
    await newCampaign.save();
    console.log("Email campaign data saved to MongoDB");

    console.log("Emails sent");
  } catch (error) {
    console.error(
      "Error sending emails:",
      error.response ? error.response.body : error.message
    );
  }
};

const findCampaignById = async (campaignId) => {
  try {
    const campaign = await Marketing.MarketingCampaign.findById(campaignId);
    return campaign;
  } catch (error) {
    throw new Error("Error finding campaign by ID: " + error);
  }
};

const findCampaignByUserId = async (userId) => {
  try {
    const campaign = await Marketing.MarketingCampaign.find({
      user: userId,
    }).populate("property");
    return campaign;
  } catch (error) {
    throw new Error("Error finding campaign by ID: " + error);
  }
};
// Initialize Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = new Twilio(accountSid, authToken);
// Function to send SMS and update MongoDB
const sendSMS = async (
  user,
  propertyID,
  CampaignName,
  recipients,
  messageBody
) => {
  try {
    const response = await twilioClient.messages.create({
      from: "+13148042237",
      to: recipients,
      body: messageBody,
    });
    // Update SMS campaign data in MongoDB
    const newCampaign = new Marketing.MarketingCampaign({
      campaignDetails: "\nSMS: " + messageBody,
      smsSent: recipients.length,
      user: user,
      property: propertyID,
      CampaignName: CampaignName,
    });
    await newCampaign.save();
    console.log("SMS campaign data saved to MongoDB");

    console.log("SMS sent");
  } catch (error) {
    console.error("Error sending SMS:", error.message);
    throw error;
  }
};

module.exports = {
  emailSender,
  findCampaignById,
  findCampaignByUserId,
  sendSMS,
};
