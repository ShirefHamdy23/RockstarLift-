// routes/api.js
const express = require("express");
const asyncHandler = require("express-async-handler");
const propertyCrud = require("../Services/propertyModel.js");
const OfferCrud = require("../Services/propertyOfferModel.js");
const messageCrud = require("../Services/propertyMessageModel.js");
const addressRequestsCrud = require("../Services/propertyAddReqModel.js");
const BuyerCrud = require("../Services/BuyerListModel.js");
const MarketingCrud = require("../Services/MarketingModel.js");
const router = express.Router();
const upload = require("../Services/File_uploads");
const { Auth } = require("../middleware/Authentication.js");
const Roles = ["Investor", "Buyer", "Retail", "Admin"];

//Method to get all property
router.get("/getAllProperties/:userId", async (req, res) => {
  try {
    const properties = await propertyCrud.getProperties({
      user: req.params.userId,
    });
    res.json(properties);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.get("/getAllProperties", async (req, res) => {
  try {
    const properties = await propertyCrud.getProperties();
    res.json(properties);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Method to insert property
router.post(
  "/insertProperties",
  Auth(["Admin", "Investor", "Retail"]),
  upload.fields([
    { name: "mainPhoto", maxCount: 1 },
    { name: "photos", maxCount: 10 },
  ]),
  async (req, res) => {
    const {
      streetAddress,
      city,
      state,
      zipCode,
      county,
      propertyType,
      sqft,
      yearBuilt,
      lotSize,
      bedRooms,
      bathRooms,
      longTitude,
      latTitude,
      description,
      ARV,
      COMPS,
      walkthroughStartDate,
      walkthroughEndDate,
      title,
      buyNowPrice,
      minEMD,
      sellingPrice,
      status,
    } = req.body;
    console.log(req.body);
    if (!streetAddress || !city || !state || !zipCode || !county) {
      return res.status(400).send("All fields are required");
    }
    try {
      console.log(req.files);
      if (req.files) {
        mainPhoto = req.files.mainPhoto ? req.files.mainPhoto[0].buffer : null;
        photos = req.files.photos
          ? req.files.photos.map((file) => file.buffer)
          : [];
      }

      const prop = await propertyCrud.insertProperties({
        user: req.user._id,
        streetAddress,
        city,
        state,
        zipCode,
        county,
        propertyType,
        sqft,
        yearBuilt,
        lotSize,
        bedRooms,
        bathRooms,
        longTitude,
        latTitude,
        description,
        walkthroughStartDate,
        walkthroughEndDate,
        title,
        buyNowPrice,
        minEMD,
        sellingPrice,
        mainPhoto,
        photos,
        ARV,
        COMPS,
        status,
      });
      res.status(201).json(prop);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

//Method to update property
router.put(
  "/updateProperties/:id",
  upload.fields([
    { name: "mainPhoto", maxCount: 1 },
    { name: "photos", maxCount: 10 },
  ]),
  Auth(["Admin", "Investor"]),
  async (req, res) => {
    const id = req.params.id;
    const propertyData = req.body;
    if (req.files) {
      if (req.files["mainPhoto"]) {
        propertyData.mainPhoto = req.files["mainPhoto"][0].buffer;
      }
      if (req.files["photos"]) {
        propertyData.photos = req.files["photos"].map((file) => file.buffer);
      }
    }
    try {
      const property = await propertyCrud.updateProperties(id, propertyData);
      if (!property) {
        return res.status(404).send("Property not found");
      }
      res.json(property);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);
// get a property by ID
router.get("/property/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const property = await propertyCrud.getPropertyById(id);
    if (!property) {
      return res.status(404).send("Property not found");
    }
    res.json(property);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
//Method to delete property
router.delete(
  "/deleteProperties/:id",
  Auth(["Admin", "Investor"]),
  async (req, res) => {
    const id = req.params.id;
    try {
      const property = await propertyCrud.deleteProperties(id);
      if (!property) {
        return res.status(404).send("Property not found");
      }
      res.send("Property deleted");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

router.get("/getAllPropertiesByFilter", async (req, res) => {
  try {
    const filters = req.query; // Access query parameters for filtering
    const properties = await propertyCrud.getPropertiesByFilter(filters);
    res.json(properties);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//create Offer
router.post(
  "/createOffer",
  Auth(["Admin", "Investor", "Buyer"]),
  asyncHandler(async (req, res) => {
    const {
      property, // ID of the property being offered on
      buyer, // ID of the user making the offer
      amount, // Amount of the offer
      EMD, // Earnest Money Deposit
      status, // Optional status (Pending by default)
      seller,
    } = req.body;

    try {
      const offer = await OfferCrud.insertOffer({
        property,
        buyer: req.user._id,
        amount,
        EMD,
        status,
        seller,
      });
      res.status(201).json(offer);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
);
router.put(
  "/acceptOffer/:offerId",
  Auth(["Investor", "Admin"]),
  asyncHandler(async (req, res) => {
    const { offerId } = req.params;
    try {
      const offer = await OfferCrud.updateOffer(
        offerId,
        {
          status: "Accepted",
        },
        { new: true }
      );
      res.json(offer);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
);
router.put(
  "/refuseOffer/:offerId",
  Auth(["Investor", "Admin"]),
  asyncHandler(async (req, res) => {
    const { offerId } = req.params;
    try {
      const offer = await OfferCrud.updateOffer(
        offerId,
        {
          status: "Rejected",
        },
        { new: true }
      );
      res.json(offer);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
);
//get Offers
router.get(
  "/getPropOffers/:propId",
  Auth(["Admin", "Investor", "Buyer", "Retail"]),
  asyncHandler(async (req, res) => {
    try {
      const offers = await OfferCrud.getOffers(req.params.propId, {
        property: req.params.propId,
      });
      res.json(offers);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
);
router.get(
  "/getAllOffers/:userId",
  Auth(["Admin", "Investor", "Buyer", "Retail"]),
  asyncHandler(async (req, res) => {
    try {
      const offers = await OfferCrud.getOffers(req.params.userId, {
        buyer: req.params.userId,
      });
      res.json(offers);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
);
router.get(
  "/getAllOffers/seller/:userId",
  Auth(["Admin", "Investor", "Buyer", "Retail"]),
  asyncHandler(async (req, res) => {
    try {
      const offers = await OfferCrud.getOffers(req.params.userId, {
        seller: req.params.userId,
      });
      res.json(offers);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
);
router.get(
  "/getAllOffers/",
  Auth(["Admin"]),
  asyncHandler(async (req, res) => {
    try {
      const offers = await OfferCrud.getOffers({});
      res.json(offers);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
);
// Get an offer by ID
router.get(
  "/getOfferByID/:id",
  Auth(["Admin", "Investor", "Buyer", "Retail"]),
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      const offer = await OfferCrud.getOfferById(id);
      if (!offer) {
        return res.status(404).send("Offer not found");
      }
      res.json(offer);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
);

// Update an offer
router.put(
  "/updateOffer/:id",
  Auth(["Admin", "Investor", "Retail"]),
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const {
      property, // Optional property ID to update
      buyer, // Optional investor ID to update
      amount, // Optional amount to update
      EMD, // Optional Earnest Money Deposit to update
      status, // Optional status to update
    } = req.body;
    try {
      const offer = await OfferCrud.updateOffer(id, {
        property: req.params.propertyID,
        buyer: req.params._id,
        amount,
        EMD,
        status,
      });
      if (!offer) {
        return res.status(404).send("Offer not found");
      }
      res.json(offer);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
);

// Delete an offer
router.delete(
  "/deleteOffer/:id",
  Auth(["Admin", "Investor", "Retail", "Buyer"]),
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      const offer = await OfferCrud.deleteOffer(id);
      if (!offer) {
        return res.status(404).send("Offer not found");
      }
      res.json({ message: "Offer deleted successfully" });
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
);

// Get all messages
router.get(
  "/getAllMessages/:userId",
  Auth(["Admin", "Investor", "Buyer", "Retail"]),
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.user.role === "Admin") {
      filter = { receiver: req.params.userId };
    }
    if (req.user.role === "Investor") {
      filter = { receiver: req.params.userId };
    } else {
      filter = { sender: req.params.userId };
    }

    try {
      const messages = await messageCrud.getMessage(filter); // Find all messages
      res.json(messages);
    } catch (error) {
      res.status(500).send(error.message); // Send error message
    }
  })
);
router.put(
  "/sendReply/:messageId",
  Auth(Roles),
  asyncHandler(async (req, res) => {
    const { messageId } = req.params;
    const { reply } = req.body;
    console.log(messageId, reply);
    try {
      const message = await messageCrud.sendReply(messageId, reply);
      res.json(message);
    } catch (error) {
      res.status(500).send(error);
    }
  })
);
// Get a message by ID
router.get(
  "/messages/:id",
  Auth(["Admin", "Investor", "Buyer", "Retail"]),
  asyncHandler(async (req, res) => {
    try {
      const id = req.params.id; // Extract ID from request parameters // Extract ID from request parameters
      const message = await messageCrud.getMessageById(id);
      if (!message) {
        return res.status(404).send("Message not found"); // Handle non-existent message
      }
      res.json(message);
    } catch (error) {
      res.status(500).send(error.message); // Send error message
    }
  })
);

// Create a new message
router.post(
  "/createMessage",
  Auth(["Admin", "Investor", "Buyer", "Retail"]),
  asyncHandler(async (req, res) => {
    const { sender, receiver, content, property } = req.body;
    try {
      const message = await messageCrud.insertMessage({
        property,
        sender: req.user._id,
        receiver,
        content,
      });
      res.status(201).json(message);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
);

// Get all address requests
router.get(
  "/getAllRequests/seller/:userId",
  Auth(["Admin", "Investor", "Retail"]),
  asyncHandler(async (req, res) => {
    try {
      const requests = await addressRequestsCrud.getAllRequests({
        seller: req.params.userId,
      });
      res.json(requests);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
);

router.get(
  "/getAllRequests",
  Auth(["Admin"]),
  asyncHandler(async (req, res) => {
    try {
      const requests = await addressRequestsCrud.getAllRequests({});
      res.json(requests);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
);
router.get(
  "/getAllRequests/:userId",
  Auth(["Admin", "Investor", "Retail", "Buyer"]),
  asyncHandler(async (req, res) => {
    try {
      const requests = await addressRequestsCrud.getAllRequests({
        user: req.params.userId,
      });
      res.json(requests);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
);

// Get an address request by ID
router.get(
  "/getRequestById/:id",
  Auth(["Admin", "Investor", "Retail"]),
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      const request = await addressRequestsCrud.getRequestById(id);
      if (!request) {
        return res.status(404).send("Address request not found");
      }
      res.json(request);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
);

router.put(
  "/acceptRequest/:requestId",
  Auth(["Investor", "Admin"]),
  asyncHandler(async (req, res) => {
    const { requestId } = req.params;
    try {
      const offer = await addressRequestsCrud.updateRequestStatus(requestId, {
        status: "Approved",
      });
      res.json(offer);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
);
router.put(
  "/refuseRequest/:requestId",
  Auth(["Investor", "Admin"]),
  asyncHandler(async (req, res) => {
    const { requestId } = req.params;
    try {
      const offer = await addressRequestsCrud.updateRequestStatus(requestId, {
        status: "Rejected",
      });
      res.json(offer);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
);

// Create a new address request
router.post(
  "/sendAddressRequest",
  Auth(["Admin", "Investor", "Buyer"]),
  asyncHandler(async (req, res) => {
    const { user, property, status, seller } = req.body; // Assuming request data is in the body

    try {
      const request = await addressRequestsCrud.SendAddressRequest({
        user: req.user._id,
        property,
        status,
        seller,
      });
      res.status(201).json(request); // Send created request with status 201 (Created)
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  })
);
// Delete an address request by ID
router.delete(
  "/deleteRequest/:id",
  Auth(["Admin", "Investor", "Retail", "Buyer"]),
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      const request = await addressRequestsCrud.deleteRequest(id);
      if (!request) {
        return res.status(404).send("Address request not found");
      }
      res.json({ message: "Address request deleted successfully" });
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
);

// Update address request status
router.put(
  "/updateRequestStatus/:id",
  Auth(["Admin", "Investor", "Retail"]),
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const status = req.body; // Assuming status is in the body
    if (!status) {
      return res.status(400).send("Missing request status in the body");
    }
    try {
      const request = await addressRequestsCrud.updateRequestStatus(id, status);
      if (!request) {
        return res.status(404).send("Address request not found");
      }
      res.json(request);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
);

// Get all buyers
router.get(
  "/getAllBuyers",
  Auth(["Admin", "Investor"]),
  asyncHandler(async (req, res) => {
    try {
      if ((req.user.role = "Admin")) {
        const buyers = await BuyerCrud.getBuyers();
        res.json(buyers);
      } else {
        const buyers = await BuyerCrud.getBuyers({ user: req.user._id });
        res.json(buyers);
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
);

// Get a buyer by ID
router.get(
  "/getBuyerById/:id",
  Auth(["Admin", "Investor"]),
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      const buyer = await BuyerCrud.getBuyerById(id);
      if (!buyer) {
        return res.status(404).send("Buyer not found");
      }
      res.json(buyer);
    } catch (error) {
      res.status(500).send(error.message + "Id incorrect");
    }
  })
);

// Create a new buyer
router.post(
  "/createBuyer",
  Auth(["Admin", "Investor"]),
  asyncHandler(async (req, res) => {
    req.body.user = req.user._id;
    const buyerData = req.body; // Assuming buyer data is in the body
    // Validate required fields
    const requiredFields = ["fullName", "email", "phoneNumber", "investorType"];
    const missingFields = requiredFields.filter(
      (field) => !buyerData.hasOwnProperty(field)
    );
    if (missingFields.length > 0) {
      return res
        .status(400)
        .send(`Missing required fields: ${missingFields.join(", ")}`);
    }
    try {
      buyerData.user = req.user._id;
      console.log(buyerData);
      const buyer = await BuyerCrud.insertBuyer(buyerData); // Assuming insertBuyer doesn't modify data
      res.status(201).json(buyer); // Send created buyer with status 201 (Created)
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
);

// Update a buyer
router.put(
  "/updateBuyer/:id",
  Auth(["Admin", "Investor"]),
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const buyerUpdates = req.body;

    try {
      const buyer = await BuyerCrud.updateBuyer(id, buyerUpdates);
      if (!buyer) {
        return res.status(404).send("Buyer not found");
      }
      res.json(buyer);
    } catch (error) {
      res.status(500).send(error.message + "Incorrect Buyer ID");
    }
  })
);

// Delete a buyer
router.delete(
  "/deleteBuyer/:id",
  Auth(["Admin", "Investor"]),
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      const buyer = await BuyerCrud.deleteBuyer(id);
      if (!buyer) {
        return res.status(404).send("Buyer not found");
      }
      res.json({ message: "Buyer deleted successfully" });
    } catch (error) {
      res.status(500).send(error.message + "\n ID Is Incorrect");
    }
  })
);

// Create Campaign
router.post("/sendEmail", Auth(["Admin", "Investor"]), async (req, res) => {
  const { CampaignName, recipients, subject, text, html } = req.body;

  if (!recipients || !subject || !text || !html) {
    return res
      .status(400)
      .send("Missing required fields: recipients, subject, text, html");
  }

  try {
    const user = req.user._id;
    const propertyID = req.body.property;
    await MarketingCrud.emailSender(
      user,
      propertyID,
      CampaignName,
      recipients,
      subject,
      text,
      html
    );
    res.status(200).send("Emails sent successfully");
  } catch (error) {
    res.status(500).send("Error sending emails" + error);
  }
});

router.get(
  "/campaignEmailStats/:id",
  Auth(["Admin", "Investor"], async (req, res) => {
    const campaignId = req.params.id;

    try {
      const campaign = await MarketingCrud.findCampaignById(campaignId);
      if (!campaign) {
        return res.status(404).send("Campaign not found");
      }

      // Extracting required fields
      const { _id, emailsSent, CampaignName } = campaign;

      // Sending only the required fields
      res.status(200).json({ _id, emailsSent });
    } catch (error) {
      res.status(500).send("Error fetching campaign data: " + error);
    }
  })
);
// Route to get email statistics by campaign ID

router.post("/sendSms/", Auth(["Admin", "Investor"]), async (req, res) => {
  const { CampaignName, recipients, text } = req.body;

  if (!recipients || !text) {
    return res.status(400).send("Missing required fields: recipients, text");
  }

  try {
    const user = req.user._id;
    const property = req.body.property;
    await MarketingCrud.sendSMS(user, property, CampaignName, recipients, text);
    res.status(200).send("SMS sent successfully");
  } catch (error) {
    res.status(500).send("Error sending SMS: " + error);
  }
});

router.get(
  "/campaignsForUser",
  Auth(["Admin", "Investor"]),
  async (req, res) => {
    const user = req.user._id;

    try {
      const campaign = await MarketingCrud.findCampaignByUserId(user);
      if (!campaign) {
        return res.status(404).send("user don't have campaigns");
      }

      // Sending only the required fields
      res.status(200).json(campaign);
    } catch (error) {
      res.status(500).send("Error fetching campaign data: " + error);
    }
  }
);

// Route to fetch SMS campaign data by campaign ID
router.get(
  "/campaignSmsStats/:id",
  Auth(["Admin", "Investor"], async (req, res) => {
    const campaignId = req.params.id;

    try {
      const campaign = await MarketingCrud.findCampaignById(campaignId);
      if (!campaign) {
        return res.status(404).send("Campaign not found");
      }

      // Extracting required fields
      const { _id, smsSent, CampaignName } = campaign;

      // Sending only the required fields
      res.status(200).json({ _id, smsSent });
    } catch (error) {
      res.status(500).send("Error fetching campaign data: " + error);
    }
  })
);

// Get Image Property
router.get("/image/:id", async (req, res) => {
  try {
    const property = await propertyCrud.getPropertyById(req.params.id);
    if (!property || !property.mainPhoto) throw new Error();
    res.set("Content-Type", "image/png");
    res.send(property.mainPhoto);
  } catch (e) {}
});

router.get("/images/:id", async (req, res) => {
  try {
    const property = await propertyCrud.getPropertyById(req.params.id);

    const images = property.photos.map((photo) => ({
      contentType: photo.contentType || "image/png",
      data: photo.toString("base64"),
    }));
    res.status(200).json({ images });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
