import React, { Component } from 'react';
import '.././App.css';
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button"

class Admin extends Component {  
    render() {
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

               
        
			</div>
			
		);
	}

}

export default Admin;