import { WS_CONNECTION_START, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE} from "../constants/orders-all";
import { WebSocketReducer } from "./orders-all";


const stateDefault = {
    WebSocketConnect: false,
                orders: [],
                total: 0,
                totalToday: 0,
}

describe('websocketreducer test', () => {
    it('should get initial state', () => {
        expect(WebSocketReducer(undefined, {})).toEqual(stateDefault)
    })


    it('should WS_CONNECTION_START', () => {
        expect(
            WebSocketReducer(undefined, {
                type: WS_CONNECTION_START,
    })
    ).toEqual(stateDefault)
    })

   
    it('should WS_CONNECTION_SUCCESS', () => {
        expect(
            WebSocketReducer(undefined, {type: WS_CONNECTION_SUCCESS,}))
            .toEqual({
            WebSocketConnect: true,
    orders: [],
    total: 0,
    totalToday: 0
        })
    })

    it('should WS_CONNECTION_ERROR', () => {
    expect(
        WebSocketReducer(undefined, {
            type: WS_CONNECTION_ERROR,
        })
        ).toEqual(stateDefault)
    })

    it('should WS_CONNECTION_CLOSED', () => {
        expect(
            WebSocketReducer(undefined, {type: WS_CONNECTION_CLOSED,}))
            .toEqual(stateDefault)
    })

    it('should WS_GET_MESSAGE', () => {
    const testdata = {
        orders: 'array',
        total: 'number',
        totalToday: 'number',}
    expect(
            WebSocketReducer(undefined, {
                type: WS_GET_MESSAGE,
                orders: testdata.orders,
                total: testdata.total,
                totalToday: testdata.totalToday,
            })
).toEqual({

            WebSocketConnect: false,
            orders: testdata.orders,
            total: testdata.total,
            totalToday: testdata.totalToday,
        })
    })

})