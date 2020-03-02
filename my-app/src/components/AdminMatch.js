import React, { Component } from 'react';
import Button from "react-bootstrap/Button"
import Dropdown from "react-bootstrap/Dropdown";

class AdminMatch extends Component {
    // state = {
    //     projects: this.props.projects[0],
    // }

    constructor(props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);
        this.findSelection = this.findSelection.bind(this);

        this.state = {
            projects: props.projects,
            projectSelection : []
        }
      //  console.log(this.props);
        console.log("State: " + this.state.projects)
    }

    componentDidMount() {
        this.setState({ projects: this.props.projects });
    }

    handleSelect (evtKey) {
        this.setState(
            {projectSelection: [...this.state.projectSelection,evtKey]}
        )
        // console.log(evtKey);

       // let result = this.state.projectSelection.find(element => element.index === index)

        // student 1 picks project 1 but wants to change to project 2, it should delete the old entry and replace it
        // student 2 picks project 3 but project 3 is already selected by student 4 - avoid this by removing from selection list

    }

    findSelection(index) {
        let result = this.state.projectSelection.find(element => element.index === index);
        console.log(result);
        if(result === undefined || result === null) {
            return 'Auto';
        }
        else {
            return result.project;
        }
    }

    render(){

        let hasMounted = false;
        let {students, projects} = this.props;

        if(students !== null && this.state.projects !== null) {
            hasMounted = true;
        }

        return(
            <div>
                <p>Pre-Match Selection Option</p>

                <table style={{width:"50%", margin: "auto"}}>
                    {hasMounted ? (
                        this.props.students.map((val,ind) => {
                            return(
                                <div align="center">
                                    <tr>
                                        <td ><Button style={{width: "200px"}}>{val.name}</Button></td>
                                        <td>
                                            <Dropdown>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                        {this.findSelection(ind)}
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu style={{'max-height': '350px', 'overflow-y': 'auto'}} >
                                                        {hasMounted ? (
                                                            this.state.projects.map((proj, index) => {
                                                                return(
                                                                    <Dropdown.Item
                                                                        eventKey={proj.name}
                                                                        href={`#/action-${index}`}
                                                                        onSelect={()=>this.handleSelect({
                                                                            student: val.name,
                                                                            project: proj.name,
                                                                            index: ind
                                                                        })}>
                                                                        {proj.name}
                                                                    </Dropdown.Item>
                                                                )
                                                            })) : (
                                                            <p>Loading</p>
                                                        )
                                                        }
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                </div>
                            );
                        })) : (
                        <p>Loading</p>
                    )
                    }
                </table>

            </div>

        );
    }
}

export default AdminMatch;