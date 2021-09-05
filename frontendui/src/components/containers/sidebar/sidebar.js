import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import './sidebar.css';

const SideBar = ({showSideBar}) => {
    const {path, url} = useRouteMatch();
    const [sidebar, setSidebar] = useState(true);

    return (
        <div className={`sidebar ${sidebar?'sidebar-responsive':''}`}>
            
                <div className="sidebar-brand">
                    {/* <h4 className="font-special">ADMIN PANNEL</h4> */}
                    {/* <p className="font-secondary">Following menu conclude of options that will available for Organization admins and super admins.</p> */}
                </div>

                <div className="sidebar-menu">
                    <span className="menu-heading">Main</span>
                    <ul>
                        <li className="active"><Link to={url} ><span><i class="fas fa-shapes font-special"></i></span> <span>DASHBOARD</span></Link></li>
                        <li><Link to={`${url}/organizations`}><span><i class="far fa-building font-special"></i></span> <span>ORGANIZATIONS</span></Link></li>
                        <li><Link to={`${url}/users`}><span><i class="fas fa-users-cog font-special"></i></span> <span>SITE USERS</span></Link></li>
                        <li><Link to={`${url}/map`}><span><i class="fas fa-globe-asia font-special"></i></span> <span>MAP</span></Link></li>
                    </ul>
                    <span className="menu-heading">Site Settings</span>
                    <ul>
                        <li className="active"><a href="#" ><span><i class="fas fa-cogs font-special"></i></span> <span>SETTINGS</span></a></li>
                    </ul>
                </div>

                <div className="sidebar-footer">
                    <div className="sidebar-icon">
                        <i className="fa fa-chevron-circle-left font-special" id="sidebaricon" onClick={()=>setSidebar(!sidebar)}></i>
                        
                    </div>
                </div>
        </div>
    )
}

export default SideBar;

