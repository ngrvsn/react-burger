import { getCookie, setCookie, deleteCookie } from './cookies';
import { API_DOMAIN } from './api-domain';
import { TIngredient, TUser, TOrderProps } from '../utils/types';


type TParams = {
  headers?: TRequestHeaders;
  method?: string;
  body?: string;
  mode?: RequestMode;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  redirect?: RequestRedirect;
  referrerPolicy?: ReferrerPolicy;
};

type TAuthUser = {
  email?: string;
  name?: string;
  success?: boolean;
  user?: TUser;
  refreshToken?: string;
  accessToken?: string;
};

type TApiResponse = {
  success: boolean;
  refreshToken?: string;
  accessToken?: string;
};

type TRequestHeaders = {
  [key: string]: string;
};

export type TIngredientsResponse = TApiResponse & {
  data?: Array<TIngredient>;
};

export type TOrderResponse = TApiResponse & {
  order?: TOrderProps;
};


const checkResponse = async <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return await res.json();
  } else {
    const err = await res.json();
    return Promise.reject(err);
  }
};

const checkSuccess = <T>(res: T): T => {
  if (res && (res as any).success) {
    return res;
  }
  throw new Error(`ошибка: ${res}`);
};

export const request = async (endpoint: string, options: TParams): Promise<TApiResponse> => {
  try {
    const response = await fetch(`${API_DOMAIN}/api/${endpoint}`, options);
    return await checkResponse(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateRefreshToken = async (endpoint: string,options: TParams): Promise<{ success: boolean }> => {
  const refreshToken = localStorage.getItem("refreshToken");

  return refreshToken
    ? request('auth/token', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          "token": refreshToken,
        }),
      })
        .then(response => {
          let accessToken: string | undefined;

          accessToken = response.accessToken && response.accessToken.split('Bearer ')[1];

          accessToken && setCookie('token', accessToken);

          response.refreshToken && localStorage.setItem("refreshToken", response.refreshToken);

          options.headers && (options.headers.Authorization = `Bearer ${accessToken}`);

          return request(endpoint, options);
        })
        .catch(() => ({ success: false }))
    : { success: false };
};


export const authValid = async (endpoint: string, options: TParams): Promise<{success: boolean; message?: string;}> => {
  try {
      return await request(endpoint, options);
  } catch (error: any) {
      if (typeof error.message === 'string') {
          if (error.message === 'jwt expired') {
              return updateRefreshToken(endpoint, options);
          } else if (error.message === 'jwt malformed') {
              return { success: false, message: 'Ошибка авторизации' };
          }
      }
      return { success: false };
  }
};



export const registerRequest = async (email: string, password: string, name: string): Promise<TAuthUser> => {
  return await request('auth/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json;charset=utf-8',},
      body: JSON.stringify({
          email: email,
          password: password,
          name: name,
      }),
  });
};

export const loginRequest = async (email: string, password: string): Promise<TAuthUser> => {
  return await request('auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json;charset=utf-8',},
      body: JSON.stringify({
          email: email,
          password: password,
      }),
  });
};


export const logoutRequest = async (): Promise<Pick<TAuthUser, 'success'>> => {
  return await request('auth/logout', {
      method: 'POST',
      headers: {'Content-Type': 'application/json;charset=utf-8',},
      body: JSON.stringify({
          token: localStorage.getItem('refreshToken'),
      }),
  });
};

export const forgotPasswordRequest = async (email: string): Promise<Partial<TAuthUser>> => {
  return await request('password-reset', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/json;charset=utf-8',},
      body: JSON.stringify({
          email: email,
      }),
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
  });
};


export const resetPasswordRequest = async (email: string, token: string): Promise<Partial<TAuthUser>> => {
  return await request('password-reset', {
      method: 'POST',
      headers: {'Content-Type': 'application/json;charset=utf-8',},
      cache: 'no-cache',
      credentials: 'same-origin',
      body: JSON.stringify({
          email: email,
          token: token,
      }),
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
  });
};


export const orderRequest = async (idItem: string): Promise<TOrderResponse> => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + getCookie('token'),
    },
    body: JSON.stringify({ ingredients: idItem }),
  };

  return await authValid('orders', requestOptions);
};

export const generalRequest = async <T>(endpoint: string, options: RequestInit): Promise<T> => {
  const response = await fetch(`https://norma.nomoreparties.space/api/${endpoint}`, options);
  const data = await checkResponse(response);
  return checkSuccess(data) as T;
};

export const getUserRequest = (): Promise<Partial<TAuthUser>> => authValid('auth/user', {
  method: "GET",
  headers: {
      Authorization: 'Bearer ' + getCookie('token')
  }
});

export const editUserRequest = async (email: string, password: string, name: string): Promise<Partial<TAuthUser>> => {
  return await authValid('auth/user', {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: 'Bearer ' + getCookie('token'),
      },
      body: JSON.stringify({
          name: name,
          email: email,
          password: password,
      }),
  });
};

export const getIngedientsRequest = (): Promise<TIngredientsResponse> => request('ingredients', {});
