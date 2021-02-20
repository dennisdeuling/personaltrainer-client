import React from 'react';
import {Card} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons';

const exerciseDetails = props => {
	return (
		<Card style={{width: '18rem'}}>
			<FontAwesomeIcon icon={faEdit}/>
			<Card.Img variant="top" src={props.thumbImage}/>
			<Card.Body>
				<Card.Title>{props.title}</Card.Title>
				<Card.Text>{props.description}</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default exerciseDetails;