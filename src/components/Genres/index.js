import React from 'react';
import Genre from './Genre/Genre';

const genres = props => props.genres.map( g => {
	return <Genre
		key={g.id} 
		name={g.name} 
		clicked={()=>props.clicked(g.id)}
	/>
});

export default genres;