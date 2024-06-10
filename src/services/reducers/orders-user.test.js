import {
    WS_CONNECTION_CLOSED_USER,
    WS_CONNECTION_ERROR_USER,
    WS_CONNECTION_START_USER,
    WS_CONNECTION_SUCCESS_USER,
    WS_GET_MESSAGE_USER,
  } from "../constants/orders-user";
import { WebSocketUserReducer } from "./orders-user";


const stateDefault = {
    WebSocketConnect: false,
                orders: [],
                total: 0,
                totalToday: 0,
}


describe('websocketreducer test', () => {
    it('should get initial state', () => {
        expect(WebSocketUserReducer(undefined, {})).toEqual(stateDefault)
    })


    it('should WS_CONNECTION_START_USER', () => {
        expect(
            WebSocketUserReducer(undefined, {
                type: WS_CONNECTION_START_USER,
    })
    ).toEqual(stateDefault)
    })

   
    it('should WS_CONNECTION_SUCCESS_USER', () => {
        expect(
            WebSocketUserReducer(undefined, {type: WS_CONNECTION_SUCCESS_USER,}))
            .toEqual({
            WebSocketConnect: true,
    orders: [],
    total: 0,
    totalToday: 0
        })
    })

    it('should WS_CONNECTION_ERROR_USER', () => {
    expect(
        WebSocketUserReducer(undefined, {
            type: WS_CONNECTION_ERROR_USER,
        })
        ).toEqual(stateDefault)
    })

    it('should WS_CONNECTION_CLOSED_USER', () => {
        expect(
            WebSocketUserReducer(undefined, {type: WS_CONNECTION_CLOSED_USER,}))
            .toEqual(stateDefault)
    })

    it('should WS_GET_MESSAGE_USER', () => {
    const testdata = {
        orders: 'array',
        total: 'number',
        totalToday: 'number',}
    expect(
        WebSocketUserReducer(undefined, {
                type: WS_GET_MESSAGE_USER,
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