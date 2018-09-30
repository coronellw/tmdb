import * as actionTypes from '../../actions';

const initialState = []

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_MOVIES:
            return action.payload.movies

        case actionTypes.FETCH_MOVIES_FULFILLED:
            console.log('[movies reducer]', action.type);
            return action.payload

        default:
            return state;
    }
}

export default reducer;