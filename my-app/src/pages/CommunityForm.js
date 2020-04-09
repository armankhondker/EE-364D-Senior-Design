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

            
           
            
             <fieldset>
                <Form.Label as="transport">
                <Form.Label>Does your student need access to transportation?      </Form.Label>
                </Form.Label>
                <Col sm={10}>
                    <Form.Check
                    type="radio"
                    label="Yes"
                    />
                    <Form.Check
                    type="radio"
                    label="No"
                    />
                </Col>
            </fieldset>
            
            
                <fieldset>
                <Form.Label as="flexible">
                <Form.Label>Do you have flexible work hours?  </Form.Label>
                </Form.Label>
                <Col sm={10}>
                    <Form.Check
                    type="radio"
                    label="Yes"
                    />
                    <Form.Check
                    type="radio"
                    label="No"
                    />
                </Col>
            </fieldset>
            
            <fieldset>
                <Form.Label as="remote">
                <Form.Label>Can your assigned student work remotely?   </Form.Label>
                </Form.Label>
                <Col sm={10}>
                    <Form.Check
                    type="radio"
                    label="Yes"
                    />
                    <Form.Check
                    type="radio"
                    label="No"
                    />
                </Col>
            </fieldset>
            
            
            <Form.Group controlId="SectionTitle">
                <Form.Label>How much experience are you expecting in completing the following project tasks/deliverables: </Form.Label>

            </Form.Group>
            <Form.Group controlId="projectDeliverables">
                <Form.Label>Literature Review & Baseline Data/Metrics Identification </Form.Label>
                <Form.Control as="select">
                <option> </option>
                <option>1 - No Experience Needed </option>
                <option>2</option>
                <option>3 - Can Learn </option>
                <option>4</option>
                <option>5 - Experience Mandatory</option>
                </Form.Control>
            </Form.Group>
            
            
            <Form.Group controlId="projectDeliverables">
                <Form.Label>Logic Modeling & Outcomes Definition</Form.Label>
                <Form.Control as="select">
                <option> </option>
                <option>1 - No Experience Needed </option>
                <option>2</option>
                <option>3 - Can Learn </option>
                <option>4</option>
                <option>5 - Experience Mandatory</option>
                </Form.Control>
            </Form.Group>
            
            <Form.Group controlId="projectDeliverables">
                <Form.Label>Coding/Structuring Data, Survey Adminstration, Developing Data Templates</Form.Label>
                <Form.Control as="select">
                <option> </option>
                <option>1 - No Experience Needed </option>
                <option>2</option>
                <option>3 - Can Learn </option>
                <option>4</option>
                <option>5 - Experience Mandatory</option>
                </Form.Control>
            </Form.Group>
            
                <Form.Group controlId="projectDeliverables">
                <Form.Label>Survey/Assessment Design & Conducting Focus Groups/Stakeholder Interviews</Form.Label>
                <Form.Control as="select">
                <option> </option>
                <option>1 - No Experience Needed </option>
                <option>2</option>
                <option>3 - Can Learn </option>
                <option>4</option>
                <option>5 - Experience Mandatory</option>
                </Form.Control>
            </Form.Group>
            
            <Form.Group controlId="projectDeliverables">
                <Form.Label>Data Mining, Statistical Analysis, Data Visualization, Report/Dashboard Development </Form.Label>
                <Form.Control as="select">
                <option> </option>
                <option>1 - No Experience Needed </option>
                <option>2</option>
                <option>3 - Can Learn </option>
                <option>4</option>
                <option>5 - Experience Mandatory</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="projectDeliverables">
                <Form.Label>SQL, SQL, Database Design, Machine Learning</Form.Label>
                <Form.Control as="select">
                <option> </option>
                <option>1 - No Experience Needed </option>
                <option>2</option>
                <option>3 - Can Learn </option>
                <option>4</option>
                <option>5 - Experience Mandatory</option>
                </Form.Control>
            </Form.Group>




            <Form.Group controlId="SectionTitle">
                <Form.Label>Please Rate the Experience your Organization Needs in the Following Technical Skills: </Form.Label>

            </Form.Group>
            <Form.Group controlId="techSkills">
                <Form.Label> HTML </Form.Label>
                <Form.Control as="select">
                <option> </option>
                 <option>1 - No Experience Needed </option>
                <option>2</option>
                <option>3 - Can Learn </option>
                <option>4</option>
                <option>5 - Experience Mandatory</option>
                </Form.Control>
            </Form.Group>
            

            <Form.Group controlId="techSkills">
                <Form.Label> Python </Form.Label>
                <Form.Control as="select">
                <option> </option>
                <option>1 - No Experience Needed </option>
                <option>2</option>
                <option>3 - Can Learn </option>
                <option>4</option>
                <option>5 - Experience Mandatory</option>
                </Form.Control>
            </Form.Group>
            
                
            <Form.Group controlId="techSkills">
                <Form.Label> Java </Form.Label>
                <Form.Control as="select">
                <option> </option>
             <option>1 - No Experience Needed </option>
                <option>2</option>
                <option>3 - Can Learn </option>
                <option>4</option>
                <option>5 - Experience Mandatory</option>
                </Form.Control>
            </Form.Group>
            

            <Form.Group controlId="techSkills">
                <Form.Label> Tableau </Form.Label>
                <Form.Control as="select">
                <option> </option>
                <option>1 - No Experience Needed </option>
                <option>2</option>
                <option>3 - Can Learn </option>
                <option>4</option>
                <option>5 - Experience Mandatory</option>
                </Form.Control>
            </Form.Group>
            
            
            <Form.Group controlId="techSkills">
                <Form.Label> Data Analysis </Form.Label>
                <Form.Control as="select">
                <option> </option>
               <option>1 - No Experience Needed </option>
                <option>2</option>
                <option>3 - Can Learn </option>
                <option>4</option>
                <option>5 - Experience Mandatory</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="techSkills">
                <Form.Label> Database Design </Form.Label>
                <Form.Control as="select">
                <option> </option>
                 <option>1 - No Experience Needed </option>
                <option>2</option>
                <option>3 - Can Learn </option>
                <option>4</option>
                <option>5 - Experience Mandatory</option>
                </Form.Control>
            </Form.Group>
            
            
            <Form.Group controlId="techSkills">
                <Form.Label> Logic Modeling </Form.Label>
                <Form.Control as="select">
                <option> </option>
                 <option>1 - No Experience Needed </option>
                <option>2</option>
                <option>3 - Can Learn </option>
                <option>4</option>
                <option>5 - Experience Mandatory</option>
                </Form.Control>
            </Form.Group>
            
            
            <Form.Group controlId="techSkills">
                <Form.Label> Outcomes Definition </Form.Label>
                <Form.Control as="select">
                <option> </option>
                 <option>1 - No Experience Needed </option>
                <option>2</option>
                <option>3 - Can Learn </option>
                <option>4</option>
                <option>5 - Experience Mandatory</option>
                </Form.Control>
            </Form.Group>
            
            
            <Form.Group controlId="techSkills">
                <Form.Label> Measurement Strategy </Form.Label>
                <Form.Control as="select">
                <option> </option>
                 <option>1 - No Experience Needed </option>
                <option>2</option>
                <option>3 - Can Learn </option>
                <option>4</option>
                <option>5 - Experience Mandatory</option>
                </Form.Control>
            </Form.Group>
            
            
            <Form.Group controlId="techSkills">
                <Form.Label> Data Visualization </Form.Label>
                <Form.Control as="select">
                <option> </option>
                <option>1 - No Experience Needed </option>
                <option>2</option>
                <option>3 - Can Learn </option>
                <option>4</option>
                <option>5 - Experience Mandatory</option>
                </Form.Control>
            </Form.Group>
            
            
            <Form.Group controlId="techSkills">
                <Form.Label> Data Collection/Adminstration </Form.Label>
                <Form.Control as="select">
                <option> </option>
                <option>1 - No Experience Needed </option>
                <option>2</option>
                <option>3 - Can Learn </option>
                <option>4</option>
                <option>5 - Experience Mandatory</option>
                </Form.Control>
            </Form.Group>
            
            
            <Form.Group controlId="techSkills">
                <Form.Label> Survey Design </Form.Label>
                <Form.Control as="select">
                <option> </option>
                <option>1 - No Experience Needed </option>
                <option>2</option>
                <option>3 - Can Learn </option>
                <option>4</option>
                <option>5 - Experience Mandatory</option>
                </Form.Control>
            </Form.Group>
            

            <Form.Group controlId="techSkills">
                <Form.Label> Microsoft Office Suite </Form.Label>
                <Form.Control as="select">
                <option> </option>
                 <option>1 - No Experience Needed </option>
                <option>2</option>
                <option>3 - Can Learn </option>
                <option>4</option>
                <option>5 - Experience Mandatory</option>
                </Form.Control>
            </Form.Group>
            
            <Form.Group controlId="sectionTitle">
                <Form.Label>Please Rate the Experience your Organization Needs in the Following Professional Skills: </Form.Label>

            </Form.Group>
            <Form.Group controlId="profSkills">
                <Form.Label> Communication </Form.Label>
                <Form.Control as="select">
                <option> </option>
                 <option>1 - No Experience Needed </option>
                <option>2</option>
                <option>3 - Can Learn </option>
                <option>4</option>
                <option>5 - Experience Mandatory</option>
                </Form.Control>
            </Form.Group>
            

            <Form.Group controlId="profSkills">
                <Form.Label> Time-Management </Form.Label>
                <Form.Control as="select">
                <option> </option>
               <option>1 - No Experience Needed </option>
                <option>2</option>
                <option>3 - Can Learn </option>
                <option>4</option>
                <option>5 - Experience Mandatory</option>
                </Form.Control>
            </Form.Group>
            
            
            <Form.Group controlId="profSkills">
                <Form.Label> Decision-Making </Form.Label>
                <Form.Control as="select">
                <option> </option>
                <option>1 - No Experience Needed </option>
                <option>2</option>
                <option>3 - Can Learn </option>
                <option>4</option>
                <option>5 - Experience Mandatory</option>
                </Form.Control>
            </Form.Group>
            

            <Form.Group controlId="profSkills">
                <Form.Label> Leadership </Form.Label>
                <Form.Control as="select">
                <option> </option>
                 <option>1 - No Experience Needed </option>
                <option>2</option>
                <option>3 - Can Learn </option>
                <option>4</option>
                <option>5 - Experience Mandatory</option>
                </Form.Control>
            </Form.Group>
            
            
            <Form.Group controlId="profSkills">
                <Form.Label> Teamwork </Form.Label>
                <Form.Control as="select">
                <option> </option>
                <option>1 - No Experience Needed </option>
                <option>2</option>
                <option>3 - Can Learn </option>
                <option>4</option>
                <option>5 - Experience Mandatory</option>
                </Form.Control>
            </Form.Group>
            
            <Form.Group controlId="profSkills">
                <Form.Label>Do you have other relevant skills that may be helpful for us to know about (i.e. other languages spoken, coding, analytical software, professional skills, etc.)? - List them here!</Form.Label>
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
        
 
 
