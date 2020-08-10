import React, { Component } from 'react';

class navbar extends Component {
    render() {
        return (
            <div className="head">
                 <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/emp">Manage Employees</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Manage Menu
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/cat">Food Category</a>
                <a className="dropdown-item" href="/food">Food Item</a>
             
              </div>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="#">Reports</a>
            </li> */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Reports
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Sales Reports</a>
                <a className="dropdown-item" href="#">Estimation Reports</a>
                <a className="dropdown-item" href="#">Food Rating Reports</a>
                <a className="dropdown-item" href="#">Employee Rating Reports</a>
                
             
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/emp">Log Out</a>
            </li>
          </ul>
          
             </div>
            </nav>
         </div>
        );
    }
}

export default navbar;
