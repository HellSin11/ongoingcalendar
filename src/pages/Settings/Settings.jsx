import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {Context} from "../../index.tsx";



const Settings = () => {

    const {store} = useContext(Context)

    return (
        <div style={{color: 'black'}}>
            Page - Settings. Soon...
            <Link to='/'>Go home</Link>
            <h1>{store.isAuth ? 'AUTH' : "NOT AUTH"}</h1>
        </div>
    );
};

export default Settings;