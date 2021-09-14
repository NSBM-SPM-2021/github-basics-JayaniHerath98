import axios from 'axios';
// import Session from 'react-session-api';
// import EventEmitter from '../utils/EventEmitter';
import {handleErrors} from './error_handling';

// import Employee from '../models/Patient';


const path = "https://reporting-app-clab-test.herokuapp.com/v1/organizations";
var organizations_list = [];

class EmployeeService {

    async checkExistingUsers(username){
        await axios.get(`/users/byExistUsers/${username}`).then((response)=>{
            // console.log(response.data);
            if(response.data){
                console.log("User Exists!");

                // EventEmitter.emit("userexist", {exist: true});

            } else {
                console.log("User Not Existed");
            }
        }).catch(handleErrors);

    }

    async getOrganizations(){
        organizations_list = [];
        await axios.get(path).then((response)=>{
            response.data.forEach(doc=>{
                organizations_list.push(doc);
            });
            console.log(organizations_list)
        }).catch(handleErrors);
        return organizations_list;
    }

    async getOrganization(id){
        var obj = null;
        await axios.get(`${path}/${id}`).then((response)=>{
            obj =  response.data;
        }).catch(handleErrors);
        return obj;
    }

    async addOrganization(organization){
        await axios.post(path, organization).then((response)=>{
        }).catch(handleErrors);
        alert("Organization Entered");
    }

    async updateOrganization(id, org){
        await axios.patch(`${path}/${id}`, org).then((response)=>{
        }).catch(handleErrors);
        alert("Selected Organization Updated");
    }

    async deleteOrganization(id){
        console.log("Ddeleted launch");
        await axios.delete(`${path}/${id}`).then((response)=>{
        }).catch(handleErrors);
        alert("Selected Organization Removed");
    }    
}

export default new EmployeeService();