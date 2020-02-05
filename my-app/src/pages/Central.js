import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Logo from '../assets/RGB_formal_RGK.png'



class Central extends Component {

	render() {
		return (
			<div>
				<body className="App">
					<br></br>
				 <img  className="logo" src={Logo} alt="Logo" />
					<br></br>
					<br></br>
                    <br></br>

					<div>
      <h2 ><b>CONNECT Program Overview</b></h2>
<p class="rteindent4">Central Texas organizations have big challenges to tackle. Graduate students are among the people in our Central Texas community that have the skills organizations need to solve these problems.&nbsp; CONNECT is a way&nbsp;to bring these groups together. Our hope is that this effort will continue to grow and make a contribution toward solving complex community challenges.&nbsp;</p>
<br></br>
<p class="rteindent4">CONNECT is a platform focused on connecting organizations in the community who have a data, evaluation, or measurement - related project to tackle with graduate students from the LBJ School of Public Affairs, the RGK Center's Portfolio Program in Nonprofit Studies,and other graduate degree programs. The program matches organizations that have scoped a project with graduate students looking for applied and practical experience in the social and/or public sector.&nbsp; &nbsp;</p>
<br></br>
<p class="rteindent4">For additional information, take a look at our FAQs for <strong><a href="https://rgkcenter.org/connect-frequently-asked-questions-community-organizations">community organizations</a></strong> and <strong><a href="https://rgkcenter.org/connect-frequently-asked-questions-graduate-students">graduate students</a></strong>, or view our <strong><a href="https://rgkcenter.org/connect-project-library">project library</a></strong>.</p>
  </div>
				</body>
			</div>
		);
	}
}

export default withRouter(Central);