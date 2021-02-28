import React, {Component} from 'react';
// import uuid from 'uuidv4';
import {getExercises} from '../functions/getData';
import {Form} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons';

class ExerciseDropdown extends Component {
	constructor(props) {
		super(props);
		this.state = {
			exercise: {
				_id: '',
				title: ''
			},
			listOfAllExercises: []
		};
	}

	componentDidMount() {
		getExercises()
			.then(result => {
				result.unshift({title: 'Choose your exercise'});
				this.setState({
					listOfAllExercises: result
				});
			});
	}

	handleChange = event => {
		const {value} = event.target;
		const exercise = value.split(',');

		this.setState({
			exercise: {
				_id: exercise[0],
				title: exercise[1]
			}
		});
	};

	addExercise = exercise => {
		this.props.addExercise(exercise);
	};

	render() {
		const optionExerciseList = this.state.listOfAllExercises.map((exercise, index) => {
			return <option
				value={`${exercise._id},${exercise.title},${index}`}>{exercise.title}</option>;
		});

		return (
			<React.Fragment>
				<Form.Group>
					<Form.Label>Add exercise</Form.Label>
					<Form.Control as="select"
								  onChange={event => this.handleChange(event)}>
						{optionExerciseList}
					</Form.Control>
					<FontAwesomeIcon
						icon={faPlusSquare}
						onClick={() => this.addExercise(this.state.exercise)}/>
				</Form.Group>
			</React.Fragment>
		);
	}
}

export default ExerciseDropdown;