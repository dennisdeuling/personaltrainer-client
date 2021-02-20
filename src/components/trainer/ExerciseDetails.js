import React from 'react';

const exerciseDetails = props => {
	return (
		<div>
			<img src={props.thumbImage} alt=""/>
			<h1>{props.title}</h1>
			<p>{props.description}</p>
		</div>
	);
};

export default exerciseDetails;