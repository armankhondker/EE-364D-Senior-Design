import React, { Component } from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import update from "react-addons-update";
import '../styling/Admin.css';

function displayInfo(match) {
   console.log(match);
    let studentComponent;
    let projectComponent;
    let skills;

        if (!(match.student_name === "NO MATCH")) {
          skills = match.student_skills;
          studentComponent =  <div>
              <br></br>
              <b>{match.student_name}'s generated scores for each skill</b>
              <br></br>
              Communication: {skills.Communication}
              <br></br>
              Time Management: {skills['Time Management']}
              <br></br>
              Decision Making: {skills['Decision Making']}
              <br></br>
              Leadership: {skills.Leadership}
              <br></br>
              Teamwork: {skills.Teamwork}
              <br></br>
              Literature Review: {skills['Time Management']}
              <br></br>
              Baseline Data Identification: {skills['Baseline Data Identification']}
              <br></br>
              Logic Modeling: {skills['Logic Modeling']}
              <br></br>
              Outcomes Definition: {skills['Time Management']}
              <br></br>
              Survey Administration: {skills['Survey Administration']}
              <br></br>
              Conducting Interviews: {skills['Conducting Interviews']}
              <br></br>
              Data Mining: {skills['Data Mining']}
              <br></br>
              Statistical Analysis: {skills['Statistical Analysis']}
              <br></br>
              SQL: {skills.SQL}
              <br></br>
              Machine Learning: {skills['Machine Learning']}
              <br></br>
              HTML: {skills.HTML}
              <br></br>
              CSS: {skills.CSS}
              <br></br>
              Java: {skills.Java}
              <br></br>
              Python: {skills.Python}
              <br></br>
              Tableau: {skills.Tableau}
              <br></br>
              Microsoft Office Suite: {skills['Microsoft Office Suite']}
              <br></br>
              <br></br>
          </div>;
        }
        else {
          console.log(match)
          studentComponent =  <div>
              <br></br>
              <p>The Possible Matches Were:</p>
              <br></br>
              {match.possible_students.map((name, index) => {
                  return(
                    <p>{name}</p>
                  );
              })}

          </div>
        }

        skills = match.org_skills;

        projectComponent = <div style={{textAlign: 'left'}}>
            <br></br>
            <b>{match.org_name}'s generated scores for each skill</b>
            <br></br>
            Communication: {skills.Communication}
            <br></br>
            Time Management: {skills['Time Management']}
            <br></br>
            Decision Making: {skills['Decision Making']}
            <br></br>
            Leadership: {skills.Leadership}
            <br></br>
            Teamwork: {skills.Teamwork}
            <br></br>
            Literature Review: {skills['Time Management']}
            <br></br>
            Baseline Data Identification: {skills['Baseline Data Identification']}
            <br></br>
            Logic Modeling: {skills['Logic Modeling']}
            <br></br>
            Outcomes Definition: {skills['Time Management']}
            <br></br>
            Survey Administration: {skills['Survey Administration']}
            <br></br>
            Conducting Interviews: {skills['Conducting Interviews']}
            <br></br>
            Data Mining: {skills['Data Mining']}
            <br></br>
            Statistical Analysis: {skills['Statistical Analysis']}
            <br></br>
            SQL: {skills.SQL}
            <br></br>
            Machine Learning: {skills['Machine Learning']}
            <br></br>
            HTML: {skills.HTML}
            <br></br>
            CSS: {skills.CSS}
            <br></br>
            Java: {skills.Java}
            <br></br>
            Python: {skills.Python}
            <br></br>
            Tableau: {skills.Tableau}
            <br></br>
            Microsoft Office Suite: {skills['Microsoft Office Suite']}
            <br></br>
            <br></br>
            </div>;

    if (!(match.student_name === "NO MATCH")) {
      return <div>
          <h3>Project: {match.org_name}</h3>
          {projectComponent}
          <h3>Student: {match.student_name}</h3>
          {studentComponent}
          <h3>Matchability between Project and Student</h3>
          Matchability: {match.student_matchability}
      </div>;
    }
    else {
      return <div>
          <h3>Project: {match.org_name}</h3>
          {projectComponent}
          <h3>Student: {match.student_name}</h3>
          {studentComponent}
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
        this.setState(state => ({
            modalShow: [],
        }));
    }

    componentDidMount() {
        this.setState({ results: this.props.results, modalShow: new Array(this.props.results.length) });
    }

    handleModal(i) {
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
        let {students, projects,results } = this.props;
        let value = null;
        if(students !== null && projects !== null && results !== null) {
            hasMounted = true;
            value = this.props.results[this.props.results.length-1];
        }
        return(
            <div>
                <p>Click on a matching pair to view scoring of skills</p>
                <table style={{width:"50%", margin: "auto"}}>
                    <tbody className="admin_table">
                {hasMounted ?
                            value.data.data_list.map((elem,i) => {
                              return(
                                  <tr>
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
            </div>
        );
    }
}

export default AdminResults;
