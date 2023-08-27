import './styles/App.scss';
import AppRouter from "./components/AppRouter";
import {observer} from "mobx-react-lite";
import React, {useContext, useEffect} from "react";
import {Context} from "./index.tsx";
import Loader from "./components/Loader/Loader";
import {CSSTransition} from "react-transition-group";

function App() {


    const {store} = useContext(Context)
    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }
    }, []);

    return (
        <div className="App">
            <CSSTransition classNames='loader__animation' in={store.isLoading} timeout={300} unmountOnExit>
                <Loader/>
            </CSSTransition>
            {!store.isLoading ? <AppRouter/> : <></>}
        </div>
    );
}

export default observer(App);
