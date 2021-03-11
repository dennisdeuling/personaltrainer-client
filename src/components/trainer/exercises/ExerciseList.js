import React, {Component} from 'react';
import {Container, Row} from 'react-bootstrap';
import ExerciseDetails from './ExerciseDetails';
import {deleteExercise, getUserById} from '../../services/data-service';

class ExerciseList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				loggedIn: this.props.user,
				exercises: ''
			},
			listOfAllExercises: [],
			deletedExercise: false
		};
	}

	componentDidMount() {
		const {_id: trainerId} = this.props.user;
		getUserById(trainerId)
			.then(exercises => {
				this.setState({
					user: {
						loggedIn: this.props.user,
						exercises: exercises.exercises
					}
				});
			});
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.deletedExercise) {
			const {_id: trainerId} = this.state.user.loggedIn;
			getUserById(trainerId)
				.then(result => {
					this.setState({
						user: {
							loggedIn: this.props.user,
							exercises: result.exercises
						},
						deletedExercise: false
					});
				});
		}
	}

	deleteExercise = id => {
		deleteExercise(id)
			.then(() => {
				this.setState({
					deletedExercise: true
				});
			});
	};

	render() {
		let exerciseList = this.state.user.exercises;

		if (exerciseList.length > 0) {
			exerciseList = exerciseList.map(exercise => {
				return <ExerciseDetails
					key={exercise._id}
					_id={exercise._id}
					image={exercise.image}
					title={exercise.title}
					description={exercise.description}
					deleteExercise={this.deleteExercise}/>;
			});
		}
		return (
			<div>
				<h1>Exercises</h1>
				<Container>
					<Row>
						{exerciseList}
					</Row>
				</Container>
			</div>
		);
	}
}

export default ExerciseList;