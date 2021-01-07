import axios from 'axios';
import * as actionType from './actionType';

export const authStart = () => {
    return {
        type: actionType.AUTH_START,
    };
}

export const authSuccess = (token, userId) => {
    return {
        type: actionType.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
    }
}

export const authFail = (error) => {
    return {
        type: actionType.AUTH_FAIL,
        error: error,
    }
}

export const logout = () => {
    return {
        type: actionType.AUTH_FAIL,
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    }
}

export const auth = (email, password, isSignUp) => {
    return (dispatch) => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        let url = isSignUp ?
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBPTN6B2Mu2ZOvKKummBdAqqKpPrkGWHpE' :
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBPTN6B2Mu2ZOvKKummBdAqqKpPrkGWHpE';

        axios.post(url, authData)
            .then((res) => {
                console.log(res);
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch((err) => {
                dispatch(authFail(err.response.data.error));
            })
    }
}