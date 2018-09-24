import React from 'react';
import idGen from 'uuid/v4';
import { connect } from 'react-redux';

// import './Person.css';
import {
    setSelectedActorById,
    getMovieWithCastMember,
} from '../../store/actions/actionCreators'

const person = (props) => {
    return (
        <div className="Person">
            <h1>{props.person.name}</h1>
            <ul>
                {
                    props.person.also_known_as ?
                        props.person.also_known_as.map(n => {
                            return (<li key={idGen()}>{n}</li>)
                        }) : null
                }
            </ul>
            <span>DOB: {props.person.birthday}</span>
            {
                props.person.deathday ? <span>Dead: {props.person.deathday}</span> : null
            }
            <span>Place of Birth: {props.person.place_of_birth}</span>
            <p>
                {props.person.biography}
            </p>
            <a target="_blank" href={'https://www.imdb.com/name/' + props.person.imdb_id}>IMDB page</a>
            <button onClick={props.onRelatedMoviesClicked}>Show related movies</button>
            {
                props.movies.map(m => { return <p>{m.original_title}</p> })
            }
        </div>
    );
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
        onRelatedMoviesClicked: () => { dispatch(getMovieWithCastMember()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(person);