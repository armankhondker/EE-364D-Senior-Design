import React, { Component } from 'react';
import Button from "react-bootstrap/Button"
import '../styling/Admin.css';
import Form from 'react-bootstrap/Form';
import LoadingAnimation from "./LoadingAnimation";
import update from 'react-addons-update';
import '../App.css';
import axios from "axios";

class AdminSurveys extends Component {

    constructor(props) {
        super(props);
        this.state = {
          submit_text: "",
          success_text: "",
          intentionOptions: [],
          intentionChanges: [],
          newIntention: "",
          interestOptions: [],
          newInterest: "",
          logisticQuestions: [],
          logisticChanges: [],
          newLogistic: "",
          schoolOptions: [],
          schoolChanges: [],
          newSchool: "",
          techSkillOptions: [],
          techSkillChanges: [],
          newTechSkill: "",
          profSkillOptions: [],
          profSkillChanges: [],
          newProfSkill: "",
        }

        this.updateDB = this.updateDB.bind(this);
        this.postDB = this.postDB.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInterestEdit = this.handleInterestEdit.bind(this);
        this.handleNewInterest = this.handleNewInterest.bind(this);
        this.handleNewInterestSubmit = this.handleNewInterestSubmit.bind(this);
        this.handleIntentionEdit = this.handleIntentionEdit.bind(this);
        this.handleNewIntention = this.handleNewIntention.bind(this);
        this.handleNewIntentionSubmit = this.handleNewIntentionSubmit.bind(this);
        this.handleSchoolEdit = this.handleSchoolEdit.bind(this);
        this.handleNewSchool = this.handleNewSchool.bind(this);
        this.handleNewSchoolSubmit = this.handleNewSchoolSubmit.bind(this);
        this.handleLogisticEdit = this.handleLogisticEdit.bind(this);
        this.handleNewLogistic = this.handleNewLogistic.bind(this);
        this.handleNewLogisticSubmit = this.handleNewLogisticSubmit.bind(this);
        this.handleTechSkillEdit = this.handleTechSkillEdit.bind(this);
        this.handleNewTechSkill = this.handleNewTechSkill.bind(this);
        this.handleNewTechSkillSubmit = this.handleNewTechSkillSubmit.bind(this);
        this.handleProfSkillEdit = this.handleProfSkillEdit.bind(this);
        this.handleNewProfSkill = this.handleNewProfSkill.bind(this);
        this.handleNewProfSkillSubmit = this.handleNewProfSkillSubmit.bind(this);
    }

