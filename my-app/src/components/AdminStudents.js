import React, { Component } from 'react';
import Button from "react-bootstrap/Button"

class AdminStudents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            students: props.students,
        }
    }

    componentDidMount() {
        this.setState({ students: this.props.students });
    }

    render(){
        let hasMounted = false;
        if(this.state.students !== null) {
            hasMounted = true;
        }

        return(
            <div>
                <p>Click on a project to edit student survey information</p>
                <table style={{width:"50%", margin: "auto"}}>
                    {hasMounted ? (
                        this.state.students.map((student) => {
                            return(
                                <tr>
                                    <Button>{student.name}</Button>
                                </tr>

                            );
                        })) : (
                        <p>Loading</p>
                    )
                    }

                </table>
            </div>
        )
    }
}

export default AdminStudents;