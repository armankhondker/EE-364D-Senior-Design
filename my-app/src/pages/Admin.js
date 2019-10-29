import React, { Component } from 'react';
import axios from 'axios';

class Admin extends Component {

	constructor(props) {
		super(props);
		this.state = {
			results: null,
		}
	}

	componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/matchings')
			.then(res => {
				console.log(res);
				this.setState({ results: res.data });
			});
	}

	render() {
		let hasMounted = false;
		if(this.state.results !== null) hasMounted = true;

		return (
			<div align="center">
				<h1>Admin Page</h1>
				<p> Only those with administration access to the RGK CONNECT Program can login here. </p>
				{hasMounted ? (
					this.state.results.map((value, index) => {
						return (
							<p key={index}><strong>{value.student}</strong> -> {value.project_org}</p>
						);
					})) : (
						<p>No data</p>
					)
				}
			</div>
			
		);
	}

}

export default Admin;