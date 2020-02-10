import React, { Component } from 'react';
import Button from "react-bootstrap/Button"
import axios from "axios";
import Popup from "reactjs-popup";

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
        return(
            <div>
                <Button>AdminResults</Button>
                {hasMounted ? (
                    this.state.results.map((value, index) => {
                        return (
                            <div>
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