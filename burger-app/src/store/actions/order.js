import * as actionType from './actionType';
import axios from '../.../../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionType.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData,
    }
}

export const purchaseBurgerFailed = (error) => {
    return {
        type: actionType.PURCHASE_BURGER_FAILED,
        error: error,
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionType.PURCHASE_BURGER_START,
    }
}

export const purchaseBurger = (orderData) => {
    return (dispatch) => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then((res) => {
                dispatch(purchaseBurgerSuccess(res.data.name, orderData));
            })
            .catch((err) => {
                dispatch(purchaseBurgerFailed(err));
            });
    }
}