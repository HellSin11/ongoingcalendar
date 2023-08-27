import React from 'react';
import cl from './ButtonValid.module.scss'
const ButtonValid = ({isValid}, props) => {
    return (
        <div className={cl.container}>
            <button disabled={!isValid} className={isValid ? cl.create : cl.disable} {...props}>
                Додати онгоінг
            </button>
        </div>
    );
};

export default ButtonValid;