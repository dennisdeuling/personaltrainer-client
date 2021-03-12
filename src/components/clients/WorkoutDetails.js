import React, {Component} from 'react';
import {Card, ListGroup} from 'react-bootstrap';
import {getExerciseById} from '../services/data-service';

class WorkoutDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				userId: this.props.userId
			},
			workout: {
				_id: this.props._id,
				title: this.props.title,
				description: this.props.description,
				exerciseList: []
			}
		};
	}

	componentDidMount() {
		let exerciseList = [];
		this.props.exerciseList.forEach(exerciseId => {
			getExerciseById(exerciseId)
				.then(exercise => {
					console.log(exercise.title);
				});
		});

		/*this.props.exerciseList.map(exerciseId => {
			getExerciseById(exerciseId)
				.then(exercise => {
					this.setState({
						workout: {
							...this.state.workout,
							exerciseList: [...this.state.workout.exerciseList, exercise]
						}

					});
				});
		});*/
	}

	render() {
		console.log(this.state.workout.exerciseList);
		let exerciseList = this.state.workout.exerciseList;

		if (exerciseList.length > 0) {
			exerciseList = exerciseList.map(exercise => {
				return (
					<div>
						<ListGroup.Item>
							{exercise.title}
						</ListGroup.Item>
					</div>
				);
			});
		}

		return (
			<React.Fragment>
				<Card style={{width: '18rem'}}>
					<Card.Body>
						<Card.Title>{this.state.workout.title}</Card.Title>
						<Card.Text>{this.state.workout.description}</Card.Text>
						<Card.Header>Exercises:</Card.Header>
						<ListGroup variant="flush">
							<ListGroup.Item>
								{exerciseList}
							</ListGroup.Item>
						</ListGroup>
					</Card.Body>
				</Card>
			</React.Fragment>
		);
	}
}

export default WorkoutDetails;