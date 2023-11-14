import { GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, UPDATE_ORDER } from "../constants/order";
import { orderReducer } from "./order";


describe('orderreducer test', () => {
    it('should get initial state', () => {
        expect(orderReducer(undefined, {})).toEqual(
            {order: null,
                orderRequest: false,
                orderFailed: false,
                updatedOrder: null,}
     )
    })

    it('should GET_ORDER_REQUEST', () => {
        expect(
            orderReducer(undefined, {
            type: GET_ORDER_REQUEST,
                payload: true,
            })
        ).toEqual({
            order: null,
            orderRequest: true,
            orderFailed: false,
            updatedOrder: null,})
    })

    it('should GET_ORDER_SUCCESS', () => {
        const testdata = [{
            createdAt: 'string',
            ingredients: 'array',
            name: 'string',
            number: 'number',
            owner: { createdAt: 'string',
            updatedAt: 'string',
                email: 'string',
                name: 'string',
            },
            price: 'number',
            status: 'string',
            updatedAt: 'string',
            _id: 'string'}];

        expect(
            orderReducer(undefined, {
                type: GET_ORDER_SUCCESS,
                payload: testdata
            })
        ).toEqual({
            order: testdata,
            orderRequest: false,
            orderFailed: false,
            updatedOrder: null,}) })



    it('should GET_ORDER_FAILED', () => {
        expect(
            orderReducer(undefined, {
                type: GET_ORDER_FAILED,
            })
        ).toEqual({
        order: null,
            orderRequest: false,
            orderFailed: true,
            updatedOrder: null,})
    })

    it('should UPDATE_ORDER', () => {
        const testdata = {
        ingredients: 'array',
            _id: 'string',
            name: 'string',
            status: 'string',
            number: 'number',
            createdAt: 'string',
            updatedAt: 'string',
        }
        expect(
            orderReducer(undefined, {
                type: UPDATE_ORDER,
                payload: testdata
         })


        ).toEqual({
            order: null,
            orderRequest: false,
            orderFailed: false,
            updatedOrder: testdata,})
 })
})