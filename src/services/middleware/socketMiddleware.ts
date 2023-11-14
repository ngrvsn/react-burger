import type { Middleware, MiddlewareAPI } from 'redux'; 
import type { TOrdersSectionProps } from '../../utils/types';
import { TWebSocketRootActions } from '../actions/orders-all';
import { TWebSocketRootActionsUser } from '../actions/orders-user';
import type { TApplicationActions } from '../../utils/types';
import { updateTokenSocket } from '../authoris-api';

export const socketMiddleware = (WebSocketApi: string, WebSocketActions: TWebSocketRootActions | TWebSocketRootActionsUser): Middleware => {
  return (store: MiddlewareAPI) => { 
    let socket: WebSocket | null = null;

    const { wsInit, onOpen, onMessage, onClose, onError } = WebSocketActions;

    return next => (action: TApplicationActions) => {
      const { dispatch } = store;
      const { type } = action;

      if (type === wsInit) {
        socket = new WebSocket(action.payload);


        console.log('WebSocket connection initiated:', socket);
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
          console.log('WebSocket connection opened:', event);
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
          console.error('WebSocket error:', event);
        };

        socket.onmessage = async event => {
          const { data } = event;
          const parsedData: { orders: TOrdersSectionProps[], total: number, totalToday: number, success: boolean, message?: string } = JSON.parse(data);

          if (parsedData.message === "Invalid or missing token") {
            const tokenResponse = await updateTokenSocket();
            if (tokenResponse.success) {
              const newSocketUrl = `${WebSocketApi}`; 
              socket = new WebSocket(newSocketUrl);
              dispatch({ type: wsInit, payload: newSocketUrl });
            }
          } else if (parsedData.success) {
            dispatch({
              type: onMessage,
              orders: parsedData.orders,
              total: parsedData.total,
              totalToday: parsedData.totalToday,
            });
            console.log('Received WebSocket data:', parsedData);
          } else {
            dispatch({ type: onError, payload: event });
            console.error('WebSocket data error:', event);
          }
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
          console.log('WebSocket connection closed:', event);
        };

        if (type === onClose) {
          socket.close();
          console.log('WebSocket connection closed manually.');
        }
      }

      next(action);
    };
  };
};