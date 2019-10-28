import React, { Component } from 'react';
import '.././App.css';

class Student extends Component {  
    render() {
		return (
			<div className = "App" align="center">
				<h1>Students Page</h1>
				<p> Please fill out the following survey if you are interested in working on a project in the RGK CONNECT Program. </p>
				<a href="https://utexas.ca1.qualtrics.com/jfe/preview/SV_d6HzHIPimmAtIt7?Q_SurveyVersionID=current&Q_CHL=preview">Student Survey</a>
			</div>
			
		);
	}

}

export default Student;