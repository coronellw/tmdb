import React from 'react';
import Movie from './Movie/Movie'

const movies = (props) => props.movies.map( m => {
	return <Movie
		key={m.id}
		title={m.original_title} 
		description={m.overview}
		src={m.poster_path}
	/>
})

export default movies;