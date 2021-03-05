import React, {Component} from 'react';
import axios from 'axios';
import {Button, Card, Form} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import WorkoutExerciseList from './WorkoutExerciseList';

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
			showForm: false
			//deleteExercise: false
		};
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

	handleChange = event => {
		const {name, value} = event.target;

		this.setState({
			[name]: value
		});
	};

	render() {
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
													  onChange={event => this.handleChange(event)}/>
									</Form.Group>
								</Card.Title>
								<Card.Text>
									<Form.Group>
										<Form.Label>Description:</Form.Label>
										<Form.Control as="textarea"
													  rows={3}
													  name="description"
													  value={this.state.workout.description}
													  onChange={event => this.handleChange(event)}/>
									</Form.Group>
								</Card.Text>
								{/*<Form.File
							id="thumbImage"
							label={'Upload an image file'}
							data-browse="Pick the image"
							custom
							onChange={event => this.handleFileUpload(event)}/>*/}
								<WorkoutExerciseList editList={this.state.showForm}
													 exerciseList={this.state.workout.exerciseList}
													 workoutId={this.state.workout._id}
													 getNewExerciseList={this.getNewExerciseList}/>
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
							<WorkoutExerciseList exerciseList={this.state.workout.exerciseList}/>
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