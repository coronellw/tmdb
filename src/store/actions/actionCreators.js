import * as C from '../actions';
import _ from 'lodash';
import axios from '../../axios';

export function saveMovieList(movies) {
    return {
        type: C.SET_MOVIES,
        payload: { movies }
    }
}

export const fetchMovies = (params) => {
    console.log('Fetching movies with params: ', params);
    return {
        type: 'FETCH_MOVIES',
        payload: axios.get('/discover/movie', {params})
            .then(resp => {
                return resp.data.results;
            })
    }
}

export const fetchMovie = (movieId) => {
    return {
        type: 'FETCH_MOVIE',
        payload: axios.get('/movie/' + movieId)
            .then(resp => {
                return { movie: resp.data };
            })
    }
}

export function setMovies() {
    return (dispatch, getState) => {
        let params = {
            language: getState().search.language,
            sort_by: getState().search.sortBy,
            "vote_count.gte": getState().search.voteCount || 0,
            page: getState().search.page,
            "primary_release_date.gte": getState().search.releaseDate !== '---' ? getState().search.releaseDate : 1900,
            with_genres: getState().search.withGenres || undefined,
        }
        dispatch(fetchMovies(params));
    }
}

export function getSimilarMovies() {
    return (dispatch, getState) => {
        axios.get('/movie/' + getState().selectedMovie.id + '/similar')
            .then(resp => dispatch(saveMovieList(resp.data.results)))
    }
}

export function getMovieWithCastMember() {
    return (dispatch, getState) => {
        axios.get('/discover/movie', {
            params: {
                with_cast: getState().selectedActor.id
            }
        })
            .then(resp => dispatch(saveMovieList(resp.data.results)))
    }
}

export function setSelectedMovie(movie) {
    return {
        type: C.SET_SELECTED_MOVIE,
        payload: { movie }
    }
}

export function setSelectedMovieThroughId(movieId) {
    return dispatch => {
        dispatch(fetchMovie(movieId))
    }
}

export function setGenres(genres) {
    return {
        type: C.SET_GENRES,
        payload: { genres }
    }
}

export function setSelectedGenre(genre) {
    return {
        type: C.SET_SELECTED_GENRE,
        payload: { genre }
    }
}

function saveVoteCount(voteCount) {
    return {
        type: C.SET_VOTE_COUNT,
        payload: { voteCount }
    }
}

export function setVoteCount(voteCount) {
    return dispatch => {
        dispatch(saveVoteCount(voteCount));
        dispatch(setMovies());
    }
}

export function setLanguage(language) {
    return {
        type: C.SET_LANGUAGE,
        payload: { language }
    }
}

function saveSortBy(sortBy) {
    return {
        type: C.SET_SORT_BY,
        payload: { sortBy }
    }
}

export function setSortBy(sortBy) {
    return dispatch => {
        dispatch(saveSortBy(sortBy));
        dispatch(setMovies());
    }
}

const saveGenre = function (genre) {
    return {
        type: C.SET_WITH_GENRE,
        payload: { withGenres: genre }
    }
}

export function setWithGenre(genreId) {
    return (dispatch, getState) => {
        let selectedGenre = _.find(getState().genres, { id: parseInt(genreId, 10) }) || {};
        dispatch(setSelectedGenre(selectedGenre));
        dispatch(saveGenre(genreId))
        dispatch(setMovies())
    }
}

function saveReleaseDate(releaseDate) {
    return {
        type: C.SET_RELEASE_DATE,
        payload: { releaseDate }
    }
}

export function setReleaseDate(releaseDate) {
    return dispatch => {
        dispatch(saveReleaseDate(releaseDate));
        dispatch(setMovies());
    }
}

function saveSelectedActor(actor) {
    return {
        type: C.SET_SELECTED_ACTOR,
        payload: { actor }
    }
}

export function setSelectedActorById(actorId) {
    return dispatch => {
        axios.get('/person/' + actorId)
            .then(resp => {
                dispatch(saveSelectedActor(resp.data));
            })
    }
}

function saveCast(cast) {
    return {
        type: C.SET_CAST,
        payload: cast
    }
}

export function setCast() {
    return (dispatch, getState) => {
        axios('/movie/' + getState().selectedMovie.id + '/credits')
            .then(resp => dispatch(saveCast(resp.data)))
    }
}