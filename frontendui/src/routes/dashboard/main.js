import React, { useState } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Chips from '../../components/containers/chips/chips';
import SampleTable from '../../components/containers/tables/table-mat-books';
import Loadder from '../../components/containers/loadder/loadder';
function Main(){
    let { path, url } = useRouteMatch();
    const [sidenav, setSideNav] = useState(true);

    const showSideNav = () => {
        setSideNav(!sidenav);
    }
    return (
        <>
                
                <div className="container-header">
                    <h2>Library Summary </h2>
                </div>

                <SampleTable/>


        </>
    );
}

export default Main;
