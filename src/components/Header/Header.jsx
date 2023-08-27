import React, {memo, useMemo} from 'react';
import cl from './Header.module.scss'
import {Link} from "react-router-dom";
import {days} from "../../staticData/data.js";
import SideBarMenu from "../SideBarMenu/SideBarMenu";

export const Header = memo(() => {

    const currentDay = useMemo(() => {
        return new Date().getDay();
    }, [])
    return (
        <>
            <div className={cl.Container}>
                <Link to='/'>Додому</Link>
                <Link to='/settings'>Налаштування</Link>
                <Link to='/myprofile'>Мій профіль</Link>
                <div className={cl.text}>Сьогодні {days[currentDay]}</div>
            </div>
            <div className={cl.side__bar}>
                <SideBarMenu/>
            </div>
        </>
    );
});

export default Header;