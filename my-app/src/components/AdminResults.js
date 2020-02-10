import {Component} from "react";
import axios from "axios";

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
            <Button>AdminResults</Button>
        );
    }
}

export default AdminResults;