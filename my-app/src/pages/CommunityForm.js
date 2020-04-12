import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck'
import FormFile from 'react-bootstrap/FormFile'
import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import RadioButton from "../components/RadioButton";
import LoadingAnimation from "../components/LoadingAnimation";
import update from 'react-addons-update';
import '../App.css';
import axios from "axios";

class CommunityForm extends Component {
    constructor(props) {
        super(props);
		this.state = {
			uploading: false,
			firstNameInput: "",
			lastNameInput: "",
			phoneInput: "",
			emailInput: "",
            orgNameInput:"",
			orgAddressInput:"",
			orgWebsiteInput:"",
			projNameInput:"",
			projDescInput:"",
			projCatInput: [],
			timeCommit: "",
			interestOptions: [],
			interestInputs: [],
			logisticQuestions: [],
			logisticInputs: [],
			logisticFlags: [],
			techCourseOptions: [],
			techCourseInputs: [],
			profCourseOptions: [],
			profCourseInputs: [],
			degreeOptions: [],
			degreeInputs:[],
			degreeInput: "",
			degreeOtherInput: "",
			experienceQuestions:[],
			experienceInputs: [],
			techSkillOptions: [],
			techSkillInputs: [],
			profSkillOptions: [],
			profSkillInputs: [],
			extraSkills: ""
		}

		this.handlePhone = this.handlePhone.bind(this);
		this.handleFirstName = this.handleFirstName.bind(this);
		this.handleLastName = this.handleLastName.bind(this);
		this.handleEmail = this.handleEmail.bind(this);
		this.handleTimeCommit = this.handleTimeCommit.bind(this);
		this.handleInterest = this.handleInterest.bind(this);
		this.handleDegreeOption = this.handleDegreeOption.bind(this);
		this.handleLogisticQuestions = this.handleLogisticQuestions.bind(this);
		this.handleTechCourseInputs = this.handleTechCourseInputs.bind(this);
		this.handleProfCourseInputs = this.handleProfCourseInputs.bind(this);
		this.handleExperienceQuestions = this.handleExperienceQuestions.bind(this);
		this.handleTechSkills = this.handleTechSkills.bind(this);
		this.handleExtraSkills = this.handleExtraSkills.bind(this);
		this.validateForm = this.validateForm.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleTest = this.handleTest.bind(this);
	}

	handlePhone(e) {
		var num = e.target.value;
			this.setState(state => ({
	      phoneInput: num
	    }));
	}

		handleFirstName(e) {
			var name = e.target.value;
			this.setState(state => ({
	      firstNameInput: name
	    }));
	}

	handleEmail(e) {
		var email = e.target.value;
		this.setState(state => ({
			emailInput: email
		}));
	}

		handleOrgName(e) {
			var li = e.target.value;
			this.setState(state => ({
				orgInput: li
			}));
		}

		handleLastName(e) {
			var name = e.target.value;
			this.setState(state => ({
	      lastNameInput: name
	    }));
		}

		handleTimeCommit(e) {
			var tc = e.target.value
			this.setState(state => ({
	      timeCommit: tc
	    }));
		}

		handleInterest(i, e) {
			this.setState(update(this.state, {
				interestInput: {
					[i] : {
						$set: e.target.checked
					}
				}
			}));
		}

		handleDegreeOption(i, e) {
			var formerCheck = -1;
			if (e.target.checked) {
				var k=0;
				for (k; k<this.state.degreeData.length; k++) {
					if (this.state.degreeData[k] === true && k !== i)
						formerCheck=k;
				}
			}
			// Former check is the previously checked box index
			if (formerCheck === -1) {
				this.setState(update(this.state, {
					degreeData: {
						[i] : {
							$set: e.target.checked
						}
					}
				}));
			}
			// If a different box was checked, uncheck it
			else {
				this.setState(update(this.state, {
					degreeData: {
						[i] : {
							$set: e.target.checked
						},
						[formerCheck] : {
							$set: false
						}
					}
				}));
			}
			// Also update actual degree option chosen
			if (e.target.checked) {
				this.setState(state => ({
					degreeOption: this.state.degreeOptions[i]
		    }));
			}
		}

