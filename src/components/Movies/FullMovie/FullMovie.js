import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faHeart, faFire } from '@fortawesome/free-solid-svg-icons';

import './FullMovie.css';
import Spinner from '../../UI/Spinner/Spinner';
import noImgAvailable from '../../../assets/img/No_image_available.svg';

import {
    setCast,
    saveMovieList,
    getSimilarMovies,
    setSelectedMovie,
    setSelectedActorById,
    getMovieWithCastMember,
    setSelectedMovieThroughId,
} from '../../../store/actions/actionCreators';

class FullMovie extends Component {
    state = {
        showCast: false,
        showRelated: false,
        castLimited: true,
        relatedLimited: true,
    }

    componentDidMount() {
        this.props.onPageLoad(this.props.match.params.id);
    }

    showFullCastList = () => {
        this.setState({ castLimited: false })
    }

    showFullRelatedMovies = () => {
        this.setState({ relatedLimited: false })
    }

    getCastLimit = () => {
        return this.state.castLimited ? 9 : this.props.cast.length;
    }

    getRelatedMovieLimit = () => {
        return this.state.relatedLimited ? 7 : this.props.related.length;
    }

    showCastHandler = () => {
        this.props.onShowCastClicked();
        this.setState({ showCast: true, })
    }

    showRelatedHandler = () => {
        this.props.onRelatedMoviesClicked()
        this.setState({ showRelated: true, })
    }

    selectMovieHandler = (movie) => {
        this.props.onMovieSelected(movie);
        this.setState({ showCast: false, showRelated: false, castLimited: true, relatedLimited: true })
    }

    render() {
        let title = null;
        let background = null;
        let similarMovies = (
            this.props.related ?
                <ul className="movies">
                    {this.props.related.slice(0, this.getRelatedMovieLimit()).map(r => {
                        return (
                            <li onClick={() => this.selectMovieHandler(r)} key={r.id}>
                                <img
                                    src={'https://image.tmdb.org/t/p/w92' + r.poster_path}
                                    alt={r.title}
                                    title={r.original_title}
                                />
                            </li>
                        )
                    })}
                    <li>
                        {
                            this.state.relatedLimited ?
                                <button onClick={this.showFullRelatedMovies} >Show More</button>
                                : null
                        }
                    </li>
                </ul> : null
        );
        let cast = (
            this.props.cast ?
                <ul className="actors">
                    {this.props.cast.slice(0, this.getCastLimit()).map(c => {
                        if (c.profile_path) {
                            return (
                                <li key={c.id}>
                                    <p>
                                        <Link to={'/person/' + c.id} onClick={() => this.props.onActorClicked(c.id)}>
                                            <img src={'https://image.tmdb.org/t/p/w45' + c.profile_path} alt={c.name} />
                                        </Link>
                                        {c.name} <strong>as</strong> {c.character}
                                    </p>
                                </li>
                            )
                        }
                        return null;
                    })}
                    {
                        this.state.castLimited ?
                            <button onClick={this.showFullCastList}>Show full list</button>
                            : null
                    }
                </ul> : null
        );
        if (!this.props.loading) {
            title = (
                <div className="content">
                    <img className="main" src={this.props.movie.poster_path ?
                        'https://image.tmdb.org/t/p/w500' + this.props.movie.poster_path
                        : noImgAvailable} alt={this.props.movie.title} />
                    <div className="content">
                        <h1>{this.props.movie.title}</h1>
                        <label>Overview</label>
                        <p>
                            {this.props.movie.overview}
                        </p>
                        <label>Release date:</label>
                        <p>
                            {this.props.movie.release_date}
                        </p>
                        <span className="detail votes">
                            <FontAwesomeIcon className="fa-icon" icon={faHeart} />
                            {this.props.movie.vote_average}
                        </span>
                        <span className="detail popularity">
                            <FontAwesomeIcon className="fa-icon" icon={faChartLine} />
                            {this.props.movie.popularity}
                        </span>
                        <span className="detail score">
                            <FontAwesomeIcon className="fa-icon" icon={faFire} />
                            {this.props.movie.vote_count}
                        </span>
                        <br />

                        {!this.state.showCast ? <button
                            className="Information"
                            onClick={this.showCastHandler}
                        >Show cast</button> : cast}

                        {!this.state.showRelated ? <button
                            className="Warning"
                            onClick={this.showRelatedHandler}
                        >Show related movies
                            </button> : similarMovies}
                    </div>
                </div>

            )
            background = 'https://image.tmdb.org/t/p/w1280/' + this.props.movie.backdrop_path;
        } else {
            title = <Spinner />
        }
        return (
            <div
                className="FullMovie"
                style={{
                    backgroundImage: 'url(' + background + ')',
                    backgroundSize: 'cover',
                    backgroundAttachment: 'fixed'
                }}
            >
                {title}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        movie: state.selectedMovie,
        related: state.movies,
        cast: state.cast,
        actor: state.selectedActor,
        error: state.error,
        loading: state.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onShowCastClicked: () => dispatch(setCast()),
        onRelatedMoviesClicked: () => dispatch(getSimilarMovies()),
        onMovieSelected: (movie) => dispatch(setSelectedMovie(movie)),
        onPageLoad: (movieId) => {
            dispatch(saveMovieList([]));
            dispatch(setSelectedMovieThroughId(movieId));
        },
        onActorClicked: (id) => {
            dispatch(setSelectedActorById(id));
            dispatch(getMovieWithCastMember(id));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullMovie);