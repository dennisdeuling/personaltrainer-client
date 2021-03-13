import React, {Component} from 'react';
import {Button, Card} from 'react-bootstrap';
import {getTrainer, getUserById, userModelPushArray} from '../services/data-service';

class ListOfTrainers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: '',
			trainerList: [],
			addedTrainer: false
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

		getUserById(this.props.user._id)
			.then(response => {
				let trainerList = this.state.trainerList;
				const trainer = response.trainer;

				trainerList.forEach((eachTrainer, index) => {
					trainerList[index].addFromUser = trainer.includes(eachTrainer._id);
				});

				this.setState({
					user: response,
					trainerLis: trainerList
				});
			});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.state.addedTrainer) {
			getTrainer()
				.then(result => {
					this.setState({
						trainerList: result
					});
				}, error => {
					console.log(error);
				});

			getUserById(this.props.user._id)
				.then(response => {
					let trainerList = this.state.trainerList;
					const trainer = response.trainer;

					trainerList.forEach((eachTrainer, index) => {
						trainerList[index].addFromUser = trainer.includes(eachTrainer._id);
					});

					this.setState({
						user: response,
						trainerLis: trainerList,
						addedTrainer: false
					});
				});
		}
	}

	selectTrainer = trainerId => {
		const {_id: userId} = this.state.user;
		const model = 'trainer';

		userModelPushArray(userId, model, trainerId)
			.then(() => {
				this.setState({
					addedTrainer: true
				});
			});

	};

	render() {
		const trainerList = this.state.trainerList.map(trainer => {
			return (
				<Card style={{width: '18rem'}}>
					<Card.Body>
						<Card.Title>{trainer.username}</Card.Title>
						<Card.Text>
							Some quick example text to build on the card title and make up the bulk
							of
							the card's content.
						</Card.Text>
						{trainer.addFromUser ?
							<Button variant="outline-primary">
								Trainer already added
							</Button>
							:
							<Button variant="primary"
									onClick={() => this.selectTrainer(trainer._id)}>
								Trainer not added
							</Button>}
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