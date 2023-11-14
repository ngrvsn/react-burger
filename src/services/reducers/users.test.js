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
  import { userReducer } from './users';


  describe('userreducer test', () => {
    it('should get initial state', () => {
        expect(userReducer(undefined, {})).toEqual(
            {
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
            }
        )
    })

    it('should GET_REGISTER_REQUEST', () => {
        expect(
            userReducer(undefined, {
                type: GET_REGISTER_REQUEST,
            })
        ).toEqual({
            user: null,
  registerStart: true,
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
        })
    })

    it('should GET_REGISTER_SUCCESS', () => {
        const testdata = true;
        expect(
            userReducer(undefined, {
                type: GET_REGISTER_SUCCESS,
                payload: testdata
            })
        ).toEqual({
            user: null,
  registerStart: false,
  registerError: !testdata,
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
        })
    })

    it('should GET_REGISTER_FAILED', () => {
        expect(
            userReducer(undefined, {
                type: GET_REGISTER_FAILED,
            })
        ).toEqual({
            user: null,
            registerStart: false,
            registerError: true,
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
        })
    })

    it('should GET_LOGIN_REQUEST', () => {
        expect(
            userReducer(undefined, {
                type: GET_LOGIN_REQUEST,
            })
        ).toEqual({
            user: null,
                registerStart: false,
                registerError: false,
                loginStart: true,
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
        })
    })

    it('should GET_LOGIN_SUCCESS', () => {
        const testdata = true;
        expect(
            userReducer(undefined, {
                type: GET_LOGIN_SUCCESS,
                payload: testdata
            })
        ).toEqual({
            user: null,
            registerStart: false,
            registerError: false,
            loginStart: false,
            loginError: !testdata,
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
        })
    })

    it('should GET_LOGIN_FAILED', () => {
        expect(
            userReducer(undefined, {
                type: GET_LOGIN_FAILED,
            })
        ).toEqual({
            user: null,
            registerStart: false,
            registerError: false,
            loginStart: false,
            loginError: true,
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
        })
    })

    it('should LOG_OUT_REQUEST', () => {
        expect(
            userReducer(undefined, {
                type: LOG_OUT_REQUEST,
            })
        ).toEqual({
            user: null,
                registerStart: false,
                registerError: false,
                loginStart: false,
                loginError: false,
                logoutStart: true,
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
        })
    })

    it('should LOG_OUT_SUCCESS', () => {
        const testdata = true;
        expect(
            userReducer(undefined, {
                type: LOG_OUT_SUCCESS,
                payload: testdata
            })
        ).toEqual({
            user: null,
            registerStart: false,
            registerError: false,
            loginStart: false,
            loginError: false,
            logoutStart: false,
            logoutError: !testdata,
            forgotPasswordStart: false,
            forgotPasswordError: false,
            resetPasswordStart: false,
            resetPasswordError: false,
            getUserStart: false,
            getUserError: false,
            getUserRequest: false,
            getUserSuccess: false,
            getUserFailed: false
        })
    })

    it('should LOG_OUT_FAILED', () => {
        expect(
            userReducer(undefined, {
                type: LOG_OUT_FAILED,
            })
        ).toEqual({
            user: null,
                registerStart: false,
                registerError: false,
                loginStart: false,
                loginError: false,
                logoutStart: false,
                logoutError: true,
                forgotPasswordStart: false,
                forgotPasswordError: false,
                resetPasswordStart: false,
                resetPasswordError: false,
                getUserStart: false,
                getUserError: false,
                getUserRequest: false,
                getUserSuccess: false,
                getUserFailed: false
        })
    })

    it('should FORGOT_PASSWORD_REQUEST', () => {
        expect(
            userReducer(undefined, {
                type: FORGOT_PASSWORD_REQUEST,
            })
        ).toEqual({
            user: null,
                registerStart: false,
                registerError: false,
                loginStart: false,
                loginError: false,
                logoutStart: false,
                logoutError: false,
                forgotPasswordStart: true,
                forgotPasswordError: false,
                resetPasswordStart: false,
                resetPasswordError: false,
                getUserStart: false,
                getUserError: false,
                getUserRequest: false,
                getUserSuccess: false,
                getUserFailed: false
        })
    })

    it('should FORGOT_PASSWORD_SUCCESS', () => {
        const testdata = true;
        expect(
            userReducer(undefined, {
                type: FORGOT_PASSWORD_SUCCESS,
                payload: testdata
            })
        ).toEqual({
            user: null,
                registerStart: false,
                registerError: false,
                loginStart: false,
                loginError: false,
                logoutStart: false,
                logoutError: false,
                forgotPasswordStart: false,
                forgotPasswordError: !testdata,
                resetPasswordStart: false,
                resetPasswordError: false,
                getUserStart: false,
                getUserError: false,
                getUserRequest: false,
                getUserSuccess: false,
                getUserFailed: false
        })
    })

    it('should FORGOT_PASSWORD_FAILED', () => {
        expect(
            userReducer(undefined, {
                type: FORGOT_PASSWORD_FAILED,
            })
        ).toEqual({
            user: null,
                registerStart: false,
                registerError: false,
                loginStart: false,
                loginError: false,
                logoutStart: false,
                logoutError: false,
                forgotPasswordStart: false,
                forgotPasswordError: true,
                resetPasswordStart: false,
                resetPasswordError: false,
                getUserStart: false,
                getUserError: false,
                getUserRequest: false,
                getUserSuccess: false,
                getUserFailed: false
        })
    })

    it('should RESET_PASSWORD_REQUEST', () => {
        expect(
            userReducer(undefined, {
                type: RESET_PASSWORD_REQUEST,
            })
        ).toEqual({
            user: null,
                registerStart: false,
                registerError: false,
                loginStart: false,
                loginError: false,
                logoutStart: false,
                logoutError: false,
                forgotPasswordStart: false,
                forgotPasswordError: false,
                resetPasswordStart: true,
                resetPasswordError: false,
                getUserStart: false,
                getUserError: false,
                getUserRequest: false,
                getUserSuccess: false,
                getUserFailed: false
        })
    })

    it('should RESET_PASSWORD_SUCCESS', () => {
        const testdata = true;
        expect(
            userReducer(undefined, {
                type: RESET_PASSWORD_SUCCESS,
                payload: testdata
            })
        ).toEqual({
            user: null,
                registerStart: false,
                registerError: false,
                loginStart: false,
                loginError: false,
                logoutStart: false,
                logoutError: false,
                forgotPasswordStart: false,
                forgotPasswordError: !testdata,
                resetPasswordStart: false,
                resetPasswordError: false,
                getUserStart: false,
                getUserError: false,
                getUserRequest: false,
                getUserSuccess: false,
                getUserFailed: false
        })
    })

    it('should RESET_PASSWORD_FAILED', () => {
        expect(
            userReducer(undefined, {
                type: RESET_PASSWORD_FAILED,
            })
        ).toEqual({
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
                resetPasswordError: true,
                getUserStart: false,
                getUserError: false,
                getUserRequest: false,
                getUserSuccess: false,
                getUserFailed: false
        })
    })

    it('should USER_REQUEST', () => {
        expect(
            userReducer(undefined, {
                type: USER_REQUEST,
            })
        ).toEqual({
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
                getUserRequest: true,
                getUserSuccess: false,
                getUserFailed: false
        })
    })

    it('should  USER_SUCCESS', () => {
        const testdata = true;
        expect(
            userReducer(undefined, {
                type: USER_SUCCESS,
                payload: testdata
            })
        ).toEqual({
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
                getUserError: !testdata,
                getUserRequest: false,
                getUserSuccess: false,
                getUserFailed: false
        })
    })

    it('should USER_FAILED', () => {
        expect(
            userReducer(undefined, {
                type: USER_FAILED,
            })
        ).toEqual({
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
                getUserError: true,
                getUserRequest: false,
                getUserSuccess: false,
                getUserFailed: false
        })
    })

    it('should SET_USER', () => {
        const testdata = {
            email: 'abcd@email.com',
            name: 'abcd123',
        };

        expect(
            userReducer(undefined, {
                type: SET_USER,
                payload: testdata
            })
        ).toEqual({
            user: testdata,
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
        })
    })

    it('should GET_USER_REQUEST', () => {
        expect(
            userReducer(undefined, {
                type: GET_USER_REQUEST,
            })
        ).toEqual({
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
                getUserRequest: true,
                getUserSuccess: false,
                getUserFailed: false,
        })
    })

    it('should GET_USER_SUCCESS', () => {
        const testdata = true;
        expect(
            userReducer(undefined, {
                type: GET_USER_SUCCESS,
                payload: testdata
            })
        ).toEqual({
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
                getUserSuccess: testdata,
                getUserFailed: !testdata,
        })
    })

    it('should GET_USER_FAILED', () => {
        expect(
            userReducer(undefined, {
                type: GET_USER_FAILED,
            })
        ).toEqual({
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
                getUserFailed: true,
        })
    })

    

})