import React, { useEffect, useState } from 'react';
import EventEmitter from '../../utils/EventEmitter';
import { Route, Switch, NavLink, Link, useRouteMatch } from 'react-router-dom';
import SingleOrganization from './organization-singal';
import OrganizationsTable from '../../components/containers/tables/table-mat-organizations';

const Organizations = () => {
    const {path, url} = useRouteMatch();
    return (
        <>
                {/* <div className="container-header">
                    <h2>Organization</h2>
                    <p>Dashboard consist of necessary settings for admins and paticular management roles.</p>
                </div> */}


                <Switch>
                    <Route path={path} exact component={OrganizationsTable}/>
                    <Route path={`${path}/organization`} exact component={SingleOrganization}/>
                </Switch>
                
            
        </>
    );
}

export default Organizations;