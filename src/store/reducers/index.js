import * as actionTypes from '../actions';

const initialState = {
    movies: [],
    selectedMovie: {},
    genres: [],
    selectedGenre: {},
    search: {
        language: 'en-US',
        sortBy: 'vote_average.desc',
        voteCount: 3000,
        page: 1,
        releaseDate: '2016',
        withGenres: 28,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_MOVIES:
            return {
                ...state,
                movies: action.payload.movies,
            }
        case actionTypes.SET_SELECTED_MOVIE:
            return {
                ...state,
                movie: action.payload.movie
            }
        case actionTypes.SET_GENRES:
            return {
                ...state,
                genres: action.payload.genres,
            }
        case actionTypes.SET_SELECTED_GENRE:
            return {
                ...state,
                genre: action.payload.genre
            }
        case actionTypes.SET_LANGUAGE:
            return {
                ...state,
                language: action.payload.language,
            }
        case actionTypes.SET_SORT_BY:
            return {
                ...state,
                sortBy: action.payload.sortBy
            }
        case actionTypes.SET_VOTE_COUNT:
            return {
                ...state,
                voteCount: action.payload.voteCount
            }
        case actionTypes.SET_PAGE:
            return {
                ...state,
                page: action.payload.page
            }
        case actionTypes.SET_RELEASE_DATE:
            return {
                ...state,
                releaseDate: action.payload.releaseDate
            }
        case actionTypes.SET_WITH_GENRE:
            return {
                ...state,
                withGenres: action.payload.withGenres
            }
        default:
            return state;
    }
}

export default reducer;