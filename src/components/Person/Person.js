import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Person.css';
import {
    setSelectedActorById,
    getMovieWithCastMember,
    setSelectedMovieThroughId,
    getSimilarMovies,
} from '../../store/actions/actionCreators'

class person extends Component {
    state = {
        showRelatedMovies: false,
        showFullRelated: false,
    }

    componentDidMount() {
        if (!this.props.person.id) {
            this.props.onActorUpdate(this.props.match.params.id);
        }
    }

    showMoviesHandler = () => {
        this.setState({ showRelatedMovies: true, });
        this.props.onRelatedMoviesClicked();
    }

    showFullRelatedMovies = () => {
        this.setState({ showFullRelated: true })
    }

    getRelatedMovieLimit = () => {
        return this.state.showFullRelated ? this.props.movies.length : 7;
    }

    render() {
        let relatedMovies = (
            this.props.movies ?
                <ul className="movies">
                    {
                        this.props.movies.slice(0, this.getRelatedMovieLimit()).map(r => {
                            return (
                                <li key={r.id}>
                                    <img
                                        src={'https://image.tmdb.org/t/p/w92' + r.poster_path}
                                        alt={r.title}
                                        title={r.original_title}
                                        onClick={() => this.props.onMovieSelected(r.id, this.props)}
                                    />
                                </li>
                            )
                        })
                    }
                    {
                        !this.state.showFullRelated ?
                            <li><button onClick={this.showFullRelatedMovies} >Show More</button></li>
                            : null
                    }
                </ul> : null
        );
        return (
            <div className="Person">
                <div>
                    <img
                        src={'https://image.tmdb.org/t/p/h632/' + this.props.person.profile_path}
                        alt={this.props.person.name}
                        title={this.props.person.name}
                        className="main"
                    />
                    <br />
                    <h1>{this.props.person.name}</h1>
                    {
                        this.props.person.birthday ? <p><label>Birthday: </label><span>{this.props.person.birthday}</span></p> : null
                    }
                    {
                        this.props.person.deathday ? <p><label>Dead: </label><span>{this.props.person.deathday}</span></p> : null
                    }
                    <p>
                        <label>Place of Birth: </label><span>{this.props.person.place_of_birth}</span>
                    </p>
                    <p>
                        {this.props.person.biography}
                    </p>
                    <p>
                        <a target="_blank"
                            href={'https://www.imdb.com/name/' + this.props.person.imdb_id} >
                            IMDB page </a>
                    </p>
                </div>
                {
                    !this.state.showRelatedMovies ? <button onClick={this.showMoviesHandler}>Show related movies</button> : null
                }
                <ul>
                    {
                        this.state.showRelatedMovies ? relatedMovies : null
                    }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        person: state.selectedActor,
        movies: state.movies
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onActorUpdate: (actorId) => { dispatch(setSelectedActorById(actorId)) },
        onRelatedMoviesClicked: () => { dispatch(getMovieWithCastMember()) },
        onMovieSelected: (movieId, props) => { 
            dispatch(setSelectedMovieThroughId(movieId));
            dispatch(getSimilarMovies());
            props.history.push('/movie/'+movieId);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(person);