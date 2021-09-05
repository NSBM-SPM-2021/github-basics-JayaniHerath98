import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const NavBar = ({sidebarOpen, openSidebar}) => {

    return (
        <div className="navbar">
            <div className="nav-icon" onClick={()=>openSidebar()}>
                <i className="fa fa-bars"></i>
            </div>

            <div className="nav-left">
                <h4 className="font-secondary">REPORTING APP</h4>
                {/* <Link to="/map">MAIN</Link>
                <Link to="/map">MAP</Link>
                <Link to="/">INFORMATION</Link>
                <Link to="/">ORGANIZATIONS</Link> */}
            </div>

            <div className="nav-right">
                <a href="#"><i className="fa fa-search"></i></a>
                <a href="#"><i className="fa fa-user"></i></a>

                <div className="nav-user"></div>
            </div>

        </div>
    );

}

export default NavBar;
