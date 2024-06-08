import axios from "axios";
import {
  MAKE_OFFER_FAILURE,
  MAKE_OFFER_REQUEST,
  MAKE_OFFER_SUCCESS,
  FETCH_OFFERS_BY_USER_REQUEST,
  FETCH_OFFERS_BY_USER_SUCCESS,
  FETCH_OFFERS_BY_USER_FAILURE,
  FETCH_OFFERS_BY_SELLER_REQUEST,
  FETCH_OFFERS_BY_SELLER_SUCCESS,
  FETCH_OFFERS_BY_SELLER_FAILURE,
  ACCEPT_OFFER_REQUEST,
  ACCEPT_OFFER_SUCCESS,
  ACCEPT_OFFER_FAILURE,
  REFUSE_OFFER_REQUEST,
  FETCH_OFFERS_BY_PROPERTY_ID_REQUEST,
  FETCH_OFFERS_BY_PROPERTY_ID_SUCCESS,
  FETCH_OFFERS_BY_PROPERTY_ID_FAILURE,
  DELETE_OFFER_REQUEST,
  DELETE_OFFER_SUCCESS,
  DELETE_OFFER_FAILURE,
} from "./types";
import { toast } from "react-toastify";

export const makeOffer = (offerData) => {
  return async (dispatch) => {
    dispatch({
      type: MAKE_OFFER_REQUEST,
    });
    try {
      const response = await axios.post(
        "http://localhost:8000/api/createOffer",
        offerData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you store the token in localStorage
          },
        }
      );
      dispatch({
        type: MAKE_OFFER_SUCCESS,
        payload: response.data,
      });
      toast.success("Your offer has been submitted successfully");
    } catch (error) {
      toast.error("Failed to submit offer. Please try again.");
      dispatch({ type: MAKE_OFFER_FAILURE, payload: error.response.data });
    }
  };
};

export const fetchOffersByUser = (userId) => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_OFFERS_BY_USER_REQUEST,
    });
    try {
      const response = await axios.get(
        `http://localhost:8000/api/getAllOffers/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch({
        type: FETCH_OFFERS_BY_USER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_OFFERS_BY_USER_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const fetchOffersBySellerId = (sellerId) => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_OFFERS_BY_SELLER_REQUEST,
    });
    try {
      const response = await axios.get(
        `http://localhost:8000/api/getAllOffers/seller/${sellerId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch({
        type: FETCH_OFFERS_BY_SELLER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_OFFERS_BY_SELLER_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const acceptOffer = (offerId) => async (dispatch, getState) => {
  dispatch({ type: ACCEPT_OFFER_REQUEST });

  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `http://localhost:8000/api/acceptOffer/${offerId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: ACCEPT_OFFER_SUCCESS,
      payload: response.data,
    });
    toast.success("Offer Accepted Successfully");
  } catch (error) {
    dispatch({
      type: ACCEPT_OFFER_FAILURE,
      payload: error.message,
    });
    toast.error("Failed to accept offer. Please try again.");
  }
};

export const refuseOffer = (offerId) => async (dispatch, getState) => {
  dispatch({ type: REFUSE_OFFER_REQUEST });

  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `http://localhost:8000/api/refuseOffer/${offerId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: ACCEPT_OFFER_SUCCESS,
      payload: response.data,
    });
    toast.success("Offer Refused Successfully");
  } catch (error) {
    dispatch({
      type: REFUSE_OFFER_FAILURE,
      payload: error.message,
    });
    toast.error("Failed to refused offer. Please try again.");
  }
};

export const fetchOffersByPropertyId = (propertyId) => async (dispatch) => {
  dispatch({ type: FETCH_OFFERS_BY_PROPERTY_ID_REQUEST });
  try {
    const response = await axios.get(
      `http://localhost:8000/api/getPropOffers/${propertyId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch({
      type: FETCH_OFFERS_BY_PROPERTY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_OFFERS_BY_PROPERTY_ID_FAILURE,
      payload: error.message,
    });
  }
};

export const deleteOffer = (id, navigate) => async (dispatch) => {
  dispatch({
    type: DELETE_OFFER_REQUEST,
  });
  try {
    await axios.delete(`http://localhost:8000/api/deleteOffer/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch({
      type: DELETE_OFFER_SUCCESS,
      payload: id,
    });
    toast.success("Offer Deleted Successfully");
    setTimeout(() => {
      navigate(0, { replace: true });
    }, 2000);
  } catch (error) {
    dispatch({
      type: DELETE_OFFER_FAILURE,
      payload: error.message,
    });
    toast.error("Failed to delete offer. Please try again.");
  }
};
