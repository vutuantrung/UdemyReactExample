import * as actionType from './actions';

const initialState = {
    ingredients: null,
    totalPrice: 4,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENTS:
            return {

            }
        case actionType.REMOVE_INGREDIENTS:
            return {

            }
        default:
            return state;
    }
}

export default reducer;