import React, {Component} from 'react';
import {Button, Card, Form} from 'react-bootstrap';
import AuthService from './auth-service';

class Login extends Component {
	service = new AuthService();

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: ''
		};
	}

	handleFormSubmit = event => {
		event.preventDefault();
		const {username, email, password} = this.state;
		console.log(`Username: ${username}, email: ${email}, password: ${password}`);

		this.service.signup(username, email, password)
			.then(response => {
				this.setState({
					username: '',
					email: '',
					password: ''
				});
				// this.props.getUser();
				// this.props.history.push('/');
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
				<Card style={{width: '18rem'}}>
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
								<Form.Check type="checkbox" label="example"/>
							</Form.Group>
							<Button variant="primary" type="submit">
								Submit
							</Button>
						</Form>
						<Card.Link href="#">Card Link</Card.Link>
						<Card.Link href="#">Another Link</Card.Link>
					</Card.Body>
				</Card>
			</React.Fragment>
		);
	}
}

export default Login;