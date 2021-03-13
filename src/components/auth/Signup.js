import React, {Component} from 'react';
import {Button, Card, Form} from 'react-bootstrap';
import AuthService from '../services/auth-service';
import {Link} from 'react-router-dom';

class Login extends Component {
	service = new AuthService();

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			userGroup: ''
		};
	}

	handleFormSubmit = event => {
		event.preventDefault();
		const {username, email, password, userGroup} = this.state;

		this.service.signup(username, email, password, userGroup)
			.then(response => {
				this.setState({
					username: '',
					email: '',
					password: '',
					userGroup: ''
				});

				this.props.getUser(response);

				if (response.userGroup === 'trainer') {
					this.props.history.push('/exercises/add');
				}

				if (response.userGroup === 'client') {
					this.props.history.push('/trainer');
				}

			}, error => {
				console.log(error);
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
				<Card style={{width: '25rem'}}>
					<Card.Body>
						<Card.Title>Signup</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">Please create your
							account</Card.Subtitle>
						<Form onSubmit={this.handleFormSubmit}>
							<Form.Group>
								<Form.Label>Username:</Form.Label>
								<Form.Control type="text"
											  placeholder="John Doe"
											  name="username"
											  value={this.state.username}
											  onChange={event => this.handleChange(event)}/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Email:</Form.Label>
								<Form.Control type="email"
											  placeholder="john.doe@example.com"
											  name="email"
											  value={this.state.email}
											  onChange={event => this.handleChange(event)}/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Password:</Form.Label>
								<Form.Control type="password"
											  placeholder="Enter your password"
											  name="password"
											  value={this.state.password}
											  onChange={event => this.handleChange(event)}/>
							</Form.Group>
							<Form.Group>
								<Form.Check type="radio"
											name="userGroup"
											value="client"
											label="I'm a client and my trainer use this app"
											onChange={event => this.handleChange(event)}/>
								<Form.Check type="radio"
											name="userGroup"
											value="trainer"
											label="I'm a trainer and I would like to train my clients"
											onChange={event => this.handleChange(event)}/>
							</Form.Group>
							<Button variant="primary"
									type="submit">
								Sign up now
							</Button>
						</Form>
						<Card.Text>If you already have an account you can Login: <Link
							to="/login">here</Link></Card.Text>
					</Card.Body>
				</Card>
			</React.Fragment>
		);
	}
}

export default Login;