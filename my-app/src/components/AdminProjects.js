import React, { Component } from 'react';
import Button from "react-bootstrap/Button"

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
                {hasMounted ? (
                    this.state.projects.map((proj) => {
                        return(
                            <Button>{proj.name}</Button>
                        );
                    })) : (
                        <p>Loading</p>
                )
                }
            </div>
        )
    }
}

export default AdminProjects;