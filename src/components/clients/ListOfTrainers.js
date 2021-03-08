import React, {Component} from 'react';
import {Button, Card} from 'react-bootstrap';
import {getTrainer} from '../services/data-service';
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import axios from 'axios';

class ListOfTrainers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.user,
			trainerList: []
		};
	}

	componentDidMount() {
		getTrainer()
			.then(result => {
				this.setState({
					trainerList: result
				});
			}, error => {
				console.log(error);
			});
	}

	selectTrainer = trainerId => {
		const {_id: userId} = this.state.user;
		const trainer = trainerId;

		axios.put(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
			trainer
		}, {withCredentials: true})
			.then(() => {

			}, error => {
				console.error(error);
			});
	};

	render() {
		const trainerList = this.state.trainerList.map(trainer => {
			return (
				<Card style={{width: '18rem'}}>
					<Card.Img variant="top" src="holder.js/100px180"/>
					<Card.Body>
						<Card.Title>{trainer.username}</Card.Title>
						<Card.Text>
							Some quick example text to build on the card title and make up the bulk
							of
							the card's content.
						</Card.Text>
						<Button variant="primary">
							<FontAwesomeIcon
								icon={faThumbsUp}
								onClick={() => this.selectTrainer(trainer._id)}/>
						</Button>
					</Card.Body>
				</Card>
			);
		});
		return (
			<div>
				{trainerList}
			</div>
		);
	}
}

export default ListOfTrainers;