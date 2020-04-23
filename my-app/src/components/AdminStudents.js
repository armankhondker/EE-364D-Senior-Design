import React, { Component } from 'react';
import Button from "react-bootstrap/Button"
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/Modal'
import ModalBody from 'react-bootstrap/Modal'
import NewWindowPortal from "../components/NewWindowPortal.js";
import '../styling/Admin.css';
import Form from 'react-bootstrap/Form';
import RadioButton from "./RadioButton";
import LoadingAnimation from "../components/LoadingAnimation";
import update from 'react-addons-update';
import Popup from "reactjs-popup";
import '../App.css';
import axios from "axios";


class AdminStudents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            students: props.students,
            modalShow: [],
            studentClicked: false,
            firstName: "",
            lastName: "",
            eid: "",
            phone:  "",
            email: "",
            linkedin: "",
            intentionData: [],
            interestData: [],
            timeCommit: "",
            transportation: null,
            flexible_hours: null,
            work_remotely: null


        }
        this.clearData = this.clearData.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.renderSurvey = this.renderSurvey.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleEID = this.handleEID.bind(this);
        this.handlePhone = this.handlePhone.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleLinkedin = this.handleLinkedin.bind(this);
        this.handleIntentions = this.handleIntentions.bind(this);
        this.handleInterests = this.handleInterests.bind(this);
        this.handleTimeCommit = this.handleTimeCommit.bind(this);
        this.handleTransportation = this.handleTransportation.bind(this);
        this.handleFlexibleHours = this.handleFlexibleHours.bind(this);
        this.handleWorkRemotely = this.handleWorkRemotely.bind(this);

    }

    clearData() {
      this.setState(state => ({
        students: this.props.students,
        modalShow: [],
        studentClicked: false,
        firstName: "",
        lastName: "",
        eid: "",
        phone:  "",
        email: "",
        linkedin: "",
        intentionData: [],
        interestData: [],
        timeCommit: "",
        transportation: null,
        flexible_hours: null,
        work_remotely: null
  		}));
    }

    handleFirstName(e) {
  		var writtenText = e.target.value
  		this.setState(state => ({
  			firstName: writtenText
  		}));
  	}

    handleLastName(e) {
  		var writtenText = e.target.value
  		this.setState(state => ({
  			lastName: writtenText
  		}));
  	}

    handleEID(e) {
      var writtenText = e.target.value
  		this.setState(state => ({
  			eid: writtenText
  		}));
    }

    handlePhone(e) {
      var writtenText = e.target.value
  		this.setState(state => ({
  			phone: writtenText
  		}));
    }

    handleEmail(e) {
      var writtenText = e.target.value
  		this.setState(state => ({
  			email: writtenText
  		}));
    }

    handleLinkedin(e) {
      var writtenText = e.target.value
  		this.setState(state => ({
  			linkedin: writtenText
  		}));
    }

    handleIntentions(student, i, e) {
      if (this.state.intentionData.length == 0) {
        this.setState(state => ({
          intentionData: new Array(Object.keys(student.intentions).length),
        }));
      }
      let answer = e.target.value
      if (answer == "") {
        answer = null
      }
      else {
        answer = (answer === "True" || answer === "true")
      }

      this.setState(update(this.state, {
       intentionData: {
         [i] : {
           $set: answer
         }
       }
     }));
    }

    handleInterests(student, i, e) {
      if (this.state.interestData.length == 0) {
        this.setState(state => ({
          interestData: new Array(Object.keys(student.interests).length),
        }));
      }
      let answer = e.target.value
      if (answer == "") {
        answer = null
      }
      else {
        answer = (answer === "True" || answer === "true")
      }

      this.setState(update(this.state, {
       interestData: {
         [i] : {
           $set: answer
         }
       }
     }));
    }

    handleTimeCommit(e) {
  		var tc = e.target.value
  		this.setState(state => ({
  	     timeCommit: tc
  	  }));
  	}

    handleTransportation(e) {
      let answer = e.target.value
      if (answer == "") {
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
      if (answer == "") {
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
      if (answer == "") {
        answer = null
      }
      else {
        answer = (answer === "True" || answer === "true")
      }
      this.setState(state => ({
  			work_remotely: answer,
  		}));
    }

    renderSurvey(student) {
      let {first_name, last_name, eid, phone, email, linkedIn, intentions, interests, time_commitment, transportation, flexible_hours, work_remotely, degree, tech_courses, prof_courses, experience, tech_skills, prof_skills, other_skills, cohort} = student

      return (
        <div>
          <div className="bold">(Leave the text entry blank for survey value to remain as is)</div>
          <p></p>
          <div>Current first name: {first_name}</div>
          <Form.Group controlId="FirstName">
              <Form.Label>Update First Name Here:</Form.Label>
              <Form.Control type="profList" onChange={this.handleFirstName}/>
          </Form.Group>
          <div>Current last name: {last_name}</div>
          <Form.Group controlId="LastName">
              <Form.Label>Update Last Name Here:</Form.Label>
              <Form.Control type="profList" onChange={this.handleLastName}/>
          </Form.Group>
          <div>Current EID: {eid}</div>
          <Form.Group controlId="EID">
              <Form.Label>Update EID Here:</Form.Label>
              <Form.Control type="profList" onChange={this.handleEID}/>
          </Form.Group>
          <div>Current phone number: {phone}</div>
          <Form.Group controlId="Phone">
              <Form.Label>Update Phone Number Here:</Form.Label>
              <Form.Control type="profList" onChange={this.handlePhone}/>
          </Form.Group>
          <div>Current email: {email}</div>
          <Form.Group controlId="Email">
              <Form.Label>Update Email Here:</Form.Label>
              <Form.Control type="profList" onChange={this.handleEmail}/>
          </Form.Group>
          <div>Current LinkedIn: {linkedIn}</div>
          <Form.Group controlId="Email">
              <Form.Label>Update LinkedIn Here:</Form.Label>
              <Form.Control type="profList" onChange={this.handleLinkedin}/>
          </Form.Group>
          {Object.keys(intentions).map((key, index) => {
            return (
              <div>{key}: {String(intentions[key])}
              <Form.Group key={index}>
                  <Form.Label>Update Answer Here:</Form.Label>
                  <Form.Control type="profList" onChange={this.handleIntentions.bind(this, student, index)}/>
              </Form.Group>
            </div>
            )
          })}
          {Object.keys(interests).map((key, index) => {
            return (
              <div>Interested in {key}: {String(interests[key])}
              <Form.Group key={index}>
                  <Form.Label>Update Answer Here:</Form.Label>
                  <Form.Control type="profList" onChange={this.handleInterests.bind(this, student, index)}/>
              </Form.Group>
            </div>
            )
          })}
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
      </div>
      )
    }


    componentDidMount() {
        this.setState({ students: this.props.students, modalShow: new Array(this.props.students.length) });
    }

    handleModal(i, student, e) {
      console.log(i)
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
