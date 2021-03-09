import React, {Component} from 'react';
import axios from 'axios';
import {Button, Form} from 'react-bootstrap';

class AddExercise extends Component {
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
		const {title, description} = this.state;

		axios.post(`${process.env.REACT_APP_API_URL}/workout/create`, {
			title,
			description
		}, {withCredentials: true})
			.then(result => {
				this.setState({
					workout: {
						title: '',
						description: ''
					}
				});
			}, error => {
				console.error(error);
			});
	};

	handleChange = event => {
		const {name, value} = event.target;

		this.setState({
			[name]: value
		});
	};


	render() {
		console.log();
		return (
			<div>
				<Form onSubmit={this.handleFormSubmit}>
					<Form.Group>
						<Form.Label>Title:</Form.Label>
						<Form.Control as="textarea"
									  rows={1}
									  name="title"
									  value={this.state.title}
									  onChange={event => this.handleChange(event)}/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Description:</Form.Label>
						<Form.Control as="textarea"
									  rows={3}
									  name="description"
									  value={this.state.description}
									  onChange={event => this.handleChange(event)}/>
					</Form.Group>

					<Button variant="primary"
							type="submit"
							size="lg"
							block>
						Submit
					</Button>
				</Form>
			</div>
		);
	}
}

export default AddExercise;