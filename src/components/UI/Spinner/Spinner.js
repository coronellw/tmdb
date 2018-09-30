import React from 'react';
import './Spinner.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const spinner = () => (
    <div className="container">
		<div className="clapper">
			<div className="stripe1"></div>
			<div className="stripe2"></div>
			<div className="stripe1"></div>
			<div className="stripe2"></div>
			<div className="stripe1"></div>
			<div className="stripe2"></div>
		</div>
		<div className="topSide">
			<div className="stripe1"></div>
			<div className="stripe2"></div>
			<div className="stripe1"></div>
			<div className="stripe2"></div>
			<div className="stripe1"></div>
			<div className="stripe2"></div>
		</div>
		<div className="bottomSide">
			<FontAwesomeIcon className="star" size='2x' icon={faStar} />
		</div>
		<div>Loading... </div>
	</div>
)

export default spinner;