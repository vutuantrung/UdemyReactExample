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
        type: actionType.PURCHASE_BURGER_FAIL,
        error: error,
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionType.PURCHASE_BURGER_START,
    }
}

export const purchaseBurger = (orderData, token) => {
    return (dispatch) => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
            .then((res) => {
                dispatch(purchaseBurgerSuccess(res.data.name, orderData));
            })
            .catch((err) => {
                dispatch(purchaseBurgerFailed(err));
            });
    }
}

export const purchaseInit = () => {
    return {
        type: actionType.PURCHASE_INIT
    };
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionType.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionType.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionType.FETCH_ORDERS_START
    };
};

export const fetchOrders = (token) => {
    return (dispatch) => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json?auth=' + token)
            .then((res) => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchOrders));
            })
            .catch((err) => {
                dispatch(fetchOrdersFail(err))
            });
    }
}