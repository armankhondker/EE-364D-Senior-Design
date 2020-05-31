import React, { Component } from 'react';
import Button from "react-bootstrap/Button"
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/Modal'
import ModalBody from 'react-bootstrap/Modal'
import '../styling/Admin.css';
import Form from 'react-bootstrap/Form';
import RadioButton from "./RadioButton";
import LoadingAnimation from "../components/LoadingAnimation";
import update from 'react-addons-update';
import '../App.css';
import axios from "axios";

class AdminProjects extends Component {

      constructor(props) {
          super(props);
          this.state = {
              projects: props.projects,
              modalShow: [],
              contact_first_name: "",
              contact_last_name: "",
              contact_phone:  "",
              contact_email: "",
              organization_name: "",
              organization_address: "",
              organization_website: "",
              project_name: "",
              project_description: "",
              project_categories: [],
              time_commitment: "",
              transportation: null,
              flexible_hours: null,
              work_remotely: null,
              degree: [],
              tech_courses: [],
              prof_courses: [],
              tech_skills: [],
              prof_skills: [],
              other_skills: "",
              submit_text: "",
          }

          this.clearData = this.clearData.bind(this);
          this.handleModal = this.handleModal.bind(this);
          this.renderSurvey = this.renderSurvey.bind(this);
          this.handleFirstName = this.handleFirstName.bind(this);
          this.handleLastName = this.handleLastName.bind(this);
          this.handlePhone = this.handlePhone.bind(this);
          this.handleEmail = this.handleEmail.bind(this);
          this.handleOrganizationName = this.handleOrganizationName.bind(this);
          this.handleOrganizationAddress = this.handleOrganizationAddress.bind(this);
          this.handleOrganizationWebsite = this.handleOrganizationWebsite.bind(this);
          this.handleProjectName = this.handleProjectName.bind(this);
          this.handleInterests = this.handleInterests.bind(this);
          this.handleTimeCommit = this.handleTimeCommit.bind(this);
          this.handleTransportation = this.handleTransportation.bind(this);
          this.handleFlexibleHours = this.handleFlexibleHours.bind(this);
          this.handleWorkRemotely = this.handleWorkRemotely.bind(this);
          this.handleDegree = this.handleDegree.bind(this);
          this.handleTechCourses = this.handleTechCourses.bind(this);
          this.handleProfCourses = this.handleProfCourses.bind(this);
          this.handleTechSkills = this.handleTechSkills.bind(this);
          this.handleProfSkills = this.handleProfSkills.bind(this);
          this.handleOtherSkills = this.handleOtherSkills.bind(this);
          this.handleUpdate = this.handleUpdate.bind(this);
          this.isDict = this.isDict.bind(this);
      }

      componentDidMount() {
          // await axios.get(process.env.REACT_APP_API_URL + 'projects')
          //     .then(res => {
          //         console.log(res);
          //         this.setState({projects: res.data});
          //     });
      }

    componentWillReceiveProps(nextProps, nextContext) {
          this.setState({ projects: nextProps.projects });
    }

    componentDidUpdate(prevProps){
        // console.log("this.state.projects on projects tab");
        // console.log(this.state.projects);
    }

    clearData() {
        this.setState(state => ({
          projects: this.props.projects,
          modalShow: [],
          contact_first_name: "",
          contact_last_name: "",
          contact_phone:  "",
          contact_email: "",
          organization_name: "",
          organization_address: "",
          organization_website: "",
          project_name: "",
          project_description: "",
          project_categories: [],
          time_commitment: "",
          transportation: null,
          flexible_hours: null,
          work_remotely: null,
          degree: [],
          tech_courses: [],
          prof_courses: [],
          tech_skills: [],
          prof_skills: [],
          other_skills: "",
          submit_text: "",
    		}));
      }

      handleFirstName(e) {
    		var writtenText = e.target.value
    		this.setState(state => ({
    			contact_first_name: writtenText
    		}));
    	}

      handleLastName(e) {
    		var writtenText = e.target.value
    		this.setState(state => ({
    			contact_last_name: writtenText
    		}));
    	}

