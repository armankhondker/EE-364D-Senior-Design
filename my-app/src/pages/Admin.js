import React, { Component } from 'react';
class Admin extends Component {

	constructor(props) {
		super(props);
		this.state = {
			students: null,
			results: null,
		}
	}

	componentDidMount() {
		fetch('http://127.0.0.1:8000/api/students/', {
			method: 'GET',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
				'Access-Control-Allow-Origin' : '*', // Required for CORS support to work
				'Access-Control-Allow-Credentials' : true ,
				'Access-Control-Allow-Headers': 'X-Requested-With'
			},
		})
			.then(response => {
				response.json().then(data => {
					console.log(data);
					this.setState({
						students: data
					})
				});
			})
			.catch(err => console.log(err));

		fetch('http://127.0.0.1:8000/api/matchings/', {
			method: 'GET',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
				'Access-Control-Allow-Origin' : '*', // Required for CORS support to work
				'Access-Control-Allow-Credentials' : true ,
				'Access-Control-Allow-Headers': 'X-Requested-With'
			},
		})
			.then(response => {
				response.json().then(data => {
					console.log(data);
					this.setState({
						results: data
					})
				});
			})
			.catch(err => console.log(err));
	}

	render() {
		let hasMounted = false;
		if(this.state.students !== null) hasMounted = true;

		return (
			<div align="center">
				<h1>Admin Page</h1>
				<p> Only those with administration access to the RGK CONNECT Program can login here. </p>
				{hasMounted ? (
					this.state.students.map((value, index) => {
						return (
							<p key={index}>{value.name}</p>
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