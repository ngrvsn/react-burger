import { getCookie, setCookie, deleteCookie } from './cookies';
import { API_DOMAIN } from './api-domain';

const checkResponse = async (res) => {
  if (res.ok) {
    return await res.json();
  } else {
    const err = await res.json();
    return Promise.reject(err);
  }
};

const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }
  throw new Error(`ошибка: ${res}`);
};

export const request = async (endpoint, options) => {
  try {
    const response = await fetch(`${API_DOMAIN}/api/${endpoint}`, options);
    return await checkResponse(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateRefreshToken = async (endpoint, options) => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (refreshToken) {
    deleteCookie('token');

    try {
      const response = await request('auth/token', {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8',},
        body: JSON.stringify({
          token: refreshToken,
        }),
      });

      let accessToken = response.accessToken.split('Bearer ')[1];
      if (accessToken) {
        setCookie('token', accessToken);
      }

      localStorage.setItem('refreshToken', response.refreshToken);

      options.headers.Authorization = `Bearer ${accessToken}`;

      return await request(endpoint, options);
    } catch (error) {
      return { success: false };
    }
  } else {
    return { success: false };
  }
};

export const authValid = async (endpoint, options) => {
  try {
    return await request(endpoint, options);
  } catch (el) {
    if (el.message === 'jwt expired') {
      return updateRefreshToken(endpoint, options);
    } else {
    return { success: false };
    }
  }
};

export const registerRequest = async (email, password, name) => {
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

export const loginRequest = async (email, password) => {
  return await request('auth/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json;charset=utf-8',},
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
};

export const logoutRequest = async () => {
  return await request('auth/logout', {
    method: 'POST',
    headers: {'Content-Type': 'application/json;charset=utf-8',},
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
   }),
  });
};

export const forgotPasswordRequest = async (email) => {
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

export const resetPasswordRequest = async (email, token) => {
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

export const orderRequest = async (idItem) => {
  return await authValid('orders', {
    method: 'POST',
    headers: {'Content-Type': 'application/json;charset=utf-8', Authorization: 'Bearer ' + getCookie('token'),},
    body: JSON.stringify({ ingredients: idItem }),
  });
};


export const generalRequest = async (endpoint, options) => {
  const response = await fetch(`https://norma.nomoreparties.space/api/${endpoint}`, options);
  const data = await checkResponse(response);
  return checkSuccess(data);
};

export const getUserRequest = async () => {
  return await authValid('auth/user', {
    method: 'GET',
    headers: {Authorization: 'Bearer ' + getCookie('token'),},
  });
};

export const editUserRequest = async (email, password, name) => {
  return await authValid('auth/user', {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json;charset=utf-8', Authorization: 'Bearer ' + getCookie('token'),},
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  });
};

export const getIngedientsRequest = () => request('ingredients', {})