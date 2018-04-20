const initialState = {
    loggedIn: false,
    user: null,
}

export function application (state = initialState, action) {
    switch (action.type) {
        case 'LOGIN':
            return Object.assign({}, state, { loggedIn: true, user: action.user })
        default:
            return state;
    }
}

function login(user) {
    return { type: 'LOGIN', user }
}

export function addUser(store, user) {
    store.dispatch(login(user));
}