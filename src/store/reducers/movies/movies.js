import * as actionTypes from '../../actions';

const initialState = []

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_MOVIES:
            return action.payload.movies
        case 'FETCH_MOVIES_FULFILL':
            console.log('[FetchMovies] Fullfilled', action.payload);

            return action.payload.movies
        case 'FETCH_MOVIES_REJECTED':
            console.log('[FetchMovies] Fullfilled', action.payload);
            return action.payload.error
        default:
            return state;
    }
}

export default reducer;