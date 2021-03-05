import React, {Component} from 'react';
import axios from 'axios';
import {Button, Card, Form, ListGroup} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faPlusSquare, faTrash} from '@fortawesome/free-solid-svg-icons';
import {getExercises} from '../functions/getData';

class WorkoutDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			workout: {
				_id: this.props._id,
				title: this.props.title,
				description: this.props.description,
				exerciseList: this.props.exerciseList
			},
			addExercise: {
				_id: '',
				title: ''
			},
			listOfAllExercises: [],
			showForm: false
			//deleteExercise: false
		};
	}

	componentDidMount() {
		getExercises()
			.then(result => {
				this.setState({
					listOfAllExercises: result
				});
			});
	}

	editWorkout = event => {
		event.preventDefault();
		const {_id, title, description, exerciseList: exercises} = this.state.workout;
		console.log(_id);

		axios.put(`${process.env.REACT_APP_API_URL}/workout/${_id}`, {
			title,
			description,
			exercises
		}, {
			withCredentials: true
		})
			.then(() => {
				this.setState({
					showForm: false
				});
			}, error => {
				console.error(error);
			});
	};

	deleteWorkout = () => {
		const {_id} = this.state.workout;

		axios.delete(`${process.env.REACT_APP_API_URL}/workout/${_id}`, {
			withCredentials: true
		})
			.then(() => {
				this.props.deleteWorkout(_id);
				/*this.setState({
					showForm: false
				});*/
			}, error => {
				console.error(error);
			});
	};

	getNewExerciseList = (newExerciseList, workoutId) => {
		newExerciseList = newExerciseList.map(exercise => {
			return {_id: exercise._id};
		});
		this.setState({
			workout: {
				_id: workoutId,
				exerciseList: newExerciseList
			}
		});
	};

	deleteExercise = index => {
		let exerciseList = [...this.state.workout.exerciseList];
		exerciseList = exerciseList.filter((exercise, idx) => idx !== index);

		this.setState({
			workout: {
				exerciseList: exerciseList
			}
		});
	};

	handleWorkoutChange = event => {
		const {name, value} = event.target;

		this.setState({
			[name]: value
		});
	};

	handleExerciseChange = event => {
		const {value} = event.target;
		const exercise = value.split(',');

		this.setState({
			addExercise: {
				_id: exercise[0],
				title: exercise[1]
			}
		});
	};

	addExercise = exercise => {
		const newExercise = exercise;
		const exerciseList = [...this.state.workout.exerciseList, newExercise];

		this.setState({
			workout: {
				_id: this.state.workout._id,
				title: this.state.workout.title,
				description: this.state.workout.description,
				exerciseList: exerciseList
			}
		});
	};

	render() {
		const exerciseList = this.state.workout.exerciseList.map((exercise, index) => {
			return (
				<div>
					<ListGroup.Item>
						{exercise.title}
						{this.state.showForm ?
							<FontAwesomeIcon
								icon={faTrash}
								onClick={() => this.deleteExercise(index)}/>
							:
							null}
					</ListGroup.Item>
				</div>
			);
		});

		const optionExerciseList = this.state.listOfAllExercises.map(exercise => {
			const {_id, title} = exercise;
			return <option value={`${_id},${title}`}>{title}</option>;
		});

		// console.log(this.state.listOfAllExercises);
		// console.log(this.state.addExercise);

		return (
			<React.Fragment>
				{this.state.showForm ?
					<Form onSubmit={this.editWorkout}>
						<Card style={{width: '18rem'}}>
							<Card.Img variant="top" src={this.state.workout.thumbImage}/>
							<Card.Body>
								<Card.Title>
									<Form.Group>
										<Form.Label>Title:</Form.Label>
										<Form.Control as="textarea"
													  rows={1}
													  name="title"
													  value={this.state.workout.title}
													  onChange={event => this.handleWorkoutChange(event)}/>
									</Form.Group>
								</Card.Title>
								<Card.Text>
									<Form.Group>
										<Form.Label>Description:</Form.Label>
										<Form.Control as="textarea"
													  rows={3}
													  name="description"
													  value={this.state.workout.description}
													  onChange={event => this.handleWorkoutChange(event)}/>
									</Form.Group>
								</Card.Text>

								{/*<Form.File
							id="thumbImage"
							label={'Upload an image file'}
							data-browse="Pick the image"
							custom
							onChange={event => this.handleFileUpload(event)}/>*/}

								<Card.Header>Exercises:</Card.Header>
								<ListGroup variant="flush">
									<ListGroup.Item>
										{exerciseList}
									</ListGroup.Item>
								</ListGroup>

								<Form.Group>
									<Form.Label>Add exercise</Form.Label>
									<Form.Control as="select"
												  onChange={event => this.handleExerciseChange(event)}>
										{optionExerciseList}
									</Form.Control>
									<FontAwesomeIcon
										icon={faPlusSquare}
										onClick={() => this.addExercise(this.state.addExercise)}/>
								</Form.Group>

								<Button variant="primary"
										type="submit"
										size="lg"
										block>
									Submit
								</Button>
								<FontAwesomeIcon
									icon={faTrash}
									onClick={() => this.deleteWorkout()}/>
							</Card.Body>
						</Card>
					</Form>
					:
					<Card style={{width: '18rem'}}>
						<Card.Img variant="top" src={this.state.workout.thumbImage}/>
						<Card.Body>
							<Card.Title>{this.state.workout.title}</Card.Title>
							<Card.Text>{this.state.workout.description}</Card.Text>
							<Card.Header>Exercises:</Card.Header>
							<ListGroup variant="flush">
								<ListGroup.Item>
									{exerciseList}
								</ListGroup.Item>
							</ListGroup>
							<FontAwesomeIcon
								icon={faEdit}
								onClick={() => this.setState({
									showForm: true
								})}/>
							<FontAwesomeIcon
								icon={faTrash}
								onClick={() => this.deleteWorkout()}/>
						</Card.Body>
					</Card>
				}
			</React.Fragment>
		);
	}
}

export default WorkoutDetails;