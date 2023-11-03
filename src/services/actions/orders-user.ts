import { TOrdersSectionProps } from "../../utils/types";
import { WS_CONNECTION_CLOSED_USER,  WS_CONNECTION_ERROR_USER, WS_CONNECTION_START_USER, WS_CONNECTION_SUCCESS_USER, WS_GET_MESSAGE_USER } from "../constants/orders-user";

import { API_ORDERS_USER } from "../api-domain";

export type TWSConnectionStartActionUser = {
  type: typeof WS_CONNECTION_START_USER;
  payload: string;
};

export type TWSConnectionSuccessActionUser = {
  type: typeof WS_CONNECTION_SUCCESS_USER;
};

export type TWSConnectionErrorActionUser = {
  type: typeof WS_CONNECTION_ERROR_USER;
  payload: Event;
};

export type TWSConnectionClosedActionUser = {
  type: typeof WS_CONNECTION_CLOSED_USER;
};

export type TWSGetMessageActionUser = {
  type: typeof WS_GET_MESSAGE_USER;
  orders: TOrdersSectionProps[];
  total: number;
  totalToday: number;
};

export type TWebSocketActionsUser =
  | TWSConnectionStartActionUser
  | TWSConnectionSuccessActionUser
  | TWSConnectionErrorActionUser
  | TWSConnectionClosedActionUser
  | TWSGetMessageActionUser;

  export type TWebSocketRootActionsUser = {
    wsInit: typeof WS_CONNECTION_START_USER;
    onOpen: typeof WS_CONNECTION_SUCCESS_USER;
    onClose: typeof WS_CONNECTION_CLOSED_USER;
    onError: typeof WS_CONNECTION_ERROR_USER;
    onMessage: typeof WS_GET_MESSAGE_USER;
  };

  export const WebSocketStartUser = (token: string): TWSConnectionStartActionUser => ({
    type: WS_CONNECTION_START_USER,
    payload: `${API_ORDERS_USER}?token=${token}`
  });
  

export const WebSocketsCloseUser = ():TWSConnectionClosedActionUser => ({
type: WS_CONNECTION_CLOSED_USER
})