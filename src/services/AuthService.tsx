import $api from '../API/index.js'
import {AxiosResponse} from "axios";
import {AuthResponce} from "../models/responce/AuthResponce";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponce>> {
        return $api.post<AuthResponce>('/auth/login', {email, password})
    }

    static async registration(fullName: string, email: string, password: string): Promise<AxiosResponse<AuthResponce>> {
        return $api.post<AuthResponce>('/auth/registration', {fullName, email, password})
    }

    static async logout(): Promise<void> {
        return $api.post('/auth/logout')
    }
}