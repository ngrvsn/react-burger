import { setCookie, deleteCookie } from '../cookies';
import {
  registerRequest,
  loginRequest,
  logoutRequest,
  forgotPasswordRequest,
  resetPasswordRequest,
  getUserRequest,
  editUserRequest,
} from '../authoris-api';

export const GET_REGISTER_REQUEST = 'GET_REGISTER_REQUEST';
export const GET_REGISTER_SUCCESS = 'GET_REGISTER_SUCCESS';
export const GET_REGISTER_FAILED = 'GET_REGISTER_FAILED';

export const GET_LOGIN_REQUEST = 'GET_LOGIN_REQUEST';
export const GET_LOGIN_SUCCESS = 'GET_LOGIN_SUCCESS';
export const GET_LOGIN_FAILED = 'GET_LOGIN_FAILED';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILED = 'LOG_OUT_FAILED';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILED = 'USER_FAILED';
export const SET_USER = 'SET_USER';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const register = async (email, password, name, dispatch) => {
  dispatch({ type: GET_REGISTER_REQUEST });
  try {
    const response = await registerRequest(email, password, name);
    const accessToken = response.accessToken.split('Bearer ')[1];
    if (accessToken) {
      setCookie('token', accessToken);
    }
    localStorage.setItem('refreshToken', response.refreshToken);

    if (response.success) {
      dispatch({ type: SET_USER, payload: response.user });
    }

    dispatch({ type: GET_REGISTER_SUCCESS, payload: response.success });

    return response.success;
  } catch (error) {
    dispatch({ type: GET_REGISTER_FAILED, payload: ": " + error.message });
    return false;
  }
};

export const signIn = async (email, password, dispatch) => {
  dispatch({ type: GET_LOGIN_REQUEST });
  try {
    const response = await loginRequest(email, password);
    const accessToken = response.accessToken.split('Bearer ')[1];
    if (accessToken) {
      setCookie('token', accessToken);
    }
    localStorage.setItem('refreshToken', response.refreshToken);

    if (response.success) {
      dispatch({ type: SET_USER, payload: response.user });
    }

    dispatch({ type: GET_LOGIN_SUCCESS, payload: response.success });

    return response.success;
  } catch (error) {
    dispatch({ type: GET_LOGIN_FAILED, payload: ": " + error.message });
    return false;
  }
};

export const signOut = async (dispatch) => {
  dispatch({ type: LOG_OUT_REQUEST });
  if (localStorage.getItem('refreshToken')) {
    try {
      const response = await logoutRequest();
      deleteCookie('token');
      localStorage.removeItem('refreshToken');

      if (response.success) {
        dispatch({ type: SET_USER, payload: null });
      }

      dispatch({ type: LOG_OUT_SUCCESS, payload: response.success });

      return response.success;
    } catch (error) {
      dispatch({ type: LOG_OUT_FAILED });
      return false;
    }
  } else {
    dispatch({ type: LOG_OUT_FAILED });
    return false;
  }
};

export const forgotPassword = async (email, dispatch) => {
  dispatch({ type: FORGOT_PASSWORD_REQUEST });
  try {
    const response = await forgotPasswordRequest(email);
    dispatch({ type: FORGOT_PASSWORD_SUCCESS });
    return response.success;
  } catch (error) {
    dispatch({ type: FORGOT_PASSWORD_FAILED });
    return false;
  }
};

export const resetPassword = async (password, token, dispatch) => {
  dispatch({ type: RESET_PASSWORD_REQUEST });
  try {
    const response = await resetPasswordRequest(password, token);
    dispatch({ type: RESET_PASSWORD_SUCCESS });
    return response.success;
  } catch (error) {
    dispatch({ type: RESET_PASSWORD_FAILED });
    return false;
  }
};

export const getUser = async (dispatch) => {
  dispatch({ type: USER_REQUEST });
  try {
    const response = await getUserRequest();
    if (response.success) {
      dispatch({ type: SET_USER, payload: response.user });
    }

    dispatch({ type: USER_SUCCESS, payload: response.success });
  } catch (error) {
    dispatch({ type: USER_FAILED });
    return false;
  }
};

export const editUser = async (email, password, name, dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const response = await editUserRequest(email, password, name);
    if (response.success) {
      dispatch({ type: GET_USER_SUCCESS, payload: response.user });
    } else {
      dispatch({ type: GET_USER_FAILED });
    }
  } catch (error) {
    dispatch({ type: GET_USER_FAILED });
  }
};
