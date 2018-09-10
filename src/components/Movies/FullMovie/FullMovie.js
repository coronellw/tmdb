import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faHeart, faFire } from '@fortawesome/free-solid-svg-icons';

import noImgAvailable from '../../../assets/img/No_image_available.svg';
import './FullMovie.css';
import axios from '../../../axios';

class FullMovie extends Component {
    state = {
        movie: null,
        cast: [],
        related: [],
        showCast: false,
        showRelated: false,
    }
    componentDidMount() {
        if (this.props.location.params) {
            this.setState({ ...this.props.location.params })
        } else {
            axios.get('/movie/' + this.props.match.params.id)
                .then(response => {
                    this.setState({ movie: response.data })
                })
                .catch(error => {
                    console.log('[FullMovie] We got an error', error);
                })
        }
    }

    showCastHandler = () => {
        axios.get('/movie/' + this.state.movie.id + '/credits')
            .then(response => {
                this.setState({
                    cast: response.data.cast,
                    showCast: true,
                })
            })
    }

    showRelatedHandler = () => {
        axios.get('/movie/' + this.state.movie.id + '/similar')
            .then(response => {
                console.log('[FullMovie]', response);
                this.setState({
                    related: response.data.results,
                    showRelated: true,
                })
            })
    }

    loadMovie = (id) => {
        axios.get('/movie/' + id)
            .then(response => {
                this.setState({ movie: response.data, showRelated: false, showCast: false })
            })
            .catch(error => {
                console.log('[FullMovie] We got an error', error);
            })
    }

    render() {
        let title = null;
        let background = null;
        let similarMovies = (
            <ul className="movies">
                {this.state.related.slice(0, 7).map(r => {
                    return (
                        <li onClick={() => this.loadMovie(r.id)}>
                            <img src={'https://image.tmdb.org/t/p/w92' + r.poster_path} alt={r.title} />
                        </li>
                    )
                })}
                <li>
                    <button>full list</button>
                </li>
            </ul>
        );
        let cast = (
            <ul className="actors">
                {this.state.cast.slice(0, 9).map(c => {
                    if (c.profile_path) {
                        return (
                            <li>
                                <p>
                                    <img src={'https://image.tmdb.org/t/p/w45' + c.profile_path} alt={c.name} />
                                    {c.name} <strong>as</strong> {c.character}
                                </p>
                            </li>
                        )
                    }
                    return null;
                })}
                <button>Show full list</button>
            </ul>
        );
        if (this.state.movie) {
            title = (
                <div>
                    <div className="content">
                        <img className="main" src={this.state.movie.poster_path ?
                            'https://image.tmdb.org/t/p/w500' + this.state.movie.poster_path
                            : noImgAvailable} alt={this.state.movie.title} />
                        <div className="content">
                            <h1>{this.state.movie.title}</h1>
                            <label>Overview</label>
                            <p>
                                {this.state.movie.overview}
                            </p>
                            <label>Release date:</label>
                            <p>
                                {this.state.movie.release_date}
                            </p>
                            <span className="detail votes">
                                <FontAwesomeIcon className="fa-icon" icon={faHeart} />
                                {this.state.movie.vote_average}
                            </span>
                            <span className="detail popularity">
                                <FontAwesomeIcon className="fa-icon" icon={faChartLine} />
                                {this.state.movie.popularity}
                            </span>
                            <span className="detail score">
                                <FontAwesomeIcon className="fa-icon" icon={faFire} />
                                {this.state.movie.vote_count}
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
                </div>
            )
            background = 'https://image.tmdb.org/t/p/w1280/' + this.state.movie.backdrop_path;
        } else {
            title = <p>Loading...</p>
        }
        return (
            <div
                className="FullMovie"
                style={{ backgroundImage: 'url(' + background + ')', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}
            >
                {title}
            </div>
        )
    }
}

export default FullMovie;