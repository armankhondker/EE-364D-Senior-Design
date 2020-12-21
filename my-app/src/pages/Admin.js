import React, { Component } from 'react';
import '.././App.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios';
import Tab from 'react-bootstrap/Tab';
import Nav from "react-bootstrap/Nav";
import AdminHome from "../components/AdminHome";
import AdminSurveys from "../components/AdminSurveys";
import AdminStudents from "../components/AdminStudents";
import AdminResumes from "../components/AdminResumes";
import AdminProjects from "../components/AdminProjects";
import AdminMatch from "../components/AdminMatch";
import AdminResults from "../components/AdminResults";
import AdminSettings from "../components/AdminSettings";
import Login from "./Login";

class Admin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			results: null,
			students: null,
			resumes: null,
			projects: null,
			loaded: false,
			token: null,
			isLoggedIn: false,
            settings: null,
		}

		this.update = this.update.bind(this);
	}

	async componentDidMount() {
		await axios.get(process.env.REACT_APP_API_URL + 'settings')
			.then(res => {
				console.log(res);
				this.setState({ settings: res.data });
			});

        axios.get(process.env.REACT_APP_API_URL + 'results')
			.then(res => {
				console.log(res);
				res.data = res.data.filter(result => result.cohort === this.state.settings[0].current_cohort);
				this.setState({ results: res.data });
			});

		axios.get(process.env.REACT_APP_API_URL + 'students')
			.then(res => {
				console.log(res);
				res.data = res.data.filter(student => student.cohort === this.state.settings[0].current_cohort);
				this.setState({ students: res.data });
			});

		axios.get(process.env.REACT_APP_API_URL + 'resumes')
			.then(res => {
				console.log(res);
				this.setState({ resumes: res.data });
			});

		axios.get(process.env.REACT_APP_API_URL + 'projects')
			.then(res => {
				console.log(res);
				res.data = res.data.filter(project => project.cohort === this.state.settings[0].current_cohort);
				this.setState({ projects: res.data });
			});


		this.setState({loaded: true})
	}

	async update() {
		// this.setState({update: "yes"});
		await axios.get(process.env.REACT_APP_API_URL + 'settings')
			.then(res => {
				console.log(res);
				this.setState({ settings: res.data });
			});

		axios.get(process.env.REACT_APP_API_URL + 'students')
			.then(res => {
				console.log(res);
				res.data = res.data.filter(student => student.cohort === this.state.settings[0].current_cohort);
				this.setState({ students: res.data });
			});

		axios.get(process.env.REACT_APP_API_URL + 'projects')
			.then(res => {
				console.log(res);
				res.data = res.data.filter(project => project.cohort === this.state.settings[0].current_cohort);
				this.setState({ projects: res.data });
			});


		axios.get(process.env.REACT_APP_API_URL + 'results')
			.then(res => {
				console.log(res);
				res.data = res.data.filter(result => result.cohort === this.state.settings[0].current_cohort);
				this.setState({ results: res.data });
			});

		await console.log("Updated");
	}

	handleLogin = async (event) => {
		event.preventDefault();
		console.log(event);
	    let params = {
	    	username: event.target[0].value,
			password: event.target[1].value,
		};


		// await axios.post('http://django-env.emqvqmazrh.us-west-2.elasticbeanstalk.com/api-token-auth/', params)
		await axios.post(process.env.REACT_APP_AUTH_URL, params)
			.then(res => {
				console.log(res);
				if(res.status === 200) {
					this.setState({
						token: res.data,
						isLoggedIn: true
					})
				}
			})
			.catch(error => {
				console.log(error);
				window.alert("Incorrect Username and Password combination.");
			});
	}

	handleLogout = event => {
		event.preventDefault();
		this.setState({isLoggedIn: false});
	}

	render() {
		let hasMounted = false;
		let {students, resumes, projects, isLoggedIn} = this.state;
		if(students !== null && resumes !== null && projects !== null) {
			hasMounted = true;
		}
		let CurrentDisplay;
		if(!isLoggedIn) {
			CurrentDisplay = <Login handleLogin={this.handleLogin.bind(this)}/>
		} else {
			if(hasMounted) {
				CurrentDisplay =
				<Tab.Container id="left-tabs-example" defaultActiveKey="first">
					<Row>
						<Col sm={3}>
							<Nav variant="pills" className="flex-column">
								<Nav.Item>
									<Nav.Link eventKey="first">Home</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="second">Surveys</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="third">Students</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="fourth">Resumes</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="fifth">Projects</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="sixth">Match</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="seventh">Results</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="eighth">Settings</Nav.Link>
								</Nav.Item>
							</Nav>
						</Col>
						<Col sm={9}>
							<Tab.Content>
								<Tab.Pane eventKey="first">
									<AdminHome handleLogout={this.handleLogout.bind(this)}/>
								</Tab.Pane>
								<Tab.Pane eventKey="second">
									<AdminSurveys/>
								</Tab.Pane>
								<Tab.Pane eventKey="third">
									<AdminStudents students={this.state.students}/>
								</Tab.Pane>
								<Tab.Pane eventKey="fourth">
									<AdminResumes students={this.state.students} resumes={this.state.resumes}/>
								</Tab.Pane>
								<Tab.Pane eventKey="fifth">
									<AdminProjects projects={this.state.projects}/>
								</Tab.Pane>
								<Tab.Pane eventKey="sixth">
									<AdminMatch students={this.state.students} projects={this.state.projects}/>
								</Tab.Pane>
								<Tab.Pane eventKey="seventh">
									<AdminResults students={this.state.students} projects={this.state.projects} results={this.state.results}  />
								</Tab.Pane>
								<Tab.Pane eventKey="eighth">
									<AdminSettings callBack={this.update}/>
								</Tab.Pane>
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>;
			} else {
				CurrentDisplay = <p>Loading</p>;
			}
		}

		return (
			<div align="center" className="App">
				{CurrentDisplay}
			</div>
		);
	}
}

export default Admin;
