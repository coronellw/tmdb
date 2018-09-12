import * as actionTypes from '../actions';

const initialState = []

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_MOVIES:
            return action.payload.movies
        default: 
            return state;
    }
}

export default reducer;