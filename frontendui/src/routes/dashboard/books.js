import React, { useEffect } from 'react';
import BooksTable from '../../components/containers/tables/table-mat-books';
const Books = () => {
   
    return (
        <>
                {/* <div className="container-header">
                    <h2>Users </h2>
                    <p>Dashboard consist of necessary settings for admins and paticular management roles.</p>
                </div> */}

                <BooksTable />
        </>
    );
}

export default Books;
