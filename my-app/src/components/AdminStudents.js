import React, { Component } from 'react';
import Button from "react-bootstrap/Button"
import Modal from 'react-bootstrap/Modal'
import '../styling/Admin.css';
import Form from 'react-bootstrap/Form';
import RadioButton from "./RadioButton";
import update from 'react-addons-update';
import '../App.css';
import axios from "axios";


class AdminStudents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            students: props.students,
            modalShow: [],
            deleteShow: false,
            first_name: "",
            last_name: "",
            eid: "",
            phone:  "",
            email: "",
            linkedIn: "",
            intentions: [],
            interests: [],
            time_commitment: "",
            transportation: null,
            flexible_hours: null,
            work_remotely: null,
            school: [],
            tech_skills: [],
            prof_skills: [],
            other_skills: "",
            submit_text: "",
        }


        this.clearData = this.clearData.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.renderSurvey = this.renderSurvey.bind(this);
        this.handleIntentions = this.handleIntentions.bind(this);
        this.handleInterests = this.handleInterests.bind(this);
        this.handleTechSkills = this.handleTechSkills.bind(this);
        this.handleProfSkills = this.handleProfSkills.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.isDict = this.isDict.bind(this);

        this.handleTextInput = this.handleTextInput.bind(this);
        this.handleTF = this.handleTF.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

    }

    clearData() {
      this.setState(() => ({
        students: this.props.students,
        currentCohort: "",
        modalShow: [],
        first_name: "",
        last_name: "",
        eid: "",
        phone:  "",
        email: "",
        linkedIn: "",
        intentions: [],
        interests: [],
        time_commitment: "",
        transportation: null,
        flexible_hours: null,
        work_remotely: null,
        school: "",
        tech_skills: [],
        prof_skills: [],
        other_skills: "",
        submit_text: "",
  		}));
    }

    handleTextInput(e) {
        console.log(e.target.id);
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleIntentions(student, i, e) {
      if (this.state.intentions.length === 0) {
        this.setState(() => ({
          intentions: new Array(Object.keys(student.intentions).length),
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
       intentions: {
         [i] : {
           $set: answer
         }
       }
     }));
    }

    handleInterests(student, i, e) {
      if (this.state.interests.length === 0) {
        this.setState(() => ({
          interests: new Array(Object.keys(student.interests).length),
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
       interests: {
         [i] : {
           $set: answer
         }
       }
     }));
    }

    handleTF(e) {
      let answer = e.target.value
      answer = (answer === "T" || answer === "t" || answer === "falset")
      console.log(e);
      this.setState({
  			[e.target.id]: answer,
        });
    }

    handleTechSkills(student, i, e) {
      if (this.state.tech_skills.length === 0) {
        this.setState(() => ({
          tech_skills: new Array(Object.keys(student.tech_skills).length),
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

    handleProfSkills(student, i, e) {
      if (this.state.prof_skills.length === 0) {
        this.setState(() => ({
          prof_skills: new Array(Object.keys(student.prof_skills).length),
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

    isDict(v) {
      return typeof v==='object' && v!==null && !(v instanceof Array) && !(v instanceof Date);
    }

    async handleUpdate(student, e) {
        this._e = e;
        this.setState(() => ({
  			submit_text: "Updating..."
  		}));
      let submit_dict = {};
      let keys = [
        "first_name",
        "last_name",
        "eid",
        "phone",
        "email",
        "linkedIn",
        "intentions",
        "interests",
        "time_commitment",
        "transportation",
        "flexible_hours",
        "work_remotely",
        "school",
        "tech_skills",
        "prof_skills",
        "other_skills"
      ]
      let student_keys = Object.keys(student)

      for (let i=0; i<student_keys.length; i++) {
        let s_key = student_keys[i];
        // No need to include id
        if (s_key === "id")
          continue;
        // If the key wasn't in the update options, put the original data in the new dict
        if (!keys.includes(s_key)) {
          submit_dict[s_key] = student[s_key]
          continue;
        }
        // If the data is not a dict, just update it
        if (!this.isDict(student[s_key])) {
          if (this.state[s_key] !== null && this.state[s_key] !== "") {
            submit_dict[s_key] = this.state[s_key];
          }
          else {
            submit_dict[s_key] = student[s_key];
          }
          continue;
        }
        // It was a dict and requires some formatting so it matches the database model
        let student_question_dict = student[s_key];
        let question_keys = Object.keys(student_question_dict);
        let temp_answers={};
        let student_data = this.state[s_key];

        for (let k=0; k<question_keys.length; k++) {
          let q_key = question_keys[k];
          let value = ""
          try {
            value = student_data[k];
          }
          catch(error) {
            value = student_question_dict[q_key];
          }
          if (value !== null && value !== undefined && value !== "") {
            temp_answers[q_key] = value;
          }
          else {
            temp_answers[q_key] = student_question_dict[q_key];
          }
        }
        submit_dict[s_key] = temp_answers;
      }
      submit_dict['program'] = {}
      submit_dict['unique_id'] = `${submit_dict.eid}-${this.state.currentCohort}`
        console.log(JSON.stringify(submit_dict));
  		await axios.put(process.env.REACT_APP_API_URL + 'students/'+student['id']+'/', JSON.stringify(submit_dict),
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


        this.setState(() => ({
    			submit_text: "Submitted"
    		}));
        this.clearData();
    }

    async handleDelete(id, e) {
        await axios.delete(process.env.REACT_APP_API_URL + 'students/'+ id +'/',
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
        this.setState({
            deleteShow: false
        });
    }

    renderSurvey(student) {
      let {first_name, last_name, eid, phone, email, linkedIn, intentions, interests, time_commitment, transportation, flexible_hours, work_remotely, school, tech_skills, prof_skills, other_skills} = student

      return (
        <div>
          <div className="bold">(Leave the text entry blank for survey value to remain as is)</div>
          <p/>
          <div>Current first name: {first_name}</div>
          <Form.Group controlId="first_name">
              <Form.Label>Update First Name Here:</Form.Label>
              <Form.Control value={this.state.first_name} type="profList" onChange={this.handleTextInput}/>
          </Form.Group>
          <div>Current last name: {last_name}</div>
          <Form.Group controlId="last_name">
              <Form.Label>Update Last Name Here:</Form.Label>
              <Form.Control type="profList" value={this.state.last_name} onChange={this.handleTextInput}/>
          </Form.Group>
          <div>Current EID: {eid}</div>
          <Form.Group controlId="eid">
              <Form.Label>Update EID Here:</Form.Label>
              <Form.Control type="profList" value={this.state.eid} onChange={this.handleTextInput}/>
          </Form.Group>
          <div>Current phone number: {phone}</div>
          <Form.Group controlId="phone">
              <Form.Label>Update Phone Number Here:</Form.Label>
              <Form.Control type="profList" value={this.state.phone} onChange={this.handleTextInput}/>
          </Form.Group>
          <div>Current email: {email}</div>
          <Form.Group controlId="email">
              <Form.Label>Update Email Here:</Form.Label>
              <Form.Control type="profList" value={this.state.email} onChange={this.handleTextInput}/>
          </Form.Group>
          <div>Current LinkedIn: {linkedIn}</div>
          <Form.Group controlId="linkedIn">
              <Form.Label>Update LinkedIn Here:</Form.Label>
              <Form.Control type="profList" value={this.state.linkedIn} onChange={this.handleTextInput}/>
          </Form.Group>
          <br/>
          {Object.keys(intentions).map((key, index) => {
            return (
              <div key={index}>{key}: {String(intentions[key])}
              <Form.Group key={index}>
                  <Form.Label>Update Answer Here:</Form.Label>
                  <Form.Control type="profList" onChange={this.handleIntentions.bind(this, student, index)}/>
              </Form.Group>
            </div>
            )
          })}
          <br/>
          {Object.keys(interests).map((key, index) => {
            return (
              <div key={index}>Interested in {key}: {String(interests[key])}
              <Form.Group key={index}>
                  <Form.Label>Update Answer Here:</Form.Label>
                  <Form.Control type="profList" onChange={this.handleInterests.bind(this, student, index)}/>
              </Form.Group>
            </div>
            )
          })}
          <br/>
          <div>Current time commitment: {time_commitment}</div>
          <Form.Group controlId="time_commitment">
              <Form.Label>Update Time Commitment Here:</Form.Label>
              <Form.Control required as="select" value={this.state.time_commitment} onChange={this.handleTextInput}>
                  <option/>
                  <option>Less than 5 Hours Per Week</option>
                  <option>5-10 Hours Per Week</option>
                  <option>8-12 Hours Per Week</option>
                  <option>10-15 Hours Per Week</option>
                  <option>15-20 Hours Per Week</option>
                  <option>20-30 Hours Per Week</option>
              </Form.Control>
          </Form.Group>
          <div>Transportation: {String(transportation)}</div>
          <Form.Group controlId="transportation">
              <Form.Label>Update Answer Here:</Form.Label>
              <Form.Control type="profList" value={this.state.transportation} onChange={this.handleTF}/>
          </Form.Group>
            {/*<Form.Group controlId="first_name">*/}
            {/*    <Form.Label>Update First Name Here:</Form.Label>*/}
            {/*    <Form.Control value={this.state.first_name} type="profList" onChange={this.handleTextInput}/>*/}
            {/*</Form.Group>*/}
          <div>Flexible Hours: {String(flexible_hours)}</div>
          <Form.Group controlId="flexible_hours">
              <Form.Label>Update Answer Here:</Form.Label>
              <Form.Control type="profList" value={this.state.flexible_hours} onChange={this.handleTF}/>
          </Form.Group>
          <div>Work Remotely: {String(work_remotely)}</div>
          <Form.Group controlId="work_remotely">
              <Form.Label>Update Answer Here:</Form.Label>
              <Form.Control type="profList" value={this.state.work_remotely} onChange={this.handleTF}/>
          </Form.Group>
            {Object.keys(school).map((key, index) => {
                return(
                    <div key={index}>Current {key}: {String(school[key])}
                        <Form.Group controlId="school">
                            <Form.Label>Update Answer Here:</Form.Label>
                            <Form.Control type="profList" onChange={this.handleTextInput}/>
                        </Form.Group>
                    </div>
                    )
            })}
          <br/>
          {Object.keys(tech_skills).map((key, index) => {
              return(
                <div key={index}>Current {key}: {String(tech_skills[key])}
                  <Form.Group key={index}>
                      <Form.Label>Update Answer Here:</Form.Label>
                      <RadioButton name={key} handleRadio={this.handleTechSkills.bind(this, student, index)}/>
                  </Form.Group>
                </div>
              );
          })}
          <br/>
          {Object.keys(prof_skills).map((key, index) => {
              return(
                <div key={index}>Current {key}: {String(prof_skills[key])}
                  <Form.Group key={index}>
                      <Form.Label>Update Answer Here:</Form.Label>
                      <RadioButton name={key} handleRadio={this.handleProfSkills.bind(this, student, index)}/>
                  </Form.Group>
                </div>
              );
          })}
          <br/>
          <div>Other Skills: {other_skills}</div>
          <Form.Group controlId="other_skills">
              <Form.Label>Update Answer Here:</Form.Label>
              <Form.Control type="profList" value={this.state.other_skills} onChange={this.handleTextInput}/>
          </Form.Group>
          <Button variant="primary" onClick={this.handleUpdate.bind(this, student)}>
              Update Student Form
          </Button>
            <Button variant="danger" onClick={() => { this.setState({ deleteShow: true })}}>
                Delete
            </Button>
          <div>{this.state.submit_text}</div>
      </div>
      )
    }


    componentDidMount() {
        this.setState({ students: this.props.students, modalShow: new Array(this.props.students.length) });

        axios.get(process.env.REACT_APP_API_URL + 'settings/1/')
            .then(res => {
                console.log(res);
                this.setState({
                    currentCohort: res.data.current_cohort
                });
            })
            .catch(err => console.log(err));
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({ students: nextProps.students, modalShow: new Array(nextProps.students.length) });
    }

    handleModal(i, e) {
        this._e = e;
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
        if(this.state.students !== null) {
            hasMounted = true;
        }

        return(
            <div>
                <p>Click on a student to edit student survey information</p>
                <p>Please note that you might need to refresh the page in order to view survey updates. </p>
                <table style={{width:"50%", margin: "auto"}}>
                    <tbody className="admin_table">
                        {hasMounted ? (
                            this.state.students.map((student, index) => {
                                return(
                                  <tr key={index}>
                                    <td className="admin_cell">
                                      <div>
                                          <Button onClick={this.handleModal.bind(this, index)}>{student.first_name} {student.last_name}</Button>
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
                                               {student.first_name} {student.last_name}'s Survey
                                             </Modal.Title>
                                           </Modal.Header>
                                           <Modal.Body>{this.renderSurvey(student)}</Modal.Body>
                                              <Modal
                                                  size="sm"
                                                  show={this.state.deleteShow}
                                                  onHide={() => (
                                                      this.setState({
                                                          deleteShow: false
                                                      })
                                                  )}
                                                  >
                                                  <Modal.Header closeButton>
                                                      <Modal.Title>
                                                          Deleting Student Entry
                                                      </Modal.Title>
                                                  </Modal.Header>
                                                  <Modal.Body>
                                                      <p>Are you sure you want to delete {student.first_name} {student.last_name}?</p>
                                                  </Modal.Body>
                                                  <Modal.Footer>
                                                      <Button variant="Success" onClick={this.handleDelete.bind(this, student.id)}>Yes</Button>
                                                  </Modal.Footer>
                                              </Modal>
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

export default AdminStudents;
