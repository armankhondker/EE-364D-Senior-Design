import React, { Component } from 'react';

class HomeLinks extends Component {

    render() {
        return (
        <div>
            <h2>Options</h2>
            <ul>
                <li>
                    <a 
                        className="student"
                        href="student"
                        rel="noopener noreferrer"
                    >
                        Students
                    </a>
                </li>
                <li>
                    <a 
                        className="community"
                        href="community"
                        rel="noopener noreferrer"
                    >
                        Community Organizations
                    </a>
                </li>
                <li>
                    <a 
                        className="Admin"
                        href="admin"
                        rel="noopener noreferrer"
                    >
                        Admins
                    </a>
                </li>
                <li>
                    <a 
                        className="About"
                        href="about"
                        rel="noopener noreferrer"
                    >
                        About
                    </a>
                </li>
               
            </ul>
        </div>
        );
    }
}

export default HomeLinks;