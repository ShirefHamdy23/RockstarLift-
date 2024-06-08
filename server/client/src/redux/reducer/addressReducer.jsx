// reducers/addressReducer.js
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
} from "../action/types";

const initialState = {
  loading: false,
  response: null,
  requests: [],
  error: null,
  acceptedRequest: null,
};

export const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_ADDRESS_REQUEST:
      return { ...state, loading: true };
    case POST_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case POST_ADDRESS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FETCH_REQUESTS_BY_ADDRESS_REQUEST:
      return { ...state, loading: true };
    case FETCH_REQUESTS_BY_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        requests: action.payload,
        error: null,
      };
    case FETCH_REQUESTS_BY_ADDRESS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DELETE_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        addresses: state.addresses.filter(
          (address) => address._id !== action.payload
        ),
      };
    case DELETE_ADDRESS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_ADDRESS_REQUEST_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ADDRESS_REQUEST_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        requests: action.payload,
      };
    case FETCH_ADDRESS_REQUEST_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ACCEPT_REQUEST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACCEPT_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        acceptedRequest: action.payload,
      };
    case ACCEPT_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case REFUSE_REQUEST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REFUSE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        acceptedRequest: action.payload,
      };
    case REFUSE_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
