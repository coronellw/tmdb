import React from 'react';
import './Person.css';

const person = (props) => {
    return (
        <div className="Person">
           <span onClick={props.click}>x</span>            
            <p>
                I'm <b>{props.name}</b> and I'm <b>{props.age}</b>.
            </p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name}/>
        </div>
    );
}

export default person;