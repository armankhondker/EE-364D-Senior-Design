import React, { Component } from 'react';
import Button from "react-bootstrap/Button"

class AdminHome extends Component {

    // Useless constructor warning
    // constructor(props) {
    //     super(props);
    // }

    render(){
        return(
            <div>
              <p></p>
              <Button onClick={this.props.handleLogout}>Log Out</Button>
            </div>
        );
    }
}

export default AdminHome;
