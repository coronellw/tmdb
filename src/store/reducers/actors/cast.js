import * as C from '../../actions';

const initialState = []

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case C.SET_CAST:
            return action.payload.cast
        default:
            return state
    }
}

export default reducer;