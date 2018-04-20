import Immutable from 'seamless-immutable'

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    loggedIn: false,
    user: null,
})

/* ------------- Reducer ------------- */

export function reducer (state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                loggedIn: true,
                user: action.user
            }
        default:
            return state;
    }
}

export function login(user) {
    return { type: 'LOGIN', user }
}

function mapStateToProps(state) {
    console.log("map state to props");
    return state;
}