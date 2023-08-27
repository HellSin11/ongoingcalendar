import cl from './RegistrationForm.module.scss'
import HaveAccount from "../HaveAccount/HaveAccount";

import RegistrationInputs from "../RegistrationInputs/RegistrationInputs.jsx";


const RegistrationForm = () => {



    return (
            <form className={cl.form}>
                <div className={cl.registration__form}>
                    <h2 className={cl.title__logo}>Registration</h2>
                    <RegistrationInputs/>
                    <HaveAccount/>
                </div>
            </form>

    );
};

export default RegistrationForm;