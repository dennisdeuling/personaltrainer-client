import React, {Component} from 'react';
import ListOfTrainers from './ListOfTrainers';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {

	}

	render() {
		return (
			<div>
				<h1>I'm a test</h1>
				<ListOfTrainers/>
			</div>
		);
	}
}

export default Dashboard;