import React, { Component } from 'react';
import '.././App.css';

class CommunityOrg extends Component {  
    render() {
		return (
			<div className="App" align="center">
				<br></br>
				<h1>Community Organizations Page</h1>
				<br></br>
				<p> <b> Please fill out the following survey if your community organization has a project they would like to have matched. </b> </p>
				<a href="/communityform">Organization Survey</a>
			</div>
			
		);
	}

}

export default CommunityOrg;