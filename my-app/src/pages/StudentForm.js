import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, {Component} from 'react';
import RadioButton from "../components/RadioButton";
import LoadingAnimation from "../components/LoadingAnimation";
import update from 'react-addons-update';
import '../App.css';
import axios from "axios";
import {Carousel} from "react-bootstrap";

class StudentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	enabled: true,
			submitted: false,
			submitting: false,
            currentCohort: "",
			uploading: false,
			firstNameInput: "",
			lastNameInput: "",
			eidInput: "",
			phoneInput: "",
			emailInput: "",
			linkedinInput: "",
			resumeInput: "",
			timeCommit: "",
			intentionOptions: [],
			intentionInputs: [],
			interestOptions: [],
			interestInputs: [],
            hear: "",
			logisticQuestions: ["To comply with University rules and regulations, are you an international student?",
				"Do you currently receive any UT financial aid or fellowships?", "Do you have access to transportation?",
				"Do you need flexible work hours?", "Do you need the ability to work remotely?"],
			logisticInputs: [],
			logisticFlags: [],
			otherAvailability: "",
			schoolOptions: [],
			schoolInputs:[],
			schoolInput: "",
			schoolOtherInput: "",
			programOptions: ["I am pursuing a Master’s degree", "I am pursuing a doctoral degree", "I am in the Nonprofit Portfolio Studies Program",
				"I have previously participated in the CONNECT program"],
			programInputs: [false, false, false, false],
			experience:"",
			techSkillOptions: [],
			techSkillInputs: [],
			profSkillOptions: [],
			profSkillInputs: [],
			extraSkills: ""
        }

		this.handleResumeUpload = this.handleResumeUpload.bind(this);
		this.handleLogisticQuestions = this.handleLogisticQuestions.bind(this);
		this.handleTechSkills = this.handleTechSkills.bind(this);
		this.validateForm = this.validateForm.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleTest = this.handleTest.bind(this);

		this.handleTextInput = this.handleTextInput.bind(this);
    }

    handleTextInput(e) {
    	this.setState({
			[e.target.id]: e.target.value
		});
	}

	handleCheckInput(i, e) {
		this.setState(update(this.state, {
			[e.target.id]: {
				[i] : {
					$set: e.target.checked
				}
			}
		}));
	}

	handleResumeUpload(e) {
		this.setState({ uploading: true })
		const files = Array.from(e.target.files)

		var fileContent = files[0]; // As a sample, upload a text file.
		var file = new Blob([fileContent], {type: 'application/pdf'});

		var reader = new FileReader();
    var base64data = "";
		reader.readAsDataURL(file);
	  reader.onloadend = function() {
	     base64data = reader.result;
       this.setState({
   			uploading: false,
   			resumeInput: base64data
   		})
		}.bind(this);
	}


	// handleSchoolOption(i, e) {
		// var formerCheck = -1;
		// if (e.target.checked) {
		// 	var k=0;
		// 	for (k; k<this.state.schoolInputs.length; k++) {
		// 		if (this.state.schoolInputs[k] === true && k !== i)
		// 			formerCheck=k;
		// 	}
		// }
		// // Former check is the previously checked box index
		// if (formerCheck === -1) {
		// 	this.setState(update(this.state, {
		// 		schoolInputs: {
		// 			[i] : {
		// 				$set: e.target.checked
		// 			}
		// 		}
		// 	}));
		// }
		// // If a different box was checked, uncheck it
		// else {
		// 	this.setState(update(this.state, {
		// 		schoolInputs: {
		// 			[i] : {
		// 				$set: e.target.checked
		// 			},
		// 			[formerCheck] : {
		// 				$set: false
		// 			}
		// 		}
		// 	}));
		// }
		// Also update actual school option chosen
		// if (e.target.checked) {
		// 	this.setState({
		// 		schoolOption: this.state.schoolOptions[i].name
		// 	});
		// }
	// }

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

    async componentDidMount() {
		axios.get(process.env.REACT_APP_API_URL + 'settings/1/')
			.then(res => {
				console.log(res);
				this.setState({
					enabled: res.data.student_form_enabled,
					currentCohort: res.data.current_cohort
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

		 axios.get(process.env.REACT_APP_API_URL + 'logistics')
			.then(res => {
				console.log(res);
				let flags = new Array(res.data.length);
				flags.fill(null);
				this.setState({
					logisticQuestions: res.data,
					logisticInputs: new Array(5),
          logisticFlags: flags,
				});
			})
			.catch(err => console.log(err));

		 axios.get(process.env.REACT_APP_API_URL + 'schools')
			.then(res => {
				console.log(res);
				this.setState({
					schoolOptions: res.data,
          schoolInputs: new Array(res.data.length),
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
		let {
			firstNameInput, lastNameInput, eidInput, phoneInput, emailInput, resumeInput, timeCommit, hear,
			logisticFlags, logisticQuestions, techSkillInputs, techSkillOptions, profSkillOptions,
			profSkillInputs, schoolInputs
		} = this.state;
		
		if(firstNameInput === "" || firstNameInput === undefined || firstNameInput === null) {
			alertMessage += 'First Name \n';
		}
		
		if(lastNameInput === "" || lastNameInput === undefined || lastNameInput === null) {
			alertMessage += 'Last Name \n';
		}

		if(eidInput === "" || eidInput === undefined || eidInput === null) {
			alertMessage += 'EID \n';
		}

		if(phoneInput === "" || phoneInput === undefined || phoneInput === null) {
			alertMessage += 'Phone Number \n';
		}

		if(emailInput === "" || emailInput === undefined || emailInput === null) {
			alertMessage += 'Email \n';
		}

		if(resumeInput === "" || resumeInput === undefined || resumeInput === null) {
			alertMessage += 'Resume \n';
		}

		if(timeCommit === "" || timeCommit === undefined || timeCommit === null) {
			alertMessage += 'Time Commitment \n';
		}

		if(hear === "" || hear === undefined || hear === null) {
			alertMessage += 'Referral \n';
		}
		
		for(let i = 0; i < logisticQuestions.length; i++) {
			if(logisticFlags[i] === null || logisticFlags[i] === undefined) {
				alertMessage += `${logisticQuestions[i].name} \n`;
			}
		}

		let schoolBool = false;
		for(let i = 0; i < schoolInputs.length; i++) {
			if(schoolInputs[i]) {
				schoolBool = true;
			}
		}
		if(!schoolBool) {
			alertMessage += 'School\n';
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

	async handleSubmit(e) {
		let {
			firstNameInput, lastNameInput, eidInput, phoneInput, emailInput, linkedinInput, resumeInput,
      timeCommit, intentionOptions, intentionInputs, hear, interestOptions, interestInputs,
			logisticInputs, schoolInputs,
			schoolOptions, schoolOtherInput, experienceQuestions, experienceInputs, techSkillOptions,
			techSkillInputs, profSkillOptions, profSkillInputs, extraSkills, currentCohort
		} = this.state;

		let jsonIntentions = {};
		let	jsonInterests = {};
		let jsonExperiences = {};
		let jsonSchools = {};
		let jsonTechSkills = {};
		let jsonProfSkills = {};

		const isFormValid = await this.validateForm();
		if(!isFormValid) {
			e.preventDefault();
			return;
		}

    this.setState({submitting: true});
        // e.preventDefault();

		for(let i = 0; i < intentionOptions.length; i ++) {
			let input = intentionInputs[i];
			if(input === null || input === undefined) input = false;
			jsonIntentions[intentionOptions[i].name] = input;
		}

		for(let i = 0; i < interestOptions.length; i ++) {
			let input = interestInputs[i];
			if(input === null || input === undefined) input = false;
			jsonInterests[interestOptions[i].name] = input;
		}

		for(let i = 0; i < schoolOptions.length; i ++) {
			let input = schoolInputs[i];
			if(input === null || input === undefined) input = false;
			jsonSchools[schoolOptions[i].name] = input;
		}
		jsonSchools['Other'] = schoolOtherInput;

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
			first_name: firstNameInput,
			last_name: lastNameInput,
			eid: eidInput,
			phone: phoneInput,
			email: emailInput,
			linkedIn: linkedinInput,
			resume_link: '',
			intentions: jsonIntentions,
			interests: jsonInterests,
			hear: hear,
			time_commitment: timeCommit,
			international: logisticInputs[0],
			fin_aid: logisticInputs[1],
			transportation: logisticInputs[2],
			flexible_hours: logisticInputs[3],
			work_remotely: logisticInputs[4],
			school: jsonSchools,
			experience: jsonExperiences,
			tech_skills: jsonTechSkills,
			prof_skills: jsonProfSkills,
			other_skills: extraSkills,
			cohort: currentCohort,
			unique_id: `${eidInput}-${currentCohort}`
		}

    let resume_params = {
      unique_id: `${eidInput}-${currentCohort}`,
      data: resumeInput
    }

		console.log(JSON.stringify(params));
		await axios.post(process.env.REACT_APP_API_URL + 'students/', JSON.stringify(params),
			{
				headers: {
					'content-type': 'application/json',
				},
			})
			.then(res => {
				console.log(res);
			})
			.catch(error => {
				console.log(error);
			})

		await axios.post(process.env.REACT_APP_API_URL + 'resumes/', JSON.stringify(resume_params),
			{
				headers: {
					'content-type': 'application/json',
				},
			})
			.then(res => {
				console.log(res);
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
        3000
      );

      //// didnt work right - stuff didnt fully upload
      // setTimeout(
      //   function() {
      //     window.location.reload(false);
      //   }
      //   .bind(this),
      //   3000
      // );

	  }

	async handleTest() {
		// console.log("Sending post");
		//
		// await axios.post(process.env.REACT_APP_API_URL + 'students/', JSON.stringify(),
		// 	{headers: {
		// 		'content-type': 'application/json',
		// 	}})
		// 	.then(res => {
		// 		console.log(res);
		// 	})
		// 	.catch(error => {
		// 		console.log(error);
		// 	})
	}

    render() {
        let hasMounted = false;
        let {intentionOptions, interestOptions, logisticQuestions, schoolOptions,
			techSkillOptions, profSkillOptions, enabled} = this.state;
        if(intentionOptions.length && interestOptions.length && logisticQuestions.length && schoolOptions.length &&
			techSkillOptions.length && profSkillOptions.length
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
			if (enabled) {
				CurrentDisplay =
					<Carousel>
						{/*<div className="form">*/}
							<Carousel.Item>
								<div className="form">
								<Form>
									<Form.Group>
										<Form.Label><b>First Name</b></Form.Label>
										<Form.Control required id="firstNameInput" value={this.state.firstNameInput} onChange={this.handleTextInput}
													  type="text"/>
									</Form.Group>
									<br/>
									<Form.Group>
										<Form.Label><b>Last Name</b></Form.Label>
										<Form.Control required id="lastNameInput" value={this.state.lastNameInput} onChange={this.handleTextInput}
													  type="text"/>
									</Form.Group>
									<br/>
									<Form.Group>
										<Form.Label><b>EID</b></Form.Label>
										<Form.Control required id="eidInput" value={this.state.eidInput} onChange={this.handleTextInput}
													  type="text"/>
									</Form.Group>
									<br/>
									<Form.Group >
										<Form.Label><b>Phone #</b></Form.Label>
										<Form.Control required type="tel" value={this.state.phoneInput}
													  id="phoneInput"
													  onChange={this.handleTextInput} placeholder="5125558888"/>
									</Form.Group>
									<br/>
									<Form.Group >
										<Form.Label><b>Email</b></Form.Label>
										<Form.Control required type="email" id="emailInput" value={this.state.emailInput}
													  onChange={this.handleTextInput} placeholder="example@utexas.edu"/>
									</Form.Group>
									<br/>
									<Form.Group>
										<Form.Label><b>LinkedIn (preferred, but not required)</b></Form.Label>
										<Form.Control type="text" id="linkedinInput" value={this.state.linkedinInput}
													  onChange={this.handleTextInput}/>
									</Form.Group>
									<br/>
									<div className="mb-3">
										<Form.File id="resumeInput">
											<Form.File.Label><b>Please upload a PDF of your resume.</b></Form.File.Label>
											<Form.File.Input required accept=".pdf,.PDF" onChange={this.handleResumeUpload}/>
											{this.state.uploading ? <p>Uploading...</p> : <p/>}
										</Form.File>
									</div>
								</Form>
								</div>
							</Carousel.Item>
							<Carousel.Item>
								<div className="form">
                                    <Form>
										<Form.Label><b>Why are you interested in working on a project? (Check all that
											apply </b></Form.Label>
										{this.state.intentionOptions.map((option, index) => {
											return (
												<Form.Group key={index}>
													<Form.Check label={option.name} id="intentionInputs"
																onChange={this.handleCheckInput.bind(this, index)}/>
												</Form.Group>
											)
										})}
										<Form.Group >
											<Form.Label><b>How did you hear about the CONNECT program?</b></Form.Label>
											<Form.Control required as="select" id="hear" onChange={this.handleTextInput}>
												<option/>
												<option>I previously participated in the CONNECT program</option>
												<option>Social media or information session</option>
												<option>Friend or colleague</option>
												<option>Graduate advisor/faculty/staff referral</option>
											</Form.Control>
										</Form.Group>
										<br/>
										<Form.Label><b>Identify each of the project categories you are interested in. (Check all that
											apply)</b></Form.Label>
										{this.state.interestOptions.map((option, index) => {
											return (
												<Form.Group key={index}>
													<Form.Check label={option.name} id="interestInputs"
																onChange={this.handleCheckInput.bind(this, index)}/>
												</Form.Group>
											)
										})}

										<br/>
										<Form.Group >
											<Form.Label><b>Realistically, how much time can you commit per week to working on a
												project? </b></Form.Label>
											<Form.Control required as="select" id="timeCommit" onChange={this.handleTextInput}>
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

										<Form.Group>
											<Form.Label><b>Is there any additional information regarding your availability that we should know about? (500 Character limit)</b></Form.Label>
											<Form.Control as="textarea" id="otherAvailability" value={this.state.otherAvailability}
														  onChange={this.handleTextInput} rows="5"/>
											<Form.Label><b>Character Count: {this.state.otherAvailability.length}</b></Form.Label>
										</Form.Group>
									</Form>
								</div>
							</Carousel.Item>
                            <Carousel.Item>
								<div className="form">
                                    <Form>
										{this.state.logisticQuestions.map((question, index) => {
											if (this.state.logisticFlags[index]) {
												return (
													<Form.Group key={index}>
														<Form.Label><b>{question.name}</b></Form.Label>
														<Form.Check type="Radio" label="Yes"
																	checked={this.state.logisticInputs[index]}
																	onChange={this.handleLogisticQuestions.bind(this, index, 0)}/>
														<Form.Check type="Radio" label="No"
																	checked={!this.state.logisticInputs[index]}
																	onChange={this.handleLogisticQuestions.bind(this, index, 1)}/>
														<br/>
													</Form.Group>
												)
											} else {
												return (
													<Form.Group key={index}>
														<Form.Label><b>{question.name}</b></Form.Label>
														<Form.Check type="Radio" label="Yes"
																	onChange={this.handleLogisticQuestions.bind(this, index, 0)}/>
														<Form.Check type="Radio" label="No"
																	onChange={this.handleLogisticQuestions.bind(this, index, 1)}/>
														<br/>
													</Form.Group>
												)
											}
										})}
									</Form>
								</div>
							</Carousel.Item>
                            <Carousel.Item>
								<div className="form">
                                    <Form>
										<Form.Group>
											<Form.Label><b>Which UT school(s)/college(s) are you affiliated with?</b></Form.Label>
											{this.state.schoolOptions.map((option, index) => {
												return (
													<Form.Group key={index}>
														<Form.Check type="Checkbox"
																	label={option.name}
																	id="schoolInputs"
																	checked={this.state.schoolInputs[index]}
																	onChange={this.handleCheckInput.bind(this, index)}/>
													</Form.Group>
												)
											})}
											<Form.Control value={this.state.schoolOtherInput} id="schoolOtherInput" onChange={this.handleTextInput}
														  type="text" placeholder="Other"/>
										</Form.Group>
										<br/>
										<Form.Group>
											<Form.Label><b>Please select each of the following that applies to you</b></Form.Label>
											{this.state.programOptions.map((option, index) => {
												return (
													<Form.Check key={index}
																type="Checkbox"
																id="programInputs"
																checked={this.state.programInputs[index]}
																onChange={this.handleCheckInput.bind(this, index)}
																label={option}
													/>
												)
											})}
										</Form.Group>
										<br/>
										<Form.Group>
											<Form.Label><b>Over the past 5 years, approximately how much experience have you had working or directly volunteering with nonprofit organizations?</b></Form.Label>
											<Form.Control required as="select" id="experience" onChange={this.handleTextInput}>
												<option></option>
												<option>No Experience (Yet!)</option>
												<option>Less than 6 months</option>
												<option>6-12 Months</option>
												<option>More than 1 year</option>
											</Form.Control>
										</Form.Group>
									</Form>
								</div>
							</Carousel.Item>
							<Carousel.Item>
								<div className="form">
                                    <Form>
										<Form.Label><b>Please rate your experience in the following technical skills using the scale
											below:</b></Form.Label>
										<br/>
										<div>1: No Experience</div>
										<div>2: Can Learn</div>
										<div>3: Slightly Experienced</div>
										<div>4: Experienced</div>
										<div>5: Extremely Experienced</div>
										<br/>
										{techSkillOptions.map((skill, index) => {
											let formattedSkill = skill.name.replace(/\s+/g, '');
											return (
												<Form.Group key={index}>
													<Form.Label><b>{skill.name}</b></Form.Label>
													<RadioButton name={formattedSkill}
																 handleRadio={this.handleTechSkills.bind(this, index)}/>
													<br/>
												</Form.Group>
											);
										})}
									</Form>
								</div>
							</Carousel.Item>
							<Carousel.Item>
								<div className="form">
                                    <Form>
										<Form.Label><b>Please rate your experience in the following professional skills using the scale
											below:</b></Form.Label>
										<br/>
										<div>1: No Experience</div>
										<div>2: Can Learn</div>
										<div>3: Slightly Experienced</div>
										<div>4: Experienced</div>
										<div>5: Extremely Experienced</div>
										<br/>
										{this.state.profSkillOptions.map((skill, index) => {
											let formattedSkill = skill.name.replace(/\s+/g, '');
											return (
												<Form.Group key={index}>
													<Form.Label><b>{skill.name}</b></Form.Label>
													<RadioButton name={formattedSkill}
																 handleRadio={this.handleProfSkills.bind(this, index)}/>
													<br/>
												</Form.Group>
											);
										})}
										<Form.Group >
											<Form.Label><b>Do you have other relevant skills that may be helpful for us to know about
												(i.e.
												other languages spoken, coding, analytical software, professional skills, etc.)? -
												List
												them here! (500 Character limit)</b></Form.Label>
											<Form.Control as="textarea" id="extraSkills" value={this.state.extraSkills}
														  onChange={this.handleTextInput} rows="5"/>
											<Form.Label><b>Character Count: {this.state.extraSkills.length}</b></Form.Label>
										</Form.Group>

										<Button variant="success" onClick={this.handleSubmit}>
											Submit
										</Button>
										<div className="submit_text">{this.state.submitting ? "Submitting..." : ""}</div>
										<div className="success_text">{this.state.submitted ? "Succesfully Submitted" : ""}</div>
									</Form>
								</div>
							</Carousel.Item>
							{/*</div>*/}
						</Carousel>

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

export default StudentForm;
