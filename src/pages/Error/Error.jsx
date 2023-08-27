import React from 'react';
import {Link} from "react-router-dom";

const Error = () => {
    return (
        <div style={{color: 'black', marginTop: '100px', fontSize: '50px'}}>
            Такої сторінки не існує<br/>
            <Link to='/'>Go home</Link>
        </div>
    );
};

export default Error;