import $api from '../API/index.js'
import {AxiosResponse} from "axios";
import {AuthResponce} from "../models/responce/AuthResponce";
import {response} from "express";
import {IUser} from "../models/IUser";

export default class UserService {
    static fetchUsers (): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/auth/users')
    }
}