import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Central extends Component {

	render() {
		return (
			<div className="Splash">
				<body onClick={this.redirect} className="Central-body">
					<h1>Welcome to the Matching central for the RGK CONNECT program! </h1>
					<br></br>
					<h2>Click here</h2>
				</body>
			</div>
		);
	}
	redirect = () => {
		let path = '/home'
		this.props.history.push(path);
	}
}

export default withRouter(Central);