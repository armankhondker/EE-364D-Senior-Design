import Form from 'react-bootstrap/Form';
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
      submitted: false,
      submitting: false,
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
			logisticQuestions: ["To comply with University rules and regulations, are you an international student?",
				"Do you currently receive any UT financial aid or fellowships?", "Do you have access to transportation?",
				"Do you need flexible work hours?", "Do you need the ability to work remotely?"],
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
		this.handleEID = this.handleEID.bind(this);
		this.handleEmail = this.handleEmail.bind(this);
		this.handleLinkedin = this.handleLinkedin.bind(this);
		this.handleResumeUpload = this.handleResumeUpload.bind(this);
		this.handleTimeCommit = this.handleTimeCommit.bind(this);
		this.handleIntentions = this.handleIntentions.bind(this);
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

	handleEID(e) {
		this.setState(({
			eidInput: e.target.value
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

	handleTimeCommit(e) {
		var tc = e.target.value
		this.setState(state => ({
	  timeCommit: tc
	}));
	}

	handleIntentions(i, e) {
		this.setState(update(this.state, {
			intentionInputs: {
				[i] : {
					$set: e.target.checked
				}
			}
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
			for (k; k<this.state.degreeInputs.length; k++) {
				if (this.state.degreeInputs[k] === true && k !== i)
					formerCheck=k;
			}
		}
		// Former check is the previously checked box index
		if (formerCheck === -1) {
			this.setState(update(this.state, {
				degreeInputs: {
					[i] : {
						$set: e.target.checked
					}
				}
			}));
		}
		// If a different box was checked, uncheck it
		else {
			this.setState(update(this.state, {
				degreeInputs: {
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
				degreeOption: this.state.degreeOptions[i].name
		}));
		}
	}

	handleLogisticQuestions(i, choice, e) {
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
					logisticInputs: new Array(5),
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
		let alertMessage = "";
		let {logisticFlags, logisticQuestions, degreeOption, techSkillInputs, techSkillOptions, profSkillOptions,
			profSkillInputs
		} = this.state;

		for(let i = 0; i < logisticQuestions.length; i++) {
			if(logisticFlags[i] === null || logisticFlags[i] === undefined) {
				alertMessage += `${logisticQuestions[i].name} \n`;
			}
		}

		if(degreeOption === "" || degreeOption === undefined || degreeOption === null) {
			alertMessage += 'Degree \n';
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
			return(false);
		} else {
			return(true);
		}

	}

	async handleSubmit(e) {
		let {
			firstNameInput, lastNameInput, eidInput, phoneInput, emailInput, linkedinInput, resumeInput,
      timeCommit, intentionOptions, intentionInputs, interestOptions, interestInputs,
			logisticInputs, techCourseOptions, techCourseInputs, profCourseOptions, profCourseInputs,
			degreeOption, experienceQuestions, experienceInputs, techSkillOptions,
			techSkillInputs, profSkillOptions, profSkillInputs, extraSkills
		} = this.state;

		let jsonIntentions = {};
		let	jsonInterests = {};
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
			let input = experienceInputs[i];
			jsonExperiences[experienceQuestions[i].name] = input;
		}

		for(let i = 0; i < techSkillOptions.length; i ++) {
			let input = techSkillInputs[i];
			jsonTechSkills[techSkillOptions[i].name] = input;
		}

		for(let i = 0; i < profSkillOptions.length; i ++) {
			let input = profSkillInputs[i];
			jsonProfSkills[profSkillOptions[i].name] = input;
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
			time_commitment: timeCommit,
      international: logisticInputs[0],
			fin_aid: logisticInputs[1],
			transportation: logisticInputs[2],
			flexible_hours: logisticInputs[3],
			work_remotely: logisticInputs[4],
			degree: degreeOption,
			tech_courses: jsonTechCourses,
			prof_courses: jsonProfCourses,
			experience: jsonExperiences,
			tech_skills: jsonTechSkills,
			prof_skills: jsonProfSkills,
			other_skills: extraSkills,
			cohort: 'SP20',
			unique_id: `${eidInput}-SP20`
		}

    let resume_params = {
      unique_id: `${eidInput}-SP20`,
      data: resumeInput
    }

		await axios.post('http://django-env.emqvqmazrh.us-west-2.elasticbeanstalk.com/api/students/', JSON.stringify(params),
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

    await axios.post('http://django-env.emqvqmazrh.us-west-2.elasticbeanstalk.com/api/resumes/', JSON.stringify(resume_params),
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
      setTimeout(
        function() {
          // window.location.reload(false);
        }
        .bind(this),
        3000
      );
	  }

	async handleTest() {
		// console.log("Sending post");
		//
		// await axios.post('http://django-env.emqvqmazrh.us-west-2.elasticbeanstalk.com/api/students/', JSON.stringify(),
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
        let {intentionOptions, interestOptions, logisticQuestions, degreeOptions, techCourseOptions,
			profCourseOptions, techSkillOptions, profSkillOptions} = this.state;
        if(intentionOptions.length && interestOptions.length && logisticQuestions.length && degreeOptions.length &&
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
                    <Form>
                        <Form.Group controlId="nameInput">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control required value={this.state.firstNameInput} onChange={this.handleFirstName} type="text"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control required value={this.state.lastNameInput} onChange={this.handleLastName} type="text"/>
                        </Form.Group>
						<Form.Group>
							<Form.Label>EID</Form.Label>
							<Form.Control required value={this.state.eidInput} onChange={this.handleEID} type="text"/>
						</Form.Group>
						<Form.Group controlId="phoneInput">
							<Form.Label>Phone #</Form.Label>
                            <Form.Control required type="tel" value={this.state.phoneInput} onChange={this.handlePhone} placeholder="5125558888"/>
                        </Form.Group>
                        <Form.Group controlId="emailInput">
                            <Form.Label>Email</Form.Label>
                            <Form.Control required type="email" value={this.state.emailInput} onChange={this.handleEmail} placeholder="example@utexas.edu"/>
                        </Form.Group>
                        <Form.Group controlId="linkedinInput">
                            <Form.Label>LinkedIn (preferred, but not required)</Form.Label>
                            <Form.Control type="text" value={this.state.linkedinInput} onChange={this.handleLinkedin}/>
                        </Form.Group>
						<div className="mb-3">
							<Form.File id="resumeInput">
							  <Form.File.Label>Please upload a PDF of your resume.</Form.File.Label>
							  <Form.File.Input required accept=".pdf,.PDF" onChange={this.handleResumeUpload}/>
									{this.state.uploading ? <p>Uploading...</p> : <p></p>}
							</Form.File>
						</div>

						<br></br>

						<Form.Label>Why are you interested in working on a project? (Check all that apply </Form.Label>
							{this.state.intentionOptions.map((option, index) => {
								return (
									<Form.Group key={index}>
											<Form.Check label={option.name} onChange={this.handleIntentions.bind(this, index)}/>
									</Form.Group>
								)
							})}

                        <Form.Label>Identify each of the project categories you are interested in. (Check all that
                            apply)</Form.Label>
								{this.state.interestOptions.map((option, index) => {
		                            return(
										<Form.Group key={index}>
												<Form.Check label={option.name} onChange={this.handleInterest.bind(this, index)}/>
										</Form.Group>
									)
								})}

                        <Form.Group controlId="timeCommit">
                            <Form.Label>Realistically, how much time can you commit per week to working on a
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
										<Form.Check type="Radio" label="Yes" checked={this.state.logisticInputs[index]} onChange={this.handleLogisticQuestions.bind(this, index, 0)}/>
										<Form.Check type="Radio" label="No" checked={!this.state.logisticInputs[index]} onChange={this.handleLogisticQuestions.bind(this, index, 1)}/>
									</Form.Group>
								)
							}
							else {
								return (
									<Form.Group key={index}>
										<Form.Label>{question.name}</Form.Label>
										<Form.Check type="Radio" label="Yes" onChange={this.handleLogisticQuestions.bind(this, index, 0)}/>
										<Form.Check type="Radio" label="No" onChange={this.handleLogisticQuestions.bind(this, index, 1)}/>
									</Form.Group>
								)
							}
						})}

                        <Form.Group controlId="degree">
                            <Form.Label>Which degree program are you currently enrolled in?</Form.Label>
								{this.state.degreeOptions.map((option, index) => {
									return(
										<Form.Group key={index}>
											<Form.Check type="Radio" label={option.name} checked={this.state.degreeInputs[index]} onChange={this.handleDegreeOption.bind(this, index)}/>
										</Form.Group>
									)
								})}
                        </Form.Group>
						<Form.Group controlId="CoursesTaken">
							<Form.Label>Identify each of the following technical courses you have taken/completed. </Form.Label>
								{this.state.techCourseOptions.map((course, index) => {
									if (index % 10 === 0 && index > 0) {
										return (
											<div>
												<br></br>
												<Form.Label>Identify each of the following courses you have taken/completed. </Form.Label>
												<Form.Check label={course.name + " " + course.courseId} onChange={this.handleTechCourseInputs.bind(this, index)}/>
											</div>
									  )
								 }
								 else
									return (
										<Form.Check key={index} label={course.name + ' ' + course.courseId} onChange={this.handleTechCourseInputs.bind(this, index)}/>
								 )
								})}
						</Form.Group>
						<Form.Group controlId="CoursesTaken">
							<Form.Label>Identify each of the following professional courses you have taken/completed. </Form.Label>
							{this.state.profCourseOptions.map((course, index) => {
								if (index % 10 === 0 && index > 0) {
									return (
										<div>
											<br></br>
											<Form.Label>Identify each of the following courses you have taken/completed. </Form.Label>
											<Form.Check label={course.name + " " + course.courseId} onChange={this.handleProfCourseInputs.bind(this, index)}/>
										</div>
									)
								}
								else
									return (
										<Form.Check key={index} label={course.name + ' ' + course.courseId} onChange={this.handleProfCourseInputs.bind(this, index)}/>
									)
							})}
						</Form.Group>
						{/*<Form.Group controlId="experience">*/}
						{/*	{this.state.experienceQuestions.map((question, index) => {*/}
						{/*		return(*/}
						{/*			<Form.Group key={index}>*/}
						{/*				<Form.Label>{question.name}</Form.Label>*/}
						{/*				<Form.Control required as="select" onChange={this.handleExperienceQuestions.bind(this,index)}>*/}
						{/*					<option></option>*/}
						{/*					<option>No Experience</option>*/}
						{/*					<option>Less than 6 months</option>*/}
						{/*					<option>6-12 Months</option>*/}
						{/*					<option>More than 1 year</option>*/}
						{/*				</Form.Control>*/}
						{/*			</Form.Group>*/}
						{/*		)*/}
						{/*	})}*/}
						{/*</Form.Group>*/}

                        <Form.Label>Please rate your experience in the following technical skills using the scale below:</Form.Label>
						<br/>
						<div>1: No Experience </div>
						<div>2: Can Learn		</div>
						<div>3: Slightly Experienced</div>
						<div>4: Experienced	</div>
						<div>5: Extremely Experienced </div>
						<br/>
                        {techSkillOptions.map((skill, index) => {
                            let formattedSkill = skill.name.replace(/\s+/g, '');
                            return(
                                <Form.Group key={index}>
                                    <Form.Label>{skill.name}</Form.Label>
                                    <RadioButton name={formattedSkill} handleRadio={this.handleTechSkills.bind(this, index)}/>
                                </Form.Group>
                            );
                        })}



						<Form.Label>Please rate your experience in the following professional skills using the scale below:</Form.Label>
            <br/>
						<div>1: No Experience </div>
						<div>2: Can Learn		</div>
						<div>3: Slightly Experienced</div>
						<div>4: Experienced	</div>
						<div>5: Extremely Experienced </div>
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
                            <Form.Label>Do you have other relevant skills that may be helpful for us to know about (i.e.
                                other languages spoken, coding, analytical software, professional skills, etc.)? - List
                                them here!</Form.Label>
                            <Form.Control type="profList" onChange={this.handleExtraSkills}/>
                        </Form.Group>

                        <Button variant="primary" onClick={this.handleSubmit}>
                            Submit
                        </Button>
                        <div className="submit_text">{this.state.submitting ? "Submitting..." : ""}</div>
                        <div className="success_text">{this.state.submitted ? "Succesfully Submitted" : ""}</div>
						{/*<Button variant="primary" onClick={this.handleTest}>*/}
                        {/*    Test*/}
						{/*</Button>*/}
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
