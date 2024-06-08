import {
  FETCH_PROPERTIES_REQUEST,
  FETCH_PROPERTIES_SUCCESS,
  FETCH_PROPERTIES_FAILURE,
  FETCH_PROPERTY_SUCCESS,
  FETCH_PROPERTY_FAILURE,
  FETCH_PROPERTY_REQUEST,
  SET_PROPERTY_FILTER,
  FETCH_FILTERED_PROPERTIES_SUCCESS,
  ADD_PROPERTY_REQUEST,
  ADD_PROPERTY_SUCCESS,
  ADD_PROPERTY_FAILURE,
  UPDATE_PROPERTY_REQUEST,
  UPDATE_PROPERTY_SUCCESS,
  UPDATE_PROPERTY_FAILURE,
  DELETE_PROPERTY_REQUEST,
  DELETE_PROPERTY_SUCCESS,
  DELETE_PROPERTY_FAILURE,
} from "../action/types";

const initialState = {
  loading: false,
  properties: [],
  filteredProperties: [],
  error: null,
  property: null,
  updatedProperty: null,
};

export const propertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROPERTIES_REQUEST:
      return { ...state, loading: true };
    case FETCH_PROPERTIES_SUCCESS:
      return {
        ...state,
        loading: false,
        properties: action.payload,
        error: null,
      };
    case FETCH_PROPERTIES_FAILURE:
      return {
        ...state,
        loading: true,
        properties: [],
        error: action.payload,
      };
    case FETCH_PROPERTY_REQUEST:
      return { ...state, loading: true };
    case FETCH_PROPERTY_SUCCESS:
      return {
        ...state,
        loading: false,
        property: action.payload,
        error: null,
      };
    case FETCH_PROPERTY_FAILURE:
      return {
        ...state,
        loading: false,
        property: null,
        error: action.payload,
      };
    case FETCH_FILTERED_PROPERTIES_SUCCESS:
      return {
        ...state,
        loading: false,
        filteredProperties: action.payload,
        error: null,
      };
    case ADD_PROPERTY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_PROPERTY_SUCCESS:
      return {
        ...state,
        loading: false,
        properties: [...state.properties, action.payload],
      };
    case ADD_PROPERTY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_PROPERTY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PROPERTY_SUCCESS:
      return {
        ...state,
        loading: false,
        updatedProperty: action.payload,
      };
    case UPDATE_PROPERTY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_PROPERTY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PROPERTY_SUCCESS:
      return {
        ...state,
        properties: state.properties.filter(
          (property) => property._id !== action.payload
        ),
        loading: false,
        error: null,
      };
    case DELETE_PROPERTY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
