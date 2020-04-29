import React, { Component } from 'react';
import Arman from '../assets/Arman_Profile_Pic.JPG'
import Josh from '../assets/Josh_Profile_Pic.jpg'
import Punit from '../assets/Punit_Profile_Pic.jpg'
import ThienSon from '../assets/ThienSon_Profile_Pic.jpg';
import Desiree from '../assets/Desiree_Profile_Pic.jpeg'
import Patrick from '../assets/Patrick.png'
import Moira from '../assets/Moira.png'
import Alyssa from '../assets/Alyssa.png'
import '.././About.css';

class About extends Component {  
    render() {
		return (
			<div className="About">
				<br></br>
				<br></br>
				<br></br>
    
                    <h1>Purpose</h1>
            
  
                    <p className="paragraphleft">RGK Connect Matching is a web application designed to display the
                        matchings between students and organizations for the LBJ School's CONNECT Program. </p>

                    <h1>The Development Team</h1>
 
				<ul>
				<p className="paragraphleft"><b>Arman Khondker</b></p> 
				{ <img className="prof_pic" src={Arman} alt="Arman" /> }
				<br></br>
               Bio: A senior Computer Engineering student with technical cores in Software Engineering and Academic Enrichment
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
               Bio: A senior Computer Engineering student with technical cores in Software Engineering and Academic Enrichment
               <br></br>
               Major: Electrical and Computer Engineering
               <br></br>
			   Responsibilites: Algorithm Development Lead
               <br></br>
				</ul>

			   <ul><p className="paragraphleft"><b>Punit Patel</b></p>
				{ <img className="prof_pic" src={Punit} alt="Punit" /> } 
				<br></br>
               Bio: A senior Computer Engineering student with technical cores in Software Engineering and Academic Enrichment
               <br></br>
               Major: Electrical and Computer Engineering
               <br></br>
			   Responsibilites: Report Lead
               <br></br>
				</ul>

             <ul> <p className="paragraphleft"><b>Thienson Ho</b></p>
				{ <img className="prof_pic" src={ThienSon} alt="ThienSon" /> }
				<br></br>
               Bio: A senior Computer Engineering student with technical cores in Software Engineering and Academic Enrichment
               <br></br>
               Major: Electrical and Computer Engineering
               <br></br>
			   Responsibilites: Back End Development Lead
               <br></br>
				</ul>
                
                    <h1>The RGK Staff</h1>

                <ul>
                    <p className="paragraphleft"><b>Dr. Patrick Bixler</b></p>
                    { <img className="prof_pic" src={Patrick} alt="Patrick" /> }
                    <br></br>
                    Patrick is an Assistant Professor of Practice at the RGK Center for Philanthropy and Community
                    Service. His fields of interest include public policy, public administration, governance,
                    organizational theory, nonprofit and philanthropy studies, network science and sustainability
                    science. His current research focuses on the collaboration of public, private and nonprofit
                    institutions to solve complex social and environmental problems and promote social innovation. He
                    has an ongoing interest in sustainability and environmental policy and leads the Austin Area
                    Sustainability Indicators project. He is also a faculty team member of Planet Texas 2050,
                    a campus-wide research initiative.
                </ul>

                <ul>
                    <p className="paragraphleft"><b>Moira Porter</b></p>
                    { <img className="prof_pic" src={Moira} alt="Moira" /> }
                    <br></br>
                    Moira is the Associate Director of the RGK Center for Philanthropy and Community Service. She
                    coordinates education programs and initiatives for the RGK Center as well as manages the Nonprofit
                    Studies Portfolio for graduate students at UT Austin, the Meadows Social Enterprise Fellows program
                    of student consulting projects with NGOs in Latin America, and the Summer PhD Fellowship Program to
                    foster the next generation of civil society scholars. Moira also develops executive education
                    training to connect the expertise of the RGK Center with practitioners in the nonprofit sector.
                </ul>

                <ul>
                    <p className="paragraphleft"><b>Alyssa Studer</b></p>
                    { <img className="prof_pic" src={Alyssa} alt="Alyssa" /> }
                    <br></br>
                    Alyssa is the Senior Student Program Coordinator for the CONNECT program. She runs daily operations
                    for the program, including working with community organizations to scope their projects, student
                    recruitment, and overseeing progress of each project.
                </ul>
			</div>
			
		);
	}

}

export default About;