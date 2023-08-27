import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import Calendar from "../pages/Calendar/Calendar.jsx";
import Registration from "../pages/Registration/Registration.jsx";
import Error from "../pages/Error/Error.jsx";
import Login from '../pages/Login/Login.jsx'
import Settings from "../pages/Settings/Settings";
import {observer} from "mobx-react-lite";
import {Context} from "../index.tsx";
import MyProfile from "../pages/MyProfile/MyProfile";
import Logout from "../pages/Logout/Logout";


const AppRouter = () => {


    const {store} = useContext(Context)
    const {isAuth} = store

    if (isAuth) {
        return (
            <Routes>
                <Route path='/'>
                    <Route index element={<Calendar/>} />
                    <Route path='calendar' element={<Calendar/>} />
                    <Route path='settings' element={<Settings/>} />
                    <Route path='myprofile' element={<MyProfile/>} />
                    <Route path='logout' element={<Logout/>} />
                    <Route path='*' element={<Error/>}/>
                </Route>
            </Routes>
        );
    } else {
        return (
            <Routes>
                <Route path='/'>
                    <Route index element={<Login/>} />
                    <Route path='logout' element={<Logout/>} />
                    <Route path='registration' element={<Registration/>} />
                    <Route path='login' element={<Login/>} />
                    <Route path='*' element={<Error/>}/>
                </Route>
            </Routes>
        );
    }


};

export default observer(AppRouter);