import * as actionTypes from '../actions';

const initialState = []
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_GENRES:
            return action.payload.genres
        default:
            return state;
    }
}

export default reducer;