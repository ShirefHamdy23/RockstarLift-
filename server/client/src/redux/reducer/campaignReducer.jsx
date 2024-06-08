// src/reducers/campaignReducer.js
import {
  FETCH_ALL_CAMPAIGNS_FAILURE,
  FETCH_ALL_CAMPAIGNS_REQUEST,
  FETCH_ALL_CAMPAIGNS_SUCCESS,
  CREATE_CAMPAIGN_REQUEST,
  CREATE_CAMPAIGN_SUCCESS,
  CREATE_CAMPAIGN_FAILURE,
} from "../action/types";

const initialState = {
  loading: false,
  success: false,
  error: null,
  campaigns: [],
};

const campaignReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CAMPAIGN_REQUEST:
      return { ...state, loading: true };

    case CREATE_CAMPAIGN_SUCCESS:
      return { ...state, loading: false, success: true, error: null };

    case CREATE_CAMPAIGN_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case FETCH_ALL_CAMPAIGNS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ALL_CAMPAIGNS_SUCCESS:
      return {
        ...state,
        loading: false,
        campaigns: action.payload,
      };
    case FETCH_ALL_CAMPAIGNS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default campaignReducer;
