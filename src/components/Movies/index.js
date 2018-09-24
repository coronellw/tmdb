import React from 'react';
import Movie from './Movie/Movie';

import { connect } from 'react-redux';

const movies = (props) => props.movies.map(m => {
	return <Movie
		key={m.id}
		movie={m}
		movieGenres={props.genres.filter(g => m.genre_ids.includes(g.id))}
	/>
})

const mapStateToProps = state => {
	return {
		movies: state.movies,
		genres: state.genres,
	}
}

export default connect(mapStateToProps)(movies);