import axios from "axios";
import OngoingsService from "./OngoingsService.tsx";



export default class FileService {

    static async uploadOngoing(data) {
        await axios.post('http://localhost:5000/api/ongoings', data,
            {headers: {
                    'Content-Type': 'multipart/form-data'
                }});
        const res = await OngoingsService.getAllOngoings()
        const result = res.data;
        let ongs = {};
        result.map(e => {
            if(!ongs[e.day]){
                ongs[e.day] = [[e.name, e.picture]];
            } else {
                ongs[e.day].push([e.name, e.picture]);
            }
        })
        localStorage.setItem('ongoings', JSON.stringify(ongs));
    }


    static async updateOngoing(data) {
        await axios.put('http://localhost:5000/api/ongoings', data,
            {headers: {
                    'Content-Type': 'multipart/form-data'
                }});
        const res = await OngoingsService.getAllOngoings()
        const result = res.data;
        let ongs = {};
        result.map(e => {
            if(!ongs[e.day]){
                ongs[e.day] = [[e.name, e.picture]];
            } else {
                ongs[e.day].push([e.name, e.picture]);
            }
        })
        localStorage.setItem('ongoings', JSON.stringify(ongs));
    }

}