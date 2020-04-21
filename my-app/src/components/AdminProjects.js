import React, { Component } from 'react';
import Button from "react-bootstrap/Button"
import '../styling/Admin.css';

class AdminProjects extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: props.projects,
        }
    }

    componentDidMount() {
        this.setState({ projects: this.props.projects });
    }

    render(){
        let hasMounted = false;
        if(this.state.projects !== null) {
            hasMounted = true;
        }

        return(
            <div>
                <p>Click on a project to edit project survey information</p>
                <table style={{width:"50%", margin: "auto"}}>
                    <tbody className="admin_table">
                        {hasMounted ? (
                            this.state.projects.map((proj, index) => {
                                return(
                                    <tr key={index}>
                                        <td className="admin_cell">
                                            <Button>{proj.project_name}</Button>
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

export default AdminProjects;