    async updateDB(question, api_name) {
      if (question.name  ===  "") {
        // delete api
        await axios.delete(process.env.REACT_APP_API_URL + ''+api_name+'/'+question.id+'/',
        {
          headers: {
            'content-type': 'application/json',
          },
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
      }
      else {
        // update api
        await axios.put(process.env.REACT_APP_API_URL + ''+api_name+'/'+question.id+'/', JSON.stringify(question),
        {
          headers: {
            'content-type': 'application/json',
          },
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
      }
    }

    async postDB(question, api_name) {

      // post to api
      await axios.post(process.env.REACT_APP_API_URL + ''+api_name+'/', JSON.stringify(question),
      {
        headers: {
          'content-type': 'application/json',
        },
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));

    }

    async handleSubmit() {
      this.setState({ submit_text: "Submitting..."});
      let {
        intentionOptions,
        intentionChanges,
        interestOptions,
        interestChanges,
        logisticQuestions,
        logisticChanges,
        schoolOptions,
        schoolChanges,
        techSkillOptions,
        techSkillChanges,
        profSkillOptions,
        profSkillChanges,
      } = this.state;
      // Update intentions already in db
      for (let i=0; i<intentionChanges.length; i++) {
        if (!intentionChanges[i])
          continue;
        let question = intentionOptions[i];
        await this.updateDB(question, "intentions")
      }
      //Put new intentions in db
      for (let i=intentionChanges.length; i<intentionOptions.length; i++) {
        let question = intentionOptions[i];
        if (question.name === "")
          continue;
        await this.postDB(question, "intentions")
      }

      for (let i=0; i<interestChanges.length; i++) {
        if (!interestChanges[i])
          continue;
        let question = interestOptions[i];
        await this.updateDB(question, "interests")
      }
      for (let i=interestChanges.length; i<interestOptions.length; i++) {
        let question = interestOptions[i];
        if (question.name === "")
          continue;
        await this.postDB(question, "interests")
      }

      for (let i=0; i<logisticChanges.length; i++) {
        if (!logisticChanges[i])
          continue;
        let question = logisticQuestions[i];
        await this.updateDB(question, "logistics")
      }
      for (let i=logisticChanges.length; i<logisticQuestions.length; i++) {
        let question = logisticQuestions[i];
        if (question.name === "")
          continue;
        await this.postDB(question, "logistics")
      }

      for (let i=0; i<schoolChanges.length; i++) {
        if (!schoolChanges[i])
          continue;
        let question = schoolOptions[i];
        await this.updateDB(question, "schools")
      }
      for (let i=schoolChanges.length; i<schoolOptions.length; i++) {
        let question = schoolOptions[i];
        if (question.name === "")
          continue;
        await this.postDB(question, "schools")
      }

      for (let i=0; i<techSkillChanges.length; i++) {
        if (!techSkillChanges[i])
          continue;
        let question = techSkillOptions[i];
        await this.updateDB(question, "tech-skills")
      }
      for (let i=techSkillChanges.length; i<techSkillOptions.length; i++) {
        let question = techSkillOptions[i];
        if (question.name === "")
          continue;
        await this.postDB(question, "tech-skills")
      }

      for (let i=0; i<profSkillChanges.length; i++) {
        if (!profSkillChanges[i])
          continue;
        let question = profSkillOptions[i];
        await this.updateDB(question, "prof-skills")
      }
      for (let i=profSkillChanges.length; i<profSkillOptions.length; i++) {
        let question = profSkillOptions[i];
        if (question.name === "")
          continue;
        await this.postDB(question, "prof-skills")
      }

      this.setState({
        submit_text: "",
        success_text: "Succesfully Uploaded"
      });

    }
    //post new questions

    async componentDidMount() {
        axios.get(process.env.REACT_APP_API_URL + 'intentions')
        .then(res => {
          console.log(res);
          this.setState({
            intentionOptions: res.data,
            intentionChanges: new Array(res.data.length),

          });
        })
        .catch(err => console.log(err));

       axios.get(process.env.REACT_APP_API_URL + 'interests')
        .then(res => {
          console.log(res);
          this.setState({
            interestOptions: res.data,
            interestChanges: new Array(res.data.length),
          });
        })
        .catch(err => console.log(err));

       axios.get(process.env.REACT_APP_API_URL + 'logistics')
        .then(res => {
          console.log(res);
          this.setState({
            logisticQuestions: res.data,
            logisticChanges: new Array(res.data.length),
          });
        })
        .catch(err => console.log(err));

       axios.get(process.env.REACT_APP_API_URL + 'schools')
        .then(res => {
          console.log(res);
          this.setState({
            schoolOptions: res.data,
            schoolChanges: new Array(res.data.length),
          });
        })
        .catch(err => console.log(err));

       axios.get(process.env.REACT_APP_API_URL + 'tech-skills')
        .then(res => {
          console.log(res);
          this.setState({
            techSkillOptions: res.data,
            techSkillChanges: new Array(res.data.length),
          });
        })
        .catch(err => console.log(err));

       axios.get(process.env.REACT_APP_API_URL + 'prof-skills')
        .then(res => {
          console.log(res);
          this.setState({
            profSkillOptions: res.data,
            profSkillChanges: new Array(res.data.length),
          });
        })
        .catch(err => console.log(err));
    }

    handleIntentionEdit(i, e) {
      let question = e.target.value;
      if (i < this.state.intentionChanges.length) {
        this.setState(update(this.state, {
         intentionChanges: {
           [i] : {
             $set: true
           }
         },
         intentionOptions: {
           [i] : {
             $set: {'name': question, 'id': this.state.intentionOptions[i].id}
           }
         },
        }));
      }
      else {
        this.setState(update(this.state, {
         intentionOptions: {
           [i] : {
             $set: {'name': question}
           }
         }
        }));
      }

      console.log(this.state.intentionChanges)
    }

    handleNewIntention(e) {
      let writtenText = e.target.value;
      this.setState({
        newIntention: writtenText,
      });
    }

    handleNewIntentionSubmit() {
      var joined = this.state.intentionOptions.concat({'name': this.state.newIntention});
      this.setState({
        intentionOptions: joined,
        newIntention: "",
      });
    }

    handleInterestEdit(i, e) {
      let question = e.target.value;
      if (i<this.state.interestChanges.length) {
        this.setState(update(this.state, {
         interestChanges: {
           [i] : {
             $set: true
           }
         },
         interestOptions: {
           [i] : {
             $set: {'name': question, 'id': this.state.interestOptions[i].id}
           }
         },
        }));
      }
      else {
        this.setState(update(this.state, {
         interestOptions: {
           [i] : {
             $set: {'name': question}
           }
         }
        }));
      }
    }

    handleNewInterest(e) {
      let writtenText = e.target.value;
      this.setState({
        newInterest: writtenText,
      });
    }

    handleNewInterestSubmit() {
      var joined = this.state.interestOptions.concat({'name': this.state.newInterest});
      this.setState({
        interestOptions: joined,
        newInterest: "",
      });
    }

    handleSchoolEdit(i, e) {
      let question = e.target.value;
      if (i<this.state.schoolChanges.length) {
        this.setState(update(this.state, {
         schoolChanges: {
           [i] : {
             $set: true
           }
         },
         schoolOptions: {
           [i] : {
             $set: {'name': question, 'id': this.state.schoolOptions[i].id}
           }
         },
        }));
      }
      else {
        this.setState(update(this.state, {
         schoolOptions: {
           [i] : {
             $set: {'name': question}
           }
         }
        }));
      }
    }

    handleNewSchool(e) {
      let writtenText = e.target.value;
      this.setState({
        newSchool: writtenText,
      });
    }

    handleNewSchoolSubmit() {
      var joined = this.state.schoolOptions.concat({'name': this.state.newSchool});
      this.setState({
        schoolOptions: joined,
        newSchool: "",
      });
    }

    handleLogisticEdit(i, e) {
      let question = e.target.value;
      if (i<this.state.logisticChanges.length) {
        this.setState(update(this.state, {
         logisticChanges: {
           [i] : {
             $set: true
           }
         },
         logisticQuestions: {
           [i] : {
             $set: {'name': question, 'id': this.state.logisticQuestions[i].id}
           }
         },
        }));
      }
      else {
        this.setState(update(this.state, {
         logisticQuestions: {
           [i] : {
             $set: {'name': question}
           }
         }
        }));
      }
    }

    handleNewLogistic(e) {
      let writtenText = e.target.value;
      this.setState({
        newLogistic: writtenText,
      });
    }

    handleNewLogisticSubmit() {
      var joined = this.state.logisticQuestions.concat({'name': this.state.newLogistic});
      this.setState({
        logisticQuestions: joined,
        newLogistic: "",
      });
    }

    handleTechSkillEdit(i, e) {
      let question = e.target.value;
      if (i<this.state.techSkillChanges.length) {
        this.setState(update(this.state, {
         techSkillChanges: {
           [i] : {
             $set: true
           }
         },
         techSkillOptions: {
           [i] : {
             $set: {'name': question, 'id': this.state.techSkillOptions[i].id}
           }
         }
        }));
      }
      else {
        this.setState(update(this.state, {
          techSkillOptions: {
            [i] : {
              $set: {'name': question}
            }
          }
        }));
      }
    }

    handleNewTechSkill(e) {
      let writtenText = e.target.value;
      this.setState({
        newTechSkill: writtenText,
      });
    }

    handleNewTechSkillSubmit() {
      var joined = this.state.techSkillOptions.concat({'name': this.state.newTechSkill});
      this.setState({
        techSkillOptions: joined,
        newTechSkill: "",
      });
    }

    handleProfSkillEdit(i, e) {
      let question = e.target.value;

      if (i<this.state.profSkillChanges.length) {
        this.setState(update(this.state, {
         profSkillChanges: {
           [i] : {
             $set: true
           }
         },
         profSkillOptions: {
           [i] : {
             $set: {'name': question, 'id': this.state.profSkillOptions[i].id}
           }
         }
        }));
      }
      else {
        this.setState(update(this.state, {
          profSkillOptions: {
            [i] : {
              $set: {'name': question}
            }
          }
        }));
      }
    }

    handleNewProfSkill(e) {
      let writtenText = e.target.value;
      this.setState({
        newProfSkill: writtenText,
      });
    }

    handleNewProfSkillSubmit() {
      var joined = this.state.profSkillOptions.concat({'name': this.state.newProfSkill});
      this.setState({
        profSkillOptions: joined,
        newProfSkill: "",
      });
    }

    render() {
      let hasMounted = false;
      let {intentionOptions, interestOptions, schoolOptions, logisticQuestions,
          techSkillOptions, profSkillOptions} = this.state;
      if ( intentionOptions.length && interestOptions.length && logisticQuestions.length &&
          schoolOptions.length && 
          techSkillOptions.length && profSkillOptions.length )
      {
          hasMounted = true;
      }
      let CurrentDisplay;
      if(!hasMounted) {
          CurrentDisplay =
              <div>
                  <LoadingAnimation/>;
              </div>
      } else {
          CurrentDisplay =
            <div className="surveyEditingPage">
              <h1>Survey Question Editing</h1>
              <h3>(Delete all text in intended box to delete a survey question)</h3>
              <br/>
              <br/>
              <br/>
              <p><b>Reasons to work on the project:</b></p>
              <div>
                {this.state.intentionOptions.map((option, index) => {
                  return(
                    <Form.Group key={index}>
                        <Form.Control as="textarea" value={option.name} onChange={this.handleIntentionEdit.bind(this, index)} rows="1"/>
                    </Form.Group>
                  )
                })}
                <Form.Group controlId="newInput">
                    <Form.Label>Enter new option here:</Form.Label>
                    <Form.Control as="textarea" value={this.state.newIntention} onChange={this.handleNewIntention} rows="1"/>
                </Form.Group>
                <Button onClick={this.handleNewIntentionSubmit} >Confirm New Option</Button>
                <br/>
                <br/>
                <br/>
              </div>
              <p><b>Interests:</b></p>
              <div>
                {this.state.interestOptions.map((option, index) => {
                  return(
                    <Form.Group key={index}>
                        <Form.Control as="textarea" value={option.name} onChange={this.handleInterestEdit.bind(this, index)} rows="1"/>
                    </Form.Group>
                  )
                })}
                <Form.Group controlId="newInput">
                    <Form.Label>Enter new option here:</Form.Label>
                    <Form.Control as="textarea" value={this.state.newInterest} onChange={this.handleNewInterest} rows="1"/>
                </Form.Group>
                <Button onClick={this.handleNewInterestSubmit} >Confirm New Option</Button>
                <br/>
                <br/>
                <br/>
              </div>
              <p><b>School Options:</b></p>
              <div>
                {this.state.schoolOptions.map((option, index) => {
                  return(
                    <Form.Group key={index}>
                        <Form.Control as="textarea" value={option.name} onChange={this.handleSchoolEdit.bind(this, index)} rows="1"/>
                    </Form.Group>
                  )
                })}
                <Form.Group controlId="newInput">
                    <Form.Label>Enter new option here:</Form.Label>
                    <Form.Control as="textarea" value={this.state.newSchool} onChange={this.handleNewSchool} rows="1"/>
                </Form.Group>
                <Button onClick={this.handleNewSchoolSubmit} >Confirm New Option</Button>
                <br/>
                <br/>
                <br/>
              </div>
              <p><b>Logistical Questions:</b></p>
              <div>
                {this.state.logisticQuestions.map((option, index) => {
                  return(
                    <Form.Group key={index}>
                        <Form.Control as="textarea" value={option.name} onChange={this.handleLogisticEdit.bind(this, index)} rows="1"/>
                    </Form.Group>
                  )
                })}
                <Form.Group controlId="newInput">
                    <Form.Label>Enter new option here:</Form.Label>
                    <Form.Control as="textarea" value={this.state.newLogistic} onChange={this.handleNewLogistic} rows="1"/>
                </Form.Group>
                <Button onClick={this.handleNewLogisticSubmit} >Confirm New Option</Button>
                <br/>
                <br/>
                <br/>
              </div>
              <p><b>Technical Skill Options:</b></p>
              <div>
                {this.state.techSkillOptions.map((option, index) => {
                  return(
                    <Form.Group key={index}>
                        <Form.Control as="textarea" value={option.name} onChange={this.handleTechSkillEdit.bind(this, index)} rows="1"/>
                    </Form.Group>
                  )
                })}
                <Form.Group controlId="newInput">
                    <Form.Label>Enter new option here:</Form.Label>
                    <Form.Control as="textarea" value={this.state.newTechSkill} onChange={this.handleNewTechSkill} rows="1"/>
                </Form.Group>
                <Button onClick={this.handleNewTechSkillSubmit} >Confirm New Option</Button>
                <br/>
                <br/>
                <br/>
              </div>
              <p><b>Professional Skill Options:</b></p>
              <div>
                {this.state.profSkillOptions.map((option, index) => {
                  return(
                    <Form.Group key={index}>
                        <Form.Control as="textarea" value={option.name} onChange={this.handleProfSkillEdit.bind(this, index)} rows="1"/>
                    </Form.Group>
                  )
                })}
                <Form.Group controlId="newInput">
                    <Form.Label>Enter new option here:</Form.Label>
                    <Form.Control as="textarea" value={this.state.newProfSkill} onChange={this.handleNewProfSkill} rows="1"/>
                </Form.Group>
                <Button onClick={this.handleNewProfSkillSubmit} >Confirm New Option</Button>
              </div>
              <br/>
              <br/>
              <br/>
              <p><b>Submit Survey Updates Here:</b></p>
              <Button onClick={this.handleSubmit}>Submit Updates</Button>
              <div className="submit_text">{this.state.submit_text}</div>
              <div className="success_text">{this.state.success_text}</div>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
             </div>
    }
    return (
      <div>
          <br/><br/>
          {CurrentDisplay}
      </div>
    );
  }

}
export default AdminSurveys;
