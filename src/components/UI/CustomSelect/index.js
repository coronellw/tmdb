import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CustomSelect.css';

class CustomSelect extends Component {

    render(){ 
        let label = this.props.label ? <label>{this.props.label}:</label> : null;
        let options = Array.isArray(this.props.options) ? this.props.options : [];
        let classes = Array.isArray(this.props.customStyle) ? this.props.customStyle.join(' ') : null;

        if (classes) {
            classes += " CustomSelect";
        }
    
        return(
            <div className="flex-container">
                <div className={classes} style={{width: this.props.width ?this.props.width +'px':'240px'}}>
                    <select
                        value={this.props.value}
                        onChange={this.props.changed}
                        style={{width: this.props.width? this.props.width+28+'px':'268px'}}
                    >
                        {
                            options.map(opt => {
                                return <option value={opt.value} key={opt.value} >{opt.display}</option>
                            })
                        }
                    </select>
                </div>
            </div>
        )
    }
}

CustomSelect.propTypes = {
    width: PropTypes.number.isRequired
}

export default CustomSelect;