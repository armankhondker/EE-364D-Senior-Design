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
                <p>Click on a student to edit student survey information</p>
                <table style={{width:"50%", margin: "auto"}}>
                    <tbody>
                        {hasMounted ? (
                            this.state.students.map((student, index) => {
                                return(
                                    <tr key={index}>
                                        <td>
                                            <Button>{student.name}</Button>
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

export default AdminStudents;