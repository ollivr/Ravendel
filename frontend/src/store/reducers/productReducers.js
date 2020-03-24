import {
  PRODUCT_LOADING,
  PRODUCT_FAIL,
  PRODUCT_SUCCESS,
  PRODUCTS_SUCCESS,
  CATS_SUCCESS,
  CAT_LOADING,
  CAT_FAIL,
  CAT_SUCCESS
} from "../action/productAction";

const initialState = {
  products: [],
  product: {},
  categories: [],
  category: {},
  loading: false,
  success: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CAT_LOADING:
      return {
        ...state,
        loading: true,
        success: false
      };
    case CATS_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        loading: false,
        success: true
      };
    case CAT_SUCCESS:
      return {
        ...state,
        category: action.payload,
        loading: false,
        success: true
      };
    case CAT_FAIL:
      return {
        ...state,
        loading: false,
        success: false
      };
    case PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
        success: true
      };
    case PRODUCT_LOADING:
      return {
        ...state,
        loading: true,
        success: false
      };
    case PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload,
        loading: false,
        success: true
      };
    case PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        success: false
      };
    default:
      return state;
  }
};
