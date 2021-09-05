import React, { useEffect, useState } from 'react';
import officials_service from '../../../services/officials_service';
import './table.css';

const UsersTable = ({data, category}) => {

    const [users, setUsers] = useState([]);
    const [approvedUsers, setApprovedUsers] = useState([]);
    const [notapprovedUsers, setNotApprovedUsers] = useState([]);
    const [blockedUsers, setBlockedUsers] = useState([]);
    const [type, setType] = useState('NOT APPROVED');

    const getUsers = async (cat) => {
        // setUsers();
        await officials_service.getOfficials(cat).then((users)=>{
            setUsers(users);
            users.forEach((user)=>{
                if(user.status==='APPROVED'){
                    console.log("APPROVED");
                    setApprovedUsers(approvedUsers=>[...approvedUsers, user]);
                } else if(user.status==='NOT APPROVED'){
                    console.log("NOT APPROVED");
                    setNotApprovedUsers(notapprovedUsers=>[...notapprovedUsers, user]);
                } else if(user.status==='BLOCKED'){
                    console.log("BLOCKED");
                    setBlockedUsers(blockedUsers=>[...blockedUsers, user]);
                }
            });
        }).then(()=>filterUsers(users));
        
    }

    const filterUsers = async (users) => {
        await users.forEach((user)=>{
            if(user.status==='APPROVED'){
                approvedUsers.push(user);
                console.log(approvedUsers);
            } else if(user.status==='NOT APPROVED'){
                notapprovedUsers.push(user);
            } else if(user.status==='BLOCKED'){
                blockedUsers.push(user);
            }
        });

        
        // console.log(notapprovedUsers);   
        // console.log(blockedUsers); 
    }

    const deleteUser = async (id) => {
        // setUsers(await officials_service.deleteOfficial(id))
        await officials_service.deleteOfficial(id)
    }

    const updateUserStatus = async (id, user, status) => {
        user.status = status;
        // setUsers(await officials_service.updateOfficial(id, user))
        await officials_service.updateOfficial(id, user);
    }
    useEffect(() => {
        
        getUsers();
        console.log(users);
        return () => {
            
        }
    }, []);
    
    return (
        <div className="container-table">
            <div className="table-heading">
                <h2>Users Stats</h2>
                <p>Dashboard consist of necessary settings for admins and paticular management roles.</p>
                <button className="btn btn-primary" onClick={()=>setType('APPROVED')}>APPROVED USERS</button>|
                <button className="btn btn-warning" onClick={()=>setType('NOT APPROVED')}>PENDING USERS</button>|
                <button className="btn btn-danger" onClick={()=>setType('DISABLE')}>BLOCKED USERS</button>|
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
                            type==='NOT APPROVED'&&notapprovedUsers&&notapprovedUsers.length>0?
                            notapprovedUsers.map((user)=>
                            <tr key={user.contactno}>
                                <th scope="row">1</th>
                                <td>{user.contactno}</td>
                                <td>{user.username}</td>
                                <td>{user.nic}</td>
                                <th scope="col">{user.status}</th>
                                <th scope="col">
                                    <button className="btn btn-success" onClick={
                                        ()=>{
                                            updateUserStatus(user.contactno, user, "APPROVED"); 
                                            setNotApprovedUsers(notapprovedUsers.filter(item => item.contactno !== user.contactno)); 
                                            setApprovedUsers(approvedUsers=>[...approvedUsers, user]);
                                        }}
                                        >ACCEPT</button>| 
                                    <button className="btn btn-info">VIEW</button>|
                                    <button className="btn btn-danger" onClick={
                                        ()=>{
                                            deleteUser(user.contactno);
                                            setNotApprovedUsers(notapprovedUsers.filter(item => item.contactno !== user.contactno));
                                        }}
                                        >REMOVE</button>
                                </th>
                            </tr>
                                )
                                :

                            type==='APPROVED'&&approvedUsers&&approvedUsers.length>0?
                            approvedUsers.map((user)=>
                            <tr key={user.contactno}>
                                <th scope="row">1</th>
                                <td>{user.contactno}</td>
                                <td>{user.username}</td>
                                <td>{user.nic}</td>
                                <th scope="col">{user.status}</th>
                                <th scope="col">
                                    <button className="btn btn-info">VIEW</button>|
                                    <button className="btn btn-warning" onClick={
                                        ()=>{
                                            updateUserStatus(user.contactno, user, "DISABLE"); 
                                            setApprovedUsers(approvedUsers.filter(item => item.contactno !== user.contactno));
                                            setBlockedUsers(approvedUsers=>[...approvedUsers, user]);
                                        }
                                    }
                                    >BLOCK</button>|
                                    <button className="btn btn-danger" onClick={
                                        ()=>{
                                            deleteUser(user.contactno);
                                            setApprovedUsers(approvedUsers.filter(item => item.contactno !== user.contactno));
                                        }}
                                    >REMOVE</button>
                                </th>
                            </tr>
                                )
                                :

                            type==='DISABLE'&&blockedUsers&&blockedUsers.length>0?
                            blockedUsers.map((user)=>
                            <tr key={user.contactno}>
                                <th scope="row">1</th>
                                <td>{user.contactno}</td>
                                <td>{user.username}</td>
                                <td>{user.nic}</td>
                                <th scope="col">{user.status}</th>
                                <th scope="col">
                                    <button className="btn btn-success" onClick={
                                        ()=>{
                                            updateUserStatus(user.contactno, user, "APPROVED");
                                            setBlockedUsers(blockedUsers.filter(item => item.contactno !== user.contactno));
                                            setApprovedUsers(approvedUsers=>[...approvedUsers, user]);
                                    }}
                                    >UNBLOCK</button>| 
                                    <button className="btn btn-info">VIEW</button>|
                                    <button className="btn btn-danger" onClick={
                                        ()=>{
                                            deleteUser(user.contactno);
                                            setBlockedUsers(blockedUsers.filter(item => item.contactno !== user.contactno));
                                    }}
                                    >REMOVE</button>
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
    );
}


export default UsersTable;