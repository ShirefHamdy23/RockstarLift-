// actions/addressActions.js
import axios from "axios";
import {
  POST_ADDRESS_REQUEST,
  POST_ADDRESS_SUCCESS,
  POST_ADDRESS_FAILURE,
  FETCH_REQUESTS_BY_ADDRESS_REQUEST,
  FETCH_REQUESTS_BY_ADDRESS_SUCCESS,
  FETCH_REQUESTS_BY_ADDRESS_FAILURE,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAILURE,
  FETCH_ADDRESS_REQUEST_BY_ID_REQUEST,
  FETCH_ADDRESS_REQUEST_BY_ID_SUCCESS,
  FETCH_ADDRESS_REQUEST_BY_ID_FAILURE,
  ACCEPT_REQUEST_REQUEST,
  ACCEPT_REQUEST_SUCCESS,
  ACCEPT_REQUEST_FAILURE,
  REFUSE_REQUEST_REQUEST,
  REFUSE_REQUEST_SUCCESS,
  REFUSE_REQUEST_FAILURE,
} from "./types";
import { toast } from "react-toastify";

export const postAddress = (addressData) => {
  return async (dispatch) => {
    dispatch({
      type: POST_ADDRESS_REQUEST,
    });
    try {
      const response = await axios.post(
        "http://localhost:8000/api/sendAddressRequest",
        addressData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you store the token in localStorage
          },
        }
      );
      dispatch({
        type: POST_ADDRESS_SUCCESS,
        payload: response.data,
      });

      toast.success("Your address request has been sent successfully");
    } catch (error) {
      dispatch({
        type: POST_ADDRESS_FAILURE,
        payload: error.message,
      });
      toast.error("Failed to address request. Please try again.");
    }
  };
};

export const fetchAddressByUser = (userId) => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_REQUESTS_BY_ADDRESS_REQUEST,
    });
    try {
      const response = await axios.get(
        `http://localhost:8000/api/getAllRequests/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch({
        type: FETCH_REQUESTS_BY_ADDRESS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_REQUESTS_BY_ADDRESS_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const deleteAddress = (id, navigate) => async (dispatch) => {
  dispatch({
    type: DELETE_ADDRESS_REQUEST,
  });
  try {
    await axios.delete(`http://localhost:8000/api/deleteRequest/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch({
      type: DELETE_ADDRESS_SUCCESS,
      payload: id,
    });

    setTimeout(() => {
      navigate(0, { replace: true });
    }, 2000);
  } catch (error) {
    dispatch({
      type: DELETE_ADDRESS_FAILURE,
      payload: error,
    });
  }
};

export const fetchORequestsBySellerId = (sellerId) => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_ADDRESS_REQUEST_BY_ID_REQUEST,
    });
    try {
      const response = await axios.get(
        `http://localhost:8000/api/getAllRequests/seller/${sellerId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch({
        type: FETCH_ADDRESS_REQUEST_BY_ID_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_ADDRESS_REQUEST_BY_ID_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const acceptAddress =
  (addressId, navigate) => async (dispatch, getState) => {
    dispatch({ type: ACCEPT_REQUEST_REQUEST });

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8000/api/acceptRequest/${addressId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: ACCEPT_REQUEST_SUCCESS,
        payload: response.data,
      });
      toast.success("Address Accepted Successfully");
      setTimeout(() => {
        navigate(0, { replace: true });
      }, 2000);
    } catch (error) {
      dispatch({
        type: ACCEPT_REQUEST_FAILURE,
        payload: error.message,
      });
      toast.error("Failed to address offer. Please try again.");
    }
  };

export const refuseAddress =
  (addressId, navigate) => async (dispatch, getState) => {
    dispatch({ type: REFUSE_REQUEST_REQUEST });

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8000/api/refuseRequest/${addressId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: REFUSE_REQUEST_SUCCESS,
        payload: response.data,
      });
      toast.success("Address Refused Successfully");
      setTimeout(() => {
        navigate(0, { replace: true });
      }, 2000);
    } catch (error) {
      dispatch({
        type: REFUSE_REQUEST_FAILURE,
        payload: error.message,
      });
      toast.error("Failed to refused address. Please try again.");
    }
  };
