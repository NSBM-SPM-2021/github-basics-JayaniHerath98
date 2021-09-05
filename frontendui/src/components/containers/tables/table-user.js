import React from 'react';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import './table.css';
import CustomButton from '../main/buttons/button';


const UserTable = ({data}) => {
    return (
        <div className="container-table">
            <div className="ct-table-heading">
            <CustomButton text={"CREATE"}/>
            </div>
            <div className="table-body">
                <table class="table table-striped table-hover">
                    <thead class="thead-custom">
                        <tr>
                        <th scope="col"><ArrowDownward/><ArrowUpward/></th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        </tr>
                        <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        </tr>
                        <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}



export default UserTable;