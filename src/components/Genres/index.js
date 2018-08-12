import React from 'react';
import Genre from './Genre/Genre';

const genres = (props) => {
	if (props.genres) {
		return props.genres.map(g => {
			return <Genre
				key={g.id}
				name={g.name}
				clicked={() => props.clicked(g.id)}
			/>
		})
	}
	return null;
};

export default genres;