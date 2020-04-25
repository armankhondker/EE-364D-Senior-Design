import React, { Component } from 'react';
import '.././App.css';
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from "react-bootstrap/Button"
import '../styling/Login.css';


class Login extends Component {  
    render() {
		return (
			<div>
				<br></br>
				<h1>Admin Login</h1>
				<Form onSubmit={this.props.handleLogin}>
					<Form.Group as={Row} controlId="formPlaintextPassword">
						<Form.Label column sm="5" className = "form-control-plaintext" >
						Username
						</Form.Label>
						<Col sm="15">
						<Form.Control type="username" placeholder="Username" />
						</Col>
					</Form.Group>
					<Form.Group as={Row} controlId="formPlaintextPassword">
						<Form.Label column sm="5" className = "form-control-plaintext">
						Password
						</Form.Label>
						<Col sm="15">
						<Form.Control type="password" placeholder="Password" />
						</Col>
					</Form.Group>
					<Button className="loginButton" variant="danger" type="submit">
						Login
					</Button>
				</Form>
			</div>
		);
	}
}

export default Login; 