import React from 'react';
import './Genre.css'

const genre = (props) => {
    return (
        <div className="genre">
            <a onClick={props.clicked}>{props.name}</a>
        </div>
    )
}

export default genre;