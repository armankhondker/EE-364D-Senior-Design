import React, { Component } from 'react';
import Arman from '../assets/Arman_Profile_Pic.jpg'
import Josh from '../assets/Josh_Profile_Pic.jpg'
import Punit from '../assets/Punit_Profile_Pic.jpg'
import ThienSon from '../assets/ThienSon_Profile_Pic.jpg';
import Desiree from '../assets/Desiree_Profile_Pic.jpeg'
import '.././App.css';

class About extends Component {   s
    render() {
		return (
			<div className="App" align="center">
				<h1>About rgkconnectmatching.com</h1>
                <h2>Our Development Team:</h2>
				<ul>
				<p>Arman Khondker</p> 
				{ <img className="prof_pic" src={Arman} alt="Arman" /> }
					</ul>
               <ul> <p>Desiree Tang </p> 
			   { <img className="prof_pic" src={Desiree} alt="Desiree" /> }
			   </ul>
			   <ul><p>Punit Patel</p>
				{ <img className="prof_pic" src={Punit} alt="Punit" /> } 
				</ul>
				<ul> <p>Josh Papermaster</p>
				{ <img className="prof_pic" src={Josh} alt="Josh" /> }
				</ul>
                <ul> <p>Thienson Ho</p>
				{ <img className="prof_pic" src={ThienSon} alt="ThienSon" /> }
				</ul>
			</div>
			
		);
	}

}

export default About;