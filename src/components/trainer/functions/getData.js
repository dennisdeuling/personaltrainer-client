import axios from 'axios';

async function getWorkouts() {
	const workouts = await axios.get('http://localhost:5000/api/workout', {
		withCredentials: true
	});
	return workouts.data;
};

async function getExercises() {
	const exercises = await axios.get('http://localhost:5000/api/exercise', {
		withCredentials: true
	});
	return exercises.data;
};

export {getWorkouts, getExercises};