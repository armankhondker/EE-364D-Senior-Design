import React, { Component } from 'react';
import Button from "react-bootstrap/Button"
import NewWindowPortal from "../components/NewWindowPortal.js";
import '../styling/Admin.css';

class AdminStudents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            students: props.students,
            studentClicked: false,
        }
        this.toggleWindowPortal = this.toggleWindowPortal.bind(this);
    }

    toggleWindowPortal(){
        this.setState(state => ({
            ...state,
            showWindowPortal: !state.showWindowPortal,
        }));
    }

    closeWindowPortal(){
        this.setState(state => ({
            ...state,
            showWindowPortal: false,
        }));
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
                    <tbody className="admin_table">
                        {hasMounted ? (
                            this.state.students.map((student, index) => {
                                return(
                                    <tr key={index}>
                                        <td className="admin_cell">
                                            <Button onClick={this.toggleWindowPortal}>{student.first_name}</Button>
                                        </td>
                                    </tr>
                                );
                            })) : (
                            <p>Loading</p>
                        )
                        }
                    </tbody>

                </table>
                {this.state.showWindowPortal && (
                    <NewWindowPortal>
                        <h1>New Window for Editing Survey Responses</h1>
                        <button onClick={() => this.setState({ showWindowPortal: false })} >
                            Close me!
                        </button>
                    </NewWindowPortal>
                )}
            </div>
        )
    }
}

export default AdminStudents;
