import React, { Component } from 'react';
import Button from "react-bootstrap/Button"

class AdminHome extends Component {

    // Useless constructor warning
    // constructor(props) {
    //     super(props);
    // }

    render(){
        return(
            <Button onClick={this.props.handleLogout}>Log Out</Button>
        );
    }
}

export default AdminHome;