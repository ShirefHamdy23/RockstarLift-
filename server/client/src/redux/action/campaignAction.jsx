// src/actions/campaignActions.js
import axios from "axios";
import {
  CREATE_CAMPAIGN_REQUEST,
  CREATE_CAMPAIGN_SUCCESS,
  CREATE_CAMPAIGN_FAILURE,
  FETCH_ALL_CAMPAIGNS_FAILURE,
  FETCH_ALL_CAMPAIGNS_REQUEST,
  FETCH_ALL_CAMPAIGNS_SUCCESS,
} from "./types";
import { toast } from "react-toastify";

export const createCampaign = (campaignData, method) => async (dispatch) => {
  dispatch({ type: CREATE_CAMPAIGN_REQUEST });
  try {
    const response = await axios.post(
      `http://localhost:8000/api/${
        method === "email" ? "sendEmail" : "sendSms"
      }`,
      campaignData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    dispatch({
      type: CREATE_CAMPAIGN_SUCCESS,
      payload: response.data,
    });
    toast.success("Campaign sent successfully");
  } catch (error) {
    dispatch({
      type: CREATE_CAMPAIGN_FAILURE,
      payload: error.message,
    });
    toast.error("Failed to send campaign. Please try again.");
  }
};

export const fetchAllCampaigns = () => async (dispatch) => {
  dispatch({
    type: FETCH_ALL_CAMPAIGNS_REQUEST,
  });
  try {
    const response = await axios.get(
      "http://localhost:8000/api/campaignsForUser",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch({
      type: FETCH_ALL_CAMPAIGNS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ALL_CAMPAIGNS_FAILURE,
      payload: error.message,
    });
  }
};
