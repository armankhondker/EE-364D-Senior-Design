import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Logo from '../assets/RGB_formal_RGK.png'
import ImgButton from "../components/ImgButton";
import Admin from "../assets/AdminIcon.png"; 
import Org from "../assets/OrganizationIcon.png";
import Student from "../assets/StudentIcon.png";
import '../components/ImgButton.css';

class Central extends Component {

	render() {
		return (
			<div>
				<body className="App">
					<br></br>
				 <img  className="logo" src={Logo} alt="Logo" />
					<br></br>
					<br></br>
					<div>
						<ImgButton image = {Admin} label = "Admin" path ="admin"></ImgButton>
						<ImgButton image = {Org} label= "Organizations" path="community"></ImgButton>
						<ImgButton image = {Student} label ="Students" path="student"></ImgButton>
					</div>

				</body>
			</div>
		);
	}
}

export default withRouter(Central);