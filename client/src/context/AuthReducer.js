import {LoginSuccess} from './Actions'

const INITIAL_STATE = {
    user: null,
};

function AuthReducer(state, action){
    switch (action.type){
        case 'LOGIN_SUCCESS':
            return {
                user: action.payload,
            };
        default:
            throw new Error('Invalid action')
    }
}

export {INITIAL_STATE}
export default AuthReducer