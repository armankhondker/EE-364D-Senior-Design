import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import Col from 'react-bootstrap/Form';
import '../App.css';


class CommunityForm extends Component {

	render() {
		return (
		    <div className="form">
                <br/>
                <br/>
                <br/>
            <Form>
                <Form.Group controlId="orgInput">
                <Form.Label>Organization Name</Form.Label>
                <Form.Control type="name" placeholder=""/>
                </Form.Group>
            
                <Form.Group controlId="Legal">
                <Form.Label>Legal Entity Name (if different)</Form.Label>
                <Form.Control type="legal" placeholder=""/>
                </Form.Group>
            
            <Form.Group controlId="OrgAddress">
                <Form.Label>Organization Address</Form.Label>
                <Form.Control type="OrgAddress" placeholder=""/>
                </Form.Group>
                
                <Form.Group controlId="orgURL">
                <Form.Label>Organization URL </Form.Label>
                <Form.Control type="mission"/>
                </Form.Group>
                
                <Form.Group controlId="orgURL">
                <Form.Label>Organization Mission Statement </Form.Label>
                <Form.Control type="mission"/>
                </Form.Group>

            
            <Form.Group controlId="projectDeliverables">
                <Form.Label>Which of the following situations best describes your organization/program's needs </Form.Label>
                <Form.Control as="select">
                <option> </option>
                <option>1 - I have a project scoped; I'm ready to be matched to a graduate student </option>
                <option>2 - I don't have all the project specifics yet; I could use some help </option>
             
                </Form.Control>
                </Form.Group>

            
            <Form.Group controlId="profSkills">
                <Form.Label>Does your organization require certain skills that may be helpful for us to know about (i.e. languages spoken, coding, analytical software, professional skills, etc.)? - List them here!</Form.Label>
                <Form.Control type="profList"/>
                </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>
                <br/>
            </div>
 
        );
            }
        }

            export default OrgForm;
        
 
 
