import * as C from '../../actions';

const initialState = {}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case C.SET_SELECTED_ACTOR:
            return action.payload.actor
        default:
            return state
    }
}

export default reducer