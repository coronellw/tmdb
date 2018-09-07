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
        showCast: false,
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

    render() {
        let title = null;
        let background = null;
        let cast = (
            <ul>
                {this.state.cast.map(c => {
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