import React, { Component } from 'react';
import Popup from "reactjs-popup";

function displayInfo(match) {
   console.log(match);
    let studentComponent;
    let projectComponent;
    let skills;

        skills = match.student_skills;
        studentComponent =  <div>
            <p>Name: {match.student_name}</p>
            <p>Scoring for each skill:</p>
            <p>Communication: {skills.Communication}</p>
            <p>Time Management: {skills['Time Management']} </p>
            <p>Decision Making: {skills['Decision Making']}</p>
            <p>Leadership: {skills.Leadership}</p>
            <p>Teamwork: {skills.Teamwork}</p>
            <p>Literature Review: {skills['Time Management']}</p>
            <p>Baseline Data Identification: {skills['Baseline Data Identification']}</p>
            <p>Logic Modeling: {skills['Logic Modeling']}</p>
            <p>Outcomes Definition: {skills['Time Management']}</p>
            <p>Survey Administration: {skills['Survey Administration']}</p>
            <p>Conducting Interviews: {skills['Conducting Interviews']}</p>
            <p>Data Mining: {skills['Data Mining']}</p>
            <p>Statistical Analysis: {skills['Statistical Analysis']}</p>
            <p>SQL: {skills.SQL}</p>
            <p>Machine Learning: {skills['Machine Learning']}</p>
            <p>HTML: {skills.HTML}</p>
            <p>CSS: {skills.CSS}</p>
            <p>Java: {skills.Java}</p>
            <p>Python: {skills.Python}</p>
            <p>Tableau: {skills.Tableau}</p>
            <p>Microsoft Office Suite: {skills['Microsoft Office Suite']}</p>
        </div>;

        skills = match.org_skills;

        projectComponent = <div>
            <p>Name: {match.org_name}</p>
                <p>Scoring for each skill:</p>
                <p>Communication: {skills.Communication}</p>
                <p>Time Management: {skills['Time Management']} </p>
                <p>Decision Making: {skills['Decision Making']}</p>
                <p>Leadership: {skills.Leadership}</p>
                <p>Teamwork: {skills.Teamwork}</p>
                <p>Literature Review: {skills['Time Management']}</p>
                <p>Baseline Data Identification: {skills['Baseline Data Identification']}</p>
                <p>Logic Modeling: {skills['Logic Modeling']}</p>
                <p>Outcomes Definition: {skills['Time Management']}</p>
                <p>Survey Administration: {skills['Survey Administration']}</p>
                <p>Conducting Interviews: {skills['Conducting Interviews']}</p>
                <p>Data Mining: {skills['Data Mining']}</p>
                <p>Statistical Analysis: {skills['Statistical Analysis']}</p>
                <p>SQL: {skills.SQL}</p>
                <p>Machine Learning: {skills['Machine Learning']}</p>
                <p>HTML: {skills.HTML}</p>
                <p>CSS: {skills.CSS}</p>
                <p>Java: {skills.Java}</p>
                <p>Python: {skills.Python}</p>
                <p>Tableau: {skills.Tableau}</p>
                <p>Microsoft Office Suite: {skills['Microsoft Office Suite']}</p>
            </div>;

    return <div>
        <h3>Project</h3>
        {projectComponent}
        <h3>Student</h3>
        {studentComponent}
        <h3>Matchability</h3>
        {match.student_matchability}
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