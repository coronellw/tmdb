import React from 'react';
import './CustomSelect.css'

const customSelect = (props) => {
    let label = props.label ? <label>{props.label}:</label> : null;
    let classes = Array.isArray(props.customStyle) ? props.customStyle.join(' ') : null;
    let options = Array.isArray(props.options) ? props.options : [];
    if (classes) {
        classes += " CustomSelect";
    }

    return (
        <div className="flex-container">
            {label}
            <div className={classes}>
                <select
                    value={props.value}
                    onChange={props.changed}
                >
                    {
                        options.map(opt => {
                            return <option value={opt.value} key={opt.value} >{opt.display}</option>
                        })
                    }
                </select>
            </div>
        </div>
    );
}

export default customSelect;