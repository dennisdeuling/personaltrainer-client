import React, {Component} from 'react';
import {Tab, Tabs} from 'react-bootstrap';
import TrainerProfile from '../trainer/profile/Profile';

class ListOfTrainers extends Component {
	render() {
		return (
			<div>
				<Tabs defaultActiveKey="trainer"
					  id="uncontrolled-tab-example"
					  style={{width: '30rem'}}>
					<Tab eventKey="trainer"
						 title="Trainer"
						 style={{width: '30rem'}}>
						<TrainerProfile/>
					</Tab>
					<Tab eventKey="workouts"
						 title="Workouts"
						 style={{width: '30rem'}}>
						<TrainerProfile/>
					</Tab>
					<Tab eventKey="exercises"
						 title="Exercises"
						 style={{width: '30rem'}}>
						<TrainerProfile/>
					</Tab>
				</Tabs>
			</div>
		);
	}
}

export default ListOfTrainers;