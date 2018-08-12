import React from 'react';
import Movie from './Movie/Movie'

const movies = (props) => props.movies.map( m => {
	return <Movie
		key={m.id}
		src={m.poster_path}
		votes={m.vote_count}
		title={m.original_title}
		average={m.vote_average}
		description={m.overview}
		release_date={m.release_date}
	/>
})

export default movies;