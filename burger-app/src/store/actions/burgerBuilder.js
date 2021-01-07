import * as actionType from './actionType';
import axios from '../.../../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionType.ADD_INGREDIENT,
        ingredientName: name,
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionType.REMOVE_INGREDIENT,
        ingredientName: name,
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionType.FETCH_INGREDIENTS_FAILED,
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionType.SET_INGREDIENTS,
        ingredients: ingredients,
    }
}

export const initIngredients = () => {
    return (dispatch) => {
        axios.get('https://react-burger-f6977-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch((err) => {
                dispatch(fetchIngredientsFailed());
            });
    }
}