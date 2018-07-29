import React from 'react';
import './Movie.css'

const movie = (props) => {
    let brStyle = {clear: 'both'};
    let imgSrc = 'https://image.tmdb.org/t/p/w92'+props.src;
    return (
        <div className="movie">
            <div className="movie-header">
                <h3>{props.title}</h3>
            </div>
            <br style={brStyle} />
            <div className="movie-body">
                <div className="description">
                    <b>Score: </b>{props.average}
                    <b> Votes: </b>{props.votes}
                    <b> Description:</b>
                </div>
                <div>
                    <img src={imgSrc} alt='movie poster not available'/>
                    <p>{props.description}</p>
                </div>
            </div>
        </div>
    );
}

export default movie;