import { GET_USER_FAILED, GET_USER_REQUEST, GET_USER_SUCCESS, SET_USER, GET_REGISTER_REQUEST, GET_REGISTER_FAILED, GET_REGISTER_SUCCESS, LOG_OUT_FAILED, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, GET_LOGIN_SUCCESS, GET_LOGIN_FAILED, GET_LOGIN_REQUEST, FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, USER_FAILED, USER_REQUEST, USER_SUCCESS, RESET_PASSWORD_FAILED, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS } from '../constants/users';
import { TUser } from '../../utils/types';

export type TRegisterRequestAction = {
    type: typeof GET_REGISTER_REQUEST;
  };
  
  export type TRegisterSuccessAction = {
    type: typeof GET_REGISTER_SUCCESS;
    payload?: boolean};
  
  export type TRegisterFailedAction = {
    type: typeof GET_REGISTER_FAILED;
    payload: string};
  
  export type TLoginRequestAction = {
    type: typeof GET_LOGIN_REQUEST};
  
  export type TLoginSuccessAction = {
    type: typeof GET_LOGIN_SUCCESS;
    payload?: boolean};
  
  export type TLoginFailedAction = {
    type: typeof GET_LOGIN_FAILED;
    payload: string };
  
  export type TLogOutRequestAction = {
    type: typeof LOG_OUT_REQUEST};
  
  export type TLogOutSuccessAction = {
    type: typeof LOG_OUT_SUCCESS;
    payload?: boolean};
  
  export type TLogOutFailedAction = {
    type: typeof LOG_OUT_FAILED};
  
  export type TForgotPasswordRequestAction = {
    type: typeof FORGOT_PASSWORD_REQUEST};
  
  export type TForgotPasswordSuccessAction = {
    type: typeof FORGOT_PASSWORD_SUCCESS;
    payload?: boolean};
  
  export type TForgotPasswordFailedAction = {
    type: typeof FORGOT_PASSWORD_FAILED};
  
  export type TResetPasswordRequestAction = {
    type: typeof RESET_PASSWORD_REQUEST};
  
  export type TResetPasswordSuccessAction = {
    type: typeof RESET_PASSWORD_SUCCESS;
    payload?: boolean};
  
  export type TResetPasswordFailedAction = {
    type: typeof RESET_PASSWORD_FAILED };
  
  export type TUserRequestAction = {
    type: typeof USER_REQUEST};
  
  export type TUserRequestSuccessAction = {
    type: typeof USER_SUCCESS;
    payload?: boolean};
  
  export type TUserRequestFailedAction = {
    type: typeof USER_FAILED };
  
  export type TSetUserRequestAction = {
    type: typeof SET_USER;
    payload: TUser | null };
  
  export type TGetUserRequestAction = {
    type: typeof GET_USER_REQUEST};
  
  export type TGetUserSuccessAction = {
    type: typeof GET_USER_SUCCESS;
    payload: boolean};
  
  export type TGetUserFailedAction = {
    type: typeof GET_USER_FAILED};
  