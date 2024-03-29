import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const protectedRoute = ({component: Component, user, ...rest}) => {
	// console.log({component: Component, user, ...rest});
	return (
		<Route
			{...rest}
			render={props => {
				if (user) {
					return <Component {...props} user={user}/>;
				} else {
					return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>;
				}
			}}
		/>
	);
};

export default protectedRoute;