      handlePhone(e) {
        var writtenText = e.target.value
    		this.setState(state => ({
    			contact_phone: writtenText
    		}));
      }

      handleEmail(e) {
        var writtenText = e.target.value
    		this.setState(state => ({
    			contact_email: writtenText
    		}));
      }

      handleOrganizationName(e) {
        var writtenText = e.target.value
    		this.setState(state => ({
    			organization_name: writtenText
    		}));
      }

      handleOrganizationAddress(e) {
        var writtenText = e.target.value
    		this.setState(state => ({
    			organization_address: writtenText
    		}));
      }

      handleOrganizationWebsite(e) {
        var writtenText = e.target.value
    		this.setState(state => ({
    			organization_website: writtenText
    		}));
      }

      handleProjectName(e) {
        var writtenText = e.target.value
    		this.setState(state => ({
    			project_name: writtenText
    		}));
      }

      handleProjectDescription(e) {
        var writtenText = e.target.value
    		this.setState(state => ({
    			project_description: writtenText
    		}));
      }

      handleInterests(project, i, e) {
        if (this.state.project_categories.length === 0) {
          this.setState(state => ({
            project_categories: new Array(Object.keys(project.project_categories).length),
          }));
        }
        let answer = e.target.value
        if (answer === "") {
          answer = null
        }
        else {
          answer = (answer === "True" || answer === "true")
        }

        this.setState(update(this.state, {
         project_categories: {
           [i] : {
             $set: answer
           }
         }
       }));
      }

      handleTimeCommit(e) {
    		var tc = e.target.value
    		this.setState(state => ({
    	     time_commitment: tc
    	  }));
    	}

      handleTransportation(e) {
        let answer = e.target.value
        if (answer === "") {
          answer = null
        }
        else {
          answer = (answer === "True" || answer === "true")
        }
        this.setState(state => ({
    			transportation: answer,
    		}));
      }

      handleFlexibleHours(e) {
        let answer = e.target.value
        if (answer === "") {
          answer = null
        }
        else {
          answer = (answer === "True" || answer === "true")
        }
        this.setState(state => ({
    			flexible_hours: answer,
    		}));
      }

      handleWorkRemotely(e) {
        let answer = e.target.value
        if (answer === "") {
          answer = null
        }
        else {
          answer = (answer === "True" || answer === "true")
        }
        this.setState(state => ({
    			work_remotely: answer,
    		}));
      }

      handleDegree(project, i, e) {
        if (this.state.degree.length === 0) {
          this.setState(state => ({
            degree: new Array(Object.keys(project.degree).length),
          }));
        }
        let answer = e.target.value
        if (answer === "") {
          answer = null
        }
        else {
          answer = (answer === "True" || answer === "true")
        }

        this.setState(update(this.state, {
         degree: {
           [i] : {
             $set: answer
           }
         }
       }));
      }

      handleTechCourses(project, i, e) {
        if (this.state.project_categories.length === 0) {
          this.setState(state => ({
            tech_courses: new Array(Object.keys(project.tech_courses).length),
          }));
        }
        let answer = e.target.value
        if (answer === "") {
          answer = null
        }
        else {
          answer = (answer === "True" || answer === "true")
        }

        this.setState(update(this.state, {
         tech_courses: {
           [i] : {
             $set: answer
           }
         }
       }));
      }

      handleProfCourses(project, i, e) {
        if (this.state.project_categories.length === 0) {
          this.setState(state => ({
            prof_courses: new Array(Object.keys(project.prof_courses).length),
          }));
        }
        let answer = e.target.value
        if (answer === "") {
          answer = null
        }
        else {
          answer = (answer === "True" || answer === "true")
        }

        this.setState(update(this.state, {
         prof_courses: {
           [i] : {
             $set: answer
           }
         }
       }));
      }

      handleTechSkills(project, i, e) {
        if (this.state.tech_skills.length === 0) {
          this.setState(state => ({
            tech_skills: new Array(Object.keys(project.tech_skills).length),
          }));
        }
    		this.setState(update(this.state, {
    			tech_skills: {
    				[i] : {
    					$set: e
    				}
    			}
    		}));
    	}

