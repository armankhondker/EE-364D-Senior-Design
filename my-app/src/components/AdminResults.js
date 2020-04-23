import React, { Component } from 'react';
import Popup from "reactjs-popup";

function displayInfo(match) {
   console.log(match);
    let studentComponent;
    let projectComponent;

        studentComponent = <div>
            <p>Name: {match.student_name}</p>
            <p>Scoring for each skill:</p>
            <p>Communication: {match.student_skills.Communication}</p>
        </div>;

        let skills = match.org_skills;

    /*
       <p>Time Management: </p>
       <p>Decision Making</p>
       <p>Leadership: </p>
       <p>Teamwork: </p>
       <p>Literature Review: </p>
       <p>Baseline Data Identification: </p>
       <p>Logic Modeling: </p>
       <p>Outcomes Definition:</p>
       <p>Survey Administration: </p>
       <p>Conducting Interviews: </p>
       <p>Data Mining: </p>
       <p>Statistical Analysis: </p>
       <p>SQL: </p>
       <p>Machine Learning: </p>
       <p>HTML: </p>
       <p>CSS: </p>
       <p>Java: </p>
       <p>Python</p>
       <p>Tableau: </p>
       <p>Microsoft Office Suite: </p>
       */

        projectComponent = <div>
            <p>Name: {match.org_name}</p>
            <p>Communication: {skills.Communication}</p>

        </div>;


    /*
    let index;
    for (index = 0; index < match.org_skills.length; index++) {
        projectComponent =
            <div>
                <p>match.org_skills[index]</p>
            </div>;
    }
    console.log(projectComponent);
    */

    return <div>
        <h3>Project</h3>
        {projectComponent}
        <h3>Student</h3>
        {studentComponent}
    </div>;
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
        }
    }

    render(){

        let hasMounted = false;
        let {students, projects,results } = this.props;
        if(students !== null && projects !== null && results !== null) {
            hasMounted = true;
        }

        return(
            <div>
                {hasMounted ? (
                    this.props.results.map((value, index) => {
                        return (
                            value.data.data_list.map((elem) => {
                              return(
                                  <div>
                                      <div key={index}>
                                          <Popup modal
                                                 closeOnDocumentClick
                                                 trigger={
                                                     <button>{elem.org_name} -> {elem.student_name}</button>}>
                                              <div>
                                                    {displayInfo(elem)}
                                              </div>
                                          </Popup>
                                        </div>
                                    </div>
                                      )
                            })
                        );
                    }))

                    : (
                    <p>Loading</p>
                )
                }
            </div>
        );
    }
}

export default AdminResults;