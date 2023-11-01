import { WS_CONNECTION_START, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from "../constants/orders-all";
import { TOrdersSectionProps } from "../../utils/types";

type TWSConnectionStartAction = {
    type: typeof WS_CONNECTION_START;
    payload: string;
};
 
 type TWSConnectionSuccessAction = {
     type: typeof WS_CONNECTION_SUCCESS};
 
 type TWSConnectionErrorAction = {
     type: typeof WS_CONNECTION_ERROR;
     payload: Event};
 
 type TWSConnectionClosedAction = {
     type: typeof WS_CONNECTION_CLOSED};
 

 type TWSGetMessageAction = {
     type: typeof WS_GET_MESSAGE;
     orders: TOrdersSectionProps[];
     total: number;
     totalToday: number};
 
 export type TWebSocketActions = | TWSConnectionStartAction | TWSConnectionSuccessAction | TWSConnectionErrorAction
| TWSConnectionClosedAction | TWSGetMessageAction ;

export type TWebSocketRootActions = {
    wsInit: typeof WS_CONNECTION_START,
    onOpen: typeof WS_CONNECTION_SUCCESS,
    onClose: typeof WS_CONNECTION_CLOSED,
    onError: typeof WS_CONNECTION_ERROR,
    onMessage: typeof WS_GET_MESSAGE,
};
 

export const WebSocketStart = (url: string): TWSConnectionStartAction => ({
    type: WS_CONNECTION_START,
    payload: url 
})

export const WebSocketsClose = ():TWSConnectionClosedAction => ({
    type: WS_CONNECTION_CLOSED
})
