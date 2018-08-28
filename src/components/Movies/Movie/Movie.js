import React from 'react';
import MovieDetails from '../MovieDetails';
import svgImg from '../../../assets/img/No_image_available.svg';
import './Movie.css'

const movie = (props) => {
    let brStyle = { clear: 'both' };
    let imgSrc = props.src ? 'https://image.tmdb.org/t/p/w300' + props.src : svgImg;
    let cardStyle = {
        background: 'url(' + imgSrc + ')',
        width: '300px',
        height: '400px'
    }

    return (
        <div className="movie" style={cardStyle}>
            <div className="movie-header">
                <h3>{props.title}</h3>
            </div>
            <br style={brStyle} />
            <div className="movie-body">
                <MovieDetails
                    votes={props.votes}
                    average={props.average}
                    releaseDate={props.release_date}
                    genres={props.movie_genres}
                />
                <div>
                    {/* <b> Description:</b> */}
                    <p>{props.description}</p>
                </div>
            </div>
        </div>
    );
}

export default movie;