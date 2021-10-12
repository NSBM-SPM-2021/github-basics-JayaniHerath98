import React, { useState } from 'react';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import CustomButton from '../../components/containers/main/buttons/button';
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
                <Link to={`${url}/books`}><CustomButton color="primary" text="Get Books" values={[{title: 'GO to Books'}]} onClick={()=>null}/></Link>
               


        </>
    );
}

export default Main;
