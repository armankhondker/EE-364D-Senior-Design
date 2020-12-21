import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, {Component} from 'react';
import RadioButton from "../components/RadioButton";
import LoadingAnimation from "../components/LoadingAnimation";
import update from 'react-addons-update';
import '../App.css';
import axios from "axios";

class CommunityForm extends Component {
    constructor(props) {
        super(props);
		this.state = {
			enabled: true,
			submitting: false,
			submitted: false,
            currentCohort: "",
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
			logisticQuestions: ["Does your candidate need to have their own transportation?", "Will your project permit flexible work hours?", "Will your candidate be able to work remotely?"],
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

		this.handleOrgName = this.handleOrgName.bind(this);
		this.handleOrgWebsite = this.handleOrgWebsite.bind(this);
		this.handleOrgAddress = this.handleOrgAddress.bind(this);
		this.handleProjName = this.handleProjName.bind(this);
		this.handleProjDesc = this.handleProjDesc.bind(this);
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

	handleOrgName(e) {
    	this.setState({
			orgNameInput: e.target.value
		});
	}

	handleOrgWebsite(e) {
		this.setState({
			orgWebsiteInput: e.target.value
		});
	}

	handleOrgAddress(e) {
		this.setState({
			orgAddressInput: e.target.value
		});
	}

	handleProjName(e) {
		this.setState({
			projNameInput: e.target.value
		});
	}

	handleProjDesc(e) {
		this.setState({
			projDescInput: e.target.value
		});
	}

	handlePhone(e) {
		var num = e.target.value;
			this.setState(() => ({
	      phoneInput: num
	    }));
	}

		handleFirstName(e) {
			var name = e.target.value;
			this.setState(() => ({
	      firstNameInput: name
	    }));
	}

	handleEmail(e) {
		var email = e.target.value;
		this.setState(() => ({
			emailInput: email
		}));
	}

		handleLastName(e) {
			var name = e.target.value;
			this.setState(() => ({
	      lastNameInput: name
	    }));
		}

		handleTimeCommit(e) {
			var tc = e.target.value
			this.setState(() => ({
	      timeCommit: tc
	    }));
		}

		handleInterest(i, e) {
			this.setState(update(this.state, {
				interestInputs: {
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
				this.setState(() => ({
					degreeOption: this.state.degreeOptions[i]
		    }));
			}
		}

		handleLogisticQuestions(i, choice, e) {
			this._e = e;
			var pick=false;
			if (choice === 0)
				pick = true;
			this.setState(update(this.state, {
				logisticInputs: {
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

	handleExtraSkills(e) {
		var writtenText = e.target.value
		this.setState(() => ({
			extraSkills: writtenText
		}));
	}

	async componentDidMount() {
		axios.get(process.env.REACT_APP_API_URL + 'settings/1/')
			.then(res => {
				console.log(res);
				this.setState({
					enabled: res.data.organization_form_enabled,
					currentCohort: res.data.current_cohort,
				});
			})
			.catch(err => console.log(err));

		axios.get(process.env.REACT_APP_API_URL + 'intentions')
			.then(res => {
				console.log(res);
				this.setState({
					intentionOptions: res.data,
					intentionInputs: new Array(res.data.length),
				});
			})
			.catch(err => console.log(err));

		axios.get(process.env.REACT_APP_API_URL + 'interests')
			.then(res => {
				console.log(res);
				this.setState({
					interestOptions: res.data,
					interestInputs: new Array(res.data.length),
				});
			})
			.catch(err => console.log(err));

		// axios.get(process.env.REACT_APP_API_URL + 'logistics')
		// 	.then(res => {
		// 		console.log(res);
				let flags = new Array(3);
				flags.fill(null);
				this.setState({
					// logisticQuestions: res.data,
					logisticInputs: new Array(3),
					logisticFlags: flags,
				});
			// })
			// .catch(err => console.log(err));

		axios.get(process.env.REACT_APP_API_URL + 'degrees')
			.then(res => {
				console.log(res);
				this.setState({
					degreeOptions: res.data,
					degreeInputs: new Array(res.data.length),
				});
			})
			.catch(err => console.log(err));

		axios.get(process.env.REACT_APP_API_URL + 'experiences')
			.then(res => {
				console.log(res);
				this.setState({
					experienceQuestions: res.data,
					experienceInputs: new Array(res.data.length)
				});
			})
			.catch(err => console.log(err));

		axios.get(process.env.REACT_APP_API_URL + 'tech-courses')
			.then(res => {
				console.log(res);
				this.setState({
					techCourseOptions: res.data,
					techCourseInputs: new Array(res.data.length),
				});
			})
			.catch(err => console.log(err));

		axios.get(process.env.REACT_APP_API_URL + 'prof-courses')
			.then(res => {
				console.log(res);
				this.setState({
					profCourseOptions: res.data,
					profCourseInputs: new Array(res.data.length),
				});
			})
			.catch(err => console.log(err));


		axios.get(process.env.REACT_APP_API_URL + 'tech-skills')
			.then(res => {
				console.log(res);
				this.setState({
					techSkillOptions: res.data,
					techSkillInputs: new Array(res.data.length),
				});
			})
			.catch(err => console.log(err));

		axios.get(process.env.REACT_APP_API_URL + 'prof-skills')
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
		let alertMessage = "";
		let {logisticFlags, logisticQuestions, techSkillInputs, techSkillOptions, profSkillOptions,
			profSkillInputs
		} = this.state;

		for(let i = 0; i < logisticQuestions.length; i++) {
			if(logisticFlags[i] === null || logisticFlags[i] === undefined) {
				alertMessage += `${logisticQuestions[i]} \n`;
			}
		}

		for(let i = 0; i < techSkillInputs.length; i++) {
			let input = techSkillInputs[i];
			if(input === null || input === undefined) {
				alertMessage += `${techSkillOptions[i].name} \n`
			}
		}

		for(let i = 0; i < profSkillInputs.length; i++) {
			let input = profSkillInputs[i];
			if(input === null || input === undefined) {
				alertMessage += `${profSkillOptions[i].name} \n`
			}
		}

		if(alertMessage !== "") {
			window.alert("Please fill out the following: \n" + alertMessage);
			return false;
		} else {
			return true;
		}

	}

	handleTest() {

	}

	async handleSubmit(e) {

		let {
		    orgNameInput, orgAddressInput, orgWebsiteInput, projNameInput, projDescInput,
			firstNameInput, lastNameInput, phoneInput, emailInput, timeCommit,
			interestOptions, interestInputs,
			logisticInputs,
			techCourseOptions, techCourseInputs, profCourseOptions, profCourseInputs,
			degreeInputs, degreeOptions, experienceQuestions, experienceInputs, techSkillOptions,
			techSkillInputs, profSkillOptions, profSkillInputs, extraSkills, currentCohort
		} = this.state;

		let	jsonInterests = {};
		let jsonDegrees = {};
		let jsonTechCourses = {};
		let jsonProfCourses = {};
		let jsonExperiences = {};
		let jsonTechSkills = {};
		let jsonProfSkills = {};

		const isFormValid = await this.validateForm();
		if(!isFormValid) {
		  e.preventDefault();
			return;
		}

    this.setState({submitting: true});

		for(let i = 0; i < interestOptions.length; i ++) {
			let input = interestInputs[i];
			if(input === null || input === undefined) input = false;
			jsonInterests[interestOptions[i].name] = input;
		}

		for(let i = 0; i < degreeOptions.length; i++) {
			let input = degreeInputs[i];
			if(input === null || input === undefined) input = false;
			jsonDegrees[degreeOptions[i].name] = input;
		}

		for(let i = 0; i < techCourseOptions.length; i ++) {
			let input = techCourseInputs[i];
			if(input === null || input === undefined) input = false;
			jsonTechCourses[techCourseOptions[i].name] = input;
		}

		for(let i = 0; i < profCourseOptions.length; i ++) {
			let input = profCourseInputs[i];
			if(input === null || input === undefined) input = false;
			jsonProfCourses[profCourseOptions[i].name] = input;
		}

		for(let i = 0; i < experienceQuestions.length; i ++) {
			jsonExperiences[experienceQuestions[i].name] = experienceInputs[i];
		}

		for(let i = 0; i < techSkillOptions.length; i ++) {
			jsonTechSkills[techSkillOptions[i].name] = techSkillInputs[i];
		}

		for(let i = 0; i < profSkillOptions.length; i ++) {
			jsonProfSkills[profSkillOptions[i].name] = profSkillInputs[i];
		}

		//TODO figure out resume saving
		let params = {
		  organization_name: orgNameInput,
			organization_address: orgAddressInput,
			organization_website: orgWebsiteInput,
			contact_first_name: firstNameInput,
			contact_last_name: lastNameInput,
			contact_phone: phoneInput,
			contact_email: emailInput,
			project_name: projNameInput,
			project_description: projDescInput,
			project_categories: jsonInterests,
			time_commitment: timeCommit,
			transportation: logisticInputs[0],
			flexible_hours: logisticInputs[1],
			work_remotely: logisticInputs[2],
			degree: jsonDegrees,
			tech_courses: jsonTechCourses,
			prof_courses: jsonProfCourses,
			experience: jsonExperiences,
			tech_skills: jsonTechSkills,
			prof_skills: jsonProfSkills,
			other_skills: extraSkills,
			cohort: currentCohort,
			unique_id: `${orgNameInput.replace(/\s+/g, '')}-${projNameInput.replace(/\s+/g, '')}-${currentCohort}`
		}

		console.log(JSON.stringify(params));
		await axios.post(process.env.REACT_APP_API_URL + 'projects/', JSON.stringify(params),
			{
				headers: {
					'content-type': 'application/json',
				},
			})
			.then(res => {
				console.log(res);
				// if(res.status === 201) {
				// 	window.alert("For submitted successfully")
				// } else {
				// 	window.alert("Error submitting form. Please contact an administrator for help.")
				// }
			})
			.catch(error => {
				console.log(error);
			})

      setTimeout(

        function() {
          this.setState({
            submitted: true,
            submitting: false
          });
        }
        .bind(this),
        1000
      );
	}



render() {
	let hasMounted = false;
		let {interestOptions, logisticQuestions, degreeOptions, techCourseOptions,
			profCourseOptions, techSkillOptions, profSkillOptions, enabled} = this.state;
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
			if(enabled) {
				CurrentDisplay =
					<div className="form">
						<Form onSubmit={this.handleSubmit}>
							<Form.Group controlId="orgInput">
								<Form.Label>Organization Name </Form.Label>
								<Form.Control type="text" value={this.state.orgInput} onChange={this.handleOrgName}/>
							</Form.Group>
							<Form.Group controlId="orgInput">
								<Form.Label>Organization Address</Form.Label>
								<Form.Control type="text" value={this.state.orgAddressInput}
											  onChange={this.handleOrgAddress}/>
							</Form.Group>
							<Form.Group controlId="orgInput">
								<Form.Label>Organization Website</Form.Label>
								<Form.Control type="text" value={this.state.orgWebsiteInput}
											  onChange={this.handleOrgWebsite}/>
							</Form.Group>
							<Form.Group controlId="nameInput">
								<Form.Label>First Name</Form.Label>
								<Form.Control required value={this.state.firstNameInput} onChange={this.handleFirstName}
											  type="text"/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Last Name</Form.Label>
								<Form.Control required value={this.state.lastNameInput} onChange={this.handleLastName}
											  type="text"/>
							</Form.Group>
							<Form.Group controlId="phoneInput">
								<Form.Label>Phone #</Form.Label>
								<Form.Control required type="tel" value={this.state.phoneInput}
											  onChange={this.handlePhone} placeholder="5125558888"/>
							</Form.Group>
							<Form.Group controlId="emailInput">
								<Form.Label>Email</Form.Label>
								<Form.Control required type="email" value={this.state.emailInput}
											  onChange={this.handleEmail} placeholder="example@utexas.edu"/>
							</Form.Group>
							<Form.Group controlId="orgInput">
								<Form.Label>Project Name</Form.Label>
								<Form.Control type="text" value={this.state.projNameInput}
											  onChange={this.handleProjName}/>
							</Form.Group>
							<Form.Group controlId="projDesc">
								<Form.Label>Project Description (1000 Character limit)</Form.Label>
								<Form.Control as="textarea" value={this.state.projDescInput}
											  onChange={this.handleProjDesc} rows="5"/>
								<Form.Label>Character Count: {this.state.projDescInput.length}</Form.Label>
							</Form.Group>

							<br/>

							<Form.Label>Identify the categories your project falls under. (Check all that
								apply)</Form.Label>

							{this.state.interestOptions.map((option, index) => {
								return (
									<Form.Group key={index}>
										<Form.Check label={option.name}
													onChange={this.handleInterest.bind(this, index)}/>
									</Form.Group>
								)
							})}

							<Form.Group controlId="timeCommit">
								<Form.Label>Realistically, how much time do you expect your student to commit per week
									working on your assigned
									project? </Form.Label>
								<Form.Control required as="select" onChange={this.handleTimeCommit}>
									<option/>
									<option>Less than 5 Hours Per Week</option>
									<option>5-10 Hours Per Week</option>
									<option>8-12 Hours Per Week</option>
									<option>10-15 Hours Per Week</option>
									<option>15-20 Hours Per Week</option>
									<option>20-30 Hours Per Week</option>
								</Form.Control>
							</Form.Group>

							<br/>

							{this.state.logisticQuestions.map((question, index) => {
								if (this.state.logisticFlags[index]) {
									return (
										<Form.Group key={index}>
											<Form.Label>{question}</Form.Label>
											<Form.Check type="Radio" label="Yes"
														checked={this.state.logisticInputs[index]}
														onChange={this.handleLogisticQuestions.bind(this, index, 0)}/>
											<Form.Check type="Radio" label="No"
														checked={!this.state.logisticInputs[index]}
														onChange={this.handleLogisticQuestions.bind(this, index, 1)}/>
										</Form.Group>
									)
								} else {
									return (
										<Form.Group key={index}>
											<Form.Label>{question}</Form.Label>
											<Form.Check type="Radio" label="Yes" checked={false}
														onChange={this.handleLogisticQuestions.bind(this, index, 0)}/>
											<Form.Check type="Radio" label="No" checked={false}
														onChange={this.handleLogisticQuestions.bind(this, index, 1)}/>
										</Form.Group>
									)
								}
							})}

							<Form.Group controlId="CoursesTaken">
								<Form.Label>Identify each of the following technical oriented courses that would be
									helpful for completing your project. </Form.Label>
								{this.state.techCourseOptions.map((course, index) => {
									if (index % 10 === 0 && index > 0) {
										return (
											<div key={index}>
												<br/>
												<Form.Check label={`${course.name} (${course.courseId})`}
															onChange={this.handleTechCourseInputs.bind(this, index)}/>
											</div>
										)
									} else
										return (
											<Form.Check key={index} label={`${course.name} (${course.courseId})`}
														onChange={this.handleTechCourseInputs.bind(this, index)}/>
										)
								})}
							</Form.Group>
							<Form.Group controlId="CoursesTaken">
								<Form.Label>Identify each of the following professional oriented courses that would be
									helpful for completing your project. </Form.Label>
								{this.state.profCourseOptions.map((course, index) => {
									if (index % 10 === 0 && index > 0) {
										return (
											<div key={index}>
												<br/>
												<Form.Check label={`${course.name} (${course.courseId})`}
															onChange={this.handleProfCourseInputs.bind(this, index)}/>
											</div>
										)
									} else
										return (
											<Form.Check key={index} label={`${course.name} (${course.courseId})`}
														onChange={this.handleProfCourseInputs.bind(this, index)}/>
										)
								})}
							</Form.Group>

							<Form.Label>Please rate how relevant the following technical skills are to your project
								using the scale below:</Form.Label>
							<br/>
							<div>1: Not Relevant</div>
							<div>2: Slightly Relevant</div>
							<div>3: Moderately Relevant</div>
							<div>4: Very Relevant</div>
							<div>5: Extremely Relevant</div>
							<br/>
							{this.state.techSkillOptions.map((skill, index) => {
								let formattedSkill = skill.name.replace(/\s+/g, '');
								return (
									<Form.Group key={index}>
										<Form.Label>{skill.name}</Form.Label>
										<RadioButton name={formattedSkill}
													 handleRadio={this.handleTechSkills.bind(this, index)}/>
									</Form.Group>
								);
							})}

							<Form.Label>Please rate how relevant the following professional skills are to your project
								using the scale below:</Form.Label>
							<br/>
							<div>1: Not Relevant</div>
							<div>2: Slightly Relevant</div>
							<div>3: Moderately Relevant</div>
							<div>4: Very Relevant</div>
							<div>5: Extremely Relevant</div>
							<br/>
          {this.state.profSkillOptions.map((skill, index) => {
							let formattedSkill = skill.name.replace(/\s+/g, '');
							return(
								<Form.Group key={index}>
									<Form.Label>{skill.name}</Form.Label>
									<RadioButton name={formattedSkill} handleRadio={this.handleProfSkills.bind(this, index)}/>
								</Form.Group>
							);
						})}
						<Form.Group controlId="ExtraSkills">
							<Form.Label>What other relevant skills that may be helpful for your candidate to have (i.e.
								other languages spoken, coding, analytical software, professional skills, etc.)? - List
                                them here!</Form.Label>
                            <Form.Control type="profList" onChange={this.handleExtraSkills}/>
                        </Form.Group>

                        <Button onClick={this.handleSubmit} variant="primary">
                            Submit
                        </Button>
                        <div className="submit_text">{this.state.submitting ? "Submitting..." : ""}</div>
                        <div className="success_text">{this.state.submitted ? "Succesfully Submitted" : ""}</div>
                    </Form>
                    <br/>
                </div>
						
			} else {
				CurrentDisplay =
					<div>
						<p>
							<b>
								Sorry, we are not taking any submissions for this form at this time.
							</b>
						</p>
					</div>
			}
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
