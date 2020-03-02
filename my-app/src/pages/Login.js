import React, { Component } from 'react';
import '.././App.css';
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from "react-bootstrap/Button"


class Login extends Component {  
    render() {
		return (
			<div className = "App" align="center">
			
            <Form>
					<br></br>
					<h1>Login Page</h1>
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

                <Button className="LoginButton" variant="danger">Login</Button>
                <p></p>
                <Button className="LoginButton" variant="danger">Logout</Button>


			</div>
		);
	}
}

export default Login; 