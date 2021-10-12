import React, { useEffect } from 'react';
import { Route, Switch, NavLink, Link, useRouteMatch } from 'react-router-dom';
import BooksTable from '../../components/containers/tables/table-mat-books';
import SingleBook from './book-single';
const Books = () => {
    const {path, url} = useRouteMatch();
    return (
        <>
                {/* <div className="container-header">
                    <h2>Users </h2>
                    <p>Dashboard consist of necessary settings for admins and paticular management roles.</p>
                </div> */}

                {/* <BooksTable /> */}
                <Switch>
                    <Route path={path} exact component={BooksTable}/>
                    <Route path={`${path}/book`} exact component={SingleBook}/>
                </Switch>
        </>
    );
}

export default Books;
