import { getCookie, setCookie } from './cookies';
import { API_DOMAIN } from './api-domain';
import { TUser, TOrderProps, TIngredientProps } from '../utils/types';





type TOptions = {
  headers?: Record<string, string>;
  method?: string;
  body?: string;
  refreshToken?: string;
  accessToken?: string;
  token?: string
};


type TAuthUser = {
  email?: string;
  name?: string;
  method?: string;
  body?: string
  success?: boolean;
  user?: TUser;
  refreshToken?: string;
  accessToken?: string;
};

type TResponse = {
  method?: string;
  body?: string
  success: boolean;
  refreshToken?: string;
  accessToken?: string;
};



const checkResponse = async <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return await res.json();
  } else {
    const err = await res.json();
    return Promise.reject(err);
  }
};




export const request = async (endpoint: string, options: RequestInit): Promise<TResponse> => {
  try {
    const response = await fetch(`${API_DOMAIN}/api/${endpoint}`, options);
    return await checkResponse(response);
  } catch (error) {
    return Promise.reject(error);
  }
};


export const updateRefreshToken = async (endpoint: string, options: TOptions): Promise<{ success: boolean, token?: string }> => {
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

          return {
            success: true,
            token: accessToken,
          };
        })
        .catch(() => ({ success: false }))
    : { success: false };
};



export const authValid = async (endpoint: string, options: TOptions): Promise<{success: boolean; message?: string;}> => {
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




export const getUserRequest = (): Promise<Partial<TAuthUser>> => authValid('auth/user', {
  method: "GET", headers: {Authorization: 'Bearer ' + getCookie('token')}});

export const editUserRequest = async (email: string, password: string, name: string): Promise<Partial<TAuthUser>> => {
  return await authValid('auth/user', {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json;charset=utf-8',Authorization: 'Bearer ' + getCookie('token'),},
      body: JSON.stringify({name: name, email: email, password: password,
      }),
    });
};

type TIngredientsRequestResponse = {
  success: boolean;
  refreshToken?: string;
  accessToken?: string;
  data?: TIngredientProps[];
};

export const getIngedientsRequest = (): Promise<TIngredientsRequestResponse> => request('ingredients', { method: "GET" });

 

type TOrderRequestResponse = {
  success: boolean;
  refreshToken?: string;
  accessToken?: string;
  order?: TOrderProps;
};

export const orderRequest = (idItem: string[]): Promise<TOrderRequestResponse> => {
  const token = getCookie('token');
  console.log('Токен:', token);
  console.log(idItem);

  return authChecker('orders', {
    method: 'POST',
    headers: {'Content-Type': 'application/json;charset=utf-8',Authorization: 'Bearer ' + getCookie('token'),},
    body: `{"ingredients": ${JSON.stringify(idItem)}}`
  });
};



  export const authChecker = async (endpoint: string, options: TOptions): Promise<{
    success: boolean;
  }> => {
    try {
      const response = await request(endpoint, options);
      return response;
    } catch (error) {
      if (error instanceof Error && error.message === "jwt expired") {
        return updateRefreshToken(endpoint, options);
      } else {
        return { success: false };
      }
    }
  };


  
type TOrderWithRefresh = {
  success: boolean;
  orderNumber?: number;
  orderStatus?: string;
  errorMessage?: string;
};

export const createOrderWithTokenRefresh = async (
  ingredients: string[],
  token: string
): Promise<Partial<TOrderWithRefresh>> => {
  try {
    const bunId1 = "643d69a5c3f7b9001cfa093d"; 
    const bunId2 = "643d69a5c3f7b9001cfa093c"; 

    if (ingredients.includes(bunId1)) {
      ingredients.push(bunId1);
    } else if (ingredients.includes(bunId2)) {
      ingredients.push(bunId2);
    }

    const refreshedToken = await updateRefreshToken('/token', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (refreshedToken && refreshedToken.success) {
      const newToken = refreshedToken.token;

      const response = await fetch(`${API_DOMAIN}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${newToken}`,
        },
        body: JSON.stringify({ ingredients }),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.success) {
          return {
            success: true,
            orderNumber: responseData.order.number,
            orderStatus: responseData.order.status,
          };
        }
      }
    } else {
      return {
        success: false,
        errorMessage: 'ошибка обновления токена',
      };
    }
    return {
      success: false,
      errorMessage: 'заказ не создан',
    };
  } catch (error) {
    return {
      success: false,
      errorMessage: 'ошибка',
    };
  }
};

  

  export const updateTokenSocket = async (): Promise<{ success: boolean, accessToken?: string }> => {
    const refreshToken = getCookie("refreshToken");
  
    if (!refreshToken) {
      return { success: false };
    }
  
    try {
      const response = await fetch(`${API_DOMAIN}/api/auth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: refreshToken }),
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.accessToken) {
          const accessToken = data.accessToken.split("Bearer ")[1];
          if (accessToken) {
            setCookie("token", accessToken, { path: "/" });
          }
        }
  
        return { success: true, accessToken: data.accessToken };
      } else {
        return { success: false };
      }
    } catch (error) {
      return { success: false };
    }
  };