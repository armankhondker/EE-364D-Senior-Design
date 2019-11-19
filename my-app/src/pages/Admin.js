import React, { Component } from 'react';
import '.././App.css';
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button"
import axios from 'axios';
import Popup from "reactjs-popup";
// import JSON from 'defiant.js';

class Admin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			results: null,
			students: null,
			projects: null,
		}

		this.find = this.find.bind(this);
	}

	componentDidMount() {
        // axios.get('http://127.0.0.1:8000/api/matchings')
        axios.get('http://django-env.emqvqmazrh.us-west-2.elasticbeanstalk.com/api/matchings')
			.then(res => {
				console.log(res);
				this.setState({ results: res.data });
			});

		axios.get('http://django-env.emqvqmazrh.us-west-2.elasticbeanstalk.com/api/students')
			.then(res => {
				console.log(res);
				this.setState({ students: res.data });
			});

		axios.get('http://django-env.emqvqmazrh.us-west-2.elasticbeanstalk.com/api/projects')
			.then(res => {
				console.log(res);
				this.setState({ projects: res.data });
			});
	}

	find() {


	}

	render() {
		let hasMounted = false;
		let { results, students, projects } = this.state;
		if(results !== null && students !== null && projects !== null) {
			hasMounted = true;
			const defiant = require('defiant.js');
			const search = defiant.search(students, '//*[name="Morgan Lubenow"]');
			console.log(search);
		}

		return (
			<div align="center" className="App">
				<h1>Admin Page</h1>
				<p> Only those with administration access to the RGK CONNECT Program can login here. </p>
				<Form>
					<Form.Group as={Row} controlId="formPlaintextPassword">
						<Form.Label column sm="5">
						Username
						</Form.Label>
						<Col sm="15">
						<Form.Control type="username" placeholder="Username" />
						</Col>
					</Form.Group>
					<Form.Group as={Row} controlId="formPlaintextPassword">
						<Form.Label column sm="5">
						Password
						</Form.Label>
						<Col sm="15">
						<Form.Control type="password" placeholder="Password" />
						</Col>
					</Form.Group>
				</Form>

				<p></p>
				<Button className="CreateAccount" variant="light">Create Account</Button>
				   <p></p>
				<Button className="LoginButton" variant="danger">Login</Button>
				<br/>
				<br/>
				{hasMounted ? (
					this.state.results.map((value, index) => {
						return (
							<div>
								<Popup modal
									   closeOnDocumentClick
									   onOpen={this.handleSubmit}
									   trigger={<button>{value.student} -> {value.project_org}</button>}>
									<div>
										{value.student} and {value.project_org}
									</div>
								</Popup>
							</div>
							// <p key={index}><strong>{value.student}</strong> -> {value.project_org}</p>
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