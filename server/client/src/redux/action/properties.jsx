import axios from "axios";
import {
  FETCH_PROPERTIES_REQUEST,
  FETCH_PROPERTIES_SUCCESS,
  FETCH_PROPERTIES_FAILURE,
  FETCH_PROPERTY_REQUEST,
  FETCH_PROPERTY_SUCCESS,
  FETCH_PROPERTY_FAILURE,
  FETCH_IMAGES_REQUEST,
  FETCH_IMAGES_SUCCESS,
  FETCH_IMAGES_FAILURE,
  FETCH_FILTERED_PROPERTIES_REQUEST,
  FETCH_FILTERED_PROPERTIES_SUCCESS,
  FETCH_FILTERED_PROPERTIES_FAILURE,
  ADD_PROPERTY_REQUEST,
  ADD_PROPERTY_SUCCESS,
  ADD_PROPERTY_FAILURE,
  UPDATE_PROPERTY_REQUEST,
  UPDATE_PROPERTY_SUCCESS,
  UPDATE_PROPERTY_FAILURE,
  DELETE_PROPERTY_REQUEST,
  DELETE_PROPERTY_SUCCESS,
  DELETE_PROPERTY_FAILURE,
} from "./types";
import { toast } from "react-toastify";

export const fetchPropertiesBySellerId = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_PROPERTIES_REQUEST });

  try {
    const response = await axios.get(
      `http://localhost:8000/api/getAllProperties/${userId}`
    );
    dispatch({ type: FETCH_PROPERTIES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_PROPERTIES_FAILURE, payload: error.message });
  }
};

export const fetchProperties = () => async (dispatch) => {
  dispatch({ type: FETCH_PROPERTIES_REQUEST });

  try {
    const response = await axios.get(
      "http://localhost:8000/api/getAllProperties"
    );
    dispatch({ type: FETCH_PROPERTIES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_PROPERTIES_FAILURE, payload: error.message });
  }
};

export const fetchFilteredProperties = (filterKey, filterValue) => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_FILTERED_PROPERTIES_REQUEST,
    });
    try {
      const response = await axios.get(
        `http://localhost:8000/api/getAllPropertiesByFilter?${filterKey}=${filterValue}`
      );
      dispatch({
        type: FETCH_FILTERED_PROPERTIES_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_FILTERED_PROPERTIES_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const fetchProperty = (propertyId) => async (dispatch) => {
  dispatch({
    type: FETCH_PROPERTY_REQUEST,
  });

  try {
    const response = await axios.get(
      `http://localhost:8000/api/property/${propertyId}`
    );
    dispatch({ type: FETCH_PROPERTY_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_PROPERTY_FAILURE, payload: error.message });
  }
};

export const fetchImagesRequest = () => ({
  type: FETCH_IMAGES_REQUEST,
});

export const fetchImagesSuccess = (images) => ({
  type: FETCH_IMAGES_SUCCESS,
  payload: images,
});

export const fetchImagesFailure = (error) => ({
  type: FETCH_IMAGES_FAILURE,
  payload: error,
});

export const fetchImages = (propertyId) => {
  return (dispatch) => {
    dispatch(fetchImagesRequest());
    axios
      .get(`http://localhost:8000/api/images/${propertyId}`)
      .then((response) => {
        dispatch(fetchImagesSuccess(response.data.images));
      })
      .catch((error) => {
        dispatch(fetchImagesFailure(error.message));
      });
  };
};

export const addProperty = (propertyData, navigate) => async (dispatch) => {
  dispatch({ type: ADD_PROPERTY_REQUEST });

  try {
    const response = await axios.post(
      "http://localhost:8000/api/insertProperties",
      propertyData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    dispatch({
      type: ADD_PROPERTY_SUCCESS,
      payload: response.data,
    });
    toast.success("Property added successfully!");
    setTimeout(() => {
      navigate("/rockstar-lift/admin-dashboard/properties", { replace: true });
    }, 2000);
  } catch (error) {
    toast.error(error.response.data.message);
    dispatch({
      type: ADD_PROPERTY_FAILURE,
      payload: error.message,
    });
  }
};

export const updateProperty =
  (propertyId, propertyData, history) => async (dispatch) => {
    // dispatch({ type: UPDATE_PROPERTY_REQUEST });

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8000/api/updateProperties/${propertyId}`,
        propertyData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: UPDATE_PROPERTY_SUCCESS,
        payload: response.data,
      });
      toast.success("Property updated successfully!");
      setTimeout(() => {
        window.history.back();
      }, 2000);
    } catch (error) {
      dispatch({
        type: UPDATE_PROPERTY_FAILURE,
        payload: error.message,
      });
      toast.error("Error updating property!");
    }
  };

export const deleteProperty = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PROPERTY_REQUEST });

    await axios.delete(`http://localhost:8000/api/deleteProperties/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    dispatch({
      type: DELETE_PROPERTY_SUCCESS,
      payload: id,
    });
    toast.success("Property deleted successfully!");
  } catch (error) {
    dispatch({
      type: DELETE_PROPERTY_FAILURE,
      payload: error.message,
    });
    toast.error("Error deleting property!");
  }
};
