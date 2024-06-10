import {
  GET_REGISTER_REQUEST,
  GET_REGISTER_SUCCESS,
  GET_REGISTER_FAILED,
  GET_LOGIN_REQUEST,
  GET_LOGIN_SUCCESS,
  GET_LOGIN_FAILED,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAILED,
  SET_USER,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED
} from '../constants/users';
import { TUser } from '../../utils/types';
import { TUsersAction } from '../actions/users';

export type TUsersState = {
  user: TUser | null
  registerStart: boolean
  registerError: boolean
  loginStart: boolean
  loginError: boolean
  logoutStart: boolean
  logoutError: boolean
  forgotPasswordStart: boolean
  forgotPasswordError: boolean
  resetPasswordStart: boolean
  resetPasswordError: boolean
  getUserStart: boolean
  getUserError: boolean
  getUserRequest: boolean
  getUserSuccess: boolean
  getUserFailed: boolean}

const initialState: TUsersState = {
  user: null,
  registerStart: false,
  registerError: false,
  loginStart: false,
  loginError: false,
  logoutStart: false,
  logoutError: false,
  forgotPasswordStart: false,
  forgotPasswordError: false,
  resetPasswordStart: false,
  resetPasswordError: false,
  getUserStart: false,
  getUserError: false,
  getUserRequest: false,
  getUserSuccess: false,
  getUserFailed: false
};
  
  export const userReducer = (state = initialState, action: TUsersAction) => {
    switch (action.type) {
      case GET_REGISTER_REQUEST: {
        return {
          ...state,
          registerStart: true,
          registerError: false,
        };
      }
      case GET_REGISTER_SUCCESS: {
        return {
          ...state,
          registerError: !action.payload,
          registerStart: false
        };
      }
      case GET_REGISTER_FAILED: {
        return {
          ...state,
          registerError: true,
          registerStart: false
        };
      }
      case GET_LOGIN_REQUEST: {
        return {
          ...state,
          loginStart: true,
          loginError: false,
        };
      }
      case GET_LOGIN_SUCCESS: {
        return {
          ...state,
          loginError: !action.payload,
          loginStart: false
        };
      }
      case GET_LOGIN_FAILED: {
        return {
          ...state,
          loginError: true,
          loginStart: false
        };
      }
      case LOG_OUT_REQUEST: {
        return {
          ...state,
          logoutStart: true,
          logoutError: false,
        };
      }
      case LOG_OUT_SUCCESS: {
        return {
          ...state,
          logoutError: !action.payload,
          logoutStart: false
        };
      }
      case LOG_OUT_FAILED: {
        return {
          ...state,
          logoutError: true,
          logoutStart: false
        };
      }
      case FORGOT_PASSWORD_REQUEST: {
        return {
          ...state,
          forgotPasswordStart: true,
          forgotPasswordError: false,
        };
      }
      case FORGOT_PASSWORD_SUCCESS: {
        return {
          ...state,
          forgotPasswordError: !action.payload,
          forgotPasswordStart: false
        };
      }
      case FORGOT_PASSWORD_FAILED: {
        return {
          ...state,
          forgotPasswordError: true,
          forgotPasswordStart: false
        };
      }
      case RESET_PASSWORD_REQUEST: {
        return {
          ...state,
          resetPasswordStart: true,
          resetPasswordError: false,
        };
      }
      case RESET_PASSWORD_SUCCESS: {
        return {
          ...state,
          resetPasswordError: !action.payload,
          resetPasswordStart: false
        };
      }
      case RESET_PASSWORD_FAILED: {
        return {
          ...state,
          resetPasswordError: true,
          resetPasswordStart: false
        };
      }
      case USER_REQUEST: {
        return {
          ...state,
          getUserRequest: true,
          getUserError: false,
        };
      }
      case USER_SUCCESS: {
        return {
          ...state,
          getUserError: !action.payload,
          getUserRequest: false
        };
      }
      case USER_FAILED: {
        return {
          ...state,
          getUserError: true,
          getUserRequest: false
        };
      }
      case SET_USER: {
        return {
          ...state,
          user: action.payload,
        };
      }
      case GET_USER_REQUEST: {
        return {
          ...state,
          getUserRequest: true
        };
      }
      case GET_USER_SUCCESS: {
        return {
          ...state,
          getUserFailed: !action.payload,
          getUserSuccess: action.payload,
          getUserRequest: false
        };
      }
      case GET_USER_FAILED: {
        return {
          ...state,
          getUserFailed: true,
          getUserSuccess: false,
          getUserRequest: false
        };
      }
      default: {
        return state;
      }
    }
  };
  