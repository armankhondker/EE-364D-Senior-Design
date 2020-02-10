import React, { Component } from 'react';
import '.././App.css';
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from "react-bootstrap/Button"
import axios from 'axios';
import Tab from 'react-bootstrap/Tab';
import Popup from "reactjs-popup";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import AdminHome from "../components/AdminHome";
import AdminStudents from "../components/AdminStudents";
import AdminProjects from "../components/AdminProjects";

function displayInfo(match) {
	let studentComponent;
	let projectComponent;

	if(match.student_technical !== undefined) {
		studentComponent = <div>
			<p>Name: {match.student}</p>
			<p>Technical: {match.student_technical}</p>
			<p>Professional: {match.student_professional}</p>
			<p>Resume ID: {match.student_resume_id}</p>
			<p>Quadrant: {match.student_quadrant}</p>
			<p>Availability Duration: {match.student_availability_duration} </p>
			<p>Availability Time: {match.student_availability_time} </p>
			<p>Work Factors: {match.student_work_factors} </p>
			<p>Interest Buckets: {match.student_interest_buckets}</p>
		</div>
	} else {
		studentComponent = <div>
			<p>Name: {match.student}</p>
		</div>
	}

	if(match.project_technical !== undefined) {
		projectComponent = <div>
			<p>Name: {match.project_org}</p>
			<p>Primary Category: {match.project_primary}</p>
			<p>Second Category: {match.project_secondary}</p>
			<p>Technical: {match.project_technical}</p>
			<p>Professional: {match.project_professional}</p>
			<p>Quadrant: {match.project_quadrant} </p>
		</div>
	} else{
		projectComponent = <div>
			<p>Name: {match.project_org}</p>

		</div>

	}
	return <div>
		<h3>Student</h3>
		{studentComponent}
		<h3>Project</h3>
		{projectComponent}
	</div>;
}

class Admin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			results: null,
			students: null,
			projects: null,
			loaded: false,
		}
	}

	async componentDidMount() {
        // axios.get('http://127.0.0.1:8000/api/matchings')
        await axios.get('http://django-env.emqvqmazrh.us-west-2.elasticbeanstalk.com/api/matchings')
			.then(res => {
				console.log(res);
				this.setState({ results: res.data });
			});

		await axios.get('http://django-env.emqvqmazrh.us-west-2.elasticbeanstalk.com/api/students')
			.then(res => {
				console.log(res);
				this.setState({ students: res.data });
			});

		await axios.get('http://django-env.emqvqmazrh.us-west-2.elasticbeanstalk.com/api/projects')
			.then(res => {
				console.log(res);
				this.setState({ projects: res.data });
			});

		let { results, students, projects } = this.state;

		await results.forEach((result, index) => {
			let studentName = result.student;
			students.forEach((student, index) => {
				if(student.name === studentName) {
					result.student_technical = student.technical;
					result.student_professional = student.professional;
					result.student_resume_id = student.resume_id;
					result.student_quadrant = student.quadrant;
					result.student_availability_duration = student.availability_duration;
					result.student_availability_time = student.availability_time;
					result.student_work_factors = student.work_factors;
					result.student_interest_buckets = student.interest_buckets;
				}
			})

			let projectName = result.project_org;
			projects.forEach((project, index) => {
				if(project.name === projectName) {
					result.project_technical = project.technical;
					result.project_professional = project.professional;
					result.project_primary = project.primary;
					result.project_secondary = project.secondary;
					result.project_quadrant = project.quadrant;
				}
			})
		})

		this.setState({loaded: true})

	}

	render() {
		let hasMounted = false;
		let { results, students, projects, loaded } = this.state;
		if(results !== null && students !== null && projects !== null) {
			hasMounted = true;
		}

		return (
			<div align="center" className="App">

				<Form>
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

				<p></p>
				   <p></p>
				<Button className="LoginButton" variant="danger">Login</Button>
				<br/>
				<br/>

				<Tab.Container id="left-tabs-example" defaultActiveKey="first">
					<Row>
						<Col sm={3}>
							<Nav variant="pills" className="flex-column">
								<Nav.Item>
									<Nav.Link eventKey="first">Home</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="second">Students</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="third">Projects</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="fourth">Match</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="fifth">Results</Nav.Link>
								</Nav.Item>
							</Nav>
						</Col>
						<Col sm={9}>
							<Tab.Content>
								<Tab.Pane eventKey="first">
									<AdminHome/>
								</Tab.Pane>
								<Tab.Pane eventKey="second">
								<AdminStudents/>
								</Tab.Pane>
								<Tab.Pane eventKey="third">
									<AdminProjects/>
								</Tab.Pane>
								<Tab.Pane eventKey="fourth">
									under construction
								</Tab.Pane>
								<Tab.Pane eventKey="fifth">
									under construction
								</Tab.Pane>
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>

			</div>
			
		);
	}

}

export default Admin;