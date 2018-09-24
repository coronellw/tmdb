import * as actionTypes from '../../actions';

const initialState = {}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SELECTED_MOVIE:
            return action.payload.movie
        default: 
            return state;
    }
}

export default reducer;