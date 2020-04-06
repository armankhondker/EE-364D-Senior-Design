
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

class StudentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skills: null,
						phoneInput: "",
						firstNameInput: "",
						lastNameInput: "",
						emailInput: "",
						linkedinInput: "",
						projectCategories: "",
						timeCommit: "",
						intentionOptions: ["To gain real world experience", "To participate in a paid experience", "To fulfill an academic requirement (i.e. capstone, thesis, dissertation"],
						interestOptions: ["Research", "Data Collection", "Software Development", "Business Intelligence", "Data Analytics"],
						logisticQuestions: ["To comply with University rules and regulations, are you an international student?", "Do you currently receive any UT financial aid or fellowships?", "Do you have access to transportation?", "Do you need flexible work hours?", "Do you need the ability to work remotely?"],
						degreeOptions: ["Master of Public Affair", "Master of Global Policy Studies", "DC Concentration (MPAFF/MGPS)", "Ph.D. in Public Policy", "Nonprofit Portfolio Program", "Public Health", "Educational Psychology", "Social Work", "Other"],
						logisticData: [],
						logisticFlags: [],
						intentionData: [],
						interestInput: [],
						courseQuestions: ["Data Visualization, Statistics, and Econometrics for Policy Analysis, Using the Python Data Science Platform (PA 397C-60380)", "Data Analysis/Simulation in R (EDP 380C)", "Advanced Statistical Modeling (EDP 381D)"],
						courseInputs: [],
						decisionData: [],
						degreeData:[],
						degreeOption: "",
						degreeOtherInput: "",
						experienceQuestions:["Over the past 5 years, approximately how much experience have you had working or directly volunteering with nonprofit organizations?"],
						experienceInputs: [],
						guidanceSkill: "",
						extraSkills: ""
        }
				this.handlePhone = this.handlePhone.bind(this);
	 		 	this.handleFirstName = this.handleFirstName.bind(this);
				this.handleLastName = this.handleLastName.bind(this);
				this.handleEmail = this.handleEmail.bind(this);
				this.handleLinkedin = this.handleLinkedin.bind(this);
				this.handleTimeCommit = this.handleTimeCommit.bind(this);
				this.handleIntentions = this.handleIntentions.bind(this);
				this.handleInterest = this.handleInterest.bind(this);
				this.handleDegreeOption = this.handleDegreeOption.bind(this);
				this.handleLogisticQuestions = this.handleLogisticQuestions.bind(this);
				this.handleCourseInputs = this.handleCourseInputs.bind(this);
				this.handleExperienceQuestions = this.handleExperienceQuestions.bind(this);
				this.handleGuidanceQuestion = this.handleGuidanceQuestion.bind(this);
				this.handleRadio = this.handleRadio.bind(this);
				this.handleExtraSkills = this.handleExtraSkills.bind(this);
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

		handleLinkedin(e) {
			var li = e.target.value;
			this.setState(state => ({
				linkedinInput: li
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

		handleIntentions(i, e) {
			this.setState(update(this.state, {
				intentionData: {
					[i] : {
						$set: e.target.checked
					}
				}
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

		handleCourseInputs(i, e) {
			this.setState(update(this.state, {
				courseInputs: {
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

		handleGuidanceQuestion(e) {
			var guidanceValue = e.target.value
			this.setState(state => ({
				guidanceSkill: guidanceValue
			}));
		}

		handleRadio(i, e) {
			this.setState(update(this.state, {
				decisionData: {
					[i] : {
						$set: e
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
       await axios.get('http://django-env.emqvqmazrh.us-west-2.elasticbeanstalk.com/api/skills')
           .then(res => {
               console.log(res);
               this.setState({
								 skills: res.data,
								 decisionData: new Array(res.data.length),
								 intentionData: new Array(this.state.intentionOptions.length),
								 interestInput: new Array(this.state.interestOptions.length),
								 degreeData: new Array(this.state.degreeOptions.length),
								 logisticData: new Array(this.state.logisticQuestions.length),
								 logisticFlags: new Array(this.state.logisticQuestions.length),
								 courseInputs: new Array(this.state.courseQuestions.length),
								 experienceInputs: new Array(this.state.experienceQuestions.length)
						   });
           })
           .catch(err => console.log(err));
    }

    render() {
        let hasMounted = false;
        let {skills} = this.state;
        if(skills !== null) {
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
                    <Form>
                        <Form.Group controlId="nameInput">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control value={this.state.firstNameInput} onChange={this.handleFirstName} type="text"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control value={this.state.lastNameInput} onChange={this.handleLastName} type="text"/>
                        </Form.Group>
                        <Form.Group controlId="phoneInput">
                            <Form.Label>Phone #</Form.Label>
                            <Form.Control type="tel" value={this.state.phoneInput} onChange={this.handlePhone} placeholder="5125558888"/>
                        </Form.Group>
                        <Form.Group controlId="emailInput">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={this.state.emailInput} onChange={this.handleEmail} placeholder="example@utexas.edu"/>
                        </Form.Group>
                        <Form.Group controlId="linkedinInput">
                            <Form.Label>LinkedIn (preferred, but not required)</Form.Label>
                            <Form.Control type="text" value={this.state.linkedinInput} onChange={this.handleLinkedin}/>
                        </Form.Group>
												<div className="mb-3">
											    <Form.File id="resumeInput">
											      <Form.File.Label>Regular file input</Form.File.Label>
											      <Form.File.Input />
											    </Form.File>
											  </div>

												<Form.Label>Why are you interested in working on a project? (Check all that apply </Form.Label>
														{this.state.intentionOptions.map((option, index) => {
		                            return(
																	<Form.Group key={index}>
																			<Form.Check label={option} onChange={this.handleIntentions.bind(this, index)}/>
																	</Form.Group>
																)
														})}

                        <Form.Label>Identify each of the project categories you are interested in. (Check all that
                            apply)</Form.Label>
														{this.state.interestOptions.map((option, index) => {
		                            return(
																	<Form.Group key={index}>
																			<Form.Check label={option} onChange={this.handleInterest.bind(this, index)}/>
																	</Form.Group>
																)
														})}

                        <Form.Group controlId="timeCommit">
                            <Form.Label>Realistically, how much time can you commit per week to working on a
                                project? </Form.Label>
                            <Form.Control as="select" onChange={this.handleTimeCommit}>
                                <option></option>
                                <option>Less than 5 Hours Per Week</option>
                                <option>5-10 Hours Per Week</option>
                                <option>15-20 Hours Per Week</option>
                                <option>20-30 Hours Per Week</option>
                            </Form.Control>
                        </Form.Group>

												{this.state.logisticQuestions.map((question, index) => {
													if (this.state.logisticFlags[index]) {
														return (
															<Form.Group key={index}>
																	<Form.Label>{question}</Form.Label>
																	<Form.Check type="Radio" label="Yes" checked={this.state.logisticData[index]} onChange={this.handleLogisticQuestions.bind(this, index, 0)}/>
																	<Form.Check type="Radio" label="No" checked={!this.state.logisticData[index]} onChange={this.handleLogisticQuestions.bind(this, index, 1)}/>
															</Form.Group>
														)
													}
													else {
														return (
															<Form.Group key={index}>
																	<Form.Label>{question}</Form.Label>
																	<Form.Check type="Radio" label="Yes" checked={false} onChange={this.handleLogisticQuestions.bind(this, index, 0)}/>
																	<Form.Check type="Radio" label="No" checked={false} onChange={this.handleLogisticQuestions.bind(this, index, 1)}/>
															</Form.Group>
														)
													}
												})}


                        <Form.Group controlId="degree">
                            <Form.Label>Which degree program are you currently enrolled in?</Form.Label>
														{this.state.degreeOptions.map((option, index) => {
																return(
																		<Form.Group key={index}>
																			<Form.Check type="Radio" label={option} checked={this.state.degreeData[index]} onChange={this.handleDegreeOption.bind(this, index)}/>
																		</Form.Group>
																)
														})}
                        </Form.Group>

												<Form.Group controlId="CoursesTaken">
													<Form.Label>Identify each of the following courses you have taken/completed. </Form.Label>
														{this.state.courseQuestions.map((course, index) => {
															if (index % 10 === 0 && index > 0) {
																return (
																		<div>
																	 		<br></br>
																			<Form.Label>Identify each of the following courses you have taken/completed. </Form.Label>
																			<Form.Check label={course} onChange={this.handleCourseInputs.bind(this, index)}/>
																		</div>
															  )
														 }
														 else
																return (
 																		<Form.Check label={course} onChange={this.handleCourseInputs.bind(this, index)}/>
 															 )
														})}
												</Form.Group>

                        <Form.Group controlId="experience">
													{this.state.experienceQuestions.map((question, index) => {
															return(
																<Form.Group key={index}>
																	<Form.Label>{question}</Form.Label>
																	<Form.Control as="select" onChange={this.handleExperienceQuestions.bind(this,index)}>
																			<option></option>
																			<option>No Experience</option>
																			<option>Less than 6 months</option>
																			<option>6-12 Months</option>
																			<option>More than 1 year</option>
																	</Form.Control>
																</Form.Group>
															)
													})}
												</Form.Group>

                        <Form.Group controlId="guidanceSkill">
                            <Form.Label>How skilled are you with leading and managing a project from start to finish
                                with little guidance from your client? </Form.Label>
                            <Form.Control as="select" onChange={this.handleGuidanceQuestion}>
                                <option></option>
                                <option>1 - Not Skilled at All</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5 - Extremely Skilled</option>
                            </Form.Control>
                        </Form.Group>


                        <Form.Label>Please Rate your Experience in the following Technical Skills: </Form.Label>
                        {skills.map((skill, index) => {
                            let formattedSkill = skill.name.replace(/\s+/g, '');
                            return(
                                <Form.Group key={index}>
                                    <Form.Label>{skill.name}</Form.Label>
                                    <RadioButton name={formattedSkill} handleRadio={this.handleRadio.bind(this, index)}/>
                                </Form.Group>
                            );
                        })}



                        <Form.Label>Please Rate your Experience in the following Professional Skills: </Form.Label>
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
                            <Form.Label>Do you have other relevant skills that may be helpful for us to know about (i.e.
                                other languages spoken, coding, analytical software, professional skills, etc.)? - List
                                them here!</Form.Label>
                            <Form.Control type="profList" onChange={this.handleExtraSkills}/>
                        </Form.Group>

                        <Button variant="primary" type="button">
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

export default StudentForm;
