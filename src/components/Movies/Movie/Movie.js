import React from 'react';
import { Link } from 'react-router-dom';
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
            <Link to={{
                pathname: "/movie/" + props.movie.id,
                params: {
                    movie: props.movie
                }
            }}>
                <div className="movie-header">
                    <h3>{props.title}</h3>
                </div>
                <br style={brStyle} />
                <div className="movie-body">
                    <MovieDetails
                        votes={props.votes}
                        average={props.average}
                        releaseDate={props.releaseDate}
                        genres={props.movieGenres}
                    />
                    <div>
                        {/* <b> Description:</b> */}
                        <p>{props.description}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default movie;