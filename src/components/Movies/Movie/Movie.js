import React from 'react';
import svgImg from '../../../assets/img/No_image_available.svg'
import './Movie.css'

const movie = (props) => {
    let brStyle = {clear: 'both'};
    let imgSrc = props.src ? 'https://image.tmdb.org/t/p/w92'+props.src:svgImg;

    let getDateFrom = (d) => {
        let date = new Date(d);
        return date.getFullYear();
    }

    return (
        <div className="movie">
            <div className="movie-header">
                <h3>{props.title}</h3>
            </div>
            <br style={brStyle} />
            <div className="movie-body">
                <div className="description">
                    <b>Score: </b>{props.average||0}
                    <b> Votes: </b>{props.votes||0}
                    <b> Released: </b>{getDateFrom(props.release_date)}
                    <br />
                    <b> Description:</b>
                </div>
                <div>
                    <img src={imgSrc} alt='not available' height={props.src?'138px':'100px'} width={props.src?'92px':'80px'}/>
                    <p>{props.description}</p>
                </div>
            </div>
        </div>
    );
}

export default movie;