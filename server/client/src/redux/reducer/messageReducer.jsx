// messageReducer.js
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
} from "../action/types";

const initialState = {
  loading: false,
  error: null,
  messages: [],
};

export const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE_REQUEST:
      return { ...state, loading: true };
    case SEND_MESSAGE_SUCCESS:
      return { ...state, loading: false, error: null };
    case SEND_MESSAGE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FETCH_MESSAGES_REQUEST:
      return { ...state, loading: true };
    case FETCH_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: action.payload,
        error: null,
      };
    case FETCH_MESSAGES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case SEND_REPLY_REQUEST:
      return { ...state, loading: true, success: false, error: null };
    case SEND_REPLY_SUCCESS:
      return { ...state, loading: false, success: true, error: null };
    case SEND_REPLY_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
