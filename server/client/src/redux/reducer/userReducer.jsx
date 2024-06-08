import {
  ADD_NEW_USER_FAILURE,
  ADD_NEW_USER_REQUEST,
  ADD_NEW_USER_SUCCESS,
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  Update_USER_FAILURE,
  Update_USER_REQUEST,
  Update_USER_SUCCESS,
} from "../action/types";

const initialState = {
  users: {},
  loading: false,
  error: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return { ...state, loading: true };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: null,
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: true,
        users: [],
        error: action.payload,
      };
    case ADD_NEW_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_NEW_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [...state.users, action.payload],
      };
    case ADD_NEW_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Update_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Update_USER_SUCCESS:
      const updatedUserIndex = state.users.data.findIndex(
        (user) => user._id === action.payload._id
      );
      const updatedUsers = [...state.users.data];
      updatedUsers[updatedUserIndex] = action.payload;
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case Update_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter((user) => user._id !== action.payload),
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
