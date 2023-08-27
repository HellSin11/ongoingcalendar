import React from 'react';
import cl from "./InputAndLabel.module.scss";
import {observer} from "mobx-react-lite";

const InputAndLabel = ({iconClass, label, inputType, onChange, myStyle, isLable=true,...props}) => {
    return (
        <div className={cl.container}>
            {isLable && <div className={cl.container__title__label}>{label}</div>}
            <div className={cl.container__input}>
                <div className={cl.container__input__icon}>
                    <i className={iconClass} style={myStyle}></i>
                </div>
                <input onChange={onChange} type={inputType ?? "text"} {...props}/>
            </div>
        </div>
    );
};

export default observer(InputAndLabel);