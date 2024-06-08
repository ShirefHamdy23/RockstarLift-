import {
  MAKE_OFFER_REQUEST,
  MAKE_OFFER_SUCCESS,
  MAKE_OFFER_FAILURE,
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
  REFUSE_OFFER_SUCCESS,
  REFUSE_OFFER_FAILURE,
  FETCH_OFFERS_BY_PROPERTY_ID_REQUEST,
  FETCH_OFFERS_BY_PROPERTY_ID_SUCCESS,
  FETCH_OFFERS_BY_PROPERTY_ID_FAILURE,
  DELETE_OFFER_SUCCESS,
  DELETE_OFFER_REQUEST,
  DELETE_OFFER_FAILURE,
} from "../action/types";

const initialState = {
  loading: false,
  offer: null,
  error: null,
  offers: [],
  acceptedOffer: null,
  refusedOffer: null,
};

export const offerReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_OFFER_REQUEST:
      return { ...state, loading: true };
    case MAKE_OFFER_SUCCESS:
      return { ...state, loading: false, error: null };
    case MAKE_OFFER_FAILURE:
      return { ...state, loading: false, offer: null, error: action.payload };
    case FETCH_OFFERS_BY_USER_REQUEST:
      return { ...state, loading: true };
    case FETCH_OFFERS_BY_USER_SUCCESS:
      return { ...state, loading: false, offers: action.payload, error: null };
    case FETCH_OFFERS_BY_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FETCH_OFFERS_BY_SELLER_REQUEST:
      return { ...state, loading: true };
    case FETCH_OFFERS_BY_SELLER_SUCCESS:
      return { ...state, loading: false, offers: action.payload, error: null };
    case FETCH_OFFERS_BY_SELLER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ACCEPT_OFFER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACCEPT_OFFER_SUCCESS:
      return {
        ...state,
        loading: false,
        acceptedOffer: action.payload,
      };
    case ACCEPT_OFFER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case REFUSE_OFFER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REFUSE_OFFER_SUCCESS:
      return {
        ...state,
        loading: false,
        refusedOffer: action.payload,
      };
    case REFUSE_OFFER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_OFFERS_BY_PROPERTY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_OFFERS_BY_PROPERTY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        offers: action.payload,
      };
    case FETCH_OFFERS_BY_PROPERTY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_OFFER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_OFFER_SUCCESS:
      return {
        ...state,
        loading: false,
        offers: state.offers.filter((offer) => offer._id !== action.payload),
      };
    case DELETE_OFFER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
