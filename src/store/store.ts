import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
// @ts-ignore
import AuthService from "../services/AuthService.tsx";
import axios from "axios";
import {AuthResponce} from "../models/responce/AuthResponce";
// @ts-ignore
import OngoingsService from "../services/OngoingsService.tsx";

export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;
    currentError = 200;
    ongoings = JSON.parse(localStorage.getItem('ongoings'));

    constructor() {
        makeAutoObservable(this)
    }

    setOngoings (ongoings: any) {
        this.ongoings = ongoings;
    }
    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setCurrentError(bool: number) {
        this.currentError = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async login(email: string, password: string) {
        try {
            const res = await AuthService.login(email, password);
            localStorage.setItem('token', res.data.accessToken);
            localStorage.setItem('owner', res.data.user.id);
            this.setAuth(true);
            this.setUser(res.data.user)
        } catch (e) {
            console.log(e)
            if (e?.response?.status) {
                this.setCurrentError(e.response.status)
            }
        }
    }

    async registration(fullName: string, email: string, password: string) {
        try {
            const res = await AuthService.registration(fullName, email, password);
            // localStorage.setItem('token', res.data.accessToken);
            // localStorage.setItem('owner', res.data.user.id);
            // this.setAuth(true);
            // this.setUser(res.data.user)
            return 'Реєстрація пройшла успішно'
        } catch (e) {
            console.log(e)
            if (e?.status) {
                this.setCurrentError(e.status)
            }
            return e.response.data.message;
        }
    }
    async logout() {
        try {
            const responce = await AuthService.logout();
            localStorage.clear();
            this.setAuth(false);
            this.setUser({} as IUser)
            this.setCurrentError(0)
        } catch (e) {
            console.log(e.responce?.data?.message)
            if (e?.response?.status) {
                this.setCurrentError(e.response.status)
            }
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const responce = await axios.get<AuthResponce>(`http://localhost:5000/auth/refresh`, {
                withCredentials: true
            });
            if (!responce.data.user) {
                this.setAuth(false);
                return;
            }
            localStorage.setItem('token', responce.data.accessToken);
            this.setAuth(true);
            this.setUser(responce.data.user)
        } catch (e) {
            console.log(e);
        } finally {
            this.setLoading(false);
        }
    }

    async deleteOneOngoing(nameOngoing: string) {
        try {
            await OngoingsService.deleteOneOngoing(nameOngoing);
            localStorage.removeItem('ongoings');
            const newOngoings = await OngoingsService.getAllOngoings();
            const result = newOngoings.data;
            let ongs = {};
            result.map(e => {
                if(!ongs[e.day]){
                    ongs[e.day] = [[e.name, e.picture]];
                } else {
                    ongs[e.day].push([e.name, e.picture]);
                }
            })
            this.setOngoings(ongs);
            localStorage.setItem('ongoings', JSON.stringify(ongs))
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }

    async getAllOngoings() {
        try {
            const localOngoingsJson = localStorage.getItem('ongoings');
            if (localOngoingsJson) {
                const localOngoings = JSON.parse(localOngoingsJson)
                this.setOngoings(localOngoings);
                return localOngoings;
            }
            const res = await OngoingsService.getAllOngoings();
            const result = res.data;
            let ongs = {};
            result.map(e => {
                if(!ongs[e.day]){
                    ongs[e.day] = [[e.name, e.picture]];
                } else {
                    ongs[e.day].push([e.name, e.picture]);
                }
            })
            this.setOngoings(ongs);
            localStorage.setItem('ongoings', JSON.stringify(ongs))
            return ongs;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }
}