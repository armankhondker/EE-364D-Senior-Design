import React, { Component } from 'react';
import Button from "react-bootstrap/Button"
import Form from 'react-bootstrap/Form';
import '../styling/Admin.css';
import Popup from "reactjs-popup";
import axios from "axios";

class AdminResumes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            students: props.students,
            resumes: props.resumes,
            unique_id: "",
            uploading: false
        }
        this.displayResume = this.displayResume.bind(this);
        this.uploadResume = this.uploadResume.bind(this);
        this.updateResume = this.updateResume.bind(this);
        this.postResume = this.postResume.bind(this);
        this.putResume = this.putResume.bind(this);
        this.base64ToBlob = this.base64ToBlob.bind(this);
    }

    base64ToBlob(base64) {
      base64 = base64.split(",")[1];
      const binaryString = window.atob(base64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; ++i) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      return new Blob([bytes], { type: 'application/pdf' });
    };

    async postResume(file, unique_id) {
      var reader = new FileReader();
      var base64data = "";
  		reader.readAsDataURL(file);
  	  reader.onloadend = async function() {
  	     base64data = reader.result;
         let resume_params = {
           unique_id: unique_id,
           data: base64data
         }
         await axios.post(process.env.REACT_APP_API_URL + 'resumes/', JSON.stringify(resume_params),
     		 {
     				headers: {
     					'content-type': 'application/json',
     				},
     			})
     			.then(res => {
     				console.log(res);
     			})
     			.catch(error => {
     				console.log(error);
     			})
  		}
      this.setState({ uploading: false});
    }

    uploadResume(student, e) {
      let unique_id = student.unique_id;
      this.setState({ uploading: true});
      const files = Array.from(e.target.files)

  		var fileContent = files[0]; // As a sample, upload a text file.
  		var file = new Blob([fileContent], {type: 'application/pdf'});
      this.postResume(file, unique_id);
    }

    async putResume(file, unique_id, resume_id) {
      var reader = new FileReader();
      var base64data = "";
  		reader.readAsDataURL(file);
  	  reader.onloadend = async function() {
  	     base64data = reader.result;
         let resume_params = {
           unique_id: unique_id,
           data: base64data
         }
         await axios.put(process.env.REACT_APP_API_URL + 'resumes/'+resume_id+'/', JSON.stringify(resume_params),
     		 {
     				headers: {
     					'content-type': 'application/json',
     				},
     			})
     			.then(res => {
     				console.log(res);
     			})
     			.catch(error => {
     				console.log(error);
     			})
  		}
      this.setState({ uploading: false});
    }

    updateResume(student, id, e) {
      console.log(id)
      let unique_id = student.unique_id;
      this.setState({ uploading: true});
      const files = Array.from(e.target.files)

  		var fileContent = files[0]; // As a sample, upload a text file.
  		var file = new Blob([fileContent], {type: 'application/pdf'});
      this.putResume(file, unique_id, id);
    }

    displayResume(student) {
      if (this.state.resumes == null && this.state.students == null && !this.state.rendered)
        return <div></div>
      let stud_id = student.unique_id;
      let resumes = this.state.resumes;
      let stud_resume = null
      for (let i=0; i<resumes.length; i++) {
        let resume = resumes[i]
        if (resume.unique_id == stud_id) {
          stud_resume = resume;
        }
      }
      if (stud_resume == null) {
        return (
          <div>
            <p> There is currently no uploaded resume for this student.</p>
            <div className="mb-3 resume_upload_box">
              <Form.File id="resumeInput">
                <Form.File.Label>Please upload a PDF of the resume.</Form.File.Label>
                <Form.File.Input required accept=".pdf,.PDF" onChange={this.uploadResume.bind(this, student)}/>
                  {this.state.uploading ? <p>Uploading...</p> : <p></p>}
              </Form.File>
            </div>
          </div>
        )
      }
      let resume_blob = this.base64ToBlob(stud_resume.data)
      let resume_link = URL.createObjectURL(resume_blob);
      return (
        <div>
          <p></p>
          <a href={resume_link} target="_blank">Click Here To View Resume</a>
          <p></p>
          <a href={resume_link} download={student.first_name + "_" + student.last_name + "_resume.pdf"}>Click Here To Download Resume</a>
          <p></p>
          <div className="mb-3 resume_upload_box">
            <Form.File id="resumeInput">
            <Form.File.Label>If you would like to the update the resume, do so here:</Form.File.Label>
              <Form.File.Input required accept=".pdf,.PDF" onChange={this.updateResume.bind(this, student, stud_resume.id)}/>
                {this.state.uploading ? <p>Uploading...</p> : <p></p>}
            </Form.File>
          </div>
        </div>
      )
    }

    componentDidMount() {
        this.setState({ students: this.props.students, resumes: this.props.resumes });
    }

    render(){
        let hasMounted = false;
        if(this.state.students !== null && this.state.resumes !== null) {
            hasMounted = true;
        }

        return(
            <div>
                <p>Click on a student to view his/her resume</p>
                <table style={{width:"50%", margin: "auto"}}>
                    <tbody className="admin_table">
                        {hasMounted ? (
                            this.state.students.map((student, index) => {
                                return(
                                    <tr key={index}>
                                      <td className="admin_cell">
                                        <Popup modal
                                               closeOnDocumentClick
                                               trigger={<Button>{student.first_name} {student.last_name}</Button>}>
                                            <div>
                                                {this.displayResume(student)}
                                            </div>
                                        </Popup>
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

export default AdminResumes;
