import React, { Component } from 'react';
import '.././App.css';
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button"
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
			<div align="center" className="App">
				<p>Admin Page</p>
				<p>filler</p>
				<p> <b> Only those with administration access to the RGK CONNECT Program can login here.  </b></p>
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