import { WS_CONNECTION_START, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE} from "../constants/orders-all";
import { TWebSocketActions } from "../actions/orders-all";
import { TOrdersSectionProps } from "../../utils/types";

export type TWebSocketState = {
    WebSocketConnect: boolean
    orders:  TOrdersSectionProps[]
    total: number
    totalToday: number}

const initialState: TWebSocketState = {
    WebSocketConnect: false,
    orders: [],
    total: 0,
    totalToday: 0}

export const WebSocketReducer = (state = initialState, action: TWebSocketActions) => {
    switch (action.type) {
        case WS_CONNECTION_START:
            return {
                ...state,
            };

        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                WebSocketConnect: true
            };

        case WS_CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload,
                WebSocketConnect: false
            };

        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                WebSocketConnect: false,
                orders: [],
                total: 0,
                totalToday: 0,

            };

        case WS_GET_MESSAGE:
            return {
                ...state,
                orders: action.orders,
                total: action.total,
                totalToday: action.totalToday,
            };


        default:
            return state;
    }
};