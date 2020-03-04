import React, { Component } from 'react';
import '.././App.css';

class Student extends Component {  
    render() {
		return (
			<div className = "App" align="center">
				<br></br>
				<h1>Students Page</h1>
				<br></br>
				<p> <b>Please fill out the following survey if you are interested in working on a project in the RGK CONNECT Program. </b> </p>
				<a href="/studentform">Student Survey</a>

			</div>
			
		);
	}

}

export default Student;