      handleProfSkills(project, i, e) {
        if (this.state.prof_skills.length === 0) {
          this.setState(state => ({
            prof_skills: new Array(Object.keys(project.prof_skills).length),
          }));
        }
    		this.setState(update(this.state, {
    			prof_skills: {
    				[i] : {
    					$set: e
    				}
    			}
    		}));
    	}

      handleOtherSkills(e) {
        var writtenText = e.target.value
    		this.setState(state => ({
    			other_skills: writtenText
    		}));
      }

      isDict(v) {
        return typeof v==='object' && v!==null && !(v instanceof Array) && !(v instanceof Date);
      }

      async handleUpdate(project, e) {
        this.setState(state => ({
    			submit_text: "Updating..."
    		}));
        let submit_dict = {};
        // contact_first_name, contact_last_name, contact_phone, contact_email, organization_name, organization_address, organization_website, project_name, project_description, project_categories, time_commitment, transportation, flexible_hours, work_remotely, degree, tech_courses, prof_courses, experience, tech_skills, prof_skills, other_skills, cohort
        let keys = [
          "contact_first_name",
          "contact_last_name",
          "contact_phone",
          "contact_email",
          "organization_name",
          "organization_address",
          "organization_website",
          "project_name",
          "project_description",
          "project_categories",
          "time_commitment",
          "transportation",
          "flexible_hours",
          "work_remotely",
          "degree",
          "tech_courses",
          "prof_courses",
          "tech_skills",
          "prof_skills",
          "other_skills"
        ]
        let project_keys = Object.keys(project)

        for (let i=0; i<project_keys.length; i++) {
          let s_key = project_keys[i];
          // No need to include id
          if (s_key === "id")
            continue;
          // If the key wasn't in the update options, put the original data in the new dict
          if (!keys.includes(s_key)) {
            submit_dict[s_key] = project[s_key]
            continue;
          }
          // If the data is not a dict, just update it
          if (!this.isDict(project[s_key])) {
            if (this.state[s_key] !== null && this.state[s_key] !== "") {
              submit_dict[s_key] = this.state[s_key];
            }
            else {
              submit_dict[s_key] = project[s_key];
            }
            continue;
          }
          // It was a dict and requires some formatting so it matches the database model
          let project_question_dict = project[s_key];
          let question_keys = Object.keys(project_question_dict);
          let temp_answers={};
          let project_data = this.state[s_key];

          for (let k=0; k<question_keys.length; k++) {
            let q_key = question_keys[k];
            let value = ""
            try {
              value = project_data[k];
            }
            catch(error) {
              value = project_question_dict[q_key];
            }
            if (value !== null && value !== undefined && value !== "") {
              temp_answers[q_key] = value;
            }
            else {
              temp_answers[q_key] = project_question_dict[q_key];
            }
          }
          submit_dict[s_key] = temp_answers;
        }
        submit_dict['unique_id'] = `${submit_dict.organization_name.replace(/\s+/g, '')}-${submit_dict.project_name.replace(/\s+/g, '')}-SP20`
        console.log(JSON.stringify(submit_dict))
    		await axios.put(process.env.REACT_APP_API_URL + 'projects/'+project['id']+'/', JSON.stringify(submit_dict),
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


          this.setState(state => ({
      			submit_text: "Submitted"
      		}));
          this.clearData();
      }

      renderSurvey(project) {
        let {contact_first_name, contact_last_name, contact_phone, contact_email, organization_name, organization_address, organization_website, project_name, project_description, project_categories, time_commitment, transportation, flexible_hours, work_remotely, degree, tech_courses, prof_courses, experience, tech_skills, prof_skills, other_skills, cohort} = project

        return (
          <div>
            <div className="bold">(Leave the text entry blank for survey value to remain as is)</div>
            <p></p>
            <div>Current contact's first name: {contact_first_name}</div>
            <Form.Group controlId="FirstName">
                <Form.Label>Update First Name Here:</Form.Label>
                <Form.Control type="profList" onChange={this.handleFirstName}/>
            </Form.Group>
            <div>Current contact's last name: {contact_last_name}</div>
            <Form.Group controlId="LastName">
                <Form.Label>Update Last Name Here:</Form.Label>
                <Form.Control type="profList" onChange={this.handleLastName}/>
            </Form.Group>
            <div>Current contact's phone number: {contact_phone}</div>
            <Form.Group controlId="Phone">
                <Form.Label>Update Phone Number Here:</Form.Label>
                <Form.Control type="profList" onChange={this.handlePhone}/>
            </Form.Group>
            <div>Current contact's email: {contact_email}</div>
            <Form.Group controlId="Email">
                <Form.Label>Update Email Here:</Form.Label>
                <Form.Control type="profList" onChange={this.handleEmail}/>
            </Form.Group>
            <div>Current organization name: {organization_name}</div>
            <Form.Group controlId="OrgName">
                <Form.Label>Update Organization Name Here:</Form.Label>
                <Form.Control type="profList" onChange={this.handleOrganizationName}/>
            </Form.Group>
            <div>Current organization Address: {organization_address}</div>
            <Form.Group controlId="OrgAddress">
                <Form.Label>Update Organization Address Here:</Form.Label>
                <Form.Control type="profList" onChange={this.handleOrganizationAddress}/>
            </Form.Group>
            <div>Current organization website: {organization_website}</div>
            <Form.Group controlId="OrgWebsite">
                <Form.Label>Update Organization Website Here:</Form.Label>
                <Form.Control type="profList" onChange={this.handleOrganizationWebsite}/>
            </Form.Group>
            <div>Current project name: {project_name}</div>
            <Form.Group controlId="ProjectName">
                <Form.Label>Update Project Name Here:</Form.Label>
                <Form.Control type="profList" onChange={this.handleProjectName}/>
            </Form.Group>
            <div>Current project description: {project_description}</div>
            <Form.Group controlId="ProjectDesc">
                <Form.Label>Update Project Description Here:</Form.Label>
                <Form.Control type="profList" onChange={this.handleProjectDescription}/>
            </Form.Group>
            <br></br>
            {Object.keys(project_categories).map((key, index) => {
              return (
                <div>Includes {key}: {String(project_categories[key])}
                <Form.Group key={index}>
                    <Form.Label>Update Answer Here:</Form.Label>
                    <Form.Control type="profList" onChange={this.handleInterests.bind(this, project, index)}/>
                </Form.Group>
              </div>
              )
            })}
            <br></br>
            <div>Current time commitment: {time_commitment}</div>
            <Form.Group controlId="TimeCommitment">
                <Form.Label>Update Time Commitment Here:</Form.Label>
                <Form.Control required as="select" onChange={this.handleTimeCommit}>
                    <option></option>
                    <option>Less than 5 Hours Per Week</option>
                    <option>5-10 Hours Per Week</option>
                    <option>15-20 Hours Per Week</option>
                    <option>20-30 Hours Per Week</option>
                </Form.Control>
            </Form.Group>
            <div>Transportation: {String(transportation)}</div>
            <Form.Group controlId="Transportation">
                <Form.Label>Update Answer Here:</Form.Label>
                <Form.Control type="profList" onChange={this.handleTransportation.bind(this)}/>
            </Form.Group>
            <div>Flexible Hours: {String(flexible_hours)}</div>
            <Form.Group controlId="FlexibleHours">
                <Form.Label>Update Answer Here:</Form.Label>
                <Form.Control type="profList" onChange={this.handleFlexibleHours.bind(this)}/>
            </Form.Group>
            <div>Work Remotely: {String(work_remotely)}</div>
            <Form.Group controlId="WorkRemotely">
                <Form.Label>Update Answer Here:</Form.Label>
                <Form.Control type="profList" onChange={this.handleWorkRemotely.bind(this)}/>
            </Form.Group>
            <br></br>
            <div><b>Relevant Degrees:</b></div>
            {Object.keys(degree).map((key, index) => {
              return (
                <div>{key}: {String(degree[key])}
                <Form.Group key={index}>
                    <Form.Label>Update Answer Here:</Form.Label>
                    <Form.Control type="profList" onChange={this.handleDegree.bind(this, project, index)}/>
                </Form.Group>
              </div>
              )
            })}
            <br></br>
            {Object.keys(tech_courses).map((key, index) => {
              return (
                <div>Needs {key}: {String(tech_courses[key])}
                <Form.Group key={index}>
                    <Form.Label>Update Answer Here:</Form.Label>
                    <Form.Control type="profList" onChange={this.handleTechCourses.bind(this, project, index)}/>
                </Form.Group>
              </div>
              )
            })}
            <br></br>
            {Object.keys(prof_courses).map((key, index) => {
              return (
                <div>Taken {key}: {String(prof_courses[key])}
                <Form.Group key={index}>
                    <Form.Label>Update Answer Here:</Form.Label>
                    <Form.Control type="profList" onChange={this.handleProfCourses.bind(this, project, index)}/>
                </Form.Group>
              </div>
              )
            })}
            <br></br>
            {Object.keys(tech_skills).map((key, index) => {
                return(
                  <div>Current {key}: {String(tech_skills[key])}
                    <Form.Group key={index}>
                        <Form.Label>Update Answer Here:</Form.Label>
                        <RadioButton name={key} handleRadio={this.handleTechSkills.bind(this, project, index)}/>
                    </Form.Group>
                  </div>
                );
            })}
            <br></br>
            {Object.keys(prof_skills).map((key, index) => {
                return(
                  <div>Current {key}: {String(prof_skills[key])}
                    <Form.Group key={index}>
                        <Form.Label>Update Answer Here:</Form.Label>
                        <RadioButton name={key} handleRadio={this.handleProfSkills.bind(this, project, index)}/>
                    </Form.Group>
                  </div>
                );
            })}
            <br></br>
            <div>Other Skills: {other_skills}</div>
            <Form.Group controlId="OtherSkills">
                <Form.Label>Update Answer Here:</Form.Label>
                <Form.Control type="profList" onChange={this.handleOtherSkills.bind(this)}/>
            </Form.Group>
            <br></br>
            <Button variant="primary" onClick={this.handleUpdate.bind(this, project)}>
                Update Project Form
            </Button>
            <div>{this.state.submit_text}</div>
        </div>
        )
      }

      handleModal(i, e) {
        this.setState(update(this.state, {
         modalShow: {
           [i] : {
             $set: true
           }
         }
       }));
      }

      render(){
          let hasMounted = false;
          if(this.state.projects !== null) {
              hasMounted = true;
          }

          return(
              <div>
                  <p>Click on a project to edit the project survey information. </p>
                  <p>Please note that you might need to refresh the page in order to view survey updates. </p>
                  <table style={{width:"50%", margin: "auto"}}>
                      <tbody className="admin_table">
                          {hasMounted ? (
                              this.state.projects.map((project, index) => {
                                  console.log("this.state.projects on projects tab : " + this.state.projects);
                                  return(
                                    <tr key={index}>
                                      <td className="admin_cell">
                                        <div>
                                            <Button onClick={this.handleModal.bind(this, index)}>{project.project_name}</Button>
                                            <Modal
                                               size="lg"
                                               show={this.state.modalShow[index]}
                                               onHide={() => (
                                                this.clearData.bind(this),
                                                this.setState(update(this.state, {
                                           			 modalShow: {
                                           				[index] : {
                                           					$set: false
                                           				}
                                           		 	}
                                                })))}
                                               aria-labelledby="contained-modal-title-vcenter"
                                               centered
                                           >
                                             <Modal.Header closeButton>
                                               <Modal.Title id="example-custom-modal-styling-title">
                                                 {project.contact_first_name} {project.contact_last_name}'s Survey
                                               </Modal.Title>
                                             </Modal.Header>
                                             <Modal.Body>{this.renderSurvey(project)}</Modal.Body>
                                          </Modal>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                              })) : (
                              <p>Loading</p>
                          )
                          }
                      </tbody>

                  </table>
              </div>
          )
      }
  }


export default AdminProjects;