		handleLogisticQuestions(i, choice, e) {
			var pick=false;
			if (choice === 0)
				pick = true;
			this.setState(update(this.state, {
				logisticData: {
					[i] : {
						$set: pick
					}
				},
				logisticFlags: {
					[i] : {
						$set: true
					}
				}
			}));
		}

	handleTechCourseInputs(i, e) {
		this.setState(update(this.state, {
			techCourseInputs: {
				[i] : {
					$set: e.target.checked
				}
			}
		}));
	}

	handleProfCourseInputs(i, e) {
		this.setState(update(this.state, {
			profCourseInputs: {
				[i] : {
					$set: e.target.checked
				}
			}
		}));
	}

	handleExperienceQuestions(i, e) {
		this.setState(update(this.state, {
			experienceInputs: {
				[i] : {
					$set: e.target.value
				}
			}
		}));
	}

	handleTechSkills(i, e) {
		this.setState(update(this.state, {
			techSkillInputs: {
				[i] : {
					$set: e
				}
			}
		}));
	}

	handleProfSkills(i, e) {
		this.setState(update(this.state, {
			profSkillInputs: {
				[i] : {
					$set: e
				}
			}
		}));
	}

		handleExperienceQuestions(i, e) {
			this.setState(update(this.state, {
				experienceInputs: {
					[i] : {
						$set: e.target.value
					}
				}
			}));
		}

		handleExtraSkills(e) {
			var writtenText = e.target.value
			this.setState(state => ({
				extraSkills: writtenText
			}));
		}

	async componentDidMount() {
		axios.get('http://django-env.emqvqmazrh.us-west-2.elasticbeanstalk.com/api/intentions')
			.then(res => {
				console.log(res);
				this.setState({
					intentionOptions: res.data,
					intentionInputs: new Array(res.data.length),
				});
			})
			.catch(err => console.log(err));

		axios.get('http://django-env.emqvqmazrh.us-west-2.elasticbeanstalk.com/api/interests')
			.then(res => {
				console.log(res);
				this.setState({
					interestOptions: res.data,
					interestInputs: new Array(res.data.length),
				});
			})
			.catch(err => console.log(err));

		axios.get('http://django-env.emqvqmazrh.us-west-2.elasticbeanstalk.com/api/logistics')
			.then(res => {
				console.log(res);
				let flags = new Array(res.data.length);
				flags.fill(null);
				this.setState({
					logisticQuestions: res.data,
					logisticInputs: new Array(res.data.length),
					logisticFlags: flags,
				});
			})
			.catch(err => console.log(err));

		axios.get('http://django-env.emqvqmazrh.us-west-2.elasticbeanstalk.com/api/degrees')
			.then(res => {
				console.log(res);
				this.setState({
					degreeOptions: res.data,
					degreeInputs: new Array(res.data.length),
				});
			})
			.catch(err => console.log(err));

		axios.get('http://django-env.emqvqmazrh.us-west-2.elasticbeanstalk.com/api/experiences')
			.then(res => {
				console.log(res);
				this.setState({
					experienceQuestions: res.data,
					experienceInputs: new Array(res.data.length)
				});
			})
			.catch(err => console.log(err));

		axios.get('http://django-env.emqvqmazrh.us-west-2.elasticbeanstalk.com/api/tech-courses')
			.then(res => {
				console.log(res);
				this.setState({
					techCourseOptions: res.data,
					techCourseInputs: new Array(res.data.length),
				});
			})
			.catch(err => console.log(err));

		axios.get('http://django-env.emqvqmazrh.us-west-2.elasticbeanstalk.com/api/prof-courses')
			.then(res => {
				console.log(res);
				this.setState({
					profCourseOptions: res.data,
					profCourseInputs: new Array(res.data.length),
				});
			})
			.catch(err => console.log(err));


		axios.get('http://django-env.emqvqmazrh.us-west-2.elasticbeanstalk.com/api/tech-skills')
			.then(res => {
				console.log(res);
				this.setState({
					techSkillOptions: res.data,
					techSkillInputs: new Array(res.data.length),
				});
			})
			.catch(err => console.log(err));

		axios.get('http://django-env.emqvqmazrh.us-west-2.elasticbeanstalk.com/api/prof-skills')
			.then(res => {
				console.log(res);
				this.setState({
					profSkillOptions: res.data,
					profSkillInputs: new Array(res.data.length),
				});
			})
			.catch(err => console.log(err));
	}

