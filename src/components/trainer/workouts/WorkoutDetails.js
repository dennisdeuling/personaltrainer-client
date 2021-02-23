import React, {Component} from 'react';
import {Button, Card, Form, ListGroup} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';

class WorkoutDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			_id: this.props._id,
			title: this.props.title,
			description: this.props.description,
			exercises: this.props.exercises,
			showForm: false
		};
	}

	editWorkout = event => {
		event.preventDefault();
		const {_id, title, description} = this.state;

		/*axios.put(`http://localhost:5000/api/exercise/${_id}`, {
			title,
			description
		}, {withCredentials: true})
			.then(() => {
				this.setState({
					showForm: false
				});
			}, error => {
				console.error(error);
			});*/
	};

	deleteWorkout = () => {
		const {_id} = this.state;

		/*axios.delete(`http://localhost:5000/api/exercise/${_id}`, {
			withCredentials: true
		})
			.then(() => {
				this.props.deleteWorkout(_id);
				/!*this.setState({
					showForm: false
				});*!/
			}, error => {
				console.error(error);
			});*/
	};

	handleChange = event => {
		const {name, value} = event.target;

		this.setState({
			[name]: value
		});
	};

	render() {
		const exerciseList = this.state.exercises.map((exercise, index) => {
			return <ListGroup.Item key={`${exercise._id}_${index}`}>{exercise.title}</ListGroup.Item>;
		});
		return (
			<React.Fragment>
				{this.state.showForm ?
					<Form onSubmit={this.editWorkout}>
						<Card style={{width: '18rem'}}>
							<Card.Img variant="top" src={this.state.thumbImage}/>
							<Card.Body>
								<Card.Title>
									<Form.Group>
										<Form.Label>Title:</Form.Label>
										<Form.Control as="textarea"
													  rows={1}
													  name="title"
													  value={this.state.title}
													  onChange={event => this.handleChange(event)}/>
									</Form.Group>
								</Card.Title>
								<Card.Text>
									<Form.Group>
										<Form.Label>Description:</Form.Label>
										<Form.Control as="textarea"
													  rows={3}
													  name="description"
													  value={this.state.description}
													  onChange={event => this.handleChange(event)}/>
									</Form.Group>
								</Card.Text>
								{/*<Form.File
							id="thumbImage"
							label={'Upload an image file'}
							data-browse="Pick the image"
							custom
							onChange={event => this.handleFileUpload(event)}/>*/}
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
						<Card.Img variant="top" src={this.state.thumbImage}/>
						<Card.Body>
							<Card.Title>{this.state.title}</Card.Title>
							<Card.Text>{this.state.description}</Card.Text>
							<Card.Header>Exercises</Card.Header>
							<ListGroup variant="flush">
								{exerciseList}
							</ListGroup>
							<FontAwesomeIcon
								icon={faEdit}
								onClick={() => this.setState({showForm: true})}/>
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