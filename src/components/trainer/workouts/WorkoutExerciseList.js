import React, {Component} from 'react';
import {Card, Form, ListGroup} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import ExerciseDropdown from './ExerciseDropdown';

class WorkoutExerciseList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			exerciseList: this.props.exerciseList,
			editList: this.props.editList
		};
	}

	addExercise = exercise => {
		const newExercise = exercise;
		const exerciseList = [...this.state.exerciseList, newExercise];
		this.setState({
			exerciseList: exerciseList,
			editList: true
		});
	};

	deleteExercise = (id, index) => {
		let exerciseList = [...this.state.exerciseList];
		exerciseList = exerciseList.filter((exercise, idx) => idx !== index);

		this.setState({
			exerciseList: exerciseList
		});
	};

	render() {
		const exerciseList = this.state.exerciseList.map((exercise, index) => {
			return (
				<div>
					<ListGroup.Item>
						{exercise.title}
						{this.state.editList ?
							<FontAwesomeIcon
								icon={faTrash}
								onClick={() => this.deleteExercise(exercise._id, index)}/>
							:
							null}
					</ListGroup.Item>
				</div>
			);
		});
		return (
			<div>
				{this.state.editList ?
					<React.Fragment>
						<Card.Header>Exercises:</Card.Header>
						<ListGroup variant="flush">
							<ListGroup.Item>
								{exerciseList}
							</ListGroup.Item>
						</ListGroup>
						<Form>
							<ExerciseDropdown addExercise={this.addExercise}/>
						</Form>
					</React.Fragment>
					:
					<React.Fragment>
						<Card.Header>Exercises:</Card.Header>
						<ListGroup variant="flush">
							<ListGroup.Item>
								{exerciseList}
							</ListGroup.Item>
						</ListGroup>
					</React.Fragment>
				}
			</div>
		);
	}
}

export default WorkoutExerciseList;