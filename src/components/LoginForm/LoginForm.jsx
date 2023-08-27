import React, {useCallback, useContext, useState} from 'react';
import InputAndLabel from "../InputAndLabel/InputAndLabel";
import {Context} from "../../index.tsx";
import cl from './LoginForm.module.scss'
import {observer} from "mobx-react-lite";
import {Link, useNavigate} from "react-router-dom";
import useInput from "../../hooks/useInput.jsx";

const LoginForm = () => {
    const {store} = useContext(Context)
    const navigate = useNavigate();
    const login = useCallback(async (e) => {
        e.preventDefault();
        try {
            await store.login(emailValidation.value, passwordValidation.value);
            navigate('/');
        } catch (e) {
            store.currentError = e.response.status;
            console.log(e.message);
        }}, []);


    const emailValidation = useInput("", {isEmpty: true, minLength: 3, maxLength: 35, isEmail: true});
    const passwordValidation = useInput("", {isEmpty: true, minLength: 8, maxLength: 20});
    const isValid = !(passwordValidation.inputValid && emailValidation.inputValid);

    return (
        <div className={cl.form}>
            <div className={cl.login__form}>
                <InputAndLabel onChange={e => emailValidation.onChange(e)} onBlur={e => emailValidation.onBlur(e)}
                               value={emailValidation.value} label='Email Address' iconClass='fa-solid fa-envelope' inputType='email'
                               autoComplete="username"/>                {(emailValidation.isDirty && emailValidation.isEmpty) && <div className={cl.error} >{emailValidation.isEmptyMessage}</div>}
                {(emailValidation.isDirty && (emailValidation.minLengthError || emailValidation.maxLengthError)) &&
                    <div className={cl.error} >{emailValidation.lengthErrorMessage}</div>}
                {(emailValidation.isDirty && emailValidation.isEmailError) && <div className={cl.error} >{emailValidation.isEmailErrorMessage}</div>}

                <InputAndLabel onChange={e => passwordValidation.onChange(e)} onBlur={e => passwordValidation.onBlur(e)}
                               value={passwordValidation.value} label='Password' iconClass='fa-solid fa-key' inputType='password'
                               autoComplete='new-password'/>                {(passwordValidation.isDirty && passwordValidation.isEmpty) && <div className={cl.error} >{passwordValidation.isEmptyMessage}</div>}
                {(passwordValidation.isDirty && (passwordValidation.minLengthError || passwordValidation.maxLengthError)) &&
                    <div className={cl.error} >{passwordValidation.lengthErrorMessage}</div>}

                {store.currentError === 400 && <div className={cl.errorLog}>Не вірний логін або пароль</div>}

                <div className={cl.container__login}>
                    <button disabled={isValid} className={!isValid ? cl.login : cl.disable} onClick={e => login(e)}>
                        Login
                    </button>
                </div>
                <span className={cl.registration}>Don't have an account?<br/>
                    <Link to='/registration'>Registration</Link>
                </span>
            </div>
        </div>
    );
};

export default observer(LoginForm);