import React, { Component } from 'react';
import Arman from '../assets/Arman_Profile_Pic.jpg'
import Josh from '../assets/Josh_Profile_Pic.jpg'
import Punit from '../assets/Punit_Profile_Pic.jpg'
import ThienSon from '../assets/ThienSon_Profile_Pic.jpg';
import Desiree from '../assets/Desiree_Profile_Pic.jpeg'
import '.././About.css';

class About extends Component {  
    render() {
		return (
			<div className="About">
				<br></br>
				<br></br>
				<br></br>
				<h1>Purpose</h1>
				<p className="paragraphleft">RGK Connect Matching is a web application to display the matchings between students and organizations for the LBJ School Connect Program. </p>

                <h1>Our Development Team</h1>
				<ul>
				<p className="paragraphleft"><b>Arman Khondker</b></p> 
				{ <img className="prof_pic" src={Arman} alt="Arman" /> }
				<br></br>
               Bio: A senior Computer Engineering student with technical cores in Software Engineering and Academic enrichment
               <br></br>
               Major: Electrical and Computer Engineering
               <br></br>
			   Responsibilites: Front End Development Lead
               <br></br>
					</ul>
			
               <ul><p className="paragraphleft"><b>Desiree Tang</b></p> 
			   { <img className="prof_pic" src={Desiree} alt="Desiree" /> }
			   <br></br>
               Bio: A senior Computer Engineering student with technical cores in Software Engineering and Academic enrichment
               <br></br>
               Major: Electrical and Computer Engineering
               <br></br>
			   Responsibilites: Project Lead
               <br></br>
			   </ul>

				<ul> <p className="paragraphleft"><b>Josh Papermaster</b></p>
				{ <img className="prof_pic" src={Josh} alt="Josh" /> }
				<br></br>
               Bio: A senior Computer Engineering student with technical cores in Software Engineering and Academic enrichment
               <br></br>
               Major: Electrical and Computer Engineering
               <br></br>
			   Responsibilites: Algorithm Development Lead
               <br></br>
				</ul>

			   <ul><p className="paragraphleft"><b>Punit Patel</b></p>
				{ <img className="prof_pic" src={Punit} alt="Punit" /> } 
				<br></br>
               Bio: A senior Computer Engineering student with technical cores in Software Engineering and Academic enrichment
               <br></br>
               Major: Electrical and Computer Engineering
               <br></br>
			   Responsibilites: Report Lead
               <br></br>
				</ul>

             <ul> <p className="paragraphleft"><b>Thienson Ho</b></p>
				{ <img className="prof_pic" src={ThienSon} alt="ThienSon" /> }
				<br></br>
               Bio: A senior Computer Engineering student with technical cores in Software Engineering and Academic enrichment
               <br></br>
               Major: Electrical and Computer Engineering
               <br></br>
			   Responsibilites: Back End Development Lead
               <br></br>
				</ul>
			</div>
			
		);
	}

}

export default About;