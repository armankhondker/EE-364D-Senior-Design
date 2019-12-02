import React, { Component } from 'react';
import '.././App.css';

class Student extends Component {  
    render() {
		return (
			<div className = "App" align="center">
				<p>Students Page</p>
				<p>filler</p>
				<p> Please fill out the following survey if you are interested in working on a project in the RGK CONNECT Program. </p>
				<a href="/studentform">Student Survey</a>

			</div>
			
		);
	}

}

export default Student;