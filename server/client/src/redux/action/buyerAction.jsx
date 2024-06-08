import axios from "axios";
import {
  ADD_NEW_BUYER_FAILURE,
  ADD_NEW_BUYER_REQUEST,
  ADD_NEW_BUYER_SUCCESS,
  Update_BUYER_FAILURE,
  Update_BUYER_SUCCESS,
  Update_BUYER_REQUEST,
  FETCH_BUYER_SUCCESS,
  FETCH_BUYER_FAILURE,
  FETCH_Buyer_REQUEST,
  DELETE_BUYER_REQUEST,
  DELETE_BUYER_SUCCESS,
  DELETE_BUYER_FAILURE,
  FETCH_BUYER_BY_ID_REQUEST,
  FETCH_BUYER_BY_ID_SUCCESS,
  FETCH_BUYER_BY_ID_FAILURE,
} from "./types";
import { toast } from "react-toastify";

export const getAllBuyers = () => async (dispatch) => {
  dispatch({ type: FETCH_Buyer_REQUEST });

  try {
    const response = await axios.get("http://localhost:8000/api/getAllBuyers", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch({ type: FETCH_BUYER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_BUYER_FAILURE, payload: error.message });
  }
};
export const addNewBuyer = (buyerData) => {
  return async (dispatch) => {
    dispatch({
      type: ADD_NEW_BUYER_REQUEST,
    });
    try {
      const response = await axios.post(
        "http://localhost:8000/api/createBuyer",
        buyerData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch({
        type: ADD_NEW_BUYER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({ type: ADD_NEW_BUYER_FAILURE, payload: error.response.data });
    }
  };
};
export const updateBuyer = (id, buyerData) => {
  return async (dispatch) => {
    dispatch({
      type: Update_BUYER_REQUEST,
    });
    try {
      const response = await axios.put(
        `http://localhost:8000/api/updateBuyer/${id}`,
        buyerData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch({
        type: Update_BUYER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({ type: Update_BUYER_FAILURE, payload: error.response.data });
    }
  };
};

export const deleteBuyer = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BUYER_REQUEST });

    await axios.delete(`http://localhost:8000/api/deleteBuyer/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch({
      type: DELETE_BUYER_SUCCESS,
      payload: id,
    });
    toast.success("Buyer deleted successfully");
  } catch (error) {
    dispatch({
      type: DELETE_BUYER_FAILURE,
      payload: error.message,
    });
    toast.error("Failed to delete buyer. Please try again.");
  }
};

export const fetchBuyerById = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_BUYER_BY_ID_REQUEST });

    // Make API call to fetch buyer by ID
    const response = await axios.get(
      `http://localhost:8000/api/getBuyerById/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();

    dispatch({
      type: FETCH_BUYER_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_BUYER_BY_ID_FAILURE,
      payload: error.message,
    });
  }
};
