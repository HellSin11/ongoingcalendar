import React, {memo} from 'react';
import cl from "./HaveAccount.module.scss";
import {Link} from "react-router-dom";

const HaveAccount = memo(() => {
    return (
        <span className={cl.login}>Have an account?
            <Link to='/login'> Log in</Link>
        </span>
    );
});

export default HaveAccount;