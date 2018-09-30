import React from 'react';
import { connect } from 'react-redux';

import Movie from './Movie/Movie';
import Spinner from '../UI/Spinner/Spinner';

const movies = (props) => {

	if(!props.loading && (props.movies.length === 0) ){
		return <p>No matches found</p>
	}

	return props.loading ? <Spinner /> : props.movies.map(m => {
		return <Movie
			key={m.id}
			movie={m}
			movieGenres={props.genres.filter(g => m.genre_ids.includes(g.id))}
		/>
	})
}

const mapStateToProps = state => {
	return {
		movies: state.movies,
		genres: state.genres,
		loading: state.loading,
	}
}

export default connect(mapStateToProps)(movies);