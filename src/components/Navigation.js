import React, {Component} from 'react';
import {Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class Navigation extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<Nav variant="tabs" defaultActiveKey="/profile">
					<Nav.Item>
						<Nav.Link href="/profile">
							<Link to="/profile">Profile</Link>
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link href="/workouts">
							<Link to="/workouts">Workouts</Link>
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link href="/exercises">
							<Link to="/exercises">Exercises</Link>
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link href="/exercises/add">
							<Link to="/exercises/add">Add Exercise</Link>
						</Nav.Link>
					</Nav.Item>
				</Nav>
			</div>
		);
	}
}

export default Navigation;
