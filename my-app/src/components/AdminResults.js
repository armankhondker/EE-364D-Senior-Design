import React, { Component } from 'react';
import Popup from "reactjs-popup";

function displayInfo(match) {
    console.log(match);
    let studentComponent;
    let projectComponent;

    if(match.student_technical !== undefined) {
        studentComponent = <div>
            <p>Name: {match.student.name}</p>
            <p>Technical: {match.student_technical}</p>
            <p>Professional: {match.student_professional}</p>
            <p>Resume ID: {match.student_resume_id}</p>
            <p>Quadrant: {match.student_quadrant}</p>
            <p>Availability Duration: {match.student_availability_duration} </p>
            <p>Availability Time: {match.student_availability_time} </p>
            <p>Work Factors: {match.student_work_factors} </p>
            <p>Interest Buckets: {match.student_interest_buckets}</p>
        </div>
    } else {
        studentComponent = <div>
            <p>Name: {match.student}</p>
        </div>
    }

    if(match.project_technical !== undefined) {
        projectComponent = <div>
            <p>Name: {match.project_org}</p>
            <p>Primary Category: {match.project_primary}</p>
            <p>Second Category: {match.project_secondary}</p>
            <p>Technical: {match.project_technical}</p>
            <p>Professional: {match.project_professional}</p>
            <p>Quadrant: {match.project_quadrant} </p>
        </div>
    } else{
        projectComponent = <div>
            <p>Name: {match.project_org}</p>

        </div>

    }
    return <div>
        <h3>Student</h3>
        {studentComponent}
        <h3>Project</h3>
        {projectComponent}
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
                            <div key={index}>
                                <Popup modal
                                       closeOnDocumentClick
                                       trigger={<button>{value.student} -> {value.project_org}</button>}>
                                    <div>
                                        {displayInfo(value)}
                                    </div>
                                </Popup>
                            </div>

                        );
                    })) : (
                    <p>Loading</p>
                )
                }
            </div>
        );
    }
}

export default AdminResults;