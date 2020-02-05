import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Central extends Component {

	render() {
		return (
			<div>
				<body className="App">
					<h1 align="center">Welcome to the Matching Hub for the RGK CONNECT program! </h1>
					<br></br>
                    <p align="center"><b> This web application is for UT graduate students, community organizations with promising projects, and the RGK CONNECT staff.</b></p>
                    <br></br>
				</body>
			</div>
		);
	}
}

export default withRouter(Central);