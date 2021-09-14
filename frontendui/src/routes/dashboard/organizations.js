import React, { useEffect, useState } from 'react';
import { Route, Switch, NavLink, Link, useRouteMatch } from 'react-router-dom';
import SingleOrganization from './organization-singal';
import OrganizationsTable from '../../components/containers/tables/table-mat-organizations';

const Organizations = () => {
    const {path, url} = useRouteMatch();
    return (
        <>
                <Switch>
                    <Route path={path} exact component={OrganizationsTable}/>
                    <Route path={`${path}/organization`} exact component={SingleOrganization}/>
                </Switch>
                
            
        </>
    );
}

export default Organizations;