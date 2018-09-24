import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import MovieDetails from '../MovieDetails';
import svgImg from '../../../assets/img/No_image_available.svg';
import './Movie.css'

import { setSelectedMovie, getSimilarMovies } from '../../../store/actions/actionCreators'

const movie = (props) => {
    let brStyle = { clear: 'both' };
    let imgSrc = props.movie.poster_path ? 'https://image.tmdb.org/t/p/w300' + props.movie.poster_path : svgImg;
    let cardStyle = {
        background: 'url(' + imgSrc + ')',
        width: '300px',
        height: '400px'
    }

    return (
        <div className="movie" style={cardStyle}>
            <Link to={'/movie/' + props.movie.id} onClick={() => props.onMovieClicked(props)} >
                <div className="movie-header">
                    <h3>{props.movie.original_title}</h3>
                </div>
                <br style={brStyle} />
                <div className="movie-body">
                    <MovieDetails
                        votes={props.movie.vote_count}
                        average={props.movie.vote_average}
                        releaseDate={props.movie.release_date}
                        genres={props.movieGenres}
                    />
                    <div>
                        {/* <b> Description:</b> */}
                        <p>
                            {props.movie.overview}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onMovieClicked: (props) => {
            dispatch(setSelectedMovie(props.movie));
            dispatch(getSimilarMovies());
        }
    }
}

export default withRouter(connect(null, mapDispatchToProps)(movie));