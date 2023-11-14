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
import { GET_USER_FAILED, GET_USER_REQUEST, GET_USER_SUCCESS, SET_USER, GET_REGISTER_REQUEST, GET_REGISTER_FAILED, GET_REGISTER_SUCCESS, LOG_OUT_FAILED, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, GET_LOGIN_SUCCESS, GET_LOGIN_FAILED, GET_LOGIN_REQUEST, FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, USER_FAILED, USER_REQUEST, USER_SUCCESS, RESET_PASSWORD_FAILED, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS } from '../constants/users';
import {
  TRegisterRequestAction,
  TRegisterSuccessAction,
  TRegisterFailedAction,
  TLoginRequestAction,
  TLoginSuccessAction,
  TLoginFailedAction,
  TLogOutRequestAction,
  TLogOutSuccessAction,
  TLogOutFailedAction,
  TForgotPasswordRequestAction,
  TForgotPasswordSuccessAction,
  TForgotPasswordFailedAction,
  TResetPasswordRequestAction,
  TResetPasswordSuccessAction,
  TResetPasswordFailedAction,
  TUserRequestAction,
  TUserRequestSuccessAction,
  TUserRequestFailedAction,
  TSetUserRequestAction,
  TGetUserRequestAction,
  TGetUserSuccessAction,
  TGetUserFailedAction,
} from '../constants/usersTypes'
import { AppDispatch, AppThunkAction } from '../../utils/types';



export type TUsersAction = TRegisterRequestAction | TRegisterSuccessAction | TRegisterFailedAction 
| TLoginRequestAction | TLoginSuccessAction | TLoginFailedAction
| TLogOutRequestAction | TLogOutSuccessAction | TLogOutFailedAction
| TForgotPasswordRequestAction | TForgotPasswordSuccessAction | TForgotPasswordFailedAction
| TResetPasswordRequestAction | TResetPasswordSuccessAction | TResetPasswordFailedAction 
| TUserRequestAction | TUserRequestSuccessAction | TUserRequestFailedAction
| TSetUserRequestAction
| TGetUserRequestAction | TGetUserSuccessAction | TGetUserFailedAction;




export const register = async (email: string, password: string, name: string, dispatch: AppDispatch): Promise<AppThunkAction | boolean | undefined> => {
  dispatch({ type: GET_REGISTER_REQUEST });
  try {
      const response = await registerRequest(email, password, name);
      const accessToken = response.accessToken ? response.accessToken.split('Bearer ')[1] : undefined;
      if (accessToken) {
          setCookie('token', accessToken);
      }

      if (response.refreshToken) {
          localStorage.setItem('refreshToken', response.refreshToken);
      }

      if (response.user) {
          dispatch({ type: SET_USER, payload: response.user });
      }

      dispatch({ type: GET_REGISTER_SUCCESS, payload: response.success });

      return response.success;
  } catch (error: any) {
      dispatch({ type: GET_REGISTER_FAILED, payload: `Ошибка: ${error.message}` });
      return false;
  }
};


export const signIn = async (email: string, password: string, dispatch: AppDispatch): Promise<AppThunkAction | boolean | undefined | void> => {
  dispatch({ type: GET_LOGIN_REQUEST });
  try {
      const response = await loginRequest(email, password);
      const accessToken = response.accessToken ? response.accessToken.split('Bearer ')[1] : undefined;
      if (accessToken) {
          setCookie('token', accessToken);
      }

      if (response.refreshToken) {
          localStorage.setItem('refreshToken', response.refreshToken);
      }

      if (response.success) {
          if (response.user) {
              dispatch({ type: SET_USER, payload: response.user });
          }
      }

      dispatch({ type: GET_LOGIN_SUCCESS, payload: response.success });

      return response.success;
  } catch (error: any) {
      dispatch({ type: GET_LOGIN_FAILED, payload: `Ошибка: ${error.message}` });
      return false;
  }
};


export const signOut = async (dispatch: AppDispatch): Promise<AppThunkAction | boolean | undefined> => {
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
    } catch (error: any) {
      dispatch({ type: LOG_OUT_FAILED, payload: `Ошибка: ${error.message}` });
      return false;
    }
  } else {
    dispatch({ type: LOG_OUT_FAILED });
    return false;
  }
};

export const forgotPassword = async (email: string, dispatch: AppDispatch): Promise<AppThunkAction | boolean | undefined> => {
  dispatch({ type: FORGOT_PASSWORD_REQUEST });
  try {
    const response = await forgotPasswordRequest(email);
    dispatch({ type: FORGOT_PASSWORD_SUCCESS });
    return response.success;
  } catch (error: any) {
    dispatch({ type: FORGOT_PASSWORD_FAILED , payload: `Ошибка: ${error.message}`});
    return false;
  }
};

export const resetPassword = async (password: string, token: string, dispatch: AppDispatch): Promise<AppThunkAction | boolean | undefined> => {
  dispatch({ type: RESET_PASSWORD_REQUEST });
  try {
    const response = await resetPasswordRequest(password, token);
    dispatch({ type: RESET_PASSWORD_SUCCESS });
    return response.success;
  } catch (error: any) {
    dispatch({ type: RESET_PASSWORD_FAILED , payload: `Ошибка: ${error.message}`});
    return false;
  }
};

export const getUser = async (dispatch: AppDispatch): Promise<boolean | undefined> => {
  dispatch({ type: USER_REQUEST });

  try {
      const response = await getUserRequest();
      
      if (response.success) {
          if (response.user) {
              dispatch({ type: SET_USER, payload: response.user });
          }
      }
      
      dispatch({ type: USER_SUCCESS, payload: response.success });
      return response.success;
  } catch (error) {
      dispatch({ type: USER_FAILED });
      return false;
  }
};

export const editUser = async (email: string, password: string, name: string, dispatch: AppDispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const response = await editUserRequest(email, password, name);
    if (response.success) {
      dispatch({ type: GET_USER_SUCCESS, payload: response.success });
    } else {
      dispatch({ type: GET_USER_FAILED });
    }
  } catch (error: any) {
    dispatch({ type: GET_USER_FAILED , payload: `Ошибка: ${error.message}`});
  }
};
