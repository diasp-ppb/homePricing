import Immutable from 'seamless-immutable'

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    loggedIn: false,
    user: null,
    token: null,
})

/* ------------- Reducer ------------- */

export function reducer (state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                loggedIn: true,
                user: action.user,
                token: action.token,
            }
        case 'LOGOUT':
            return {
                ...state,
                loggedIn: false,
                user: null,
                token: null,
            }
        default:
            return state;
    }
}

export function login(user, token) {
    return { type: 'LOGIN', user, token }
}

export function logout() {
    return { type: 'LOGOUT' }
}
