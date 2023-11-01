import React from 'react';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';
import App from './components/app/App';

import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { rootReducer } from './services/reducers/index';
import {  WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from './services/constants/orders-all';
import thunkMiddleware from 'redux-thunk';
import { TWebSocketRootActions } from './services/actions/orders-all';
import { socketMiddleware } from './services/middleware/socketMiddleware';
import { API_WEB_SOCKET } from './services/api-domain';
import { TWebSocketRootActionsUser } from './services/actions/orders-user';
import { WS_CONNECTION_CLOSED_USER, WS_CONNECTION_ERROR_USER, WS_CONNECTION_START_USER, WS_CONNECTION_SUCCESS_USER, WS_GET_MESSAGE_USER } from './services/constants/orders-user';



// style
import './index.css';

const WebSocketApi:string = `${API_WEB_SOCKET}`;

const WebSocketActions: TWebSocketRootActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};

const WebSocketActionsUser: TWebSocketRootActionsUser = {
  wsInit: WS_CONNECTION_START_USER,
  onOpen: WS_CONNECTION_SUCCESS_USER,
  onClose: WS_CONNECTION_CLOSED_USER,
  onError: WS_CONNECTION_ERROR_USER,
  onMessage: WS_GET_MESSAGE_USER
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}


const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, enhancer(applyMiddleware(thunkMiddleware, socketMiddleware(WebSocketApi, WebSocketActions), socketMiddleware(WebSocketApi, WebSocketActionsUser) )));




const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
);

reportWebVitals();