import React from 'react';
import Movie from './Movie/Movie'

const movies = (props) => props.movies.map( m => {
	return <Movie
		key={m.id}
		movie={m}
		src={m.poster_path}
		votes={m.vote_count}
		title={m.original_title}
		average={m.vote_average}
		description={m.overview}
		movieGenres= {props.genres.filter(g => m.genre_ids.includes(g.id))}
		releaseDate={m.release_date}
	/>
})

export default movies;