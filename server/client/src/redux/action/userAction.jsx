import axios from "axios";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  FETCH_MY_PROFILE_REQUEST,
  FETCH_MY_PROFILE_SUCCESS,
  FETCH_MY_PROFILE_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  LOGOUT,
  ADD_NEW_USER_FAILURE,
  ADD_NEW_USER_REQUEST,
  ADD_NEW_USER_SUCCESS,
  Update_USER_REQUEST,
  Update_USER_SUCCESS,
  Update_USER_FAILURE,
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
} from "./types";
import { toast } from "react-toastify";

export const registration = (userData, navigate) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const response = await axios.post(
      "http://localhost:8000/api/user/auth/register",
      userData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch({ type: REGISTER_SUCCESS, payload: response.data });
    toast.success("Registration successful!");
    setTimeout(() => {
      navigate("/rockstar-lift/login");
    }, 2000);
  } catch (error) {
    toast.error(error.response.data.message);
    dispatch({ type: REGISTER_FAILURE, payload: error.response.data });
  }
  return true;
};

export const login = (userData, navigate) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await axios.post(
      "http://localhost:8000/api/user/auth/login",
      userData
    );
    const { token, user } = response.data;
    // Store token in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("userId", response.data.user._id);
    localStorage.setItem("role", response.data.user.role);

    dispatch({ type: LOGIN_SUCCESS, payload: { user, token } });
    toast.success("Login successful!");
    setTimeout(() => {
      if (response.data.user.role === "Investor") {
        return navigate("/rockstar-lift/seller/dashboard");
      } else if (response.data.user.role === "Buyer") {
        navigate("/rockstar-lift");
      } else {
        navigate("/rockstar-lift/admin-dashboard");
      }
    }, 2000);
  } catch (error) {
    toast.error(error.response.data.message);
    dispatch({ type: LOGIN_FAILURE, payload: error.response.data });
  }
};

export const logout = (navigate) => async (dispatch) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    "http://localhost:8000/api/user/auth/logout",
    {},
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  dispatch({ type: LOGOUT });

  toast.success("Logout successful!");
  setTimeout(() => {
    navigate("/rockstar-lift/login", { replace: true });
    window.location.reload();
  }, 2000);
  setInterval(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
  }, 2000);
};

export const fetchMyProfile = () => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_MY_PROFILE_REQUEST,
    });
    try {
      const response = await axios.get(
        "http://localhost:8000/api/user/profile/me",
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ); // Replace with your API endpoint
      dispatch({
        type: FETCH_MY_PROFILE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_MY_PROFILE_FAILURE,
        payload: error.response.data.message,
      });
    }
  };
};
export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: FETCH_USER_REQUEST });

  try {
    const response = await axios.get(
      "http://localhost:8000/api/user/getallusers",

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch({ type: FETCH_USER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_USER_FAILURE, payload: error.message });
  }
};

export const addNewUser = (userData) => {
  return async (dispatch) => {
    dispatch({
      type: ADD_NEW_USER_REQUEST,
    });
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/createUser",
        userData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch({
        type: ADD_NEW_USER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({ type: ADD_NEW_USER_FAILURE, payload: error.response.data });
    }
  };
};
export const updateUser = (userData, id, navigate) => {
  return async (dispatch) => {
    dispatch({
      type: Update_USER_REQUEST,
    });
    try {
      const response = await axios.put(
        `http://localhost:8000/api/user/update/${id}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch({
        type: Update_USER_SUCCESS,
        payload: response.data,
      });

      toast.success("User updated successfully!");
      navigate(0, { replace: true });
    } catch (error) {
      dispatch({ type: Update_USER_FAILURE, payload: error.message });
      toast.error("User update failed!");
    }
  };
};
export const deleteUser = (id) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_USER_REQUEST });
    try {
      await axios.delete(`http://localhost:8000/api/user/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("User deleted successfully!");
      dispatch({ type: DELETE_USER_SUCCESS, payload: id });
    } catch (error) {
      dispatch({ type: DELETE_USER_FAILURE, payload: error.response });
      toast.error("User deletion failed!");
    }
  };
};

export const updateProfile =
  (userData, navigate) => async (dispatch, getState) => {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      for (const key in userData) {
        if (key === "profilePic") {
          formData.append(key, userData[key][0]);
        } else {
          formData.append(key, userData[key]);
        }
      }
      const response = await axios.put(
        `http://localhost:8000/api/user/me/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: response.data,
      });
      toast.success("Profile updated successfully!");
      setTimeout(() => {
        navigate(0, { replace: true });
      }, 2000);
    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_FAILURE,
        payload: error.message,
      });
      toast.error("Profile update failed!");
      // setTimeout(() => {
      //   window.location.reload();
      // }, 2000);
    }
  };
