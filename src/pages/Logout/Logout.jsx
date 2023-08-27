import React, {useContext} from 'react';
import {Context} from "../../index.tsx";
import {useNavigate} from "react-router-dom";

const Logout = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();
    store.logout();
    setTimeout(() => {
        navigate('/login')
    }, 1);
    return (
        <div></div>
    );
    }



export default Logout;