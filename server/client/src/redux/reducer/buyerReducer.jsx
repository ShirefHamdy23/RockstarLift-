import {
  ADD_NEW_BUYER_FAILURE,
  ADD_NEW_BUYER_REQUEST,
  ADD_NEW_BUYER_SUCCESS,
  DELETE_BUYER_FAILURE,
  DELETE_BUYER_REQUEST,
  DELETE_BUYER_SUCCESS,
  FETCH_BUYER_BY_ID_FAILURE,
  FETCH_BUYER_BY_ID_REQUEST,
  FETCH_BUYER_BY_ID_SUCCESS,
  FETCH_BUYER_FAILURE,
  FETCH_BUYER_SUCCESS,
  FETCH_Buyer_REQUEST,
} from "../action/types";

const initialState = {
  buyers: [],
  loading: false,
  error: "",
  buyer: {},
};

const buyerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_Buyer_REQUEST:
      return { ...state, loading: true };
    case FETCH_BUYER_SUCCESS:
      return {
        ...state,
        loading: false,
        buyers: action.payload,
        error: null,
      };
    case FETCH_BUYER_FAILURE:
      return {
        ...state,
        loading: true,
        buyers: [],
        error: action.payload,
      };
    case ADD_NEW_BUYER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_NEW_BUYER_SUCCESS:
      return {
        ...state,
        loading: false,
        buyers: [...state.buyers, action.payload],
      };
    case ADD_NEW_BUYER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_BUYER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_BUYER_SUCCESS:
      return {
        ...state,
        buyers: state.buyers.filter((buyer) => buyer._id !== action.payload),
        loading: false,
        error: null,
      };
    case DELETE_BUYER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_BUYER_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_BUYER_BY_ID_SUCCESS:
      return {
        ...state,
        buyer: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_BUYER_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default buyerReducer;
