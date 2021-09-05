import React, {useEffect, useState} from 'react';
import queryString from 'query-string';
import organization_service from '../../services/organization_service';
import OrganizationsUserTable from '../../components/containers/tables/table-mat-organization-users';
import Loadder from '../../components/containers/loadder/loadder';
import { Card, CardContent, Divider } from '@material-ui/core';


const SingleOrganization = () => {
    const {id} = queryString.parse(window.location.search);
    const [selected, setSelected] = useState(null);
    const loadResource = async () => {
        if(id){
            setSelected(await organization_service.getOrganization(id));  
            console.log(selected); 
        }
           
    }
    useEffect(() => {
        loadResource();
        
    }, [])
    return (
        <>
            <Card>  
                <CardContent>
                    {
                        selected?
                        <div className="card-content ct-flex">
                            <div className="cont-left float-left">
                                <small>Organization Information</small>
                                <h4>{selected.name}</h4>
                                <p>{selected.description}</p>

                                <div className="card-body">
                                    <p>Address : <span>{selected.address}</span></p>
                                    <p>Contact : <span>{selected.contact}</span></p>
                                    <p>Incharge : <span>{selected.incharge}</span></p>
                                    <p>Incharge : <span>{selected.incharge}</span></p>
                                </div>
                            </div>
                            <div className="cont-right float-right">
                                <div className="container-im container-flex">
                                <i class="far fa-building font-special"></i>
                                </div>
                            </div>
                        </div>
                        
                        :

                        <Loadder/>
                    }
                        
                </CardContent>    
            </Card>
            <br></br>

            {
                selected?<OrganizationsUserTable organization={selected}/>:<></>
            }       
                    

        </>
    );
}

export default SingleOrganization;