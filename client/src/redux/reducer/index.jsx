// reducers/index.js
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { propertyReducer } from "./propertiesReducer";
import { imageReducer } from "./imageReducer";
import { offerReducer } from "./OfferReducer";
import { messageReducer } from "./messageReducer";
import { addressReducer } from "./addressReducer";
import buyerReducer from "./buyerReducer";
import userReducer from "./userReducer";
import campaignReducer from "./campaignReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  properties: propertyReducer,
  images: imageReducer,
  offers: offerReducer,
  message: messageReducer,
  requests: addressReducer,
  buyers: buyerReducer,
  users: userReducer,
  campaigns: campaignReducer,
  // Add other reducers here if needed
});

export default rootReducer;
