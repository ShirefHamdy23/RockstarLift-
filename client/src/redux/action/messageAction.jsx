// messageActions.js
import axios from "axios";
import {
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE,
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAILURE,
  SEND_REPLY_REQUEST,
  SEND_REPLY_SUCCESS,
  SEND_REPLY_FAILURE,
} from "./types";
import { toast } from "react-toastify";

export const sendMessage = (messageData) => {
  return async (dispatch) => {
    dispatch({
      type: SEND_MESSAGE_REQUEST,
    });
    try {
      // Assuming your API endpoint is '/api/messages'
      await axios.post("http://localhost:8000/api/createMessage", messageData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you store the token in localStorage
        },
      });
      dispatch({
        type: SEND_MESSAGE_SUCCESS,
      });
      toast.success("Message sent successfully");
    } catch (error) {
      dispatch({
        type: SEND_MESSAGE_FAILURE,
        payload: error.message,
      });
      toast.success("Failed to send message. Please try again.");
    }
  };
};

export const fetchMsgsByUser = (userId) => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_MESSAGES_REQUEST,
    });
    try {
      const response = await axios.get(
        `http://localhost:8000/api/getAllMessages/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch({
        type: FETCH_MESSAGES_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_MESSAGES_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const sendReply = (messageId, replyText) => async (dispatch) => {
  try {
    dispatch({ type: SEND_REPLY_REQUEST });
    console.log(replyText);
    const response = await axios.put(
      `http://localhost:8000/api/sendReply/${messageId}`,
      {
        reply: replyText,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    dispatch({
      type: SEND_REPLY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: SEND_REPLY_FAILURE,
      payload: error.response ? error.response.data : "Network Error",
    });
  }
};
