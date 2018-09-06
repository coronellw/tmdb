import React, { Component } from 'react';

import noImgAvailable from '../../../assets/img/No_image_available.svg';
import './FullMovie.css';

class FullMovie extends Component {
    state = {
        movie: null,
    }
    componentDidMount() {
        this.setState({ ...this.props.location.params })

    }
    render() {
        let title = this.state.movie ?
            <div>
                <h1>{this.state.movie.title}</h1>
                <img src={this.state.movie.poster_path ?
                    'https://image.tmdb.org/t/p/w500' + this.state.movie.poster_path
                    : noImgAvailable} alt={this.state.movie.title} />

                <div>
                    <label>Overview</label>
                    <p>
                        {this.state.movie.overview}
                    </p>
                </div>
            </div>
            : <p>Loading...</p>
        return (
            <div className="FullMovie">
                {title}
            </div>
        )
    }
}

export default FullMovie;