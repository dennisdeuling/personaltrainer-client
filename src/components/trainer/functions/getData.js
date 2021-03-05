import axios from 'axios';

async function getWorkouts() {
	const workouts = await axios.get(`${process.env.REACT_APP_API_URL}/workout`, {
		withCredentials: true
	});
	return workouts.data;
};

async function getExercises() {
	const exercises = await axios.get(`${process.env.REACT_APP_API_URL}/exercise`, {
		withCredentials: true
	});
	return exercises.data;
};

export {getWorkouts, getExercises};