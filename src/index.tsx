// @ts-ignore
import React, {createContext} from 'react';
// @ts-ignore
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import {BrowserRouter} from "react-router-dom";
// @ts-ignore
import Store from "./store/store.ts";

interface State {
    store: Store,
}


const store = new Store();

export const Context = createContext<State>({
    store,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{store}}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Context.Provider>
);
