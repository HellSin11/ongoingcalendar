import React, {useContext} from 'react';
import {Context} from "../../index.tsx";
import cl from './MyProfile.module.scss'
import {useNavigate} from "react-router-dom";

const MyProfile = () => {
    const {store} = useContext(Context)

    const navigate = useNavigate()
    const logout = () => {
        store.logout();
        navigate('/login')
    }

    return (
        <div className={cl.container} style={{color: 'black'}}>
            <h1>{store.user.email}</h1>
            <h1>{store.user.fullName}</h1>
            <button onClick={logout} className={cl.logout}>LogOut</button>
        </div>
    );
};

export default MyProfile;