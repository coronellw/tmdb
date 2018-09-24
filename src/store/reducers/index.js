import { combineReducers } from 'redux';

import genres from './genres/genres';
import genre from './genres/genre';
import movies from './movies/movies';
import movie from './movies/movie';
import search from './search/search';
import actor from './actors/actors';
import cast from './actors/cast';

export default combineReducers({
    genres: genres,
    selectedGenre: genre,
    movies: movies,
    selectedMovie: movie,
    search: search,
    selectedActor: actor,
    cast: cast
});