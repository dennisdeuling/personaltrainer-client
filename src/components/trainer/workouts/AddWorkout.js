import React, {Component} from 'react';
import {Button, Card, Form} from 'react-bootstrap';
import {createWorkout, userModelPushArray} from '../../services/data-service';

class AddWorkout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				loggedIn: this.props.user
			},
			workout: {
				title: '',
				description: ''
			}
		};
	}

	handleFormSubmit = event => {
		event.preventDefault();
		const {title, description} = this.state.workout;

		createWorkout(title, description)
			.then(result => {
				const model = 'workouts';
				const {_id: dataId} = result;
				const {_id: userId} = this.state.user.loggedIn;

				userModelPushArray(userId, model, dataId)
					.then(() => {
						this.setState({
							...this.state.user,
							workout: {
								title: '',
								description: ''
							}
						});
					});
			});
	};

	handleChange = event => {
		const {name, value} = event.target;

		this.setState({
			workout: {
				...this.state.workout,
				[name]: value
			}
		});
	};


	render() {
		return (
			<React.Fragment>
				<Form onSubmit={this.handleFormSubmit}>
					<Card style={{width: '18rem'}}>
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
							<Button variant="primary"
									type="submit"
									size="lg"
									block>
								Submit
							</Button>
						</Card.Body>
					</Card>
				</Form>
			</React.Fragment>
		);
	}
}

export default AddWorkout;