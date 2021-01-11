import React, { Component } from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

import update from "react-addons-update";
import '../styling/Admin.css';
function displayInfo(match) {
    if(match === undefined || match === null || match.student_name === "NO MATCH") {
        return <div>NO MATCH</div>;
    } else {
        return <div>
          <h3>Project: {match.org_name}</h3>
          {Object.keys(match.org_skills).map((skill, score) => {
              return (
                      <React.Fragment key={skill}>
                          {skill}: {score}
                          <br/>
                      </React.Fragment>
              )
          })}
          <br/>
          <h3>Student: {match.student_name}</h3>
          {Object.keys(match.student_skills).map((skill, score) => {
              return (
                  <React.Fragment key={skill}>
                      {skill}: {score}
                      <br/>
                  </React.Fragment>
              )
          })}
          <br/>
          {(!(match.student_name === "NO MATCH")) ? <div>
                  <h3>Matchability between Project and Student</h3>
                  Matchability: {match.student_matchability.toFixed(4)}
              </div> : <div/>
          }
        </div>;
    }
}

class AdminResults extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: null,
            students: null,
            projects: null,
            loaded: false,
            formattedResults: null,
            modalShow: [],
        }

        this.clearData = this.clearData.bind(this);
        this.handleModal = this.handleModal.bind(this);
    }

    clearData() {
        this.setState(() => ({
            modalShow: [],
        }));
    }

    componentDidMount() {
        this.setState({ results: this.props.results, modalShow: new Array(this.props.results.length) });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({ results: nextProps.results, modalShow: new Array(nextProps.results.length) });
    }

    handleModal(i) {
        // console.log(i)
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
        let {students, projects,results } = this.props;
        let value = null;
        if(students !== null && projects !== null && results !== null) {
            hasMounted = true;
            value = this.props.results[this.props.results.length-1];
        }
        if(value !== undefined && hasMounted) {
            return(
                <div>
                    <p>Click on a matching pair to view scoring of skills</p>
                    <Accordion>
                    {results.map((result, index) => {
                        var localDate = new Date(result.created_at);
                        return (
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Card.Header} variant="link" eventKey={index}>
                                            {result.cohort} {localDate.toDateString()} {localDate.toLocaleTimeString()}
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey={index}>
                                        <Card.Body>
                                            <table style={{width:"50%", margin: "auto"}}>
                                                <tbody className="admin_table">
                                                {hasMounted ?
                                                    result.data.data_list.map((elem,i) => {
                                                        return(
                                                            <tr key={i}>
                                                                <td className="admin_cell">
                                                                    <div>
                                                                        <Button onClick={this.handleModal.bind(this, i)}>{elem.org_name} -> {elem.student_name}</Button>
                                                                        <Modal
                                                                            size="lg"
                                                                            show={this.state.modalShow[i]}
                                                                            onHide={() => (
                                                                                this.clearData.bind(this),
                                                                                    this.setState(update(this.state, {
                                                                                        modalShow: {
                                                                                            [i] : {
                                                                                                $set: false
                                                                                            }
                                                                                        }
                                                                                    })))}
                                                                            aria-labelledby="contained-modal-title-vcenter"
                                                                            centered
                                                                        >
                                                                            <Modal.Header closeButton>
                                                                                <Modal.Title id="example-custom-modal-styling-title">
                                                                                    Match: {elem.org_name} and {elem.student_name}
                                                                                </Modal.Title>
                                                                            </Modal.Header>
                                                                            <Modal.Body>{displayInfo(elem)}</Modal.Body>
                                                                        </Modal>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })

                                                    : (
                                                        <p>Loading</p>
                                                    )
                                                }
                                                </tbody>
                                            </table>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                        )
                    })}
                    </Accordion>

                </div>
            );
        } else {
            return (
                <div>No results</div>
            )
        }
    }
}

export default AdminResults;
