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

        }
        this.handleModal = this.handleModal.bind(this);
        this.renderSurvey = this.renderSurvey.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleEID = this.handleEID.bind(this);
        this.handlePhone = this.handlePhone.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleLinkedin = this.handleLinkedin.bind(this);

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

    renderSurvey(student) {
      let {first_name, last_name, eid, phone, email, linkedIn, intentions, interests, time_commitment, international, fin_aid, transportation, flexible_hours, work_remotely, degree, tech_courses, prof_courses, experience, tech_skills, prof_skills, other_skills, cohort} = student
      console.log(intentions)
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
                                             onHide={() => (this.setState(update(this.state, {
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
                {this.state.showWindowPortal && (
                    <NewWindowPortal>
                        <h1>New Window for Editing Survey Responses</h1>
                        <button onClick={() => this.setState({ showWindowPortal: false })} >
                            Close me!
                        </button>
                    </NewWindowPortal>
                )}
            </div>
        )
    }
}

export default AdminStudents;
