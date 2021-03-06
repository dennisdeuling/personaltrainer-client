import React, {Component} from 'react';
import {Card} from 'react-bootstrap';
import {getTrainer} from '../services/data-service';

class ListOfTrainers extends Component {
	constructor(props) {
		super(props);
		this.state = {
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