	validateForm() {

	}

	handleTest() {

	}

	handleSubmit() {
		var {phoneInput} = this.state;
		var {firstNameInput} = this.state;
			var {lastNameInput} = this.state;
			var {emailInput} = this.state;
			var {orgInput} = this.state;
			var {resumeInput} = this.state;

			//var {intentionOptions} = this.state;
			//var {intentionData} = this.state;
			var {interestOptions} = this.state;
			var {interestInput} = this.state;
			var {timeCommit} = this.state;

			var {logisticQuestions} = this.state;
			var {logisticData} = this.state;

			var {degreeOption} = this.state;
			var {degreeOtherInput} = this.state;

			var {courseQuestions} = this.state;
			var {courseInputs} = this.state;

			var {experienceQuestions} = this.state;
			var {experienceInputs} = this.state;

			var {guidanceSkill} = this.state;
			var {extraSkills} = this.state;

			var {decisionData} = this.state;



		}

    render() {
        let hasMounted = false;
		let {interestOptions, logisticQuestions, degreeOptions, experienceQuestions, techCourseOptions,
			profCourseOptions, techSkillOptions, profSkillOptions} = this.state;
		if(interestOptions.length && logisticQuestions.length && degreeOptions.length &&
			techCourseOptions.length && profCourseOptions.length && techSkillOptions.length &&
			profSkillOptions.length
		) {
			hasMounted = true;
		}
		let CurrentDisplay;
		if(!hasMounted) {
            CurrentDisplay =
                <div>
                    <LoadingAnimation/>;
                </div>
        } else {
            CurrentDisplay =
                <div className="form">
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="orgInput">
                            <Form.Label>Organization Name </Form.Label>
                            <Form.Control type="text" value={this.state.orgInput} onChange={this.handleOrgName}/>
                        </Form.Group>
                        <Form.Group controlId="nameInput">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control required value={this.state.firstNameInput} onChange={this.handleFirstName} type="text"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control required value={this.state.lastNameInput} onChange={this.handleLastName} type="text"/>
                        </Form.Group>
                        <Form.Group controlId="phoneInput">
                            <Form.Label>Phone #</Form.Label>
                            <Form.Control required type="tel" value={this.state.phoneInput} onChange={this.handlePhone} placeholder="5125558888"/>
                        </Form.Group>
                        <Form.Group controlId="emailInput">
                            <Form.Label>Email</Form.Label>
                            <Form.Control required type="email" value={this.state.emailInput} onChange={this.handleEmail} placeholder="example@utexas.edu"/>
                        </Form.Group>

						<br></br>

                        <Form.Label>Identify the project categories your project falls under. (Check all that
                            apply)</Form.Label>
							{this.state.interestOptions.map((option, index) => {
								return(
										<Form.Group key={index}>
												<Form.Check label={option.name} onChange={this.handleInterest.bind(this, index)}/>
										</Form.Group>
									)
							})}

                        <Form.Group controlId="timeCommit">
                            <Form.Label>Realistically, how much time do you expect your student to commit per week working on your assigned
                                project? </Form.Label>
                            <Form.Control required as="select" onChange={this.handleTimeCommit}>
                                <option></option>
                                <option>Less than 5 Hours Per Week</option>
                                <option>5-10 Hours Per Week</option>
                                <option>15-20 Hours Per Week</option>
                                <option>20-30 Hours Per Week</option>
                            </Form.Control>
                        </Form.Group>

						<br></br>

						{this.state.logisticQuestions.map((question, index) => {
							if (this.state.logisticFlags[index]) {
								return (
									<Form.Group key={index}>
											<Form.Label>{question.name}</Form.Label>
												<Form.Check type="Radio" label="Yes" checked={this.state.logisticData[index]} onChange={this.handleLogisticQuestions.bind(this, index, 0)}/>
												<Form.Check type="Radio" label="No" checked={!this.state.logisticData[index]} onChange={this.handleLogisticQuestions.bind(this, index, 1)}/>
									</Form.Group>
								)
							}
							else {
								return (
									<Form.Group key={index}>
											<Form.Label>{question.name}</Form.Label>
											<Form.Check type="Radio" label="Yes" checked={false} onChange={this.handleLogisticQuestions.bind(this, index, 0)}/>
											<Form.Check type="Radio" label="No" checked={false} onChange={this.handleLogisticQuestions.bind(this, index, 1)}/>
									</Form.Group>
								)
							}
						})}

						<Form.Group controlId="CoursesTaken">
							<Form.Label>Identify each of the following courses you expect your student to have taken/completed. </Form.Label>
								{this.state.techCourseOptions.map((course, index) => {
									if (index % 10 === 0 && index > 0) {
										return (
												<div>
													<br></br>
													<Form.Label>Identify each of the following courses you expect your student to have taken/completed. </Form.Label>
													<Form.Check label={course.name} onChange={this.handleTechCourseInputs.bind(this, index)}/>
												</div>
									  )
								 }
								 else
										return (
												<Form.Check label={course.name} onChange={this.handleTechCourseInputs.bind(this, index)}/>
									 )
								})}
						</Form.Group>

                        <Form.Label>Please rate the experience you expect from your student in the following technical skills using the scale below:</Form.Label>
							<br/>
							<div>1: No Experience </div>
							<div>2: Can Learn		</div>
							<div>3: Slightly Experienced</div>
							<div>4: Experienced	</div>
							<div>5: Extremely Experienced </div>
							<br/>
                        {this.state.techSkillOptions.map((skill, index) => {
                            let formattedSkill = skill.name.replace(/\s+/g, '');
                            return(
                                <Form.Group key={index}>
                                    <Form.Label>{skill.name}</Form.Label>
                                    <RadioButton name={formattedSkill} handleRadio={this.handleTechSkills.bind(this, index)}/>
                                </Form.Group>
                            );
                        })}



												<Form.Label>Please rate the experience you expect from your student in the following professional skills using the scale below:</Form.Label>
												<br/>
												<div>1: No Experience </div>
												<div>2: Slightly Experienced	</div>
												<div>3: Can Learn	</div>
												<div>4: Experienced	</div>
												<div>5: Extremely Experienced </div>
												<br/>
                        <Form.Group>
                            <Form.Label>Communication</Form.Label>
                                <RadioButton name="Communication"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Time Management</Form.Label>
                            <RadioButton name="TimeManagement"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Decision Making</Form.Label>
                            <RadioButton name="DecisionMaking"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Leadership</Form.Label>
                            <RadioButton name="Leadership"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Teamwork</Form.Label>
                            <RadioButton name="Teamwork"/>
                        </Form.Group>

                        <Form.Group controlId="ExtraSkills">
                            <Form.Label>Do you have other relevant skills that may be helpful for your student to have (i.e.
                                other languages spoken, coding, analytical software, professional skills, etc.)? - List
                                them here!</Form.Label>
                            <Form.Control type="profList" onChange={this.handleExtraSkills}/>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                    <br/>
                </div>
        }

        return (
            <div>
                <br/><br/><br/><br/>
                {CurrentDisplay}
            </div>
        );
    }
}

export default CommunityForm;
