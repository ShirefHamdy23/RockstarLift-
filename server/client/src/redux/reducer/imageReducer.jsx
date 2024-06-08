import {
  FETCH_IMAGES_REQUEST,
  FETCH_IMAGES_SUCCESS,
  FETCH_IMAGES_FAILURE,
} from "../action/types";

const initialState = {
  loading: false,
  images: [],
  error: null,
};

export const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_IMAGES_REQUEST:
      return { ...state, loading: true };
    case FETCH_IMAGES_SUCCESS:
      return { ...state, loading: false, images: action.payload, error: null };
    case FETCH_IMAGES_FAILURE:
      return { ...state, loading: false, images: [], error: action.payload };
    default:
      return state;
  }
};
