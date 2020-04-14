import React, { Component } from 'react';
import Button from "react-bootstrap/Button"
import Dropdown from "react-bootstrap/Dropdown";
import ReactLoading from 'react-loading';
import axios from "axios";

class AdminMatch extends Component {

    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        this.findSelection = this.findSelection.bind(this);
        this.runMatchingAlgorithm = this.runMatchingAlgorithm.bind(this);

        this.state = {
            projects: props.projects,
            projectListToPickFrom: props.projects,
            projectSelection : [],
            isRunning: false,
            isDone: false,
        }
    }

    componentDidMount() {
        this.setState({
            projects: this.props.projects,
            projectListToPickFrom: this.props.projects
        });
    }

    componentDidUpdate(prevProps){
        console.log("SELECTED PROJECTS:");
        console.log(this.state.projectSelection);

        console.log("PROJECT LIST TO PICK FROM: ");
        console.log(this.state.projectListToPickFrom);

    }

    handleSelect (evtKey) {
        let found = false;
        let i;

        //  student 1 picks project 1 but wants to change to project 2 => deletes the old entry and replaces it
        let result = this.state.projectSelection.find(element => element.index === evtKey.index);
        if(result != null){
            found = true;
            i = this.state.projectSelection.indexOf(result);
        }

        if (found){
            this.state.projectSelection.splice(i,1);
            this.setState({projectSelection: [...this.state.projectSelection,evtKey]});
        }
        else{
            // not found, adds to list of already selected projects
            this.setState({projectSelection: [...this.state.projectSelection,evtKey]});
        }

        // student 1 picks project 2 but project 2 is already selected by student 2 - avoid this issue by removing
        // from list of projects available to select
        let foundProject = false;
        let iProject;
        let res = this.state.projectListToPickFrom.find(element => element.name === evtKey.project);

        if(res != null){
            foundProject = true;
            iProject = this.state.projectListToPickFrom.indexOf(res);
        }

        if(foundProject){
            this.state.projectListToPickFrom.splice(iProject,1);
        }
    }

    findSelection(index) {
        let result = this.state.projectSelection.find(element => element.index === index);
        if(result === undefined || result === null) {
            return 'Auto';
        } else {
            return result.projectName;
        }
    }

    async runMatchingAlgorithm() {
        let {projectSelection} = this.state;
        let params = {};
        for(let i = 0; i < projectSelection.length; i ++) {
            params[projectSelection[i].studentUID] = projectSelection[i].projectUID;
        }
        console.log(params);
        console.log("running");
        window.scrollTo(0,0);
        this.setState({ isRunning: true });
        // await axios.get('http://django-env.emqvqmazrh.us-west-2.elasticbeanstalk.com/api/algo')
        // await axios.get('http://localhost:8000/api/algo')
        await axios.post('http://django-env.emqvqmazrh.us-west-2.elasticbeanstalk.com/api/algo', JSON.stringify(params),
            {
                headers: {
                    'content-type': 'application/json',
                },
            })
            .then(res => {
                console.log(res);
                if(res.status === 201) {
                   this.setState({ isDone: true });
                }
                this.setState({ isRunning: false });
            });
    }

    render(){
        let {isRunning, isDone} = this.state;
        let hasMounted = false;
        if(this.props.students !== null && this.state.projectListToPickFrom !== null) {
            hasMounted = true;
        }
        let Loading = <ReactLoading type={"spinningBubbles"} color={'#9e4800'} height={200} width={200}/>;
        let CurrentDisplay = Loading;
        if(hasMounted) {
            if(isDone ) {
                //DONE screen
                CurrentDisplay = <h4>Matching <span style={{color: 'green'}}>successful</span>. View completed matches in the "Results" tab.</h4>
            } else {
                if(!isRunning) {
                    //Not running and not DONE
                    //Prematch
                    CurrentDisplay = <div>
                        <p>Pre-Match Selection Option</p>
                        <table style={{width: "50%", margin: "auto"}}>
                            <tbody>
                                {this.props.students.map((val, ind) => {
                                    return (
                                        <tr key={ind}>
                                            <td><Button style={{width: "200px"}}>{val.first_name + ' ' + val.last_name}</Button></td>
                                            <td>
                                                <Dropdown>
                                                    <Dropdown>
                                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                            {this.findSelection(ind)}
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu
                                                            style={{'maxHeight': '350px', 'overflowY': 'auto'}}>
                                                            {this.state.projectListToPickFrom.map((proj, index) => {
                                                                return (
                                                                    <Dropdown.Item
                                                                        eventKey={proj.name}
                                                                        href={`#/action-${index}`}
                                                                        onSelect={() => this.handleSelect({
                                                                            studentID: val.id,
                                                                            studentUID: val.unique_id,
                                                                            projectID: proj.id,
                                                                            projectUID: proj.unique_id,
                                                                            projectName: proj.project_name,
                                                                            index: ind
                                                                        })}
                                                                        key={index}
                                                                    >
                                                                        {proj.project_name}
                                                                    </Dropdown.Item>
                                                                )
                                                            })}
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </Dropdown>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <br/>
                        <Button size="lg" onClick={this.runMatchingAlgorithm}>
                            Run
                        </Button>
                    </div>
                } else {
                    //Running match
                    CurrentDisplay = <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', flexDirection: 'column'}}>
                        {Loading}
                        <br/>
                        <h4>   Running Matching Algorithm...</h4>
                    </div>;
                }
            }
        } else {
           //Loading API data
           CurrentDisplay = Loading;
        }

        return(
            <div>
                {CurrentDisplay}
            </div>
        );
    }
}

export default AdminMatch;