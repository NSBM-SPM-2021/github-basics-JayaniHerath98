import React from 'react';
import './table.css';

export default function CustomTable() {

    return (
        <>
        <div className="table-wrapper">
            <div className="table-title">
                <div className="row">
                    <div className="col-sm-6">
                        <h2>Sample Title</h2>
                    </div>
                    <div className="col-sm-6">
                        <div className="btn-group">
                            <label className="btn btn-info active">
                                <input type="radio" name="status" value="all" checked="cocked"/>
                            </label>
                            <label className="btn btn-success">
                                <input type="radio" name="status" value="all"/>
                            </label>
                            <label className="btn btn-danger">
                                <input type="radio" name="status" value="all"/>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="table table-striped table-hover">
                <thead>
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
                    <tr>
                        <td>1</td>
                        <td>07734353</td>
                        <td>Ishan</td>
                        <td>3554545445V</td>
                        <td>ACTIVE</td>
                        <td><button className="btn btn-success">APPROVE</button></td>
                    </tr>
                </tbody>
            </div>
        </div>

        </>
    )
}
