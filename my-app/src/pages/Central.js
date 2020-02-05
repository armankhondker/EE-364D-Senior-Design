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

				</body>
			</div>
		);
	}
}

export default withRouter(Central);