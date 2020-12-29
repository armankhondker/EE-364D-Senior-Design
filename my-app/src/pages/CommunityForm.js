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
			schoolOptions: [],
			schoolInputs:[],
			schoolInput: "",
			schoolOtherInput: "",
			experienceQuestions:[],
			experienceInputs: [],
			techSkillOptions: [],
			techSkillInputs: [],
			profSkillOptions: [],
			profSkillInputs: [],
			extraSkills: ""
		}

		this.handleLogisticQuestions = this.handleLogisticQuestions.bind(this);
		this.handleTechSkills = this.handleTechSkills.bind(this);
		this.validateForm = this.validateForm.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

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
			orgNameInput, orgAddressInput,
			firstNameInput, lastNameInput, phoneInput, emailInput, 
			projNameInput, projDescInput, timeCommit,
			logisticFlags, logisticQuestions, techSkillInputs, techSkillOptions, profSkillOptions,
			profSkillInputs
		} = this.state;
		
		if(orgNameInput === "" || orgNameInput === undefined || orgNameInput === null) {
			alertMessage += 'Organization Name \n';
		}

		if(orgAddressInput === "" || orgAddressInput === undefined || orgAddressInput === null) {
			alertMessage += 'Organization Address \n';
		}

		if(firstNameInput === "" || firstNameInput === undefined || firstNameInput === null) {
			alertMessage += 'First Name \n';
		}

		if(lastNameInput === "" || lastNameInput === undefined || lastNameInput === null) {
			alertMessage += 'Last Name \n';
		}

		if(phoneInput === "" || phoneInput === undefined || phoneInput === null) {
			alertMessage += 'Phone Number\n';
		}
		

		if(emailInput === "" || emailInput === undefined || emailInput === null) {
			alertMessage += 'Email \n';
		}

		if(projNameInput === "" || projNameInput === undefined || projNameInput === null) {
			alertMessage += 'Project Name \n';
		}
		
		if(projDescInput === "" || projDescInput === undefined || projDescInput === null) {
			alertMessage += 'Project Description\n';
		}
		
		if(timeCommit === "" || timeCommit === undefined || timeCommit === null) {
			alertMessage += 'Time Commitment \n';
		}
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

	async handleSubmit(e) {

		let {
		    orgNameInput, orgAddressInput, orgWebsiteInput, projNameInput, projDescInput,
			firstNameInput, lastNameInput, phoneInput, emailInput, timeCommit,
			interestOptions, interestInputs,
			logisticInputs,
			schoolInputs, schoolOtherInput, schoolOptions, experienceQuestions, experienceInputs, techSkillOptions,
			techSkillInputs, profSkillOptions, profSkillInputs, extraSkills, currentCohort
		} = this.state;

		let	jsonInterests = {};
		let jsonSchools = {};
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

		for(let i = 0; i < schoolOptions.length; i++) {
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
			school: jsonSchools,
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
		let {interestOptions, logisticQuestions, schoolOptions,
			techSkillOptions, profSkillOptions, enabled} = this.state;
		if(interestOptions.length && logisticQuestions.length && schoolOptions.length &&
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
			if(enabled) {
				CurrentDisplay =
					<div className="form">
						<Form onSubmit={this.handleSubmit}>
							<Form.Group controlId="orgInput">
								<Form.Label><b>Organization Name </b></Form.Label>
								<Form.Control type="text" id="orgNameInput" value={this.state.orgNameInput} onChange={this.handleTextInput}/>
							</Form.Group>
							<br/>
							<Form.Group controlId="orgInput">
								<Form.Label><b>Organization Address</b></Form.Label>
								<Form.Control type="text" id="orgAddressInput" value={this.state.orgAddressInput}
											  onChange={this.handleTextInput}/>
							</Form.Group>
							<br/>
							<Form.Group controlId="orgInput">
								<Form.Label><b>Organization Website</b></Form.Label>
								<Form.Control type="text" value={this.state.orgWebsiteInput} id="orgWebsiteInput"
											  onChange={this.handleTextInput}/>
							</Form.Group>
							<br/>
							<Form.Group controlId="nameInput">
								<Form.Label><b>First Name</b></Form.Label>
								<Form.Control required value={this.state.firstNameInput} onChange={this.handleTextInput} id="firstNameInput"
											  type="text"/>
							</Form.Group>
							<br/>
							<Form.Group>
								<Form.Label><b>Last Name</b></Form.Label>
								<Form.Control required value={this.state.lastNameInput} onChange={this.handleTextInput} id="lastNameInput"
											  type="text"/>
							</Form.Group>
							<br/>
							<Form.Group controlId="phoneInput">
								<Form.Label><b>Phone #</b></Form.Label>
								<Form.Control required type="tel" value={this.state.phoneInput} id="phoneInput"
											  onChange={this.handleTextInput} placeholder="5125558888"/>
							</Form.Group>
							<br/>
							<Form.Group controlId="emailInput">
								<Form.Label><b>Email</b></Form.Label>
								<Form.Control required type="email" value={this.state.emailInput} id="emailInput"
											  onChange={this.handleTextInput} placeholder="example@utexas.edu"/>
							</Form.Group>
							<br/>
							<Form.Group controlId="orgInput">
								<Form.Label><b>Project Name</b></Form.Label>
								<Form.Control type="text" value={this.state.projNameInput} id="projNameInput"
											  onChange={this.handleTextInput}/>
							</Form.Group>
							<br/>
							<Form.Group controlId="projDesc">
								<Form.Label><b>Project Description (1000 Character limit)</b></Form.Label>
								<Form.Control as="textarea" value={this.state.projDescInput} id="projDescInput"
											  onChange={this.handleTextInput} rows="5"/>
								<Form.Label><b>Character Count: {this.state.projDescInput.length}</b></Form.Label>
							</Form.Group>
							<br/>
							<Form.Label><b>Identify the categories your project falls under. (Check all that
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
							<Form.Group controlId="timeCommit">
								<Form.Label><b>Realistically, how much time do you expect your student to commit per week
									working on your assigned
									project? </b></Form.Label>
								<Form.Control required as="select" onChange={this.handleTextInput} id="timeCommit">
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

							<Form.Group controlId="school">
								<Form.Label><b>Which UT school(s)/college(s) would you like your student to be affiliated with?</b></Form.Label>
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
								<Form.Control value={this.state.schoolOtherInput} onChange={this.handleSchoolOther}
											  type="text" placeholder="Other"/>
							</Form.Group>
							<br/>
							{this.state.logisticQuestions.map((question, index) => {
								if (this.state.logisticFlags[index]) {
									return (
										<Form.Group key={index}>
											<Form.Label><b>{question}</b></Form.Label>
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
											<Form.Label><b>{question}</b></Form.Label>
											<Form.Check type="Radio" label="Yes" checked={false}
														onChange={this.handleLogisticQuestions.bind(this, index, 0)}/>
											<Form.Check type="Radio" label="No" checked={false}
														onChange={this.handleLogisticQuestions.bind(this, index, 1)}/>
										</Form.Group>
									)
								}
							})}
							<br/>

							<Form.Label><b>Please rate how relevant the following technical skills are to your project
								using the scale below:</b></Form.Label>
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
										<Form.Label><b>{skill.name}</b></Form.Label>
										<RadioButton name={formattedSkill}
													 handleRadio={this.handleTechSkills.bind(this, index)}/>
									 	<br/>
									</Form.Group>
								);
							})}

							<Form.Label><b>Please rate how relevant the following professional skills are to your project
								using the scale below:</b></Form.Label>
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
									<Form.Label><b>{skill.name}</b></Form.Label>
									<RadioButton name={formattedSkill} handleRadio={this.handleProfSkills.bind(this, index)}/>
									<br/>
								</Form.Group>
							);
						})}
						<Form.Group controlId="ExtraSkills">
							<Form.Label><b>What other relevant skills that may be helpful for your candidate to have (i.e.
								other languages spoken, coding, analytical software, professional skills, etc.)? - List
                                them here! (500 Character Limit)</b></Form.Label>
							<Form.Control as="textarea" value={this.state.extraSkills} id="extraSkills"
										  onChange={this.handleTextInput} rows="5"/>
							<Form.Label><b>Character Count: {this.state.extraSkills.length}</b></Form.Label>
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
