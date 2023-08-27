import React, {useContext, useState} from 'react';
import InputAndLabel from "../InputAndLabel/InputAndLabel";
import cl from "../RegistrationInputs/RegistrationInputs.module.scss";
import useInput from "../../hooks/useInput";
import {Link} from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import {Context} from "../../index.tsx";


const RegistrationInputs = () => {

    const fullName = useInput("", {isEmpty: true, minLength: 3, maxLength: 35});
    const email = useInput("", {isEmpty: true, minLength: 3, maxLength: 35, isEmail: true});
    const password = useInput("", {isEmpty: true, minLength: 8, maxLength: 20});
    const newPassword = useInput("", {isEqual: password.value, isEmpty: true, minLength: 8, maxLength: 20})
    const [checkedTerms, setCheckedTerms] = useState(false);
    const {store} = useContext(Context)
    const [regError, setRegError] = useState(null)
    const [regSuccess, setRegSuccess] = useState(null)
    const navigate = useNavigate();
    const isValid = !(fullName.inputValid && password.inputValid && email.inputValid &&
        newPassword.inputValid && checkedTerms);

    const sendPostDataRegistration = async (e) => {
        e.preventDefault();
        try {
            const msg = await store.registration(fullName.value, email.value, password.value);
            if (msg !== 'Реєстрація пройшла успішно') {
                setRegError(msg);
            } else {
                setRegSuccess(msg)
                store.setCurrentError(0)
                setTimeout(() => {
                    navigate('/');
                }, 1500)
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <InputAndLabel onChange={e => fullName.onChange(e)} onBlur={e => fullName.onBlur(e)}
                           value={fullName.value} label='Full Name' iconClass='fa-solid fa-user'/>
            {(fullName.isDirty && fullName.isEmpty) && <div className={cl.error} >{fullName.isEmptyMessage}</div>}
            {(fullName.isDirty && (fullName.minLengthError || fullName.maxLengthError)) &&
                <div className={cl.error} >{fullName.lengthErrorMessage}</div>}

            <InputAndLabel onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)}
                           value={email.value} label='Email Address' iconClass='fa-solid fa-envelope' inputType='email'
                           autoComplete="username"/>
            {(email.isDirty && email.isEmpty) && <div className={cl.error} >{email.isEmptyMessage}</div>}
            {(email.isDirty && (email.minLengthError || email.maxLengthError)) &&
                <div className={cl.error} >{email.lengthErrorMessage}</div>}
            {(email.isDirty && email.isEmailError) && <div className={cl.error} >{email.isEmailErrorMessage}</div>}

            <InputAndLabel onChange={e => password.onChange(e)} onBlur={e => password.onBlur(e)}
                           value={password.value} label='Password' iconClass='fa-solid fa-key' inputType='password'
                           autoComplete='new-password'/>
            {(password.isDirty && password.isEmpty) && <div className={cl.error} >{password.isEmptyMessage}</div>}
            {(password.isDirty && (password.minLengthError || password.maxLengthError)) &&
                <div className={cl.error} >{password.lengthErrorMessage}</div>}

            <InputAndLabel label='Confirm Password' iconClass='fa-solid fa-key' inputType='password'
                           autoComplete='new-password' onChange={e => newPassword.onChange(e)}
                           onBlur={e => newPassword.onBlur(e)} value={newPassword.value}/>
            {newPassword.isDirty && newPassword.isEqualError && <div className={cl.error} >{newPassword.isEqualPasswordMessage}</div>}

            <div className={cl.terms}>
                <input type='checkbox' className={cl.check} onChange={e => setCheckedTerms(e.target.checked)}/>
                <Link to='/terms'>I agree to the Terms of Use</Link>
            </div>

            {regError && <div className={cl.reg__error}>{regError}</div>}
            {regSuccess && <div className={cl.reg__success}>{regSuccess}</div>}

            <div className={cl.container__create}>
                <button disabled={isValid} className={!isValid ? cl.create : cl.disable} onClick={e => sendPostDataRegistration(e)}>
                    Create account
                </button>
            </div>
        </>
    );
};

export default RegistrationInputs;