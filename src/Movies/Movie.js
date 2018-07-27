import React from 'react';
import './Movie.css'

const movie = (props) => {
    let brStyle = {clear: 'both'};
    let imgSrc = 'https://image.tmdb.org/t/p/w92'+props.src;
    return (
        <div className="movie">
            <h3>{props.title}</h3>
            <b>Description:</b>
            <br style={brStyle} />
            <img src={imgSrc} alt='movie poster'/>
            <p>{props.description}</p>
        </div>
    );
}

export default movie;