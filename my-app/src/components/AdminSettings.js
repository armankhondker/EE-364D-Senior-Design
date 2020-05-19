import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import {ButtonToolbar, ToggleButtonGroup, ToggleButton} from "react-bootstrap";
import LoadingAnimation from "./LoadingAnimation";
import '../About.css';
import Button from "react-bootstrap/Button";

class AdminSettings extends Component {
    constructor(props) {
        super();
        this.state = {
            studentForm: null,
            organizationForm: null,
            season: null,
            year: null,
            cohort: "",
        }

        this.handleStudent = this.handleStudent.bind(this);
        this.handleOrganization = this.handleOrganization.bind(this);
        this.handleRadio = this.handleRadio.bind(this);
        this.handleYear = this.handleYear.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount() {
        console.log(process.env.REACT_APP_API_URL);
        axios.get(process.env.REACT_APP_API_URL + "settings/1/")
            .then(res => {
                console.log(res);
                let str = "20";
                this.setState({
                    studentForm: res.data.student_form_enabled,
                    organizationForm: res.data.organization_form_enabled,
                    cohort: res.data.current_cohort,
                    season: res.data.current_cohort.toString().substring(0,2),
                    year: parseInt(str.concat( res.data.current_cohort.toString().substring(2)))

                });
            })
            .catch(err => console.log(err));
    }

    handleStudent(i, e) {
        this.setState({
            studentForm: e.target.value
        });
    }

    handleOrganization(i, e) {
        this.setState({
            organizationForm: e.target.value
        });
    }

    handleRadio(i, e) {
        this.setState({
            season: e.target.value
        });
    }

    handleYear(e) {
        this.setState({
            year: e.target.value
        })
    }

    handleSave() {
        let params = {
            student_form_enabled: this.state.studentForm,
            organization_form_enabled: this.state.organizationForm,
            current_cohort: `${this.state.season}${this.state.year.toString().slice(-2)}`
        }

        axios.put(process.env.REACT_APP_API_URL + "settings/1/", JSON.stringify(params),
            {
                headers: {
                    'content-type': 'application/json',
                },
            })
            .then(res => {
                console.log(res);
                if(res.status === 200) {
                    window.alert("Settings Saved");
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        let {studentForm, organizationForm, cohort, year, season} = this.state;
        let hasMounted = false;
        if(studentForm !== null && organizationForm !== null && cohort !== "") {
            hasMounted = true;
        }
        console.log(year);
        return (
            <div>
                {hasMounted ? (
                    <div className="flexrow">
                        <h4>Student Form</h4>
                        <ButtonToolbar>
                            <ToggleButtonGroup type="radio" value={JSON.parse(studentForm)} name="StudentForm" onChange={this.handleStudent.bind(this)}>
                                <ToggleButton value={true}>Enable</ToggleButton>
                                <ToggleButton value={false}>Disable</ToggleButton>
                            </ToggleButtonGroup>
                        </ButtonToolbar>
                        <br/>
                        <h4>Organization Form</h4>
                        <ButtonToolbar>
                            <ToggleButtonGroup type="radio" value={JSON.parse(organizationForm)} name="OrgForm"
                                               onChange={this.handleOrganization.bind(this)}>
                                <ToggleButton value={true}>Enable</ToggleButton>
                                <ToggleButton value={false}>Disable</ToggleButton>
                            </ToggleButtonGroup>
                        </ButtonToolbar>

                        <br/>
                        <h4>Cohort Season</h4>
                        <ButtonToolbar>
                            <ToggleButtonGroup type="radio" value={season} name={"Season"} onChange={this.handleRadio.bind(this)}>
                                <ToggleButton value={"SP"}>Spring</ToggleButton>
                                <ToggleButton value={"SU"}>Summer</ToggleButton>
                                <ToggleButton value={"FA"}>Fall</ToggleButton>
                            </ToggleButtonGroup>
                        </ButtonToolbar>

                        <br/>
                        <h4>Cohort Year</h4>
                        <Form.Control style={{width: '100px'}} value={year} onChange={this.handleYear} type="number" />

                        <br/>
                        <br/>
                        <Button variant="success" onClick={this.handleSave}>Save</Button>
                    </div>
                ) : (
                    <LoadingAnimation/>
                )}
            </div>
        )
    }
}

export default AdminSettings;