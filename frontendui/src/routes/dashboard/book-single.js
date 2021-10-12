import React, {useEffect, useState} from 'react';
import queryString from 'query-string';
import book_service from '../../services/books_service';
// import OrganizationsUserTable from '../../components/containers/tables/table-mat-organization-users';
import Loadder from '../../components/containers/loadder/loadder';
import { Card, CardContent, Divider } from '@material-ui/core';


const SingleBook = () => {
    const {id} = queryString.parse(window.location.search);
    const [selected, setSelected] = useState(null);
    const loadResource = async () => {
        console.debug(id);
        if(id){
            setSelected(await book_service.getBook(id));  
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
                                <small>Book Information</small>
                                <h4>{selected.name}</h4>
                                <p>{selected.description}</p>

                                <div className="card-body">
                                    <p>Category : <span>{selected.category}</span></p>
                                    <p>Author : <span>{selected.author}</span></p>
                                    <p>Publisher : <span>{selected.published}</span></p>
                                    <p>QTY : <span>{selected.qty||1}</span></p>
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

            {/* {
                selected?<OrganizationsUserTable organization={selected}/>:<></>
            }        */}
                    

        </>
    );
}

export default SingleBook;