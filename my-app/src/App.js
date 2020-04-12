import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Student from './pages/Student.js';
import Admin from './pages/Admin.js';
import Central from './pages/Central.js'
import CommunityOrg from './pages/CommunityOrg.js'
import About from './pages/About'
import StickNavbar from "./pages/StickyNavbar";
import StudentForm from './pages/StudentForm';
import Login from './pages/Login.js'
import CommunityForm from "./pages/CommunityForm";

class App extends Component {
  render(){
  return (
    <BrowserRouter>
    <Route path ='/' render={() => (<StickNavbar />)}/>
    <Route exact={true} path='/' render={() => (<Central />)}/>  
    <Route exact={true} path='/student' render={() => (<Student />)}/>
    <Route exact={true} path='/admin' render={() => (<Admin />)}/>
    <Route exact={true} path='/community' render={() => (<CommunityOrg />)}/>
    <Route exact={true} path='/about' render={() => (<About />)}/>
    <Route exact={true} path='/studentform' render={() => (<StudentForm />)}/>
    <Route exact={true} path='/communityform' render={() => (<CommunityForm/>)}/>
    <Route exact={true} path='/login' render={() => (<Login />)}/>

    </BrowserRouter>
  );
    }
}

export default App;
