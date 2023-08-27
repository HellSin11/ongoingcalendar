import React from 'react';
import cl from './RegistrationWindow.module.scss'
import RegistrationForm from "../RegistrationForm/RegistrationForm";
const RegistrationWindow = () => {
    return (
        <div className={cl.window}>
            <RegistrationForm/>
        </div>
    );
};

export default RegistrationWindow;