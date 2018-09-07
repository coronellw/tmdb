import React from 'react';
import './MovieDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine,faHeart } from '@fortawesome/free-solid-svg-icons'

const movieDetails = (props) => {    
    let getDateFrom = (d) => {
        let date = new Date(d);
        return date.getFullYear();
    }
    return (<div className="MovieDetails">
        <span className="score">
            <FontAwesomeIcon className="fa-icon" icon={faHeart} />
            <span className="value">{props.average || 0}</span>
        </span>
        <span className="votes">
            <FontAwesomeIcon className="fa-icon" icon={faChartLine} /> 
            <span className="value">{props.votes || 0}</span>
        </span>
        <span className="releaseDate">
            {getDateFrom(props.releaseDate)}
        </span>
        <ul className="movie_genres">
            {props.genres.map(g => <li key={g.id} className="none">{g.name}</li>)}
        </ul>
    </div>);
}

export default movieDetails;