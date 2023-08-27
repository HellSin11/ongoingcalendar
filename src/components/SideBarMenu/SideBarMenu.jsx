import cl from './SideBarMenu.module.scss'
import {Link} from "react-router-dom";
import {memo} from "react";


const SideBarMenu = memo(() => {
    return (
        <>
            <input type='checkbox' className={cl.check} id='checkbox'/>
            <label htmlFor='checkbox'>
                <div className={cl.btn}><i className='fas fa-bars'></i></div>
                <div className={cl.cancel}><i className='fas fa-times'></i></div>
            </label>
            <div className={cl.sideBar}>
                <header>Меню</header>
                <ul>
                    <li><Link  to='/myprofile'><i className="fa-regular fa-user"></i>Мій профіль</Link></li>
                    <li><Link to='/calendar'><i className="fa-regular fa-calendar"></i>Календар</Link></li>
                    <li><Link to='/settings'><i className="fa-solid fa-gear"></i>Налаштування</Link></li>
                    <li><Link href='#'>soon...</Link></li>
                    <li><Link href='#'>soon...</Link></li>
                    <li><Link to='/logout'>Вийти з акаунту</Link></li>
                </ul>
            </div>
        </>
    );
});

export default SideBarMenu;