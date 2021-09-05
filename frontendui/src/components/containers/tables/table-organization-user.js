import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import officials_service from '../../../services/officials_service';
import organization_service from '../../../services/organization_service';
import './table.css';

const OrganizationsUserTable = (props) => {
    const { path, url } = useRouteMatch();
    const [officials, setOfficials] = useState([]);
    const [approved, setApproved] = useState([]);
    const [type, setType] = useState("ASSIGNED");

    const getOfficials = async () => {
        setOfficials(await officials_service.getOfficials());
        // await officials_service.getOfficials().then((users)=>{
        //     users.forEach((user)=>{

        //     })
        // });
        // setOfficials(await officials_service.getOfficials());
    }
    const getAssigned = async () => {
        setApproved(props.organization.officials);
        console.log(props.organization.officials);
        // setOfficials(await officials_service.getOfficials());
    }

    const assignOfficial = (id, user, organization) => {
        organization.officials.push({contact:id, name: user});
        organization_service.updateOrganization(organization.id, organization);
    }

    const rejectOfficial = (id, user, organization) => {
        organization.officials.push({contact:id, name: user});
        organization_service.updateOrganization(organization.id, organization);
    }

    const changeTable = (type) => {
        setType(type);
    }

    // const deleteOrganization = async (id) => {
    //     // setOrganizations(await organization_service.getOrganization(id))
    // }

    // const updateOrganizationStatus = async (id, organization, status) => {
    //     organization.status = status;
    //     setOrganizations(await organization_service.updateOrganization(id, organization))
    // }
    useEffect(() => {
        getAssigned();
        getOfficials();
        console.log(officials);
        return () => {
            
        }
    }, []);
    
    return (
        <div className="card">
            {
                type==="ASSIGNED"?
                <div className="container-table">
                    <div className="table-heading">
                        <h2>Allocated Users</h2>
                        <p>Dashboard consist of necessary settings for admins and paticular management roles.</p>
                        <button className="btn btn-primary" onClick={()=>changeTable("ASSIGNED")}>ASSIGNED USERS</button>|
                        <button className="btn btn-warning" onClick={()=>changeTable("ALL")}>PENDING USERS</button>
                    </div>
                    <br></br>
                    <div className="table-body">
                        <table class="table">
                            <thead class="thead-dark">
                                <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Contact</th>
                                <th scope="col">Name</th>
                                <th scope="col">Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    approved&&approved.length>0?
                                    approved.map((user)=>
                                    <tr key={user.contactno}>
                                        <th scope="row">1</th>
                                        <td>{user.contact}</td>
                                        <td>{user.name}</td>
                                        <th scope="col">
                                            <button className="btn btn-info">VIEW</button>|
                                            <button className="btn btn-danger" onClick={()=>console.log("REMOVE")}>REJECT</button>
                                        </th>
                                    </tr>
                                        )
                                        :
                                    <></>
                                }
                                
                            </tbody>
                        </table>
                    </div>
                </div>
                :
                <div className="container-table">
                    <div className="table-heading">
                        <h2>All Users</h2>
                        <p>Dashboard consist of necessary settings for admins and paticular management roles.</p>
                        <button className="btn btn-primary" onClick={()=>changeTable("ASSIGNED")}>ASSIGNED USERS</button>|
                        <button className="btn btn-warning" onClick={()=>changeTable("ALL")}>PENDING USERS</button>
                    </div>
                    <br></br>
                    <div className="table-body">
                        <table class="table">
                            <thead class="thead-dark">
                                <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Contact</th>
                                <th scope="col">Name</th>
                                <th scope="col">NIC No.</th>
                                <th scope="col">Status</th>
                                <th scope="col">Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    officials&&officials.length>0?
                                    officials.map((user)=>
                                    <tr key={user.contactno}>
                                        <th scope="row">1</th>
                                        <td>{user.contactno}</td>
                                        <td>{user.username}</td>
                                        <td>{user.nic}</td>
                                        <th scope="col">{user.status}</th>
                                        <th scope="col">
                                            <button className="btn btn-success" 
                                            onClick={()=>assignOfficial(user.contactno, user.username, props.organization)}>ASSIGN</button>| 
                                            <button className="btn btn-info">VIEW</button>
                                        </th>
                                    </tr>
                                        )
                                        :
                                    <></>
                                }
                                
                            </tbody>
                        </table>
                    </div>
                </div>

            }
        
        </div>
    );
}


export default OrganizationsUserTable;